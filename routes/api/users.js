const router = require("express").Router();
const {
  getUsers,
  registerUser,
  loginUser,
  deleteUser
} = require("../../controllers/users");
const protected = require("../../middleware/authMiddleware");

router.get("/", protected, getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/:id", deleteUser);

module.exports = router;
