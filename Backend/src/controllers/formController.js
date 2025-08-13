const Form = require('../models/Form');
const UserAnswer = require('../models/UserAnswer');
const { sanitizeFormForTest } = require('../utils/formUtils');
const { calculateScore } = require('../utils/scoreUtils');

const createForm = async (req, res) => {
  const form = new Form(req.body);
  await form.save();
  res.status(201).json({ form });
};

const getForms = async (req, res) => {
  const forms = await Form.find().sort({ createdAt: -1 });
  res.status(200).json(forms);
};


const getFormById = async (req, res) => {
  const form = await Form.findById(req.params.id);
  if (!form) {
    return res.status(404).json({ error: 'Form not found' });
  }
  res.status(200).json(form);
};


const getFormForTest = async (req, res) => {
  const form = await Form.findById(req.params.id);
  if (!form) {
    return res.status(404).json({ error: 'Form not found' });
  }
  const sanitizedForm = sanitizeFormForTest(form);
  res.status(200).json(sanitizedForm);
};

const submitTest = async (req, res) => {
  const { id } = req.params;
  const { username, answers } = req.body;
  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  const form = await Form.findById(id);
  if (!form) {
    return res.status(404).json({ error: 'Form not found' });
  }

  const { score, maxScore } = calculateScore(form, answers);
  const userAnswer = new UserAnswer({
    formId: form._id,
    username,
    answers,
    score,
    maxScore
  });
  await userAnswer.save();

  res.status(200).json({
    score,
    maxScore,
    percentage: Math.round((score / maxScore) * 100)
  });
};

const getSubmissions = async (req, res) => {
  const submissions = await UserAnswer.find()
    .sort({ createdAt: -1 })
    .populate('formId', 'title');
  res.status(200).json(submissions);
};

module.exports = {
  createForm,
  getForms,
  getFormById,
  getFormForTest,
  submitTest,
  getSubmissions
};
