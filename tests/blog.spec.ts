// test blogService with jest
import * as blogService from '../src/express/services/blog.service';
import Blog from '../src/types/blog.type';
import initializeMongo from '../src/mongo/initializeMongo';

let createdBlog: Blog;
describe('blog service', () => {
    beforeAll(async () => {
        await initializeMongo();
    });

    beforeEach(async () => {
        createdBlog = await blogService.createBlog({
            name: 'test blog',
            description: 'test blog description',
        });
    });

    test('create blog', async () => {
        const newBlog: Blog = {
            name: 'test',
            description: 'description',
        };
        createdBlog = await blogService.createBlog(newBlog);
        expect(createdBlog?.name).toEqual(newBlog.name);
        expect(createdBlog?.description).toEqual(newBlog.description);
    });

    test('update blog', async () => {
        const blogId = createdBlog._id!;
        const description = 'test update';
        const blog = await blogService.updateBlog(blogId, description);
        expect(blog?.description).toEqual('test update');
    });

    test('delete blog', async () => {
        const blogId = createdBlog._id!;
        await blogService.deleteBlog(blogId);
        const blog = await blogService.getBlog(blogId);
        expect(blog).toEqual(null);
    });

    test('create blog', async () => {
        const newBlog: Blog = {
            name: 'test',
            description: 'test',
        };
        createdBlog = await blogService.createBlog(newBlog);
        expect(createdBlog.name).toEqual('test');
    });

    test('get blog', async () => {
        const blogId = createdBlog._id!;
        const blog = await blogService.getBlog(blogId);
        expect(blog).toBeDefined();
    });

    test('get all blogs', async () => {
        const blogs = await blogService.getAllBlogs();
        expect(blogs).toBeDefined();
    });
});
