const express = require('express')
const app = express();
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config()
connectDB()

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://shop-management-system-gray-zeta.vercel.app"
    ],
    credentials: true,
    methods: "GET,POST,PUT,DELETE,PATCH"
}))

const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.end('API is running')
})

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/products', require('./routes/productRoute'))

app.listen(3000, () => {
    console.log('port connected')
});