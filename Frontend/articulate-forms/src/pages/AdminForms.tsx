import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { config } from "@/config";
import { toast } from "@/hooks/use-toast";
import { ChevronRight, FileText, Users } from "lucide-react";

interface Form {
  id: string;
  title: string;
  createdAt: string;
  responseCount: number;
}

const AdminForms = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/api/admin/forms`);
        const data = await response.json();

        if (response.ok) {
          setForms(data);
        } else {
          throw new Error('Failed to fetch forms');
        }
      } catch (error) {
        console.error("Error fetching forms:", error);
        toast({
          title: "Error",
          description: "Failed to load forms",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Forms</h1>
          <Link to="/forms/create">
            <Button>Create New Form</Button>
          </Link>
        </div>
        
        <div className="grid gap-6">
          {forms.length === 0 ? (
            <Card className="p-6">
              <p className="text-muted-foreground">You haven't created any forms yet.</p>
            </Card>
          ) : (
            forms.map((form) => (
              <Card key={form.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{form.title}</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      Created on {new Date(form.createdAt).toLocaleDateString()}
                    </p>
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span>{form.responseCount} responses</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/forms/${form.id}`}>
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        View Form
                      </Button>
                    </Link>
                    <Link to={`/forms/${form.id}/responses`}>
                      <Button size="sm">
                        <Users className="w-4 h-4 mr-2" />
                        View Responses
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminForms;
