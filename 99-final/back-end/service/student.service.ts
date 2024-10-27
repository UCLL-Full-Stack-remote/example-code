import { Student } from '../model/student';
import studentDb from '../repository/student.db';

const getAllStudents = async (): Promise<Student[]> => studentDb.getAllStudents();

export default { getAllStudents };
