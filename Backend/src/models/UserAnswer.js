const mongoose = require('mongoose');

const UserAnswerSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  answers: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  maxScore: {
    type: Number,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('UserAnswer', UserAnswerSchema);
