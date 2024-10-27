import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LecturerService from "@services/LecturerService";
import Head from "next/head";
import Header from "@components/header";
import { Lecturer } from "@types";
import LecturerInfo from "@components/lecturers/LecturerInfo";

const GetLecturerById = () => {
    const [lecturer, setLecturer] = useState<Lecturer>(null);

    const router = useRouter();
    const { lecturerId } = router.query;

    const getLecturerById = async () => {
        const [lecturerResponse] = await Promise.all([
            LecturerService.getLecturerById(lecturerId as string)
        ])
        const [lecturer] = await Promise.all([
           lecturerResponse.json()
        ])
        setLecturer(lecturer)
    }

    useEffect(() => {
            if(lecturerId) 
                getLecturerById()
        }, [lecturerId]
    ) 
    
    return (
        <>
            <Head>
                <title>Lecturer info</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Info of {lecturer && lecturer.name} 
                </h1>
                {!lecturerId && <p>Loading</p>}
                <section>
                    <LecturerInfo lecturer={lecturer}></LecturerInfo>
                </section>
            </main>
        </>
    )
}

export default GetLecturerById;


// useEffect(() => {
//     // enkel wanneer lecturerId niet undefined is dan service callen
//     if(lecturerId) 
//         getLecturerById()
// }, 
// // als lecturerId changes dan wordt useEffect opnieuw uitgevoerd
// // initieel is lecturerId immers undefined (na lijn 13), maar na hydration is die wel gedefined
// [lecturerId]
// ) 
