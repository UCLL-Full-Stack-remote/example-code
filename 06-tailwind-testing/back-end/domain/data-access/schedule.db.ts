import database from '../../util/database';
import { Schedule } from '../model/schedule';
import { Student } from '../model/student';

const createSchedule = async ({ start, end, course, lecturer }: Schedule): Promise<Schedule> => {
    try {
        const schedulePrisma = await database.schedule.create({
            data: {
                start,
                end,
                course: {
                    connect: { id: course.id },
                },
                lecturer: {
                    connect: { id: lecturer.id },
                },
            },
            include: {
                course: true,
                lecturer: { include: { user: { include: { role: true } }, courses: true } },
                students: { include: { user: { include: { role: true } } } },
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
            where: { id: schedule.id },
            data: {
                students: {
                    connect: schedule.students.map((student) => ({ id: student.id })),
                },
            },
            include: {
                course: true,
                lecturer: { include: { user: { include: { role: true } }, courses: true } },
                students: { include: { user: { include: { role: true } } } },
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
                lecturer: { include: { user: { include: { role: true } }, courses: true } },
                students: { include: { user: { include: { role: true } } } },
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
                lecturer: { include: { user: { include: { role: true } }, courses: true } },
                students: { include: { user: { include: { role: true } } } },
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
                lecturer: { include: { user: { include: { role: true } }, courses: true } },
                students: { include: { user: { include: { role: true } } } },
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
                lecturer: { include: { user: { include: { role: true } }, courses: true } },
                students: { include: { user: { include: { role: true } } } },
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
                lecturer: { include: { user: { include: { role: true } }, courses: true } },
                students: { include: { user: { include: { role: true } } } },
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
