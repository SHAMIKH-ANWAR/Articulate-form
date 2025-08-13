
import { Settings } from "lucide-react";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { DragDropImage } from "../ui/drag-drop-image";
import { FormSettingsProps } from "@/types/form";

const FormSettings = ({ formData, setFormData }:FormSettingsProps) => {
  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Form Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="title">Form Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Enter form title..."
            className="mt-1"
          />
        </div>
        <div>
          <Label>Header Image</Label>
          <DragDropImage
            value={formData.headerImage}
            onChange={(url) =>
              setFormData((prev) => ({ ...prev, headerImage: url }))
            }
            className="mt-1"
          />
        </div>
      </CardContent>
    </>
  );
};

export default FormSettings;