import database from './database';
import { Student } from '../model/student';

const createStudent = async (student: Student): Promise<Student> => {
    try {
        const studentPrisma = await database.student.create({
            data: {
                studentnumber: student.getStudentnumber(),
                user: {
                    create: {
                        username: student.getUser().getUsername(),
                        password: student.getUser().getPassword(),
                        firstName: student.getUser().getFirstName(),
                        lastName: student.getUser().getLastName(),
                        email: student.getUser().getEmail(),
                        role: student.getUser().getRole(),
                    },
                },
            },
            include: { user: true },
        });

        return Student.from(studentPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAllStudents = async (): Promise<Student[]> => {
    try {
        const studentsPrisma = await database.student.findMany({
            include: { user: true },
        });
        return studentsPrisma.map((studentPrisma) => Student.from(studentPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getStudentById = async ({ id }: { id: number }): Promise<Student | null> => {
    try {
        const studentPrisma = await database.student.findUnique({
            where: { id },
            include: { user: true },
        });

        return studentPrisma ? Student.from(studentPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    createStudent,
    getAllStudents,
    getStudentById,
};
