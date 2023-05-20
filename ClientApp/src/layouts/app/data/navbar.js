export const navbarsData = [
    {
        title: "Home",
        icon: "/images/layouts/app/Navbar/home.svg",
        href: "/app",
        dropdown: false,
        dropdownsData: []
    },
    {
        title: "Scheduling",
        icon: "/images/layouts/app/Navbar/interface.svg",
        href: "/app/appointment",
        dropdown: true,
        dropdownsData: [
            [
                {
                    href: "/app/scheduler",
                    name: "Upcoming appointments"
                },
                {
                    href: "/app/new-appointment",
                    name: "New appointment"
                }
            ],
            [
                {
                    href: "#",
                    name: "Invoice"
                },
                {
                    href: "#",
                    name: "Search results"
                }
            ]   
        ]
    },
    {
        title: "User management",
        icon: "/images/layouts/app/Navbar/users.svg",
        href: "/app/user",
        dropdown: true,
        dropdownsData: [
            [
                {
                    href: "/app/user/list",
                    name: "Users"
                }
            ],
            [
                {
                    href: "/app/user/new",
                    name: "New user"
                }
            ]   
        ]
    },
    {
        title: "Calendar management",
        icon: "/images/layouts/app/Navbar/calendars.svg",
        href: "/app/calendar",
        dropdown: true,
        dropdownsData: [
            [
                {
                    href: "/app/calendar/list",
                    name: "Calendars"
                }
            ],
            [
                {
                    href: "/app/calendar/new",
                    name: "New calendar"
                }
            ]   
        ]
    }
]