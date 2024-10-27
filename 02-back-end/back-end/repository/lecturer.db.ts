import { Lecturer } from '../model/lecturer';
import { User } from '../model/user';

const lecturers = [
    new Lecturer({
        id: 1,
        courses: [],
        user: new User({
            id: 1,
            username: 'johndoe',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@ucll.be',
            password: 'john123',
            role: 'lecturer',
        }),
        expertise: 'Software development',
    }),
    new Lecturer({
        id: 2,
        courses: [],
        user: new User({
            id: 1,
            username: 'janedoe',
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'jane.doe@ucll.be',
            password: 'jane123',
            role: 'lecturer',
        }),
        expertise: 'Programming',
    }),
];

const getAllLecturers = (): Lecturer[] => lecturers;

const getLecturerById = ({ id }: { id: number }): Lecturer | null => {
    return lecturers.find((lecturer) => lecturer.getId() === id) || null;
};

export default {
    getAllLecturers,
    getLecturerById,
};
