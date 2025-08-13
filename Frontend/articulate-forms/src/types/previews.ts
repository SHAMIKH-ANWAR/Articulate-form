import { CategorizeQuestionType, ClozeQuestionType, ComprehensionQuestionType } from "./form";

export interface BasePreviewProps {
  onAnswer?: (answer: any) => void;
  userAnswer?: any;
  isSubmitted?: boolean;
}

export interface CategorizePreviewProps extends BasePreviewProps {
  question: CategorizeQuestionType;
}

export interface ClozePreviewProps extends BasePreviewProps {
  question: ClozeQuestionType;
}

export interface ComprehensionPreviewProps extends BasePreviewProps {
  question: ComprehensionQuestionType;
}
