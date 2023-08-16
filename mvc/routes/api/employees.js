const express = require('express');
const router = express.Router();
const employeesController = require('../../Controllers/EmployessController');

router.route('/')
    .get(employeesController.getAllEmployees)
    .post(employeesController.CreateNewEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee);

router.route('/:id')
    .get(employeesController.getEmployee);

module.exports = router;