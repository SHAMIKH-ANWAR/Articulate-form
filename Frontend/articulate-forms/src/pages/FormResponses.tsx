import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { config } from "@/config";
import { toast } from "@/hooks/use-toast";

interface FormResponse {
  id: string;
  username: string;
  answers: Record<string, any>;
  submittedAt: string;
}

const FormResponses = () => {
  const { id } = useParams();
  const [responses, setResponses] = useState<FormResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const [formRes, responsesRes] = await Promise.all([
          fetch(`${config.apiUrl}/api/forms/${id}`),
          fetch(`${config.apiUrl}/api/forms/${id}/responses`)
        ]);

        const formData = await formRes.json();
        const responsesData = await responsesRes.json();

        if (formRes.ok && responsesRes.ok) {
          setForm(formData);
          setResponses(responsesData);
        } else {
          throw new Error('Failed to fetch form responses');
        }
      } catch (error) {
        console.error("Error fetching responses:", error);
        toast({
          title: "Error",
          description: "Failed to load form responses",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [id]);

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

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">{form.title} - Responses</h1>
        
        <div className="space-y-6">
          {responses.length === 0 ? (
            <Card className="p-6">
              <p className="text-muted-foreground">No responses yet.</p>
            </Card>
          ) : (
            responses.map((response) => (
              <Card key={response.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{response.username}</h3>
                    <p className="text-sm text-muted-foreground">
                      Submitted on {new Date(response.submittedAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {form.questions.map((question: any, index: number) => (
                    <div key={question.id} className="border-t pt-4 first:border-t-0 first:pt-0">
                      <p className="font-medium mb-2">
                        Question {index + 1}: {question.text}
                      </p>
                      <div className="bg-secondary/10 p-4 rounded-lg">
                        <pre className="text-sm whitespace-pre-wrap">
                          {JSON.stringify(response.answers[question.id], null, 2)}
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FormResponses;
