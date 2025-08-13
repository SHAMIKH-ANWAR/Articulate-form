import { toast } from "@/hooks/use-toast";
import { Question, CategorizeQuestionType, ClozeQuestionType, ComprehensionQuestionType } from "@/types/form";

export const useFormValidation = () => {
  const validateCategorizeQuestion = (question: Partial<CategorizeQuestionType>) => {
    const categories = question.categoryItems?.[0]?.category.split(',').map(c => c.trim()) || [];
    const items = question.categoryItems?.[0]?.items || [];
    
    const unmappedCategories = categories.filter(category => 
      !items.some(item => item.belongsTo === category)
    );

    if (unmappedCategories.length > 0) {
      toast({
        title: "Error",
        description: `The following categories have no items mapped to them: ${unmappedCategories.join(', ')}`,
        variant: "destructive"
      });
      return false;
    }

    if (items.some(item => !item.belongsTo)) {
      toast({
        title: "Error",
        description: "Some items are not mapped to any category. Please map all items.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const validateClozeQuestion = (question: Partial<ClozeQuestionType>) => {
    if (!question.clozeWords || question.clozeWords.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one word to make a blank",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const validateComprehensionQuestion = (question: Partial<ComprehensionQuestionType>) => {
    if (!question.paragraph) {
      toast({
        title: "Error",
        description: "Please enter a paragraph",
        variant: "destructive"
      });
      return false;
    }

    if (!question.comprehensionQuestions?.length) {
      toast({
        title: "Error",
        description: "Please add at least one question",
        variant: "destructive"
      });
      return false;
    }

    const invalidQuestions = question.comprehensionQuestions.filter(
      q => !q.question || !q.correctOptionId || q.options.length < 2
    );

    if (invalidQuestions.length > 0) {
      const withOneOption = invalidQuestions.some(q => q.options.length === 1 && q.correctOptionId);
      if (withOneOption) {
        toast({
          title: "Error",
          description: "Each question must have at least 2 options. Please add more options.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Error",
          description: "Each question must have question text, at least 2 options, and a correct answer selected",
          variant: "destructive"
        });
      }
      return false;
    }

    return true;
  };

  const validateQuestion = (question: Partial<Question>) => {
    if (!question.type) {
      toast({
        title: "Error",
        description: "Please select a question type",
        variant: "destructive"
      });
      return false;
    }
    if (!question.text) {
      toast({
        title: "Error",
        description: "Please enter question text",
        variant: "destructive"
      });
      return false;
    }

    switch (question.type) {
      case 'categorize':
        return validateCategorizeQuestion(question);
      case 'cloze':
        return validateClozeQuestion(question);
      case 'comprehension':
        return validateComprehensionQuestion(question);
      default:
        return false;
    }
  };

  return {
    validateQuestion
  };
};
