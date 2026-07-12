export type ContactItem = {
    id: number;
    title: string;
    value: string;
    href: string;
};

export const contactData: ContactItem[] = [

    {
        id: 1,
        title: "Email",
        value: "maheshkumarshankar@gmail.com",
        href: "mailto:maheshkumarshankar@gmail.com",
    },

    {
        id: 2,
        title: "Phone",
        value: "(813) 579-0616",
        href: "tel:+18135790616",
    },

    {
        id: 3,
        title: "LinkedIn",
        value: "linkedin.com/in/mahesh-kumar-shankar-21789011",
        href: "https://www.linkedin.com/in/mahesh-kumar-shankar-21789011",
    },

    {
        id: 4,
        title: "GitHub",
        value: "github.com/mahshankar",
        href: "https://github.com/mahshankar",
    },

    {
        id: 5,
        title: "Location",
        value: "Tampa, Florida, USA",
        href: "#",
    },

];