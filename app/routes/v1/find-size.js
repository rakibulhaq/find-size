const router = require('express').Router();
const FindSizeController = require('../../api/v1/find-size').FindSizeController;

let findSizeController = new FindSizeController();

router.post('/', findSizeController.find);


module.exports = router;