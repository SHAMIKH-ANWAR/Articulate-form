import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { config } from "@/config";
import { FormList } from "@/components/admin/FormList";
import { FormDetails } from "@/components/admin/FormDetails";
import { Form } from "@/types/dashboard";

export default function AdminDashboard() {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/api/forms`);
      const data = await response.json();
      if (response.ok) {
        setForms(data);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch forms",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleRow = (id: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-hero border-b border-card-border">
        <div className="container mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-white/80">Manage your forms</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Card className="bg-card border-card-border p-6">
          <FormList 
            forms={forms}
            expandedRows={expandedRows}
            toggleRow={toggleRow}
            onViewForm={setSelectedForm}
            formatDate={formatDate}
          />
        </Card>
      </div>

      <FormDetails 
        form={selectedForm}
        onClose={() => setSelectedForm(null)}
        formatDate={formatDate}
      />
    </div>
  );
}
