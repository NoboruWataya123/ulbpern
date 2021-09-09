const Router = require('express');
const router = Router();
const TypeController = require('../controller/typeController');
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), TypeController.create);
router.get('/', TypeController.getAll);
router.get('/:id', TypeController.getOne);
router.put('/:id', checkRole('ADMIN'), TypeController.update);
router.delete('/:id', checkRole('ADMIN'), TypeController.delete);

module.exports = router;