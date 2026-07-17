export type Contact = {
    name: string;
    email: string;
    subject: string;
    message: string;
};
export type ContactErrors = {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    submit?: string;
};

