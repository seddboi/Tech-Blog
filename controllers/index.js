const router = require("express").Router();

const homeroutes = require("./homeroutes");
const userroutes = require("./userroutes");
const postroutes = require("./postroutes");
const commentroutes = require("./commentroutes");

router.use('/', homeroutes);
router.use('/users', userroutes);
router.use('/posts', postroutes);
router.use('/commentroutes', commentroutes);

module.exports = router;