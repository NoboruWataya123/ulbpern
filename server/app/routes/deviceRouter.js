const Router = require('express');
const router = Router();
const DeviceController = require('../controller/deviceController');
const checkRole = require('../middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), DeviceController.create);
router.get('/', DeviceController.getAll);
router.get('/:id', DeviceController.getOne);
router.put('/:id', checkRole('ADMIN'), DeviceController.update);
router.delete('/:id', checkRole('ADMIN'), DeviceController.delete);

module.exports = router;