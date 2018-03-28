var router = require('express').Router();

router.get('/1', function(req, res) {
    res.end('hello 1');
});

router.get('/2', function(req, res) {
    res.end('hello 2');
});

router.get('/shit', function(req, res) {
    res.json({ shitName: 'name' });
}) 

module.exports = router;    