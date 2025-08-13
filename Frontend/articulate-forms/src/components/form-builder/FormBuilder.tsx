import { useState } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { config } from "@/config";
import { api } from "@/services/api";
import {
  FormData,
  Question,
  CategorizeQuestionType,
  ClozeQuestionType,
  ComprehensionQuestionType,
  CategoryItem,
  ClozeWord,
  ComprehensionQuestion as ComprehensionQuestionItem,
} from "@/types/form";
import { useFormValidation } from "@/hooks/form-builder/useFormValidation";
import { CategorizeQuestion } from "./CategorizeQuestion";
import { ClozeQuestion } from "./ClozeQuestion";
import { ComprehensionQuestion } from "./ComprehensionQuestion";
import { CategorizeQuestionPreview } from "./previews/CategorizeQuestionPreview";
import { ClozeQuestionPreview } from "./previews/ClozeQuestionPreview";
import { ComprehensionQuestionPreview } from "./previews/ComprehensionQuestionPreview";
import FormHeader from "../form-components/FormHeader";
import FormSettings from "../form-components/FormSettings";
import FormAddQuestion from "../form-components/FormAddQuestion";
import FormPreview from "../form-components/FormPreview";

export const FormBuilder = () => {
  const { validateQuestion } = useFormValidation();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    questions: [],
  });

  const getInitialQuestionState = (
    type: Question["type"]
  ): Partial<Question> => {
    switch (type) {
      case "categorize":
        return {
          type,
          text: "",
          image: "",
          points: 0,
          categoryItems: [
            { id: Date.now().toString(), category: "", items: [] },
          ],
        };
      case "cloze":
        return {
          type,
          text: "",
          image: "",
          points: 0,
          clozeWords: [],
        };
      case "comprehension":
        return {
          type,
          text: "",
          image: "",
          points: 0,
          paragraph: "",
          comprehensionQuestions: [],
        };
      default:
        return { type: "categorize" as const };
    }
  };

  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>(
    getInitialQuestionState("categorize")
  );

  const addQuestion = () => {
    if (!validateQuestion(currentQuestion)) return;

    const baseQuestion = {
      id: Date.now().toString(),
      text: currentQuestion.text!,
      image: currentQuestion.image,
      points: currentQuestion.points || 0,
    };

    let newQuestion: Question;

    switch (currentQuestion.type) {
      case "categorize":
        newQuestion = {
          ...baseQuestion,
          type: "categorize",
          categoryItems:
            (currentQuestion as Partial<CategorizeQuestionType>)
              .categoryItems || [],
        } as CategorizeQuestionType;
        break;
      case "cloze":
        newQuestion = {
          ...baseQuestion,
          type: "cloze",
          clozeWords: (
            (currentQuestion as Partial<ClozeQuestionType>).clozeWords || []
          ).map((word, index) => ({
            ...word,
            position: index,
          })),
        } as ClozeQuestionType;
        break;
      case "comprehension":
        newQuestion = {
          ...baseQuestion,
          type: "comprehension",
          paragraph:
            (currentQuestion as Partial<ComprehensionQuestionType>).paragraph ||
            "",
          comprehensionQuestions:
            (currentQuestion as Partial<ComprehensionQuestionType>)
              .comprehensionQuestions || [],
        } as ComprehensionQuestionType;
        break;
      default:
        return;
    }

    setFormData((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));

    setCurrentQuestion(getInitialQuestionState(currentQuestion.type!));

    toast({
      title: "Success",
      description: "Question added successfully",
    });
  };

  const removeQuestion = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== id),
    }));
  };

  const moveQuestion = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === formData.questions.length - 1)
    ) {
      return;
    }

    const newQuestions = [...formData.questions];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    [newQuestions[index], newQuestions[swapIndex]] = [
      newQuestions[swapIndex],
      newQuestions[index],
    ];

    setFormData((prev) => ({
      ...prev,
      questions: newQuestions,
    }));
  };

  const saveForm = async () => {
    if (!formData.title) {
      toast({
        title: "Error",
        description: "Please enter a form title",
        variant: "destructive",
      });
      return;
    }

    try {
      const data = await api.createForm(formData);
      const testUrl = `${config.appUrl}/test/${data.form._id}`;
      
      toast({
        title: "Success",
        description: "Form saved successfully! Test link has been copied to clipboard.",
      });
      
      await navigator.clipboard.writeText(testUrl);
      return data;
    } catch (error) {
      console.error("Error saving form:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save form",
        variant: "destructive",
      });
    }
  };

  const renderQuestionEditor = () => {
    switch (currentQuestion.type) {
      case "categorize":
        return (
          <CategorizeQuestion
            question={currentQuestion}
            onQuestionChange={setCurrentQuestion}
          />
        );
      case "cloze":
        return (
          <ClozeQuestion
            question={currentQuestion}
            onQuestionChange={setCurrentQuestion}
          />
        );
      case "comprehension":
        return (
          <ComprehensionQuestion
            question={currentQuestion}
            onQuestionChange={setCurrentQuestion}
          />
        );
      default:
        return null;
    }
  };

  const renderQuestionPreview = (question: Question) => {
    switch (question.type) {
      case "categorize":
        return <CategorizeQuestionPreview question={question} />;
      case "cloze":
        return <ClozeQuestionPreview question={question} />;
      case "comprehension":
        return <ComprehensionQuestionPreview question={question} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-hero border-b border-card-border">
        <FormHeader saveForm={saveForm} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-1">
            <Card className="bg-card border-card-border">
              <FormSettings formData={formData} setFormData={setFormData} />
            </Card>

            <Card className="mt-6 bg-card border-card-border">
              <FormAddQuestion
                currentQuestion={currentQuestion}
                setCurrentQuestion={setCurrentQuestion}
                renderQuestionEditor={renderQuestionEditor}
                addQuestion={addQuestion}
              />
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="bg-card border-card-border overflow-hidden">
              <FormPreview
                formData={formData}
                moveQuestion={moveQuestion}
                removeQuestion={removeQuestion}
                renderQuestionPreview={renderQuestionPreview}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
