import React from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column'
import '@atlaskit/css-reset';
import styled from 'styled-components';

// API
const apiURL = 'http://localhost:4040';

const Container = styled.div`
    display: flex;
`;
//PureComponent is the same as the shouldComponentUpdate function
class InnerList extends React.PureComponent{
    render () {
        const { column, taskMap, index } = this.props;
        const tasks = column.taskIds.map(taskId => taskMap[taskId]);
        return <Column column={column} tasks={tasks} index={index}/>
    }
}
class App extends React.Component {
    state = initialData;

    onDragEnd = result => {
        this.setState({
            homeIndex: null,
        });
        const { destination, source, draggableId, type } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }
        
        if (type === 'column') {
            const newColumnOrder = Array.from(this.state.columnOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);

            const newState = {
                ...this.state,
                columnOrder: newColumnOrder,
            };
            this.setState(newState);
            return;
        }
console.log("columns", this.state.columns);
        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];

        if (start === finish){
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);
    
            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };
    
            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn,
                },
            };
    
            this.setState(newState);
            return;
        }

        //moving from one list to another
        const startTaskIds =Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart= {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish={
            ...finish,
            taskIds: finishTaskIds,
        };
        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };

        this.setState(newState);
    };    

    render() {
        return (
            <DragDropContext 
                onDragStart={this.onDragStart}
                onDragUpdate={this.onDragUpdate}
                onDragEnd={this.onDragEnd} 
            >
            <Droppable 
                droppableId="all-columns" 
                direction="horizontal" 
                type="column"
            >
                {provided =>(
                <Container
                    {...provided.droppableProps}
                    ref = {provided.innerRef}

                >
                    {this.state.columnOrder.map((columnId, index) => {
                        const column = this.state.columns[columnId];
                        
                        return (
                        <InnerList
                            key={column.id} 
                            column={column} 
                            taskMap={this.state.tasks} 
                            index={index}
                        />
                        );
                    })}
                    {provided.placeholder}
                </Container>
                )}
                </Droppable>
            </DragDropContext>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
