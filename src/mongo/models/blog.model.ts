import * as mongoose from 'mongoose';
import config from '../../config/config';
import Blog from '../../types/blog.type';

const { mongo } = config;

const blogSchema = new mongoose.Schema<Blog>(
    {
        _id: { type: mongoose.Schema.Types.ObjectId, required: false, auto: true, select: true },
        title: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        createdAt: { type: Date, required: false },
        updatedAt: { type: Date, required: false },
    },
    { versionKey: false },
);

const blogModel = mongoose.model<Blog>(mongo.collectionName, blogSchema);

export default blogModel;
