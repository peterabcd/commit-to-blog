const { Router } = require('express');
const ctrl = require('../controllers/postsController');

const router = Router();

router.get('/', ctrl.list);
router.get('/:id', ctrl.get);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);
router.post('/:id/publish', ctrl.publish);

module.exports = router;
