import database from '../../util/database';
import { Student } from '../model/student';

const createStudent = async ({ studentnumber, user }: Student): Promise<Student> => {
    try {
        const studentPrisma = await database.student.create({
            data: {
                studentnumber,
                user: {
                    create: {
                        username: user.username,
                        password: user.password,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        role: {
                            connect: {
                                id: user.role.id,
                            },
                        },
                    },
                },
            },
            include: { user: { include: { role: true } } },
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
            include: { user: { include: { role: true } } },
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
            include: { user: { include: { role: true } } },
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
