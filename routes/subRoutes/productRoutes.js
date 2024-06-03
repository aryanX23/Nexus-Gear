const Router = require('express-promise-router');
const router = Router({ mergeParams: true });

const { addProducts, getProducts, getDetails } = require('../../controllers/productController');

module.exports = () => {
    router.route("/addProducts").post(addProducts);
    router.route("/productDetails").post(getDetails);
    router.route("/:tag").get(getProducts);
    router.route('/').get((req, res) => {
        res.send([]);
    });

    return router
};