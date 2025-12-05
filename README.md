# 🏪 Shop Management System

A full-stack web application for managing shop inventory, products, and user authentication with role-based access control.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Authentication & Authorization
- User registration and login
- JWT-based authentication
- Role-based access control (Admin & Employee)
- Secure password hashing with bcrypt

### Inventory Management
- Add, edit, and delete products
- Track product details (name, SKU, price, quantity, category)
- Real-time inventory updates
- Low stock alerts

### Dashboard
- Overview of total inventory value
- Product count statistics
- Low stock warnings
- Quick access to key metrics

### User Interface
- Modern, responsive design
- Clean and intuitive navigation
- Split-screen authentication pages
- Real-time form validation

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.0 - UI library
- **React Router DOM** 7.9.6 - Client-side routing
- **Axios** 1.13.2 - HTTP client
- **React Icons** 5.5.0 - Icon library
- **Vite** 7.2.2 - Build tool and dev server
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express** 5.1.0 - Web framework
- **MongoDB** - Database
- **Mongoose** 8.19.4 - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/HimanshuPal29/Shop_management_system.git
cd Shop_management_system
```

### 2. Install Server Dependencies

```bash
cd server
npm install
```

### 3. Install Client Dependencies

```bash
cd ../client
npm install
```

## ⚙️ Configuration

### Server Configuration

1. Create a `.env` file in the `server` directory:

```bash
cd server
touch .env
```

2. Add the following environment variables to `.env`:

```env
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
PORT=3000
```

**Example:**
```env
MONGO_URI=mongodb://localhost:27017/shop_management
SECRET_KEY=your_super_secret_jwt_key_here
PORT=3000
```

> **Note:** If using MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

### Client Configuration

The client is configured to connect to `http://localhost:3000/api` by default. If you change the server port, update the API base URL in `client/src/api/api.js`.

## 🏃 Running the Application

### Option 1: Run Both Servers Separately

#### Terminal 1 - Start the Backend Server

```bash
cd server
node index.js
```

The server will start on `http://localhost:3000`

#### Terminal 2 - Start the Frontend Client

```bash
cd client
npm run dev
```

The client will start on `http://localhost:5174` (or 5173)

### Option 2: Using Nodemon (Development)

For automatic server restarts during development:

```bash
cd server
npx nodemon index.js
```

## 📁 Project Structure

```
Shop_management_system/
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── api/              # API configuration
│   │   │   └── api.js        # Axios instance
│   │   ├── context/          # React Context
│   │   │   └── AuthContext.jsx
│   │   ├── pages/            # Page components
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Inventory.jsx
│   │   │   └── AddProduct.jsx
│   │   ├── services/         # API services
│   │   │   └── authService.js
│   │   ├── App.jsx           # Main app component
│   │   ├── index.css         # Global styles
│   │   └── main.jsx          # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── server/                    # Backend Node.js application
│   ├── config/
│   │   └── db.js             # Database connection
│   ├── controllers/
│   │   ├── authController.js # Authentication logic
│   │   └── productController.js
│   ├── middleware/
│   │   └── authMiddleware.js # JWT verification
│   ├── models/
│   │   ├── user.js           # User schema
│   │   └── product.js        # Product schema
│   ├── routes/
│   │   ├── authRoutes.js     # Auth endpoints
│   │   └── productRoute.js   # Product endpoints
│   ├── .env                  # Environment variables
│   ├── index.js              # Server entry point
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |

### Product Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/products` | Get all products | Protected |
| POST | `/api/products` | Add new product | Protected |
| PUT | `/api/products/:id` | Update product | Protected |
| DELETE | `/api/products/:id` | Delete product | Protected |

## 📸 Screenshots

### Authentication Pages
- Split-screen design with branding on the left
- Clean form inputs with validation
- Role selection (Admin/Employee)

### Dashboard
- Real-time inventory statistics
- Total inventory value
- Low stock alerts
- Quick navigation to key features

### Inventory Management
- Product listing with search and filter
- Add/Edit/Delete functionality
- Category-based organization
- Stock level indicators

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Himanshu Pal**
- GitHub: [@HimanshuPal29](https://github.com/HimanshuPal29)

## 🐛 Known Issues & Troubleshooting

### Server Connection Issues
If you encounter `ERR_CONNECTION_REFUSED`:
- Ensure the backend server is running on port 3000
- Check that MongoDB is connected successfully
- Verify the `.env` file is properly configured

### Port Already in Use
If port 5173/5174 is in use:
- Vite will automatically try the next available port
- Or manually kill the process using the port

### MongoDB Connection Failed
- Verify MongoDB is running locally or Atlas connection string is correct
- Check network connectivity
- Ensure IP whitelist is configured (for Atlas)

## 🔮 Future Enhancements

- [ ] Sales tracking and reporting
- [ ] Multi-store support
- [ ] Export data to CSV/PDF
- [ ] Email notifications for low stock
- [ ] Advanced analytics dashboard
- [ ] Mobile responsive improvements
- [ ] Dark mode support

---

**Made with ❤️ for efficient shop management**
