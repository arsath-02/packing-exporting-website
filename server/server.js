const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const OrderRoutes = require('./routes/Orders');
const dashboardRoutes = require('./routes/dashboardRoutes');
const dyeRoutes =require("./routes/dyeing");
const manager=require("./routes/manager");
const production=require("./routes/production");
const production_stiches=require("./routes/stiches")
const production_sidemanager=require("./routes/production_sidemanager")
const QualityCheckOrder = require('./routes/Quality_Check'); // make sure this uses CommonJS if needed
const Dye_Emp = require('./routes/Employee');
//const Prod_Emp = require('./routes/')
const app = express();
app.use(cors());
app.use(express.json());




// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders',OrderRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/dyeing', dyeRoutes );
app.use('/Manager',manager);
app.use("/api/production",production);
app.use("/api/production-stiches",production_stiches);
app.use("/api/packing", QualityCheckOrder);
app.use("/api/production_sidemanager",production_sidemanager);
app.use('/api/dye-emp',Dye_Emp)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));