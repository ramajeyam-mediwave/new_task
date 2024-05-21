const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/order")
const addressRoute = require("./routes/address")



const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use('/user', userRoutes);
app.use('/order', orderRoutes);
app.use('/address', addressRoute)

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
