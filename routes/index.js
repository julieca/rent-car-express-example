import express from "express";
//
import car from "./car";
import rentTransaction from './rentTransaction'

const router = express.Router();

/* GET index page. */
router.get("/", (req, res) => {
  res.json({
    title: "Express"
  });
});

//router.use(response.setHeadersForCORS);

router.use("/car", car);
router.use("/rent-transaction", rentTransaction);


export default router;