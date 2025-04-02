# Campus Navigate UG

A modern web application for navigating the University of Ghana campus, featuring an interactive map interface and comprehensive location information.

## Project Overview

This project is a full-stack application designed to help students, staff, and visitors navigate the University of Ghana campus. It combines a modern React frontend with a FastAPI backend to provide an intuitive and feature-rich campus navigation experience.

## Features

- 🧭 **Interactive Campus Map**: Explore the University of Ghana campus with an intuitive and responsive map interface
- 🔍 **Location Search**: Find any building, facility, or landmark on campus with powerful search capabilities
- 🚶 **Step-by-Step Directions**: Get detailed walking directions between any two points on campus
- 📍 **Location Details**: Access comprehensive information about campus buildings, including opening hours and facilities
- ⭐ **Save Favorites**: Save frequently visited locations for quick access and navigation
- 🔔 **Location Alerts**: Receive notifications about important locations and events on campus

## Technical Stack

### Frontend
- React + TypeScript
- Modern UI components with Framer Motion animations
- Yarn as package manager
- Vite for development and building

### Backend
- FastAPI (Python) for high-performance API endpoints
- UV as Python package manager
- Firebase integration for authentication and configuration
- OpenAPI documentation with Swagger UI

## Project Structure

```
campus-navigate-ug/
├── frontend/           # React + TypeScript frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   └── App.tsx       # Main application component
│   └── package.json
└── backend/           # FastAPI backend
    ├── app/
    │   ├── apis/        # API endpoints
    │   └── mw/          # Middleware
    ├── main.py          # Application entry point
    └── requirements.txt
```

## Quickstart

1. Install dependencies:

```bash
make install
```

2. Start the backend and frontend servers in separate terminals:

For the backend:
```bash
cd backend
source venv/bin/activate
./run.sh
```

For the frontend:
```bash
make run-frontend
```

## Gotchas

- The backend server runs on port 8000 and the frontend development server runs on port 5173.
- The frontend Vite server proxies API requests to the backend on port 8000.
- Make sure to activate the backend's virtual environment before running the backend server.
- If you see "uvicorn: command not found", it means the virtual environment is not activated.

## Development

- Frontend development server: http://localhost:5173
- Backend API documentation: http://localhost:8000/docs
- Backend alternative documentation: http://localhost:8000/redoc

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
