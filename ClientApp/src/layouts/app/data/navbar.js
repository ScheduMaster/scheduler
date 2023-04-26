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
                    href: "#",
                    name: "Activity"
                },
                {
                    href: "#",
                    name: "Gallery"
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
        title: "New Appointment",
        icon: "/images/layouts/app/Navbar/form.svg",
        href: "/app/appointment/new",
        dropdown: false,
        dropdownsData: []
    },
]