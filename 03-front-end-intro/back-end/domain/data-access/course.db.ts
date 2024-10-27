import { Course } from '../model/course';

const courses = [
    new Course({
        id: 1,
        name: 'Full-stack sofware development',
        description: 'Learn to develop a full-stack app',
        phase: 2,
        credits: 6,
    }),
    new Course({
        id: 2,
        name: 'Front-end development',
        description: 'Learn to build beautiful front-ends',
        phase: 1,
        credits: 6,
    }),
];

const getCourseById = ({ id }: { id: number }): Course | null => {
    try {
        return courses.find((course) => course.id === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getCourseById,
};
