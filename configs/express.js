const express = require("express");
const cors = require('cors');
const helmet = require('helmet');

const { authenticateUser } = require('../middlewares/authenticateUser');
const { handleWebhooks } = require('../controllers/paymentController');

const masterRoute = require('../routes/masterRoutes');

module.exports = () => {
  const app = express();

  app.use(
    cors({
      credentials: true,
      origin: process.env.ORIGIN_URL,
      exposedHeaders: ['authorization', 'refresh-token'],
    })
  );

  app.use(helmet());

  // Middleware to authenticate Customer

  app.use(async (req, res, next) => {

    const unVerifiedRoutes =
      req.path.includes("/products") ||
      req.path.includes("/api/payments/webhooks") ||
      req.path.includes("/users");
    if (unVerifiedRoutes) {
      return next();
    }
    await authenticateUser(req, res, next);
  });

  app.post('/api/payments/webhooks', express.raw({ type: 'application/json' }), handleWebhooks);

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use('/api', masterRoute());
  
  return app;
}
