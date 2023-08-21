export const generateUsers = () => {
  const users = [
    {
      name: "visitor",
      email: "visitor",
      pass: "visitor",
    },
  ];

  // for (let i = 0; i < 51; i++) {
  //     users.push({ name: `test-user-${i}`, email: `email@${i}.com`, pass: '' })
  // }

  return users;
};

//   {
//     index: true,
//     element: <EventsPage />,
//     loader: eventsLoader,
//   },
//   {
//     path: ':eventId',
//     id: 'event-detail',
//     loader: eventDetailLoader,
//     children: [
//       {
//         index: true,
//         element: <EventDetailPage />,
//         action: deleteEventAction,
//       },
//       {
//         path: 'edit',
//         element: <EditEventPage />,
//         action: manipulateEventAction,
//       },
//     ],
//   },
