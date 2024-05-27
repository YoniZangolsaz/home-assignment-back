import User from '../../types/user.type';
import { userModel } from '../models/user.model';

// get a user by name and password
export const getUserByNameAndPassword = async (name: string, password: string): Promise<User | null> => {
    const user = await userModel.findOne({ name, password });
    return user;
};

// create user
export const createUser = async (user: User): Promise<User> => {
    const newUser = await userModel.create(user);
    return newUser;
};

// get user
export const getUserById = async (userId: string): Promise<User | null> => {
    const user = await userModel.findById(userId, { password: 0 });
    return user;
};
