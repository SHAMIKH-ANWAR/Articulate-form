import { ComprehensionQuestionType } from "@/types/form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { QuestionMetadata } from "./QuestionMetadata";

interface ComprehensionQuestionProps {
  question: Partial<ComprehensionQuestionType>;
  onQuestionChange: (updates: Partial<ComprehensionQuestionType>) => void;
}

export const ComprehensionQuestion = ({ question, onQuestionChange }: ComprehensionQuestionProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="questionText">Question Text</Label>
        <Input
          id="questionText"
          value={question.text || ""}
          onChange={(e) => onQuestionChange({ ...question, text: e.target.value })}
          placeholder="Enter question text..."
          className="mt-1"
        />
      </div>

      <QuestionMetadata
        image={question.image}
        points={question.points || 0}
        onImageChange={(url) => onQuestionChange({ ...question, image: url })}
        onPointsChange={(points) => onQuestionChange({ ...question, points })}
      />

      <div>
        <Label>Paragraph</Label>
        <Textarea
          value={question.paragraph || ''}
          onChange={(e) => onQuestionChange({ ...question, paragraph: e.target.value })}
          placeholder="Enter the reading passage..."
          className="mt-1 max-w-full whitespace-pre-wrap break-words"
          rows={6}
        />
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Questions</Label>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onQuestionChange({
              ...question,
              comprehensionQuestions: [
                ...(question.comprehensionQuestions || []),
                {
                  id: Date.now().toString(),
                  question: '',
                  options: [],
                  correctOptionId: ''
                }
              ]
            })}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Question
          </Button>
        </div>

        {question.comprehensionQuestions?.map((q, qIndex) => (
          <Card key={q.id} className="p-4">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <Label>Question {qIndex + 1}</Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onQuestionChange({
                    ...question,
                    comprehensionQuestions: question.comprehensionQuestions?.filter(
                      question => question.id !== q.id
                    )
                  })}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <Textarea
                value={q.question}
                onChange={(e) => onQuestionChange({
                  ...question,
                  comprehensionQuestions: question.comprehensionQuestions?.map(
                    question => question.id === q.id
                      ? { ...question, question: e.target.value }
                      : question
                  )
                })}
                placeholder="Enter your question..."
                className="mt-1"
              />

              <div className="space-y-2">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                  <Label>Options</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onQuestionChange({
                      ...question,
                      comprehensionQuestions: question.comprehensionQuestions?.map(
                        question => question.id === q.id
                          ? {
                              ...question,
                              options: [
                                ...question.options,
                                {
                                  id: Date.now().toString(),
                                  text: ''
                                }
                              ]
                            }
                          : question
                      )
                    })}
                  >
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add Option
                  </Button>
                </div>

                {q.options.map((option) => (
                  <div key={option.id} className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                    <Input
                      value={option.text}
                      onChange={(e) => onQuestionChange({
                        ...question,
                        comprehensionQuestions: question.comprehensionQuestions?.map(
                          question => question.id === q.id
                            ? {
                                ...question,
                                options: question.options.map(
                                  opt => opt.id === option.id
                                    ? { ...opt, text: e.target.value }
                                    : opt
                                )
                              }
                            : question
                        )
                      })}
                      placeholder="Enter option text..."
                      className="w-full"
                    />
                    <Button
                      variant={q.correctOptionId === option.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => onQuestionChange({
                        ...question,
                        comprehensionQuestions: question.comprehensionQuestions?.map(
                          question => question.id === q.id
                            ? {
                                ...question,
                                correctOptionId: option.id
                              }
                            : question
                        )
                      })}
                    >
                      ✓
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onQuestionChange({
                        ...question,
                        comprehensionQuestions: question.comprehensionQuestions?.map(
                          question => question.id === q.id
                            ? {
                                ...question,
                                options: question.options.filter(
                                  opt => opt.id !== option.id
                                )
                              }
                            : question
                        )
                      })}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
