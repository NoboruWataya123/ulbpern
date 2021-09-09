const Router = require('express');
const router = Router();
const BrandController = require('../controller/brandController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'),BrandController.create);
router.get('/', BrandController.getAll);
router.get('/:id', BrandController.getOne);
router.put('/:id', checkRole('ADMIN'),BrandController.update);
router.delete('/:id', checkRole('ADMIN'),BrandController.delete);

module.exports = router;
