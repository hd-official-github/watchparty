const express = require('express');
const testController = require('../controllers/test.controller');
const router = express.Router();


router.get('/sample', testController.sample)


module.exports = router;