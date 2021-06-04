const router = require('express').Router();
const {User, Comment, Post} = require('../models');

// add comment route
router.post('/', (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.session.user_id,
    }).then( (data) => {
        res.json(data);
    }).catch( (err) => {
        res.status(500).json(err);
    });
});

// update comment route
router.put('/:id', (req, res) => {
    Comment.update({
        comment_text: req.body.comment_text,
    },
    {
        where: {
            id: req.params.id,
        }
    }).then( (data) => {
        if (!data) {
            res.status(400).json({message: 'There was no comment found with this id.'});
        };
        
        res.json(data);
    }).catch( (err) => {
        res.json(err);
    })
});

// delete comment route
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id,
        },
    }).then( (data) => {
        if (!data) {
            res.status(400).json({message: 'Sorry, there was no comment found with this id.'});
        };
        
        res.json(data);
    }).catch( (err) => {
        res.json(err);
    })
});
// collect all comments route
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: ['id', 'comment_text', 'user_id', 'post_id'],
        include: {
            model: User,
            attributes: ['username'],
        },
    }).then( (data) => {
        res.json(data);
    }).catch( (err) => {
        res.status(500).json(err);
    });
});

// get ONE comment by id
router.get('/:id', (req, res) => {
    Comment.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ['id', 'comment_text', 'user_id', 'post_id'],
        include: [
            {
                model: User,
                attributes: ['username'],
            },
        ],
    }).then( (data) => {
        if (!data) {
            res.status(400).json({message:'Sorry, there was no comment found with this id.'})
        };

        res.json(data);
    }).catch( (err) => {
        res.status(500).json(err);
    });
});

module.exports = router;