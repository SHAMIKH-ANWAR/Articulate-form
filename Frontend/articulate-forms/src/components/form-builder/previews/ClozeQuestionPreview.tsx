import { useState, useEffect } from "react";
import { ClozeQuestionType } from "@/types/form";
import { ClozePreviewProps } from "@/types/previews";

export const ClozeQuestionPreview = ({ 
  question,
  onAnswer,
  userAnswer,
  isSubmitted 
}: ClozePreviewProps) => {
  const [answers, setAnswers] = useState<Record<number, string>>(
    userAnswer || {}
  );
  const handleAnswerChange = (position: number, value: string) => {
    const newAnswers = { ...answers, [position]: value };
    setAnswers(newAnswers);
    onAnswer?.(newAnswers);
  };

  return (
    <div className="space-y-4">
      <div className="relative border border-border rounded-lg p-4">
        {question.text?.split(/\s+/).map((word, index) => {
          if (word === '_____') {
            const blankPosition = question.clozeWords.find(w => w.position === index)?.position || index;
            return isSubmitted ? (
              <span
                key={index}
                className={`inline-block mx-1 px-2 py-1 rounded ${
                  answers[blankPosition] 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {answers[blankPosition] || '_____'}
              </span>
            ) : (
              <select
                key={index}
                value={answers[blankPosition] || ''}
                onChange={(e) => handleAnswerChange(blankPosition, e.target.value)}
                className="inline-block mx-1 border-2 border-primary bg-card text-foreground px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <option value="">_____</option>
                {question.options?.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            );
          }

          return (
            <span key={index} className="inline-block mx-1">
              {word}
            </span>
          );
        })}
      </div>

      {!isSubmitted && question.options && (
        <div className="mt-4 space-y-2">
          <h4 className="font-medium text-sm">Available Words:</h4>
          <div className="flex flex-wrap gap-2">
            {question.options
              .filter(word => !Object.values(answers).includes(word))
              .map((word, index) => (
                <div 
                  key={index} 
                  className="bg-primary/10 px-3 py-1 rounded-full text-sm"
                >
                  {word}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
