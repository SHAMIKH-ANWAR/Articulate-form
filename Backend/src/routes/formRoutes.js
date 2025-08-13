const express = require('express');
const {
	createForm,
	getForms,
	getFormById,
	getFormForTest,
	submitTest,
	getSubmissions,
} = require('../controllers/formController');
const asyncHandler = require('../middlewares/asyncHandler');

const router = express.Router();

router.post('/api/create-form', asyncHandler(createForm));
router.get('/api/forms', asyncHandler(getForms));
router.get('/api/submissions', asyncHandler(getSubmissions));
router.get('/api/test/:id', asyncHandler(getFormForTest));
router.get('/api/form/:id', asyncHandler(getFormById));
router.post('/api/submit-test/:id', asyncHandler(submitTest));

module.exports = router;
