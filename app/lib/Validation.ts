import type {Contact} from "@/components/models/Contact";

export type ContactErrors = {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
};

export const validateContactForm = (contact: Contact) => {
    const errors: ContactErrors = {};

    if (!contact.name.trim()) {
        errors.name = "Name is required";
    }

    if (!contact.email.trim()) {
        errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(contact.email)) {
        errors.email = "Invalid email address";
    }

    if (!contact.subject.trim()) {
        errors.subject = "Subject is required";
    }

    if (!contact.message.trim()) {
        errors.message = "Message is required";
    }

    if (contact.message.trim() && contact.message.trim().length < 10) {
        errors.message = "Message must be at least 10 characters long";
    }

    return errors;
};