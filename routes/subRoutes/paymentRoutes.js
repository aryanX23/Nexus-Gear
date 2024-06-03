const Router = require('express-promise-router');
const router = Router({ mergeParams: true });

const { getCart, handlePayment, setCart } = require('../../controllers/paymentController');

module.exports = () => {

  router.route('/getCart/:id').get(getCart);
  router.route('/create-checkout-session').post(handlePayment);
  router.route('/setCart').post(setCart);
  
  return router
};