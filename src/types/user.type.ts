type User = {
    _id?: string;
    name: string;
    password: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export default User;
