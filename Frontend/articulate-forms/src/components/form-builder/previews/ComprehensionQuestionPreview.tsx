import { useState } from "react";
import { ComprehensionQuestionType } from "@/types/form";
import { ComprehensionPreviewProps } from "@/types/previews";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export const ComprehensionQuestionPreview = ({ 
  question,
  onAnswer,
  userAnswer,
  isSubmitted 
}: ComprehensionPreviewProps) => {
  const [answers, setAnswers] = useState<Record<string, string>>(
    userAnswer || {}
  );
  const handleAnswerChange = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    onAnswer?.(newAnswers);
  };

  return (
    <div className="space-y-6">
      {question.paragraph && (
        <div className="bg-muted p-4 rounded-lg overflow-x-auto max-w-full">
          <p className="text-sm whitespace-pre-wrap break-words max-w-full">
            {question.paragraph}
          </p>
        </div>
      )}
      
      {question.comprehensionQuestions && question.comprehensionQuestions.length > 0 && (
        <div className="space-y-6">
          {question.comprehensionQuestions.map((q, qIndex) => (
            <div key={q.id} className="space-y-4">
              <h4 className="font-medium">
                Question {qIndex + 1}: {q.question}
              </h4>
              <RadioGroup
                disabled={isSubmitted}
                value={answers[q.id]}
                onValueChange={(value) => handleAnswerChange(q.id, value)}
              >
                <div className="grid gap-3">
                  {q.options.map(option => {
                    const isSelected = answers[q.id] === option.id;
                    const isCorrect = option.id === q.correctOptionId;
                    
                    let optionClass = 'p-4 rounded-lg ';
                    if (isSubmitted) {
                      if (isSelected && isCorrect) {
                        optionClass += 'bg-green-100 border-green-500';
                      } else if (isSelected && !isCorrect) {
                        optionClass += 'bg-red-100 border-red-500';
                      } else if (isCorrect) {
                        optionClass += 'bg-green-50 border-green-300';
                      } else {
                        optionClass += 'bg-surface border-transparent';
                      }
                    } else {
                      optionClass += isSelected 
                        ? 'bg-primary/10 border-primary' 
                        : 'bg-surface hover:bg-muted border-transparent';
                    }
                    
                    return (
                      <div 
                        key={option.id}
                        className={`${optionClass} border-2 transition-colors`}
                      >
                        <RadioGroupItem
                          value={option.id}
                          id={option.id}
                          className="hidden"
                        />
                        <Label
                          htmlFor={option.id}
                          className="flex items-center space-x-3 cursor-pointer"
                        >
                          <div className={`
                            w-4 h-4 rounded-full border-2 
                            ${isSelected ? 'border-primary bg-primary' : 'border-muted-foreground'}
                          `} />
                          <span>{option.text}</span>
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </RadioGroup>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
