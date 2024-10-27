import database from './database';
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

const createLecturer = async (lecturer: Lecturer): Promise<Lecturer> => {
    try {
        const lecturerPrisma = await database.lecturer.create({
            data: {
                expertise: lecturer.getExpertise(),
                user: {
                    create: {
                        username: lecturer.getUser().getUsername(),
                        password: lecturer.getUser().getPassword(),
                        firstName: lecturer.getUser().getFirstName(),
                        lastName: lecturer.getUser().getLastName(),
                        email: lecturer.getUser().getEmail(),
                        role: lecturer.getUser().getRole(),
                    },
                },
                courses: {
                    connect: lecturer.getCourses().map((course) => ({ id: course.getId() })),
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
