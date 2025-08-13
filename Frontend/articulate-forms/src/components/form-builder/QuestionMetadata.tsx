import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DragDropImage } from "@/components/ui/drag-drop-image";

interface QuestionMetadataProps {
  image?: string;
  points: number;
  onImageChange: (url: string) => void;
  onPointsChange: (points: number) => void;
}

export const QuestionMetadata = ({
  image,
  points,
  onImageChange,
  onPointsChange,
}: QuestionMetadataProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="questionPoints">Points</Label>
          <Input
            id="questionPoints"
            type="number"
            min={0}
            value={points}
            onChange={(e) => onPointsChange(Number(e.target.value))}
            placeholder="0"
            className="mt-1"
          />
        </div>

        <div>
          <Label>Question Image</Label>
          <DragDropImage
            value={image}
            onChange={onImageChange}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
};
