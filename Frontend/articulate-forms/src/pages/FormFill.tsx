import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

// Mock data - in real app this would come from Supabase
const mockForm = {
  id: "1",
  title: "Language Learning Assessment",
  headerImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  questions: [
    {
      id: "1",
      type: "categorize",
      text: "Categorize the following words by their grammatical function:",
      categories: ["Noun", "Verb", "Adjective"],
      options: ["Beautiful", "Run", "House", "Quick", "Study", "Garden"]
    },
    {
      id: "2", 
      type: "cloze",
      text: "Complete the sentence: The quick brown fox _____ over the lazy dog. Yesterday, I _____ to the store."
    },
    {
      id: "3",
      type: "comprehension",
      text: "Reading Comprehension",
      paragraph: "Climate change is one of the most pressing issues of our time. Rising global temperatures are causing ice caps to melt, sea levels to rise, and weather patterns to become more extreme. Scientists agree that immediate action is needed to reduce greenhouse gas emissions and transition to renewable energy sources.",
      subQuestions: [
        "What are the main effects of climate change mentioned?",
        "What do scientists recommend to address this issue?",
        "Why is this considered a pressing issue?"
      ]
    }
  ]
};

const FormFill = () => {
  const { formId } = useParams();
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleCategorizeAnswer = (questionId: string, option: string, category: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [option]: category
      }
    }));
  };

  const handleClozeAnswer = (questionId: string, blankIndex: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [blankIndex]: value
      }
    }));
  };

  const handleComprehensionAnswer = (questionId: string, subQuestionIndex: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [subQuestionIndex]: value
      }
    }));
  };

  const submitForm = () => {
    // Here we would save to Supabase
    console.log('Submitting answers:', answers);
    setSubmitted(true);
    toast({
      title: "Success",
      description: "Your responses have been submitted"
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Thank you!</h2>
            <p className="text-muted-foreground">Your responses have been submitted successfully.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-6 py-8">
        {/* Form Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
            {mockForm.title}
          </h1>
          {mockForm.headerImage && (
            <img 
              src={mockForm.headerImage} 
              alt="Form header" 
              className="w-full h-64 object-cover rounded-xl shadow-lg mb-6"
            />
          )}
          <p className="text-muted-foreground">Please complete all questions below</p>
        </div>

        {/* Questions */}
        <div className="space-y-8">
          {mockForm.questions.map((question, index) => (
            <Card key={question.id} className="bg-card border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                    {index + 1}
                  </span>
                  {question.text}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {question.type === 'categorize' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      {question.categories?.map(category => (
                        <div key={category} className="bg-surface p-4 rounded-lg border border-card-border">
                          <h4 className="font-medium text-center mb-2">{category}</h4>
                          <div className="min-h-[100px] border-2 border-dashed border-muted rounded-lg p-2">
                            {/* Category drop zone */}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {question.options?.map(option => (
                        <div key={option} className="space-y-2">
                          <div className="bg-surface-elevated p-3 rounded-lg border border-card-border text-center">
                            {option}
                          </div>
                          <Select onValueChange={(value) => handleCategorizeAnswer(question.id, option, value)}>
                            <SelectTrigger className="h-8">
                              <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                              {question.categories?.map(category => (
                                <SelectItem key={category} value={category}>{category}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {question.type === 'cloze' && (
                  <div className="space-y-4">
                    <div className="bg-surface p-6 rounded-lg border border-card-border">
                      <p className="text-lg leading-relaxed">
                        The quick brown fox{' '}
                        <Input 
                          className="inline-block w-32 mx-2" 
                          placeholder="____"
                          onChange={(e) => handleClozeAnswer(question.id, 0, e.target.value)}
                        />{' '}
                        over the lazy dog. Yesterday, I{' '}
                        <Input 
                          className="inline-block w-32 mx-2" 
                          placeholder="____"
                          onChange={(e) => handleClozeAnswer(question.id, 1, e.target.value)}
                        />{' '}
                        to the store.
                      </p>
                    </div>
                  </div>
                )}

                {question.type === 'comprehension' && (
                  <div className="space-y-6">
                    <div className="bg-surface p-6 rounded-lg border border-card-border">
                      <h4 className="font-medium mb-3">Reading Passage:</h4>
                      <p className="text-foreground leading-relaxed">{question.paragraph}</p>
                    </div>
                    <div className="space-y-4">
                      {question.subQuestions?.map((subQuestion, subIndex) => (
                        <div key={subIndex} className="space-y-2">
                          <Label className="text-sm font-medium">
                            {subIndex + 1}. {subQuestion}
                          </Label>
                          <Textarea
                            placeholder="Enter your answer..."
                            onChange={(e) => handleComprehensionAnswer(question.id, subIndex, e.target.value)}
                            className="min-h-[80px]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Submit Button */}
        <div className="text-center mt-8">
          <Button size="lg" onClick={submitForm} className="px-8" variant="primary">
            Submit Responses
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FormFill;