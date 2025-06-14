const Router = require("express-promise-router");
const router = Router({ mergeParams: true });

const {
  addProducts,
  getProducts,
  getDetails,
  addReviews,
  getReviews,
} = require("../../controllers/productController");

module.exports = () => {
  router.route("/addProducts").post(addProducts);
  router.route("/productDetails").post(getDetails);
  router.route("/addReview").post(addReviews);
  router.route("/getReviews").post(getReviews);
  router.route("/:tag").get(getProducts);
  router.route("/").get((req, res) => {
    res.send([]);
  });

  return router;
};
