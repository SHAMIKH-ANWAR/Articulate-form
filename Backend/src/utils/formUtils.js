const sanitizeFormForTest = (form) => {
  const sanitizedForm = {
    _id: form._id,
    title: form.title,
    headerImage: form.headerImage,
    questions: form.questions.map(question => {
      const baseQuestion = {
        id: question.id,
        type: question.type,
        text: question.text,
        image: question.image,
        points: question.points
      };

      switch (question.type) {
        case 'categorize':
          return {
            ...baseQuestion,
            categoryItems: question.categoryItems.map(cat => ({
              id: cat.id,
              category: cat.category,
              items: cat.items.map(item => ({
                id: item.id,
                text: item.text
              }))
            }))
          };

        case 'cloze':
          const maskedText = question.text
            .split(/\s+/)
            .map(word => {
              const isBlankWord = question.clozeWords.some(
                w => w.word === word && w.isBlank
              );
              return isBlankWord ? '_____' : word;
            })
            .join(' ');

          return {
            ...baseQuestion,
            text: maskedText,
            clozeWords: question.clozeWords
              .filter(word => word.isBlank)
              .map(word => ({
                id: word.id,
                position: word.position,
                isBlank: true
              })),
            options: question.clozeWords
              .filter(word => word.isBlank)
              .map(word => word.word)
              .sort(() => Math.random() - 0.5) 
          };

        case 'comprehension':
          return {
            ...baseQuestion,
            paragraph: question.paragraph,
            comprehensionQuestions: question.comprehensionQuestions.map(q => ({
              id: q.id,
              question: q.question,
              options: q.options.map(opt => ({
                id: opt.id,
                text: opt.text
              }))
            }))
          };

        default:
          return baseQuestion;
      }
    })
  };

  return sanitizedForm;
};

module.exports = {
  sanitizeFormForTest
};
