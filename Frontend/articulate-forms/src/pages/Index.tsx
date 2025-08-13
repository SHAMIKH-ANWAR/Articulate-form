import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Eye, Zap, Target, PenTool, LayoutDashboard } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-hero">
        <div className="container mx-auto px-6 py-20 text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/20 hover:bg-white/30">
            ✨ Advanced Form Builder
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Create Interactive Forms
            <br />
            <span className="text-white/90">That Engage & Educate</span>
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Build sophisticated forms with categorize, cloze, and comprehension questions. 
            Perfect for assessments, surveys, and educational content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/builder">
              <Button size="lg" variant="secondary" className="px-8">
                <Plus className="w-5 h-5 mr-2" />
                Create New Form
              </Button>
            </Link>
            <Link to="/form/demo">
              <Button size="lg" variant="outline" className="px-8 border-white/20 text-white hover:bg-white/10">
                <Eye className="w-5 h-5 mr-2" />
                View Demo Form
              </Button>
            </Link>
            <Link to="/admin">
              <Button size="lg" variant="outline" className="px-8 border-white/20 text-white hover:bg-white/10">
                <LayoutDashboard className="w-5 h-5 mr-2" />
                Admin Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Powerful Question Types</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three specialized question formats designed for educational and assessment purposes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="bg-card border-card-border hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Categorize Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center mb-4">
                Users drag and drop or assign items to predefined categories. Perfect for classification exercises.
              </p>
              <div className="bg-surface p-4 rounded-lg">
                <div className="text-xs text-muted-foreground mb-2">Example:</div>
                <div className="text-sm">Sort words by grammar type: Noun, Verb, Adjective</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-card-border hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <PenTool className="w-6 h-6 text-accent" />
              </div>
              <CardTitle>Cloze Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center mb-4">
                Fill-in-the-blank format where users complete sentences or passages with missing words.
              </p>
              <div className="bg-surface p-4 rounded-lg">
                <div className="text-xs text-muted-foreground mb-2">Example:</div>
                <div className="text-sm">The cat _____ on the mat.</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-card-border hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-success" />
              </div>
              <CardTitle>Comprehension Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center mb-4">
                Present a reading passage followed by related questions to test understanding.
              </p>
              <div className="bg-surface p-4 rounded-lg">
                <div className="text-xs text-muted-foreground mb-2">Example:</div>
                <div className="text-sm">Read passage → Answer questions about content</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-surface rounded-xl p-8 text-center border border-card-border">
          <h3 className="text-2xl font-bold mb-4">Ready to build your first form?</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Start creating engaging, interactive forms that provide valuable insights and enhance learning experiences.
          </p>
          <Link to="/builder">
            <Button variant="primary" size="lg" className="px-8">
              <Zap className="w-5 h-5 mr-2" />
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
