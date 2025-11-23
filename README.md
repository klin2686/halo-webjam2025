# Halo - Your Personalized Allergy Guardian Angel

> Created by: Kenneth Lin, Ronan Nguyen, Isaac Phoon, Ethan Zhao

<img width="1919" height="1199" alt="Halo Sign In" src="https://github.com/user-attachments/assets/7193a1d3-b29a-4dfa-8a7b-ec610c5720cf" />

<img width="1919" height="1199" alt="Halo Dashboard" src="https://github.com/user-attachments/assets/a408ae76-db67-4a91-a9c3-cfd473f9cb85" />

Halo is an AI-powered food allergy management application that helps users safely navigate restaurant menus. Upload a menu photo or enter items manually, and Halo uses Google Gemini to identify potential allergens in each dish, giving you peace of mind when dining out. Identified allergens are matched against users' personalized allergy lists to provide searching and color coding.

## Inspiration

This project was born from a real need. Severe allergic reactions in restaurants are alarmingly common, yet many menus lack complete allergen information. Restaurant staff are often misinformed or simply don't have access to detailed ingredient lists, putting diners with food allergies at risk. Halo was created to empower people with food allergies to make informed dining decisions and avoid potentially dangerous situations.

## Core Features

- **Google OAuth Authentication** - Secure sign-in with your Google account
- **Personalized Allergy Profiles** - Track and manage your specific food allergies based on the FDA's major allergen categories
- **AI-Powered Menu Analysis** - Upload menu photos for instant allergen detection using Google Gemini 2.5
- **Manual Menu Input** - Type in menu items when photos aren't available
- **Color-Coded Results** - Personalized, easy-to-read interface that highlights items matching your specific allergies
- **Confidence Scoring** - Each allergen detection includes a confidence score (0-10) for transparency
- **Menu History** - Save and revisit previously analyzed menus

## Tech Stack

### Backend
- **Flask** - Lightweight Python WSGI web framework
- **SQLite** - Development and testing database
- **PostgreSQL** - Production database
- **SQLAlchemy** - ORM and database management
- **JWT** - Token-based authentication (access + refresh tokens)
- **Google Gemini 2.5 Flash** - AI-powered menu processing and allergen identification

### Frontend
- **React 19** - Modern UI framework
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions

## Project Structure

This is a **monorepo** containing both the backend API and frontend application:

```
halo/
├── backend/          # Flask API server
│   ├── app/          # Application code (models, routes, utils)
│   ├── run.py        # Server entry point
|   ├── seed_db.py    # Script to populate database with initial allergen data
│   └── README.md     # Backend setup instructions
└── frontend/         # React application
    ├── src/          # Source code (components, contexts, utils)
    └── README.md     # Frontend setup instructions
```

## How It Works

1. **Sign in** with your Google account or email address
2. **Set up your allergy profile** by selecting your food allergies
3. **Upload a menu photo** or manually enter menu items
4. **Review your analysis** by viewing allergens and confidence scores highlighted for each dish
5. **Save menus** for future reference

## Use Cases

- Dining at restaurants with complex menus
- Ordering takeout or delivery
- Meal planning for people with multiple allergies
- Quick allergen checks before ordering
- Keeping track of safe menu options at favorite restaurants

## Development Journey

This full-stack application was built in one week as part of ICSSC's WebJam 2025. The team started with Figma prototypes to design the user experience, then built the React frontend and Flask backend, integrating them through RESTful API endpoints. Key learnings included mastering Figma for UI/UX design, collaborative development workflows (managing merge conflicts and coordinating schedules), and bringing together modern technologies like React 19, TypeScript, Framer Motion, and Google Gemini AI.

## Getting Started

Detailed setup and run instructions are available in each directory:

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd halo
   ```

2. **Set up frontend and backend**

   Backend Setup: See [backend/README.md](backend/README.md)

   Frontend Setup: See [frontend/README.md](frontend/README.md)

## Future Enhancements

- Account settings page for profile customization
- Food item descriptions for additional context
- AI chatbot for real-time allergen clarification
- Contact Us and About pages
- Enhanced menu upload management features
