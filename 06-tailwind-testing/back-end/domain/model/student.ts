import { User } from './user';
import { Student as StudentPrisma, User as UserPrisma, Role as RolePrisma } from '@prisma/client';

export class Student {
    readonly id?: number;
    readonly user: User;
    readonly studentnumber: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;

    constructor(student: {
        id?: number;
        user: User;
        studentnumber: string;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        this.id = student.id;
        this.user = student.user;
        this.studentnumber = student.studentnumber;
        this.createdAt = student.createdAt;
        this.updatedAt = student.updatedAt;
    }

    equals({ id, user, studentnumber, createdAt, updatedAt }): boolean {
        return (
            this.id === id &&
            this.user.equals(user) &&
            this.studentnumber === studentnumber &&
            this.createdAt === createdAt &&
            this.updatedAt === updatedAt
        );
    }

    static from({
        id,
        user,
        studentnumber,
        createdAt,
        updatedAt,
    }: StudentPrisma & { user: UserPrisma & { role: RolePrisma } }) {
        return new Student({
            id,
            user: User.from(user),
            studentnumber,
            createdAt,
            updatedAt,
        });
    }
}
