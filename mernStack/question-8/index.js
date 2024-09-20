const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

let posts = [
    { id: 1, title: 'First Post', content: 'This is the first blog post' },
    { id: 2, title: 'Second Post', content: 'This is the second blog post' },
    { id: 3, title: 'Third Post', content: 'This is the third blog post' },
    { id: 4, title: 'Forth Post', content: 'This is the forth blog post' },
    { id: 5, title: 'Fifth Post', content: 'This is the fifth blog post' },
    { id: 6, title: 'Sixth Post', content: 'This is the sixth blog post' },
];

//function for sending responses
const sendResponse = (res, status, success, message, data = null) => {
    res.status(status).json({
        success,
        message,
        data
    });
};

// Home route
app.get('/', (req, res) => {
    sendResponse(res, 200, true, 'Welcome to the Blog API');
});

// Creating -> Create a new blog post
app.post('/posts', (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return sendResponse(res, 400, false, 'Title and content are required');
        }
        const newPost = {
            id: posts.length + 1,
            title,
            content
        };
        posts.push(newPost);
        sendResponse(res, 201, true, 'Blog post created successfully', newPost);
    } catch (error) {
        sendResponse(res, 500, false, 'Internal Server Error');
    }
});

// Reading - Retrieve all blog posts
app.get('/getPosts', (req, res) => {
    sendResponse(res, 200, true, 'Posts retrieved successfully', posts);
});

// Retrieve a single blog post by id
app.get('/getPost/:id', (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === parseInt(id));
    if (!post) {
        return sendResponse(res, 404, false, 'Post not found');
    }
    sendResponse(res, 200, true, 'Post retrieved successfully', post);
});

// Updating - Update an existing blog post by id
app.put('/updatePost/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = posts.find(p => p.id === parseInt(id));
    if (!post) {
        return sendResponse(res, 404, false, 'Post not found');
    }
    if (title) post.title = title;
    if (content) post.content = content;
    sendResponse(res, 200, true, 'Post updated successfully', post);
});

// Deleting - Delete a blog post by id
app.delete('/deletePost/:id', (req, res) => {
    const { id } = req.params;
    const postIndex = posts.findIndex(p => p.id === parseInt(id));
    if (postIndex === -1) {
        return sendResponse(res, 404, false, 'Post not found');
    }
    const deletedPost = posts.splice(postIndex, 1)[0];
    sendResponse(res, 200, true, 'Post deleted successfully', deletedPost);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
