import Head from "next/head";
import LecturersOverviewTable from "@components/lecturers/LecturerOverviewTable";
import { useState, useEffect } from "react";
import { Lecturer } from "@types";
import Header from "@components/header";
import LecturerService from "@services/LecturerService";
import CourseOverviewTable from "@components/courses/CourseOverviewTable";

const Lecturers: React.FC = () => {
    const [lecturers, setLecturers] = useState<Array<Lecturer>>();
    const [error, setError] = useState<string>();
    const [selectedLecturer, setSelectedLecturer] = useState<Lecturer>(null);

    const getLecturers = async () => {
        setError("");
        const response = await LecturerService.getAllLecturers();

        if (!response.ok) {
            setError(response.statusText);
        } else {
            const lecturers = await response.json();
            setLecturers(lecturers);
        }
    };

    useEffect(() => {
        getLecturers();
    }, []);

    return (
        <>
            <Head>
                <title>Lecturers</title>
            </Head>
            <Header />
            <main className="p-6 min-h-screen flex flex-col items-center">
                <h1>Lecturers</h1>
                <section>
                    {error && <div className="text-red-800">{error}</div>}
                    {lecturers && (
                        <LecturersOverviewTable
                            lecturers={lecturers}
                            selectLecturer={setSelectedLecturer}
                        />
                    )}
                </section>

                {selectedLecturer && (
                    <section className="mt-5">
                        <h2 className="text-center">
                            Courses taught by {selectedLecturer.user.firstName}
                        </h2>
                        {selectedLecturer.courses && (
                            <CourseOverviewTable lecturer={selectedLecturer} />
                        )}
                    </section>
                )}
            </main>
        </>
    );
};

export default Lecturers;
