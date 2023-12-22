const express = require('express');
const router = express.Router();
const edit = require('../routes/edit');
const user =require('../routes/user')


router.use('/edit',edit);
// router.use('./user',user)





module.exports = router;