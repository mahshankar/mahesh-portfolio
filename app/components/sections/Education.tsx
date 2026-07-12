import {educationData} from "../../data/education";
import EducationCard from "../cards/EducationCard";

export default function Education() {
    return (
            <section
                id="education"
                className="bg-slate-900 text-white py-24"
            >

                <div className="max-w-6xl mx-auto px-8">

                    <div className="text-center mb-12">

                        <h2 className="text-4xl font-bold">
                            Education
                        </h2>

                        <p className="text-lg text-slate-300 mt-4 max-w-2xl mx-auto">
                            My academic background and the foundation that launched my engineering career.
                        </p>

                    </div>

                    <div className="max-w-3xl mx-auto">

                        {educationData.map((edu) => (

                            <EducationCard
                                key={edu.degree}
                                {...edu}
                            />

                        ))}

                    </div>

                </div>

            </section>
    );
}
