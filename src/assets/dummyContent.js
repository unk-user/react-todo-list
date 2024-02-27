const exampleTodoList = [
  {
    projectName: 'Today',
    default: true,
    tasks: [
      {
        title: 'Complete task 1',
        description: 'Finish the first task on the list',
        date: '2024-02-26',
        priority: 'low',
        done: false,
      },
      {
        title: 'Submit report',
        description: 'Submit the quarterly report to the manager',
        date: '2024-02-26',
        priority: 'medium',
        done: true,
      },
      {
        title: 'Call client',
        description: 'Follow up with the client regarding the project status',
        date: '2024-02-26',
        priority: 'high',
        done: false,
      },
      {
        title: 'Review code',
        description: 'Review the code changes in the pull request',
        date: '2024-02-26',
        priority: 'low',
        done: false,
      }
    ],
  },
  {
    projectName: 'This week',
    default: true,
    tasks: [
      {
        title: 'Prepare presentation',
        description: 'Prepare slides for the upcoming meeting',
        date: '2024-03-01',
        priority: 'high',
        done: false,
      },
      {
        title: 'Review project proposal',
        description: 'Review the project proposal document',
        date: '2024-03-03',
        priority: 'medium',
        done: false,
      }
    ],
  },
];

export default exampleTodoList;
