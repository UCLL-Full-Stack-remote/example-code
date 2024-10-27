import { Lecturer } from '../model/lecturer';
import lecturerDb from '../repository/lecturer.db';

const getAllLecturers = async (): Promise<Lecturer[]> => lecturerDb.getAllLecturers();

const getLecturerById = async (id: number): Promise<Lecturer> => {
    const lecturer = await lecturerDb.getLecturerById({ id });
    if (!lecturer) throw new Error(`Lecturer with id ${id} does not exist.`);
    return lecturer;
};

export default { getAllLecturers, getLecturerById };
