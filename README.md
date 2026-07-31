# Andrew Miller Portfolio — Admin CRUD

This project contains:

- the original React/Vite portfolio;
- a responsive admin dashboard;
- Add, Edit, List, and Delete interfaces for users, projects, services, and
  references;
- an Express REST API; and
- MongoDB/Mongoose models and controllers.

## Important file flow

```text
main.jsx
  -> App.jsx
      -> AdminDashboard.jsx
          -> Form components
          -> List components
              -> services/api.js
                  -> Express routes
                      -> controllers
                          -> MongoDB models
```

## Setup

### 1. Configure MongoDB

Inside `Backend`, copy `.env.example` to a new file named `.env`:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

Never commit or submit the real `.env` file.

### 2. Install packages

From the project root:

```bash
npm install
```

Then:

```bash
cd Backend
npm install
```

### 3. Run the backend

In the `Backend` terminal:

```bash
npm run dev
```

The API runs at:

```text
http://localhost:3000
```

### 4. Run the frontend

Open a second terminal in the project root:

```bash
npm run dev
```

Open the Vite address, normally:

```text
http://localhost:5173
```

Use the **Admin** navigation button to open the dashboard.

## Admin dashboard

Each dashboard section follows the same pattern:

- `UserForm.jsx` collects user information.
- `UserList.jsx` retrieves and displays users.
- `ProjectForm.jsx` collects project information and creates an image preview.
- `ProjectList.jsx` retrieves and displays projects.
- Service and Reference components follow the same pattern.
- `AdminDashboard.jsx` combines all forms and lists and tracks totals.
- `src/services/api.js` contains shared GET, POST, PUT, and DELETE requests.

## Project image note

For this course-sized project, the selected image is converted into a data URL
and stored in the model's existing string field. A production application would
normally upload images to dedicated storage and save only the returned URL in
MongoDB.

## Verification

The frontend passes ESLint, the production build completes, and every backend
JavaScript file passes Node's syntax check. MongoDB CRUD operations require a
working `MONGODB_URI` in `Backend/.env`.
