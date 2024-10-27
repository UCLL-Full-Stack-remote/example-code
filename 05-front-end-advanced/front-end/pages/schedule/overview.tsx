import Header from "@components/header";
import ScheduleOverview from "@components/schedule/ScheduleOverview";
import ScheduleService from "@services/ScheduleService";
import StudentService from "@services/StudentService";
import Head from "next/head";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";

const Schedules: React.FC = () => {
    const getSchedulesAndStudents = async () => {
        const responses = await Promise.all([
            ScheduleService.getSchedule(),
            StudentService.getAllStudents(),
        ]);

        const [schedulesResponse, studentsResponse] = responses;

        if (schedulesResponse.ok && studentsResponse.ok) {
            const schedules = await schedulesResponse.json();
            const students = await studentsResponse.json();
            return { schedules, students };
        }
    };

    const { data, isLoading, error } = useSWR(
        "schedulesAndStudents",
        getSchedulesAndStudents
    );

    useInterval(() => {
        mutate("schedulesAndStudents", getSchedulesAndStudents());
    }, 1000);

    return (
        <>
            <Head>
                <title>Schedules</title>
            </Head>
            <Header />
            <main className="p-6 min-h-screen flex flex-col items-center">
                <h1>Schedule for all users</h1>
                <>
                    {error && <div className="text-red-800">{error}</div>}
                    {isLoading && <p className="text-green-800">Loading...</p>}
                    {data && (
                        <ScheduleOverview
                            schedules={data.schedules}
                            students={data.students}
                        />
                    )}
                </>
            </main>
        </>
    );
};

export default Schedules;
