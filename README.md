# ltv_HomeProject

A simple Admin Dashboard for managing temporary phone numbers. Built with Angular (frontend) and Node.js/Express (backend).

## Tech Stack
- Angular
- Node.js
- Express
- TypeScript

## Features
- View and manage phone numbers
- Filter by status (All, Active, Inactive)
- Toggle status (activate/deactivate)
- Sort and paginate number list

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mikeooo009/ltv_HomeProject.git
   cd ltv_HomeProject
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start the backend**
   ```bash
   cd backend
   npm install
   npm start
   ```
4. **Start the frontend**
   ```bash
   cd backend/frontend-app
   npm install
   npm start
   ```

The backend runs on http://localhost:3000 and the frontend on http://localhost:4200 by default.

## Project Structure
```
ltv_HomeProject/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── frontend-app/
│       ├── src/
│       └── ...
├── frontend-deploy/ (optional, for deployment)
├── backend-deploy/ (optional, for deployment)
├── package.json
└── README.md
```

## License

This project is licensed under the ISC License.

---

**Built with ❤️ using Angular 17 and Node.js**