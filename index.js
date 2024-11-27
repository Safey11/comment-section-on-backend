const express = require('express');
const app = express();
const path = require('path');
const productData = require('./data.json');
const { v4: uuidv4 } = require('uuid');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// Homepage route
app.get('/', (req, res) => {
    res.render('home');
});

const comments = [
    {id:uuidv4() , username: "JohnDoe", comment: "This is a fantastic article! Thanks for sharing." },
    {id:uuidv4(), username: "JaneSmith", comment: "I found this very helpful. Great explanation!" },
    {id:uuidv4(), username: "CodeMaster", comment: "Can you write more on this topic? It's really insightful." },
    {id:uuidv4(), username: "TechGuru", comment: "Amazing content, keep up the great work!" }
];

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
}
)

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
}
)

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({username,comment, id:uuidv4()})
   res.redirect('/comments')

}
)

app.get('/comments/:id', (req,res) => {
    const {id} = req.params
    const comment = comments.find(c => c.id === id)
    res.render('comments/show', {comment})
})

app.patch('/comments/:id', (req,res) => {
    const {id} = req.params
    console.log(req.body.comment);
    res.send('A PATCH request has been made')
    // const newCommentText = req.body.comment
    // const foundcomment = comments.find(c => c.id === id)
    // foundcomment.comment = newCommentText

})

app.get('/comments/:id/edit', (req,res) => {
    const {id} = req.params
    const comment = comments.find(c => c.id === id)
    res.render('comments/edit', {comment})
})


// Dynamic route to display product details
app.get('/r/:item', (req, res) => {
    const { item } = req.params;
    const data = productData[item];

    if (data) {
        res.render('item', { ...data });
    } else {
        res.render('notfound', { item });
    }
});

// Run the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
