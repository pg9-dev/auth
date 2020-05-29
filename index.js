const express = require('express');
const app = express(); 
const PORT = 3000; 

// Importing routes
const authRoute = require('./routes/auth'); 

// Route MiddleWare
app.use('/api/user', authRoute); 

app.listen(PORT, () => console.log("Server is running on port: " + PORT)); 