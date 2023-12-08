const dotenv = require("dotenv");

module.exports = {
  shopifyConf: {
    clientId: process.env.SHOPIFY_CLIENT_ID,
    secret: process.env.SHOPIFY_SECRET,
  },
};
