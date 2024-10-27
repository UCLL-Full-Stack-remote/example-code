import bcrypt from 'bcrypt';
import userDB from '../domain/data-access/user.db';
import { User } from '../domain/model/user';
import { AuthenticationResponse, UserInput } from '../types';

const getUserByUsername = async ({ username }: { username: string }): Promise<User> => {
    const user = await userDB.getUserByUsername({ username });
    if (!user) {
        throw new Error(`User with username: ${username} does not exist.`);
    }
    return user;
};

const authenticate = async ({ username, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByUsername({ username });

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw new Error('Incorrect password.');
    }
    return {
        token: '',
        username: username,
        fullname: `${user.firstName} ${user.lastName}`,
        role: user.role.name,
    };
};

export default { getUserByUsername, authenticate };
