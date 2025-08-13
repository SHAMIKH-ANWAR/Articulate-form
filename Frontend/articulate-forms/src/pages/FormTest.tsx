import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormData } from "@/types/form";
import { toast } from "@/hooks/use-toast";
import { config } from "@/config";
import { Progress } from "@/components/ui/progress";
import { CategorizeQuestionPreview } from "@/components/form-builder/previews/CategorizeQuestionPreview";
import { ClozeQuestionPreview } from "@/components/form-builder/previews/ClozeQuestionPreview";
import { ComprehensionQuestionPreview } from "@/components/form-builder/previews/ComprehensionQuestionPreview";
import { SubmissionSuccess } from "@/components/ui/success-animation";
import { FormContentHeader } from "@/components/shared/FormContentHeader";
import { Timer } from "lucide-react";

const FormTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [showSubmissionSuccess, setShowSubmissionSuccess] = useState(false);

  
  const handleVisibilityChange = useCallback(() => {
    if (document.hidden && !submitted) {
      setTabSwitchCount(prev => {
        const newCount = prev + 1;
        if (newCount > 1) {
          toast({
            title: "Test Terminated",
            description: "Test has been terminated due to multiple tab switches.",
            variant: "destructive",
          });
          
          handleSubmit();
        } else {
          toast({
            title: "Warning",
            description: "Switching tabs is not allowed. Test will be terminated after one more attempt.",
            variant: "destructive",
          });
        }
        return newCount;
      });
    }
  }, [submitted]);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/test/${id}`);
        const data = await response.json();
        
        if (response.ok) {
          setForm(data);
          
          const initialAnswers = data.questions.reduce((acc: Record<string, any>, q: any) => {
            acc[q.id] = null;
            return acc;
          }, {});
          setAnswers(initialAnswers);
          
         
          toast({
            title: "Important Notice",
            description: "You cannot switch tabs during the test. The test will be terminated after two tab switches.",
            variant: "default",
            duration: 6000,
          });
        } else {
          throw new Error(data.error || 'Failed to fetch form');
        }
      } catch (error) {
        console.error("Error fetching form:", error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to fetch form",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchForm();


    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [id, handleVisibilityChange]);

  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!username.trim()) {
        toast({
          title: "Error",
          description: "Please enter your name before submitting",
          variant: "destructive",
        });
        return;
      }

   
      const unansweredQuestions = Object.values(answers).filter(a => a === null).length;
      if (unansweredQuestions > 0) {
        toast({
          title: "Warning",
          description: `Please answer all questions before submitting (${unansweredQuestions} remaining)`,
          variant: "destructive",
        });
        return;
      }
      
      const response = await fetch(`${config.apiUrl}/api/submit-test/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username: username.trim(),
          answers 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setShowSubmissionSuccess(true);
      
        setTimeout(() => {
          setShowSubmissionSuccess(false);
          navigate('/');
        }, 2000);
      } else {
        throw new Error(data.error || 'Failed to submit test');
      }
    } catch (error) {
      console.error("Error submitting test:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit test",
        variant: "destructive",
      });
    }
  };

  const renderQuestionInput = (question: FormData['questions'][0], index: number) => {
    switch (question.type) {
      case "categorize":
        return (
          <div>
            <CategorizeQuestionPreview 
              question={question}
              onAnswer={(answer) => handleAnswerChange(question.id, answer)}
              userAnswer={answers[question.id]}
              isSubmitted={submitted}
            />
          </div>
        );
      case "cloze":
        return (
          <div>
            <ClozeQuestionPreview 
              question={question}
              onAnswer={(answer) => handleAnswerChange(question.id, answer)}
              userAnswer={answers[question.id]}
              isSubmitted={submitted}
            />
          </div>
        );
      case "comprehension":
        return (
          <div>
            <ComprehensionQuestionPreview 
              question={question}
              onAnswer={(answer) => handleAnswerChange(question.id, answer)}
              userAnswer={answers[question.id]}
              isSubmitted={submitted}
            />
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold text-destructive">Form not found</h2>
        <p className="text-muted-foreground mt-2">The form you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  const answeredCount = Object.values(answers).filter(a => a !== null).length;
  const totalQuestions = form.questions.length;
  const progress = (answeredCount / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 sm:px-6 py-8"
      >
        <Card className="bg-card border-card-border p-4 sm:p-6 relative overflow-hidden">
     
          <div className="absolute top-0 left-0 right-0">
            <Progress value={progress} className="rounded-none h-1" />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-2"
          >
            <FormContentHeader title={form.title} image={form.headerImage} />
          </motion.div>
          
          {!submitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6 mt-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                <div className="bg-primary/5 text-primary px-4 py-2 rounded-lg flex items-center">
                  <Timer className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">
                    {answeredCount} of {totalQuestions} questions answered
                  </span>
                </div>
                <div className="max-w-sm flex-1">
                  <Input
                    placeholder="Enter your name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-background w-full"
                    disabled={submitted}
                  />
                </div>
              </div>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            <motion.div className="space-y-12">
              {form.questions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-border pb-8 last:border-b-0"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold"
                    >
                      {index + 1}
                    </motion.span>
                    <h2 className="text-lg sm:text-xl font-semibold">{question.text}</h2>
                  </div>
                  
                  {question.image && (
                    <motion.img 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      src={question.image} 
                      alt={`Question ${index + 1}`}
                      className="max-w-full h-auto rounded-lg mb-4 hover:shadow-lg transition-shadow duration-300"
                    />
                  )}
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    {renderQuestionInput(question, index)}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

       
          {!submitted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex justify-between items-center"
            >
              <div className="text-sm text-muted-foreground">
                {progress === 100 ? 
                  "All questions answered! You can submit your test." :
                  `${totalQuestions - answeredCount} questions remaining`
                }
              </div>
              <Button 
                onClick={handleSubmit}
                size="lg"
                className="px-8 relative overflow-hidden group"
                disabled={progress !== 100}
              >
                <motion.span
                  className="absolute inset-0 bg-primary/10"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
                Submit Test
              </Button>
            </motion.div>
          )}

     
          <AnimatePresence>
            {showSubmissionSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm"
              >
                <SubmissionSuccess />
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </motion.div>
    </div>
  );
};

export default FormTest;
