# Articulate Forms

A full‑stack, modern form builder for interactive assessments with Categorize, Cloze, and Comprehension question types.

## Tech Stack

- Frontend: React + TypeScript, Vite, Tailwind, shadcn/ui, Framer Motion
- Backend: Node.js, Express, MongoDB (Mongoose), Cloudinary (image uploads)

## Monorepo Layout

- `Frontend/articulate-forms/`: Vite React app
- `Backend/`: Express API

## Configuration

Create `.env` files for both apps.

Frontend `.env` (in `Frontend/articulate-forms/`):

```
VITE_API_URL=http://localhost:5000
VITE_APP_URL=http://localhost:5173
```

Backend `.env` (in `Backend/`):

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/articulate-forms
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

## Install & Run

Frontend:

```
cd Frontend/articulate-forms
npm install
npm run dev
```

Backend:

```
cd Backend
npm install
npm run dev
```

## Frontend Architecture

- `src/components/form-builder/`
  - `FormBuilder.tsx`: page container; composes settings, editor, preview
  - `CategorizeQuestion.tsx`, `ClozeQuestion.tsx`, `ComprehensionQuestion.tsx`: editors
  - `previews/*`: interactive previews for each question type
  - `QuestionMetadata.tsx`: shared metadata editor (image, points)
- `src/components/form-components/`
  - `FormSettings.tsx`: form title and header image
  - `FormAddQuestion.tsx`: type selector + current editor + add button
  - `FormPreview.tsx`: ordered list of created questions; move/remove
- `src/components/admin/`
  - `FormList.tsx`: admin table with responsive public link + copy
  - `FormDetails.tsx`: modal/details
- `src/services/api.ts`: typed API client for create/fetch/submit
- `src/config/index.ts`: `apiUrl`, `appUrl`

## Backend Architecture

- `src/index.js`: app bootstrap, global error handler
- `src/db/dbConnect.js`: Mongo connection
- `src/routes/formRoutes.js`: API routes wrapped with async handler
- `src/controllers/formController.js`: request handlers
- `src/models/Form.js`, `src/models/UserAnswer.js`: Mongoose schemas
- `src/utils/formUtils.js`: sanitization for test delivery
- `src/utils/scoreUtils.js`: scoring logic
- `src/utils/upload.js`: Cloudinary upload endpoint
- `src/middlewares/asyncHandler.js`: async error wrapper

## API Endpoints

- `POST /api/create-form` — create form
- `GET /api/forms` — list forms
- `GET /api/form/:id` — get full form
- `GET /api/test/:id` — get sanitized form for test
- `POST /api/submit-test/:id` — submit answers
- `GET /api/submissions` — list submissions
- `POST /api/upload-image` — upload image (multipart form-data, `file`)

## Development Notes

- Public test link format: `${VITE_APP_URL}/test/:id`
- Copy‑to‑clipboard shows toast + check animation
- Mobile responsiveness: admin list and builder editors are optimized for small screens

## License

MIT