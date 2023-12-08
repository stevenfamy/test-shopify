const router = require("express").Router();
const shopifyApi = require("./shopify.routes");

router.use("/shopify", shopifyApi);

module.exports = router;
