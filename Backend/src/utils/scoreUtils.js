function calculateScore(form, userAnswers) {
  let score = 0;
  let maxScore = 0;

  form.questions.forEach(question => {
    maxScore += question.points;

    switch (question.type) {
      case 'categorize':
        const userCategorization = userAnswers[question.id] || {};
        question.categoryItems[0].items.forEach(item => {
          const userCategory = Object.entries(userCategorization)
            .find(([_, items]) => items.includes(item.text))?.[0];
          
          if (userCategory && userCategory === item.belongsTo) {
            score += (question.points / question.categoryItems[0].items.length);
          }
        });
        break;

      case 'cloze':
        const userClozeAnswers = userAnswers[question.id] || {};
        const blankWords = question.clozeWords.filter(w => w.isBlank);
        let correctClozeAnswers = 0;

        blankWords.forEach(word => {
          const userAnswer = userClozeAnswers[word.position];
          if (userAnswer === word.word) {
            correctClozeAnswers++;
          }
        });

        if (blankWords.length > 0) {
          score += (question.points * correctClozeAnswers / blankWords.length);
        }
        break;

      case 'comprehension':

        const userCompAnswers = userAnswers[question.id] || {};
        const totalSubQuestions = question.comprehensionQuestions.length;
        let correctCompAnswers = 0;

        question.comprehensionQuestions.forEach(subQ => {
          if (userCompAnswers[subQ.id] === subQ.correctOptionId) {
            correctCompAnswers++;
          }
        });

        if (totalSubQuestions > 0) {
          score += (question.points * correctCompAnswers / totalSubQuestions);
        }
        break;
    }
  });

  return {
    score: Math.round(score * 100) / 100,
    maxScore
  };
};

module.exports = { calculateScore };
