const router = require('express').Router();
const {User, Comment, Post} = require('../models');

// Login user route
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email,
        },
    }).then( (data) => {
        if (!data) {
            res.status(404).json({message: 'Sorry, we were unable to locate your account.'})
        };

        const passCheck = data.checkPass(req.body.password);
        if (!passCheck) {
            res.status(400).json({message: 'Sorry, we were unable to locate your account'})
        };

        req.session.save( () => {
            req.session.user_id = data.id;
            req.session.username = data.username;
            req.session.loggedIn = true;
            res.json({
                user: data, 
                message: 'Welcome Back!'
            });
        });
    }).catch( (err) => {
        res.status(500).json(err);
    })
});

// Logout user route
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy( () => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// collect all users
router.get('/',(req,res) => {
    User.findAll({
        attributes: ['id', 'username','email', 'password'],
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'body']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id'],
            }
        ]
    }).then( (data) => {
        res.json(data);
    }).catch( (err) => {
        res.status(500).json(err);
    });
});

// get ONE user by id
router.get('/:id',(req,res) => {
    User.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ['id', 'username','email', 'password'],
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'body']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id'],
            }
        ]
    }).then( (data) => {
        if (!data) {
            res.status(404).json({message: 'Sorry, no user was found with this id.'})
        };
        
        res.json(data);
    }).catch( (err) => {
        res.status(500).json(err);
    });
});

// create user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        passsword: req.body.password,
    }).then( (data) => {
        req.session.save( () => {
            req.session.user_id = data.id;
            req.session.username = data.username;
            req.session.loggedIn = true;
            res.json(data);
        });
    }).catch( (err) => {
        res.status(500).json(err);
    });
});