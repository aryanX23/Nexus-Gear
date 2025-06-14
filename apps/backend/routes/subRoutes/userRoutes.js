const Router = require("express-promise-router");
const router = Router({ mergeParams: true });

const { addUser, handleLogin } = require("../../controllers/userController");

module.exports = () => {
  router.route("/register").post(addUser);
  router.route("/login").post(handleLogin);
  router.route("/").get((req, res) => {
    res.send("User Routes Working!");
  });
  return router;
};
