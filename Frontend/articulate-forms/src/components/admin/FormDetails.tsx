import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Form } from "@/types/dashboard";

interface FormDetailsProps {
  form: Form | null;
  onClose: () => void;
  formatDate: (date: string) => string;
}

export function FormDetails({ form, onClose, formatDate }: FormDetailsProps) {
  if (!form) return null;

  return (
    <Dialog open={!!form} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">{form.title}</h2>
            <p className="text-muted-foreground">
              Created on {formatDate(form.createdAt)}
            </p>
          </div>

          {form.headerImage && (
            <img
              src={form.headerImage}
              alt={form.title}
              className="w-full h-auto rounded-lg"
            />
          )}

          <div className="space-y-6">
            {form.questions.map((question, index) => (
              <Card key={question.id} className="p-4">
                <h3 className="font-semibold mb-2">
                  Question {index + 1}: {question.text}
                </h3>
                {question.image && (
                  <img
                    src={question.image}
                    alt={`Question ${index + 1}`}
                    className="w-full h-auto rounded-lg mb-2"
                  />
                )}
                <p className="text-muted-foreground">Type: {question.type}</p>
                <p className="text-muted-foreground">Points: {question.points}</p>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
