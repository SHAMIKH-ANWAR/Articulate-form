import { ClozeQuestionType } from "@/types/form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { QuestionMetadata } from "./QuestionMetadata";

interface Props {
  question: Partial<ClozeQuestionType>;
  onQuestionChange: (updates: Partial<ClozeQuestionType>) => void;
}

export function ClozeQuestion({ question, onQuestionChange }: Props) {
  const handleWordClick = (word: string) => {
    const words = question.text?.split(" ") || [];
    const existingWord = question.clozeWords?.find(w => w.word === word);
    
    if (existingWord) {
      const updatedWords = question.clozeWords?.filter(w => w.id !== existingWord.id) || [];
      onQuestionChange({ ...question, clozeWords: updatedWords });
      return;
    }

    const position = words.indexOf(word);
    const newWord = {
      id: Date.now().toString(),
      word,
      isBlank: true,
      position
    };

    const updatedWords = [...(question.clozeWords || []), newWord]
      .sort((a, b) => a.position - b.position);

    onQuestionChange({ ...question, clozeWords: updatedWords });
  };

  const words = question.text?.split(" ") || [];

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

      <div className="space-y-4">
        <Label>Click on words to make them blanks</Label>
        <div className="relative border border-border rounded-lg p-4 overflow-x-auto">
          {words.map((word, index) => {
            const isBlankWord = question.clozeWords?.find(w => w.word === word);
            return (
              <Button
                key={index}
                variant="ghost"
                className={`px-1 py-0 h-auto font-normal ${
                  isBlankWord ? "border-b-2 border-primary bg-primary/10" : ""
                }`}
                onClick={() => handleWordClick(word)}
              >
                {word}
              </Button>
            );
          })}
        </div>
        {question.clozeWords?.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="font-medium text-sm">Selected words:</h4>
            <div className="flex flex-wrap gap-2">
              {question.clozeWords.map(word => (
                <div 
                  key={word.id} 
                  className="bg-surface px-3 py-1 rounded-full text-sm"
                >
                  {word.word}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}