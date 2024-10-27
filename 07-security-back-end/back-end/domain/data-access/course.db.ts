import database from '../../util/database';
import { Course } from '../model/course';

const createCourse = async ({ name, description, phase, credits }: Course): Promise<Course> => {
    try {
        const coursePrisma = await database.course.create({
            data: {
                name,
                description,
                phase,
                credits,
            },
        });

        return Course.from(coursePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getCourseById = async ({ id }: { id: number }): Promise<Course | null> => {
    try {
        const coursePrisma = await database.course.findUnique({
            where: { id },
        });

        return coursePrisma ? Course.from(coursePrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    createCourse,
    getCourseById,
};
