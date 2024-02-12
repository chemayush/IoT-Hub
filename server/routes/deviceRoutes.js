const express = require('express');
const router = express.Router();
const controller = require('../controllers/deviceController');

router.get('/', controller.getDevices);
router.get('/:id', controller.getDevice);
router.post('/', controller.createDevice);
router.put('/:id', controller.updateDevice);
router.delete('/:id', controller.deleteDevice);

module.exports = router;