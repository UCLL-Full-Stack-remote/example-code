import database from './database';
import { Course } from '../model/course';

const createCourse = async (course: Course): Promise<Course> => {
    try {
        const coursePrisma = await database.course.create({
            data: {
                name: course.getName(),
                description: course.getDescription(),
                phase: course.getPhase(),
                credits: course.getCredits(),
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
