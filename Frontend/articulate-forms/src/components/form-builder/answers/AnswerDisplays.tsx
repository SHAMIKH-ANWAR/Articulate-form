interface AnswerDisplayProps {
  userAnswer: any;
  correctAnswer: any;
  isCorrect: boolean;
}

export const CategoryAnswerDisplay = ({ correctAnswer, userAnswer, isCorrect }: AnswerDisplayProps) => {
  return (
    <div className="mt-4 space-y-4">
      {Object.entries(userAnswer || {}).map(([category, items]: [string, any]) => (
        <div key={category} className="space-y-2">
          <h4 className="font-medium">{category}</h4>
          <div className="flex flex-wrap gap-2">
            {items.map((item: string) => {
              const correctCategory = correctAnswer.categoryItems[0].items.find(
                (i: any) => i.text === item
              )?.belongsTo;
              const isItemCorrect = correctCategory === category;

              return (
                <span
                  key={item}
                  className={`px-3 py-1 rounded-full text-sm ${
                    isItemCorrect
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {item}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export const ClozeAnswerDisplay = ({ correctAnswer, userAnswer, isCorrect: questionIsCorrect }: AnswerDisplayProps) => {
  const words = correctAnswer.text.split(/\s+/);
  
  return (
    <div className="mt-4">
      <div className="space-x-1">
        {words.map((word: string, index: number) => {
          const isBlankWord = correctAnswer.clozeWords.find(
            (w: any) => w.word === word && w.isBlank
          );

          if (!isBlankWord) {
            return <span key={index}>{word}</span>;
          }

          const userAnswerText = userAnswer[isBlankWord.position];
          const isWordCorrect = userAnswerText === word;

          return (
            <span
              key={index}
              className={`px-2 py-1 rounded ${
                isWordCorrect
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {userAnswerText || "_____"}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export const ComprehensionAnswerDisplay = ({ correctAnswer, userAnswer, isCorrect: questionIsCorrect }: AnswerDisplayProps) => {
  return (
    <div className="mt-4 space-y-4">
      {correctAnswer.comprehensionQuestions.map((q: any, index: number) => {
        const selectedAnswer = q.options.find(
          (opt: any) => opt.id === userAnswer[q.id]
        );
        const isAnswerCorrect = userAnswer[q.id] === q.correctOptionId;

        return (
          <div key={q.id} className="space-y-2">
            <p className="font-medium">
              {index + 1}. {q.question}
            </p>
            <div
              className={`p-3 rounded-lg ${
                isAnswerCorrect
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              Your answer: {selectedAnswer?.text || "No answer"}
            </div>
          </div>
        );
      })}
    </div>
  );
};
