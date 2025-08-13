import { CategorizeQuestionType } from "@/types/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { QuestionMetadata } from "./QuestionMetadata";
import { toast } from "@/hooks/use-toast";

interface CategorizeQuestionProps {
  question: Partial<CategorizeQuestionType>;
  onQuestionChange: (updates: Partial<CategorizeQuestionType>) => void;
}

export const CategorizeQuestion = ({ question, onQuestionChange }: CategorizeQuestionProps) => {
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
        <Label>Categories (comma-separated)</Label>
        <Input
          value={question.categoryItems?.[0]?.category || ''}
          onChange={(e) => {
            onQuestionChange({
              ...question,
              categoryItems: [{
                id: question.categoryItems?.[0]?.id || Date.now().toString(),
                category: e.target.value,
                items: question.categoryItems?.[0]?.items || []
              }]
            });
          }}
          placeholder="mat, pot"
          className="mt-1"
        />
      </div>
      <div>
        <Label>Add Item</Label>
        <div className="flex flex-col sm:flex-row gap-2 mt-1">
          <Input
            placeholder="Enter an item..."
            className="w-full"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value) {
                const categoryString = question.categoryItems?.[0]?.category?.trim();
                if (!categoryString) {
                  toast({
                    title: "Add categories",
                    description: "Please add at least one category before adding items.",
                    variant: "destructive",
                  });
                  return;
                }
                onQuestionChange({
                  ...question,
                  categoryItems: question.categoryItems?.map(cat => ({
                    ...cat,
                    items: [
                      ...(cat.items || []),
                      {
                        id: Date.now().toString(),
                        text: e.currentTarget.value,
                        belongsTo: ''
                      }
                    ]
                  }))
                });
                e.currentTarget.value = '';
              }
            }}
          />
          <Button 
            variant="outline"
            type="button"
            className="w-full sm:w-auto"
            onClick={() => {
              const input = document.querySelector('input[placeholder="Enter an item..."]') as HTMLInputElement;
              if (input?.value) {
                const categoryString = question.categoryItems?.[0]?.category?.trim();
                if (!categoryString) {
                  toast({
                    title: "Add categories",
                    description: "Please add at least one category before adding items.",
                    variant: "destructive",
                  });
                  return;
                }
                onQuestionChange({
                  ...question,
                  categoryItems: question.categoryItems?.map(cat => ({
                    ...cat,
                    items: [
                      ...(cat.items || []),
                      {
                        id: Date.now().toString(),
                        text: input.value,
                        belongsTo: ''
                      }
                    ]
                  }))
                });
                input.value = '';
              }
            }}
          >
            <PlusCircle className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {question.categoryItems?.[0]?.items.length > 0 && (
        <div className="space-y-4">
          <Label>Item Mapping</Label>
          <div className="grid gap-3">
            {question.categoryItems[0].items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="bg-surface p-2 rounded flex-1">{item.text}</div>
                <Select
                  value={item.belongsTo}
                  onValueChange={(value) => {
                    onQuestionChange({
                      ...question,
                      categoryItems: question.categoryItems?.map(cat => ({
                        ...cat,
                        items: cat.items.map(i => 
                          i.id === item.id 
                            ? { ...i, belongsTo: value }
                            : i
                        )
                      }))
                    });
                  }}
                >
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Belongs to..." />
                  </SelectTrigger>
                  <SelectContent>
                    {question.categoryItems[0].category
                      .split(',')
                      .map((c) => c.trim())
                      .filter((c) => c.length > 0)
                      .map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
