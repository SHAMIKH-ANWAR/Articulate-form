import { useState, useEffect } from "react";
import { CategorizeQuestionType } from "@/types/form";
import { CategorizePreviewProps } from "@/types/previews";
import { Button } from "@/components/ui/button";

export const CategorizeQuestionPreview = ({ 
  question, 
  onAnswer, 
  userAnswer,
  isSubmitted 
}: CategorizePreviewProps) => {
  const [categorizedItems, setCategorizedItems] = useState<Record<string, string[]>>(
    userAnswer || {}
  );
  const handleDragStart = (e: React.DragEvent, item: string) => {
    e.dataTransfer.setData('text/plain', item);
  };

  const handleDrop = (e: React.DragEvent, category: string) => {
    e.preventDefault();
    const item = e.dataTransfer.getData('text/plain');
    
    // Remove item from its previous category if it exists
    const newCategorizedItems = { ...categorizedItems };
    Object.keys(newCategorizedItems).forEach(cat => {
      newCategorizedItems[cat] = newCategorizedItems[cat].filter(i => i !== item);
    });

    // Add item to new category
    newCategorizedItems[category] = [...(newCategorizedItems[category] || []), item];
    
    setCategorizedItems(newCategorizedItems);
    onAnswer?.(newCategorizedItems);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const categories = question.categoryItems?.[0]?.category.split(',').map(c => c.trim()) || [];
  const items = question.categoryItems?.[0]?.items || [];
  
  // Get uncategorized items
  const categorizedItemsList = Object.values(categorizedItems).flat();
  const uncategorizedItems = items.filter(item => 
    !categorizedItemsList.includes(item.text)
  );

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div 
            key={category}
            className={`
              p-4 rounded-lg min-h-[120px] 
              ${isSubmitted ? 'bg-muted' : 'bg-muted/50 border-2 border-dashed border-muted-foreground/25'}
            `}
            onDrop={(e) => !isSubmitted && handleDrop(e, category)}
            onDragOver={handleDragOver}
          >
            <h4 className="font-medium mb-3">{category}</h4>
            <div className="space-y-2">
              {(categorizedItems[category] || []).map((item) => (
                <div 
                  key={item}
                  className="text-sm bg-background p-2 rounded shadow-sm"
                  draggable={!isSubmitted}
                  onDragStart={(e) => handleDragStart(e, item)}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Available Items */}
      {!isSubmitted && uncategorizedItems.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium mb-3">Items to Categorize</h4>
          <div className="flex flex-wrap gap-2">
            {uncategorizedItems.map((item) => (
              <div
                key={item.id}
                className="text-sm bg-primary/10 p-2 rounded cursor-move"
                draggable
                onDragStart={(e) => handleDragStart(e, item.text)}
              >
                {item.text}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
