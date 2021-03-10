var express = require("express");
var router = express.Router();
const service = require("../service/categoryService");
/* GET users listing. */
router.get("/", function(req, res, next) {
    res.send("respond with a resource");
});
router.post("/list", service.list);
router.post("/add", service.add);
router.post("/del/:id", service.del);
router.post("/update", service.update);
module.exports = router;