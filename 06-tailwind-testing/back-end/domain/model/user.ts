import { Role as RolePrisma, User as UserPrisma } from '@prisma/client';
import { Role } from '../../types';

export class User {
    readonly id?: number;
    readonly username: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string;
    readonly role?: Role;

    constructor(user: {
        id?: number;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: Role;
    }) {
        this.id = user.id;
        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    equals({ id, username, firstName, lastName, email, password, role }): boolean {
        return (
            this.id === id &&
            this.username === username &&
            this.firstName === firstName &&
            this.lastName === lastName &&
            this.email === email &&
            this.password === password &&
            this.role === role
        );
    }

    static from({
        id,
        username,
        firstName,
        lastName,
        email,
        password,
        role,
    }: UserPrisma & { role: RolePrisma }) {
        return new User({
            id,
            username,
            firstName,
            lastName,
            email,
            password,
            role: role as Role,
        });
    }
}
