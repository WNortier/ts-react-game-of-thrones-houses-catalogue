

export const generateUsers = () => {

    const users = [
        {
            name: 'Warwick',
            email: 'warwick@avochoc.com',
            pass: 'admin@01'
        },
        {
            name: 'Jaco',
            email: 'jaco@avochoc.com',
            pass: 'admin@123'
        },
        {
            name: 'Johan',
            email: 'johan@avochoc.com',
            pass: 'admin@1234'
        }
    ]

    for (let i = 0; i < 51; i++) {
        users.push({ name: `test-user-${i}`, email: `email@${i}.com`, pass: '' })
    }


    return users
}

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