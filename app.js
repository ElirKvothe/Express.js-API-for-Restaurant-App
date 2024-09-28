const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const companyRoutes = require('./routes/companyRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const foodRoutes = require('./routes/foodRoutes');
const basketRoutes = require('./routes/basketRoutes');
const orderRoutes = require('./routes/orderRoutes');
const commentRoutes = require('./routes/commentRoutes');  // Yorum rotalarını ekle

const app = express();
app.use(bodyParser.json()); // Gelen JSON verilerini işlemek için body-parser kullan

// Users API rotası
app.use('/users', userRoutes);

// Companies API rotası
app.use('/companies', companyRoutes);

// Restaurants API rotası
app.use('/restaurants', restaurantRoutes);

// Foods API rotası
app.use('/foods', foodRoutes);

// Baskets API rotası
app.use('/baskets', basketRoutes);

// Orders API rotası
app.use('/orders', orderRoutes);

// Comments API rotası
app.use('/comments', commentRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`API is running on http://localhost:${port}`);
});
