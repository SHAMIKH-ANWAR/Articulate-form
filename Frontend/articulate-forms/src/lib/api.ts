import { FormData } from "@/types/form";

const API_BASE_URL = 'http://localhost:5000/api';

export const saveFormToDb = async (formData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/create-form`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to save form');
  }

  return response.json();
};
