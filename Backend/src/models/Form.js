const mongoose = require('mongoose');

const categoryItemSchema = new mongoose.Schema({
  category: { type: String, default: '' },
  items: [
    {
      text: { type: String, default: '' },
      belongsTo: { type: String, default: '' },
      id: { type: String, default: '' },
    },
  ],
  id: { type: String, default: '' },
});

const clozeWordSchema = new mongoose.Schema({
  id: { type: String, default: '' },
  word: { type: String, default: '' },
  isBlank: { type: Boolean, default: false },
  position: { type: Number, default: 0 },
});

const comprehensionQuestionSchema = new mongoose.Schema({
  id: { type: String, default: '' },
  question: { type: String, default: '' },
  options: [
    {
      id: { type: String, default: '' },
      text: { type: String, default: '' },
    },
  ],
  correctOptionId: { type: String, default: '' },
});

const questionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: {
    type: String,
    enum: ['categorize', 'cloze', 'comprehension'],
    required: true,
  },
  text: { type: String, default: '' },
  image: { type: String, default: '' },
  points: { type: Number, default: 0 },
  categoryItems: { type: [categoryItemSchema], default: [] },
  clozeWords: { type: [clozeWordSchema], default: [] },
  paragraph: { type: String, default: '' },
  comprehensionQuestions: { type: [comprehensionQuestionSchema], default: [] },
});

const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  headerImage: { type: String, default: '' },
  questions: { type: [questionSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Form', formSchema);
