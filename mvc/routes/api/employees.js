const express = require('express');
const router = express.Router();
const employeesController = require('../../Controllers/EmployessController');
const verifyJWT = require('../../middleware/jwtverification')
router.route('/')
    .get(verifyJWT,employeesController.getAllEmployees)
    .post(employeesController.CreateNewEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee);

router.route('/:id')
    .get(employeesController.getEmployee);

module.exports = router;