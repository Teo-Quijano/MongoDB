const { Router } = require("express");
const router = Router();

const {
  getProfesional,
  postProfesional,
  putProfesional,
  deleteProfesional,
} = require("../controller/profesionales.controller");

router.get("/", getProfesional);
router.post("/", postProfesional);
router.put("/", putProfesional);
router.delete("/", deleteProfesional);

module.exports = router;
