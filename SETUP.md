# MERN Setup Guide

## Prerequisites

- Node.js (v16+) and npm installed
- MongoDB running locally or accessible via URI
- Cloudinary account (for image uploads)
- Stripe account (for payment processing)

## Backend Setup

### 1. Install Backend Dependencies

```bash
cd mern/backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `mern/backend` directory with the following variables:

```env
# MongoDB Connection
DB_URL=mongodb://localhost:27017/cuet-trade

# Server Port
PORT=5000

# JWT Secret (create a random string)
JWT_SECRET=your_jwt_secret_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key
```

**Getting Credentials:**

- **MongoDB**: Use local MongoDB or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for free cloud hosting
- **Cloudinary**: Sign up at [Cloudinary](https://cloudinary.com/) - free tier includes generous image storage
- **Stripe**: Sign up at [Stripe](https://stripe.com/) - free tier for testing

### 3. Start MongoDB

**If using local MongoDB:**

```bash
# macOS with Homebrew
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

**Or use MongoDB Atlas (recommended):**

- Create a cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Copy your connection string to the `DB_URL` in `.env`

### 4. Start Backend Server

```bash
cd mern/backend

# Development mode (with auto-reload)
npm run start:dev

# Or production mode
npm start
```

Backend will run on `http://localhost:5000`

---

## Frontend Setup

### 1. Install Frontend Dependencies

```bash
cd mern/frontend
npm install
```

### 2. Start Frontend Development Server

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

---

## Running Both Services

### Option 1: In Separate Terminals

**Terminal 1 (Backend):**

```bash
cd mern/backend
npm run start:dev
```

**Terminal 2 (Frontend):**

```bash
cd mern/frontend
npm run dev
```

### Option 2: Using npm Scripts from Root

If you want to set up root-level scripts, you can add a `package.json` in `/mern`:

```json
{
  "name": "cuet-trade-portal",
  "version": "1.0.0",
  "scripts": {
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "dev:backend": "cd backend && npm run start:dev",
    "dev:frontend": "cd frontend && npm run dev",
    "build:all": "cd backend && npm install && cd ../frontend && npm install && npm run build"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
```

Then install and run:

```bash
npm install
npm run dev
```

---

## Testing the Setup

1. **Backend Health Check:**

   - Open `http://localhost:5000/` in browser
   - Should see: "CUET Trade Portal Backend is running!"

2. **Frontend:**

   - Open `http://localhost:5173/` in browser
   - Frontend should load successfully

3. **API Communication:**
   - Frontend at `http://localhost:5173` will make API calls to `http://localhost:5000`

---

## Troubleshooting

### Backend won't start

- Check if port 5000 is already in use
- Verify MongoDB is running and accessible
- Ensure all `.env` variables are set correctly

### Frontend can't connect to backend

- Check backend is running on port 5000
- Verify CORS is properly configured in backend
- Check browser console for error messages

### MongoDB connection failed

- Verify MongoDB is running: `mongosh` (or `mongo` for older versions)
- If using MongoDB Atlas, check your IP whitelist and connection string
- Ensure `DB_URL` in `.env` is correct

---

## Additional Resources

- [Express.js Docs](https://expressjs.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [React Docs](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Vite Docs](https://vitejs.dev/)
