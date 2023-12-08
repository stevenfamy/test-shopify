const express = require("express");
const shopifyRoutes = require("express").Router();
const shopifyHelper = require("../helper/shopify_init.helper");

shopifyRoutes.get("/auth/begin", shopifyHelper.shopifyAuthentication);
shopifyRoutes.get("/auth/callback", shopifyHelper.shopifyAuthCallback);
shopifyRoutes.post(
  "/webhook",
  express.text({ type: "*/*" }),
  shopifyHelper.shopifyAuthCallback
);

module.exports = shopifyRoutes;
