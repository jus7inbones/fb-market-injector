const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security Header Safeguards & CSP Rules
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "blob:"],
        connectSrc: ["'self'"]
      }
    }
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static portal files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware Endpoint for Listing Submission
app.post('/api/listings', (req, res) => {
  const { title, price, category, description } = req.body;

  if (!title || !price || !category || !description) {
    return res.status(400).json({ status: 'error', message: 'All fields are required.' });
  }

  const payload = {
    id: `FBMP-${Date.now()}`,
    title,
    price: parseFloat(price).toFixed(2),
    category,
    description,
    createdAt: new Date().toISOString()
  };

  console.log('Received Sandboxed Listing Payload:', payload);

  // Here you can route the payload to Meta Commerce API or your private database
  res.status(201).json({
    status: 'success',
    message: 'Listing payload created successfully.',
    data: payload
  });
});

app.listen(PORT, () => {
  console.log(`[Sandboxed Admin Portal] Running on http://localhost:${PORT}`);
});
