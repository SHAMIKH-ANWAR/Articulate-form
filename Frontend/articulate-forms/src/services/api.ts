import { config } from '@/config';
import { FormData } from '@/types/form';

export const api = {
  async createForm(formData: FormData) {
    const response = await fetch(`${config.apiUrl}/api/create-form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create form');
    }

    return response.json();
  },

  async getForm(id: string) {
    const response = await fetch(`${config.apiUrl}/api/test/${id}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch form');
    }

    return response.json();
  },

  async submitTest(id: string, answers: Record<string, any>) {
    const response = await fetch(`${config.apiUrl}/api/submit-test/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answers }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to submit test');
    }

    return response.json();
  },
};
