const express = require('express');
const router = express.Router();


const {
    addUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} = require("../controllers/user.controller");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;