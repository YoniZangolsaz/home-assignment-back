import mongoose from 'mongoose';
import Blog from '../../types/blog.type';
import { IBlogRepo } from '../../interfaces/blogRepo.interface';
import { ValidationError } from '../../express/utils/error/errors/ValidationError';
import { isValidId } from '../utils/isValidId';

export class BlogRepo implements IBlogRepo {
    private BlogModel: mongoose.Model<Blog>;

    constructor(blogModel: mongoose.Model<Blog>) {
        this.BlogModel = blogModel;
    }

    public createBlog = async (blog: Blog): Promise<Blog> => {
        const newBlog = await this.BlogModel.create(blog);
        return newBlog;
    };

    public updateBlog = async (blogId: string, description: string): Promise<Blog | null> => {
        if (!isValidId(blogId)) throw new ValidationError('Invalid Blog Id');

        const blog = await this.BlogModel.findByIdAndUpdate(blogId, { description }, { new: true });
        return blog;
    };

    public deleteBlog = async (blogId: string): Promise<Blog | null> => {
        if (!isValidId(blogId)) throw new ValidationError('Invalid Blog Id');

        const blog = await this.BlogModel.findByIdAndDelete(blogId);
        return blog;
    };

    public getBlog = async (blogId: string): Promise<Blog | null> => {
        if (!isValidId(blogId)) throw new ValidationError('Invalid Blog Id');

        const blog = await this.BlogModel.findById(blogId).populate('author');
        return blog;
    };

    public getAllBlogs = async (): Promise<Blog[] | null> => {
        try {
            const blogs = await this.BlogModel.find({}).populate('author');
            return blogs;
        } catch (error) {
            return null;
        }
    };

    public getBlogsByAuthor = async (userName: string): Promise<Blog[] | null> => {
        try {
            const blogs = await this.BlogModel.aggregate([
                {
                    $lookup: {
                        from: 'users',
                        localField: 'author',
                        foreignField: '_id',
                        as: 'author',
                    },
                },
                { $match: { 'author.name': userName } },
                { $unwind: '$author' },
            ]);

            return blogs;
        } catch (error) {
            return null;
        }
    };
}
