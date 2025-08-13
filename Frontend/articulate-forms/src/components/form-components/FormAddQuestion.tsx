
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { PlusCircle } from "lucide-react";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { FormAddQuestionProps } from "@/types/form";

const FormAddQuestion = ({currentQuestion,setCurrentQuestion,renderQuestionEditor,addQuestion}:FormAddQuestionProps) => {
  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlusCircle className="w-5 h-5" />
          Add Question
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Question Type</Label>
          <Select
            value={currentQuestion.type}
            onValueChange={(value: "categorize" | "cloze" | "comprehension") =>
              setCurrentQuestion((prev) => ({ ...prev, type: value }))
            }
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="categorize">Categorize</SelectItem>
              <SelectItem value="cloze">Cloze (Fill in blanks)</SelectItem>
              <SelectItem value="comprehension">Comprehension</SelectItem>
            </SelectContent>
          </Select>
        </div>

          {renderQuestionEditor()}

        <Button onClick={addQuestion} className="w-full" variant="primary">
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Question
        </Button>
      </CardContent>
    </>
  );
};

export default FormAddQuestion;
