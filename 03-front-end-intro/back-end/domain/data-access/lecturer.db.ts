import { Course } from '../model/course';
import { Lecturer } from '../model/lecturer';

const coursesJohn = [
    new Course({
        id: 1,
        name: 'Full-stack sofware development',
        description: 'Learn to develop a full-stack app',
        phase: 2,
        credits: 6,
    }),
    new Course({
        id: 3,
        name: 'Front-end development',
        description: 'Learn to build beautiful front-ends',
        phase: 1,
        credits: 6,
    }),
]

const coursesJane = [
    new Course({
        id: 2,
        name: 'Software Testing',
        description: 'Learn to test your application',
        phase: 2,
        credits: 6,
    })
]

const lecturers = [
    new Lecturer({ id: 1, name: 'John Doe', expertise: 'Software development', courses: coursesJohn }),
    new Lecturer({ id: 2, name: 'Jane Doe', expertise: 'Programming', courses: coursesJane }),
];

const getAllLecturers = (): Lecturer[] => lecturers;

const getLecturerById = ({ id }: { id: number }): Lecturer | null => {
    return lecturers.find((lecturer) => lecturer.id === id) || null;
};

export default {
    getAllLecturers,
    getLecturerById,
};
