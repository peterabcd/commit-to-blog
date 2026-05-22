const { Router } = require('express');
const ctrl = require('../controllers/blogController');

const router = Router();

router.post('/generate', ctrl.generate);

module.exports = router;
