import lecturerDB from '../domain/data-access/lecturer.db';
import { Lecturer } from '../domain/model/lecturer';

const getAllLecturers = async (): Promise<Lecturer[]> => lecturerDB.getAllLecturers();

export default { getAllLecturers };
