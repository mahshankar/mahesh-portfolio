"use client";

import { useState } from "react";
import { validateContactForm } from "../../lib/Validation";
import { Contact, ContactError } from "../../models/Contact";
import TextArea from "../ui/TextArea";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function ContactForm() {
    const [contact, setContact] = useState<Contact>({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [errors, setErrors] = useState<ContactError>({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setContact(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        // Clear error for this field
        if (errors[e.target.name]) {
            setErrors(prev => ({
                ...prev,
                [e.target.name]: "",
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       setErrors({});


        const validationErrors = validateContactForm(contact);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
            setLoading(true);
            setSuccess(false);

        try {
            // Send data to API (replace with your actual endpoint)
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contact),
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            setSuccess(true);
            setContact({
                name: "",
                email: "",
                subject: "",
                message: "",
            });
            setErrors({});

            // Reset success message after 3 seconds
            setTimeout(() => setSuccess(false), 3000);
        } catch (error) {
            setErrors({ submit: "Failed to send message. Please try again." });
            console.error("Form submission error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-slate-900 rounded-lg shadow-md">
            {success && (
                <div className="mb-4 p-4 bg-green-600 text-white rounded">
                    Message sent successfully!
                </div>
            )}
            {errors.submit && (
                <div className="mb-4 p-4 bg-red-600 text-white rounded">
                    {errors.submit}
                </div>
            )}

            <Input
                label="Name"
                name="name"
                value={contact.name}
                onChange={handleChange}
                error={errors.name}
                disabled={loading}
            />
            <Input
                label="Email"
                name="email"
                type="email"
                value={contact.email}
                onChange={handleChange}
                error={errors.email}
                disabled={loading}
            />
            <Input
                label="Subject"
                name="subject"
                value={contact.subject}
                onChange={handleChange}
                error={errors.subject}
                disabled={loading}
            />
            <TextArea
                label="Message"
                name="message"
                value={contact.message}
                onChange={handleChange}
                error={errors.message}
                disabled={loading}
            />
            <Button 
                type="submit" 
                text={loading ? "Sending..." : "Send Message"}
                variant="primary"
                disabled={loading}
                className="w-full"
            />
        </form>
    );
}


