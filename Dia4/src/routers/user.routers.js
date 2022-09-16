const { Router } = require("express");
const router = Router();
const userCtrl = require("../controller/user.controller");

router.get("/user", userCtrl.getFoto);
router.post("/user", userCtrl.postFoto);
router.put("/user", userCtrl.putFoto);
router.delete("/user", userCtrl.deleteFoto);

module.exports = router;