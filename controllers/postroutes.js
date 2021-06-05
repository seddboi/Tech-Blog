const router = require('express').Router();
const {User, Comment, Post} = require('../models');

// create post route
router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        body: req.body.body,
        user_id: req.session.user_id,
    }).then( (data) => {
        res.json(data);
    }).catch( (err) => {
        res.status(500).json(err);
    });
});

// update post route
router.put('/:id', (req, res) => {
    Post.update({
        title: req.body.title,
        body: req.body.body,
    },
    {
        where: {
            id: req.params.id,
        }
    }).then( (data) => {
        if (!data) {
            res.status(400).json({message: 'There was no post found with this id.'});
        };
        
        res.json(data);
    }).catch( (err) => {
        res.json(err);
    })
});

// delete post route
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id,
        }
    }).then( (data) => {
        if (!data) {
            res.status(400).json({message: 'There was no post found witth this id.'})
        };

        res.json(data);
    }).catch( (err) => {
        res.status(500).json(err);
    });
});

// gather all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'body', 'user_id'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id'],
            },
        ],
    }).then((data) => {
        res.json(data);
    }).catch( (err) => {
        res.status(500).json(err)
    });
});

// get ONE post by id
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ['id', 'title', 'body', 'user_id'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user-id'],
            },
        ]
    }).then( (data) => {
        if (!data) {
            res.status(400).json({message: 'There was no post found with this id.'})
        };

        res,json(data)
    }).catch( (err) => {
        res.status(500).json(err);
    });
});

module.exports = router;