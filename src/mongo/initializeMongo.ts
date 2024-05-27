import * as mongoose from 'mongoose';
import * as userService from '../express/services/user.service';

import config from '../config';
import { logInfo } from '../log/logger';
import User from '../types/user.type';

const { mongo } = config;

/**
 * Connect to mongo
 */
export default async () => {
    logInfo('Connecting to Mongo');

    await mongoose.connect(mongo.uri);

    logInfo('Mongo connection established');

    // seed data
    await seedUsers();
};

// Define constants for user data
const ADMIN_USER: User = {
    name: 'admin',
    password: '12345678',
    role: 'admin',
};

const REGULAR_USER: User = {
    name: 'user',
    password: '87654321',
    role: 'user',
};

const createUserAndLog = async (user: User) => {
    try {
        const createdUser = await userService.createUser(user);
        logInfo(`${user.role.charAt(0).toUpperCase() + user.role.slice(1)} user created`, createdUser);
    } catch (error) {
        logInfo(`Error creating ${user.role} user`, error); // Changed to logError for better error logging
    }
};

const seedUsers = async () => {
    await createUserAndLog(ADMIN_USER);
    await createUserAndLog(REGULAR_USER);
};
