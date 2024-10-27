import studentDb from '../domain/data-access/student.db';
import { Student } from '../domain/model/student';

const getAllStudents = async (): Promise<Student[]> => studentDb.getAllStudents();

export default { getAllStudents };
