import Head from "next/head";
import LecturersOverviewTable from "@components/lecturers/LecturerOverviewTable";
import { useState, useEffect } from "react";
import { Lecturer } from "@types";
import Header from "@components/header";
import LecturerService from "@services/LecturerService";
import CourseOverviewTable from "@components/courses/CourseOverviewTable";

const Lecturers: React.FC = () => {
    const [lecturers, setLecturers] = useState<Array<Lecturer>>();
    const [selectedLecturer, setSelectedLecturer] = useState<Lecturer>(null);

    const getLecturers = async () => {
        const response = await LecturerService.getAllLecturers();
        const lecturers = await response.json();
        setLecturers(lecturers);
    }

    useEffect(() => {
        getLecturers();
    }, [])

    return (
        <>
            <Head>
                <title>Lecturers</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Lecturers</h1>
                <section>
                    {lecturers && (
                        <LecturersOverviewTable
                            lecturers={lecturers}
                            selectLecturer={setSelectedLecturer}
                        />
                    )}
                </section>

                {selectedLecturer && (
                    <section className="mt-5">
                        <h2>
                            Courses taught by {selectedLecturer.name}:
                        </h2>
                        {selectedLecturer && (
                            <CourseOverviewTable lecturer={selectedLecturer} />
                        )}
                    </section>
                )}
            </main>
        </>
    );
};

export default Lecturers;
