# CUET Trade & Lost-Found Portal

CUET Trade & Lost-Found Portal is a full-featured MERN stack web application that serves as both an online marketplace and a lost & found portal. It enables users to post, browse, and bid on various products and lost/found items while providing administrative control and order management.

## Backend

- **Tech Stack:** Node.js, Express, MongoDB with Mongoose ODM
- **Key Dependencies:** bcrypt, jsonwebtoken for authentication, multer for file uploads, cloudinary for cloud image storage, dotenv for environment variables, cors and cookie-parser for security and session management.
- **Functionality:**
  - RESTful API routes for user authentication and management (`/api/auth`)
  - Product management and listings with bidding functionality (`/api/products`)
  - Lost & found item postings and management
  - Cart and order management (`/api/cart`, `/api/orders`)
  - File upload handling and cloud storage integration (`/api/upload`)
  - Middleware for token verification, admin authorization, and multipart data handling
- **Configuration:** Uses environment variables for MongoDB connection, Cloudinary API keys, Stripe keys, and server port.

## Frontend

- **Tech Stack:** React 19, Vite, Redux Toolkit for state management, React Router DOM for client-side routing, Tailwind CSS for styling.
- **Features:**
  - User authentication with JWT token handling
  - Product browsing, categorized listings, and detailed product views
  - Posting digital, electronics, fashion, pre-owned, lost & found, and miscellaneous items
  - Bidding system with bid management and winner selection
  - Shopping cart and order placement with order summaries and confirmations
  - Admin dashboards for managing users and products
  - Responsive layout with reusable components for Navbar, Footer, product cards, search, and sorting.

## Features

- User registration, login, profile management
- Browse various product categories including new, pre-owned, electronics, digital, fashion items
- Post lost and found items to aid community recovery efforts
- Bid on auction-style product listings with bid management for sellers
- Shopping cart and checkout integrated
- Admin features for managing users, products, and orders
- Cloud-based image uploads and management with Cloudinary

## Installation & Setup

### Backend

1. Navigate to the backend directory:
   ```bash
   cd mern/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```env
   PORT=5000
   DB_URL=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```
4. Start the backend server (development mode with nodemon):
   ```bash
   npm run start:dev
   ```

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd mern/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

## Usage

- Run backend and frontend concurrently as described above.
- Backend server runs on `http://localhost:5000`
- Frontend development server runs on `http://localhost:5173`
- Access the application via the frontend URL to browse products, post items, bid, and manage orders.

## Environment Variables

You need to provide the following environment variables in the backend `.env` file:

- `PORT` — port to run Express server (default 5000)
- `DB_URL` — MongoDB connection string
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — Cloudinary credentials for image uploads

## Author

Yeaish Turj

---
