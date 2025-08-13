import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { FormPreviewProps } from "@/types/form";

const FormPreview = ({formData,moveQuestion,removeQuestion,renderQuestionPreview}:FormPreviewProps) => {
  return (
    <>
      <CardHeader>
        <CardTitle>Form Preview</CardTitle>
      </CardHeader>
      <CardContent>
        {formData.title && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {formData.title}
            </h2>
            {formData.headerImage && (
              <img
                src={formData.headerImage}
                alt="Form header"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
          </div>
        )}

        <div className="space-y-6">
          {formData.questions.map((question, index) => (
            <Card key={question.id} className="bg-surface border-card-border">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4 gap-2 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={index === 0}
                        onClick={() => moveQuestion(index, "up")}
                        className="h-8 w-8 p-0"
                      >
                        ↑
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={index === formData.questions.length - 1}
                        onClick={() => moveQuestion(index, "down")}
                        className="h-8 w-8 p-0"
                      >
                        ↓
                      </Button>
                    </div>
                    <span className="text-sm font-medium text-primary">
                      Question {index + 1} - {question.type}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeQuestion(question.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <h3 className="text-lg font-medium mb-3">{question.text}</h3>

                {question.image && (
                  <div className="relative w-full max-w-2xl mx-auto mb-4">
                    <img
                      src={question.image}
                      alt="Question"
                      className="w-full h-auto object-contain rounded-lg"
                      style={{ maxHeight: "400px" }}
                    />
                  </div>
                )}

                {renderQuestionPreview(question)}
              </CardContent>
            </Card>
          ))}

          {formData.questions.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <PlusCircle className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No questions yet</h3>
              <p className="text-muted-foreground">
                Add your first question to get started
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </>
  );
};

export default FormPreview;
