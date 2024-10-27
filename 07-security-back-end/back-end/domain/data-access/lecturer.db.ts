import database from '../../util/database';
import { Lecturer } from '../model/lecturer';

const getAllLecturers = async (): Promise<Lecturer[]> => {
    try {
        const lecturersPrisma = await database.lecturer.findMany({
            include: { user: true, courses: true },
        });
        return lecturersPrisma.map((lecturerPrisma) => Lecturer.from(lecturerPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createLecturer = async ({ expertise, user, courses }: Lecturer): Promise<Lecturer> => {
    try {
        const lecturerPrisma = await database.lecturer.create({
            data: {
                expertise: expertise,
                user: {
                    create: {
                        username: user.username,
                        password: user.password,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        role: user.role,
                    },
                },
                courses: {
                    connect: courses.map((course) => ({ id: course.id })),
                },
            },
            include: { user: true, courses: true },
        });

        return Lecturer.from(lecturerPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getLecturerById = async ({ id }: { id: number }): Promise<Lecturer | null> => {
    try {
        const lecturerPrisma = await database.lecturer.findUnique({
            where: { id },
            include: { user: true, courses: true },
        });

        return lecturerPrisma ? Lecturer.from(lecturerPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllLecturers,
    createLecturer,
    getLecturerById,
};
