import {contactData} from "../../data/contact";
import ContactCard from "../cards/ContactCard";

export default function Contact() {
    return (
        <section
            id="contact"
            className="bg-slate-900 text-white py-24"
        >

            <div className="max-w-6xl mx-auto px-8">

                <div className="text-center mb-12">

                    <h2 className="text-4xl font-bold">
                        Contact
                    </h2>

                    <p className="text-lg text-slate-300 mt-4 max-w-2xl mx-auto">
                        Get in touch with me through any of the following platforms.
                    </p>

                </div>

                <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {contactData.map((contact) => (

                        <ContactCard
                            key={contact.id}
                            {...contact}
                        />

                    ))}

                </div>

            </div>

        </section>
    );
}

