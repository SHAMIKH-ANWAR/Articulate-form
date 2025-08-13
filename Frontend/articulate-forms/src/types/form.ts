export interface CategoryItem {
  category: string;
  items: Array<{
    text: string;
    belongsTo: string;
    id: string;
  }>;
  id: string;
}

export interface ClozeWord {
  id: string;
  word: string;
  isBlank: boolean;
  position: number; // Add position to track word order
}

export interface ComprehensionQuestion {
  id: string;
  question: string;
  options: Array<{
    id: string;
    text: string;
  }>;
  correctOptionId: string;
}

// Base question interface with common properties
interface BaseQuestion {
  id: string;
  text: string;
  image?: string;
  points: number;
}

// Specific question types
export interface CategorizeQuestionType extends BaseQuestion {
  type: 'categorize';
  categoryItems: CategoryItem[];
}

export interface ClozeQuestionType extends BaseQuestion {
  type: 'cloze';
  clozeWords: ClozeWord[];
  options?: string[]; // Available words for the blanks
}

export interface ComprehensionQuestionType extends BaseQuestion {
  type: 'comprehension';
  paragraph: string;
  comprehensionQuestions: ComprehensionQuestion[];
}

// Union type for all question types
export type Question = CategorizeQuestionType | ClozeQuestionType | ComprehensionQuestionType;

export interface FormData {
  title: string;
  headerImage?: string;
  questions: Question[];
}


export interface FormAddQuestionProps {
  currentQuestion: Pick<Question, 'type'>;
  setCurrentQuestion: (question: Partial<Question>) => void;
  renderQuestionEditor: () => React.ReactNode;
  addQuestion: () => void;
}

export interface FormSettingsProps{
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export interface FormHeaderProps {
  saveForm: () => void;
}

export interface FormPreviewProps {
  formData: FormData;
  moveQuestion: (index: number, direction: "up" | "down") => void;
  removeQuestion: (id: string) => void;
  renderQuestionPreview: (question: Question) => React.ReactNode;
}