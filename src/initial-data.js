const initialData = {
    tasks: {
        'task-1': { id: 'task-1', content: 'Take out the trash' },
        'task-2': { id: 'task-2', content: 'charge phone' },
        'task-3': { id: 'task-3', content: 'wash car' },
        'task-4': { id: 'task-4', content: 'get gas' },
    },
    columns:{
        'column-1': {
            id: 'column-1',
            title: 'To Do',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
        },
        'column-2': {
            id: 'column-2',
            title: 'In Progress',
            taskIds: [],
        },

    },
    //facilitate reordering of columns
    columnOrder: ['column-1', 'column-2', ],
};
export default initialData;