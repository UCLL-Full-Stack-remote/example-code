import lecturerDB from '../domain/data-access/lecturer.db';
import { Lecturer } from '../domain/model/lecturer';

const getAllLecturers = async (): Promise<Lecturer[]> => lecturerDB.getAllLecturers();

const getLecturerById = async (id: number): Promise<Lecturer> => {
    const lecturer = await lecturerDB.getLecturerById({ id });
    if (!lecturer) throw new Error(`Lecturer with id ${id} does not exist.`);
    return lecturer;
};

export default { getAllLecturers, getLecturerById };
