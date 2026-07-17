import {contactData} from "../../data/contact";
import ContactCard from "../cards/ContactCard";
import ContactForm from "../contact/ContactForm";

export default function Contact() {
    return (
        <section
            id="contact"
            className="bg-slate-900 text-white py-24"
        >

            <div className="max-w-6xl mx-auto p-6 rounded-xl">

                <div className="text-center mb-12">

                    <h2 className="text-4xl font-bold">
                        Contact
                    </h2>

                    <p className="text-lg text-slate-300 mt-4 max-w-2xl mx-auto">
                        Get in touch with me through any of the following platforms.
                    </p>

                </div>

               <div className="grid lg:grid-cols-2 gap-12 items-start">

                    <div>

                        <h3 className="text-2xl font-semibold mb-6">
                            Reach Me
                        </h3>

                        <div className="space-y-4">

                            {contactData.map((contact) => (

                                <ContactCard
                                    key={contact.id}
                                    {...contact}
                                />

                            ))}

                        </div>

                    </div>
                    <div>

                        <h3 className="text-2xl font-semibold mb-6">
                            Send a Message
                        </h3>
                      <div className="bg-slate-800 rounded-xl p-8 h-full">
                        <ContactForm />
                      </div>
                    </div>

                </div>

            </div>

        </section>
    );
}

