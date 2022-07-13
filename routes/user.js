const express = require('express');

const router = express.Router();

const User = require("../models/User");

const { createAccount, viewAccount, withdraw, deposit, deleteAccount } = require("../controllers/user");

router.route("/create").post(createAccount);
router.route('/view/:id').get(viewAccount);
router.route('/withdraw/:id').post(withdraw);
router.route("/deposit/:id").post(deposit);
router.route("/delete/:id").delete(deleteAccount);

module.exports = router;





