import database from './database';
import { Schedule } from '../model/schedule';
import { Student } from '../model/student';

const createSchedule = async (schedule: Schedule): Promise<Schedule> => {
    try {
        const schedulePrisma = await database.schedule.create({
            data: {
                start: schedule.getStart(),
                end: schedule.getEnd(),
                course: {
                    connect: { id: schedule.getCourse().getId() },
                },
                lecturer: {
                    connect: { id: schedule.getLecturer().getId() },
                },
            },
            include: {
                course: true,
                lecturer: { include: { user: true, courses: true } },
                students: { include: { user: true } },
            },
        });

        return Schedule.from(schedulePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateStudentsOfSchedule = async ({
    schedule,
}: {
    schedule: Schedule;
}): Promise<Schedule | null> => {
    try {
        const schedulePrisma = await database.schedule.update({
            where: { id: schedule.getId() },
            data: {
                students: {
                    connect: schedule.getStudents().map((student) => ({ id: student.getId() })),
                },
            },
            include: {
                course: true,
                lecturer: { include: { user: true, courses: true } },
                students: { include: { user: true } },
            },
        });
        return schedulePrisma ? Schedule.from(schedulePrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAllSchedules = async (): Promise<Schedule[]> => {
    try {
        const schedulesPrisma = await database.schedule.findMany({
            include: {
                course: true,
                lecturer: { include: { user: true, courses: true } },
                students: { include: { user: true } },
            },
        });
        return schedulesPrisma.map((schedulePrisma) => Schedule.from(schedulePrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getScheduleForLecturer = async ({ username }: { username: string }): Promise<Schedule[]> => {
    try {
        const schedulesPrisma = await database.schedule.findMany({
            where: { lecturer: { user: { username } } },
            include: {
                course: true,
                lecturer: { include: { user: true, courses: true } },
                students: { include: { user: true } },
            },
        });
        return schedulesPrisma.map((schedulePrisma) => Schedule.from(schedulePrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getScheduleById = async ({ id }: { id: number }): Promise<Schedule | null> => {
    try {
        const schedulePrisma = await database.schedule.findUnique({
            where: { id },
            include: {
                course: true,
                lecturer: { include: { user: true, courses: true } },
                students: { include: { user: true } },
            },
        });
        return schedulePrisma ? Schedule.from(schedulePrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAllSchedulesByLecturerName = async ({
    lecturerId,
}: {
    lecturerId: number;
}): Promise<Schedule[]> => {
    try {
        const schedulesPrisma = await database.schedule.findMany({
            where: { lecturerId },
            include: {
                course: true,
                lecturer: { include: { user: true, courses: true } },
                students: { include: { user: true } },
            },
        });
        return schedulesPrisma.map((schedulePrisma) => Schedule.from(schedulePrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getScheduleByCourseAndLecturer = async ({
    courseId,
    lecturerId,
}: {
    courseId: number;
    lecturerId: number;
}): Promise<Schedule | null> => {
    try {
        const schedulePrisma = await database.schedule.findFirst({
            where: { courseId, lecturerId },
            include: {
                course: true,
                lecturer: { include: { user: true, courses: true } },
                students: { include: { user: true } },
            },
        });
        return schedulePrisma ? Schedule.from(schedulePrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    createSchedule,
    updateStudentsOfSchedule,
    getAllSchedules,
    getAllSchedulesByLecturerName,
    getScheduleById,
    getScheduleByCourseAndLecturer,
    getScheduleForLecturer,
};
