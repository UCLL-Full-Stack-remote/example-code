import lecturerDB from '../domain/data-access/lecturer.db';
import { Lecturer } from '../domain/model/lecturer';

const getAllLecturers = (): Lecturer[] => lecturerDB.getAllLecturers();

const getLecturerById = (id: number): Lecturer => {
    const lecturer = lecturerDB.getLecturerById({ id });
    if (!lecturer) throw new Error(`Lecturer with id ${id} does not exist.`);
    return lecturer;
};

export default { getAllLecturers, getLecturerById };
