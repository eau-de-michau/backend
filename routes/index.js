var express = require('express');
var router = express.Router();
var db = require('../queries');

router.post('/api/liczniki', db.createLicznik);
router.delete('/api/liczniki/:id', db.removeLicznik);
router.get('/api/liczniki', db.showAllLicznik);
router.get('/api/liczniki/:id', db.showOneLicznik);
router.get('/api/wzory', db.showPattern);

module.exports = router;
