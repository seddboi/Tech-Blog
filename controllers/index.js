const router = require("express").Router();

const homeroutes = require("./homeroutes");
const userroutes = require("./api/userroutes");
const postroutes = require("./api/postroutes");
const commentroutes = require("./api/commentroutes");

router.use('/', homeroutes);
router.use('/api/users', userroutes);
router.use('/api/posts', postroutes);
router.use('/api/commentroutes', commentroutes);

module.exports = router;