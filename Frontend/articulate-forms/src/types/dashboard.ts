export interface Form {
  _id: string;
  title: string;
  headerImage?: string;
  createdAt: string;
  questions: Question[];
}

export interface Question {
  id: string;
  type: string;
  text: string;
  image?: string;
  points: number;
}
