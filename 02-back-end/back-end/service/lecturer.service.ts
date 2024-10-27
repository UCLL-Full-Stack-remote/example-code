import lecturerDB from '../repository/lecturer.db';
import { Lecturer } from '../model/lecturer';

const getAllLecturers = (): Lecturer[] => lecturerDB.getAllLecturers();

const getLecturerById = (id: number): Lecturer => {
    const lecturer = lecturerDB.getLecturerById({ id });
    if (!lecturer) throw new Error(`Lecturer with id ${id} does not exist.`);
    return lecturer;
};

export default { getAllLecturers, getLecturerById };
