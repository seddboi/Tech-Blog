const router = require("express").Router();
const sequelize = require('../config/connection');

const {User, Post, Comment} = require('../models');

router.get('/login', (req, res) => {
    res.render('login', {
        loggedIn: req.session.loggedIn
    });
});

router.get('/post', (req, res) => {
    res.render('create', {
        loggedIn: req.session.loggedIn
    });
});

router.get('/edit/:id', (req, res) => {
    res.render('edit', {
        loggedIn: req.session.loggedIn,
        post_id: req.params.id,
    })
});

router.get('/', (req, res) => {
    Post.findAll({
        attributes: ["id", "title", "body", "user_id"],
        include: [
            {
                model: User,
                attributes: ['username'],
            },
            {
                model: Comment,
                attributes:['id', 'comment_text', 'user_id'],
            }
        ]
    }).then ((data) => {
        if (!data) {
            res.status(404).json({message: 'Nothing to show here'});
        };

        const collectPosts = data.map( (post) => post.get({plain: true}));
        const testUser = post.user_id == req.session.user_id;

        res.render('current-post', {
            collectedPosts, 
            loggedIn: req.session.loggedIn,
            currentUser: testUser,
        });
    }).catch( (err) => {
        res.status(500).json(err);
    });
});

router.get('/viewpost/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ['id', 'title', 'body', 'user_id'],
        include: [
            {
                model: User,
                attributes: ['username'],
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user_id'],
                include: [
                    {
                        model: User,
                        attributes: ['username'],
                    }
                ]
            }
        ]
    }).then ((data) => {
        if (!data) {
            res.status(404).json({message: 'Nothing to show here'});
        };

        const collectPosts = data.map( (post) => post.get({plain: true}));

        res.render('home', {posts, loggedIn: req.session.loggedIn});
    }).catch( (err) => {
        res.status(500).json(err);
    });
});

router.get('/dashboard', (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id,
        },
        attributes: ['id', 'title', 'body', 'user_id'],
        include: [
            {
                model: User, 
                attributes: ['username'],
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user_id'],
                include: [
                    {
                        model: User,
                        attributes: ['username'],
                    }
                ]
            }
        ]
    }).then ((data) => {
        if (!data) {
            res.status(404).json({message: 'Nothing to show here'});
        };

        const collectPosts = data.map( (post) => post.get({plain: true}));
        res.render('home', {posts, loggedIn: req.session.loggedIn});

    }).catch( (err) => {
        res.status(500).json(err);
    });
});

module.exports = router;