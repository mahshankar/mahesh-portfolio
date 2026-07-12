import {certifications} from "../../data/certification";
import CertificationCard from "../cards/CertificationCard";

export default function Certifications() {
    return (
        <section
            id="certifications"
            className="bg-slate-950 text-white py-24"
        >

            <div className="text-center mb-12">

                <h2 className="text-4xl font-bold mb-4">
                    Certifications
                </h2>

                  <p className="text-lg text-slate-300 mt-4 max-w-2xl mx-auto">
                        Professional certifications that reflect my commitment to continuous learning and modern enterprise technologies.
                    </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certifications.map((certification) => (
                        <CertificationCard
                            key={certification.title}
                            {...certification}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
