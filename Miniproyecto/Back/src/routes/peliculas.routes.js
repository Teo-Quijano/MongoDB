const { Router } = require("express");
const router = Router();

const {
  getPelicula,
  postPelicula,
  putPelicula,
  deletePelicula,
} = require("../controller/peliculas.controller");
const {
  getActor,
  postActor,
  deleteActor,
} = require("../controller/actor.controller");
const {
  getDirector,
  postDirector,
  deleteDirector,
} = require("../controller/director.controller");
const {
  getGuionista,
  postGuionista,
  deleteGuionista,
} = require("../controller/guionista.controller");
const { getProductora } = require("../controller/productora.controller");

router.get("/", getPelicula);
router.post("/", postPelicula);
router.put("/", putPelicula);
router.delete("/", deletePelicula);

router.get("/actor", getActor);
router.post("/actor", postActor);
router.delete("/actor", deleteActor);

router.get("/director", getDirector);
router.post("/director", postDirector);
router.delete("/director", deleteDirector);

router.get("/guionista", getGuionista);
router.post("/guionista", postGuionista);
router.delete("/guionista", deleteGuionista);

router.get("/productora", getProductora);

module.exports = router;
