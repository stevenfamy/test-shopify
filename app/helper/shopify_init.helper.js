// import "@shopify/shopify-api/adapters/node";

require("@shopify/shopify-api/adapters/node");

const {
  shopifyApi,
  DeliveryMethod,
  LATEST_API_VERSION,
} = require("@shopify/shopify-api");
const { shopifyConf } = require("../../config/config");

const callbackHost = "864f-2001-448a-1021-6fb7-6866-a268-f48e-862f.ngrok.io";

//init shopify API
const shopify = shopifyApi({
  // The next 4 values are typically read from environment variables for added security
  apiKey: shopifyConf.clientId,
  apiSecretKey: shopifyConf.secret,
  scopes: ["read_orders", "read_fulfillments"],
  hostName: callbackHost,
});

const webhookUrl = `https://${callbackHost}/api/shopify/webhook`;

//WEBHOOK CALLBACK HANDLER
const handleWebhookRequest = async (
  topic,
  shop,
  webhookRequestBody,
  webhookId,
  apiVersion
) => {
  const sessionId = shopify.session.getOfflineId(shop);
  //??
  // Fetch the session from storage and process the webhook event
};

//Register webhook handler to library
shopify.webhooks.addHandlers({
  FULFILLMENTS_CREATE: [
    {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: webhookUrl,
      callback: handleWebhookRequest,
    },
  ],
});

//func to generate auth link
exports.shopifyAuthentication = async (req, res) => {
  try {
    const authRes = await shopify.auth.begin({
      shop: shopify.utils.sanitizeShop(
        "quickstart-c2039487.myshopify.com",
        true
      ),
      callbackPath: `/api/shopify/auth/callback`,
      isOnline: false,
      rawRequest: req,
      rawResponse: res,
    });
  } catch (e) {
    console.error(e);
  }
};

//handle auth link callback
exports.shopifyAuthCallback = async (req, res) => {
  try {
    console.log(req.cookies);
    const callback = await shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });
    console.log(callback);

    //SAVE SESSIONS ID

    //REGISTER CREATED WEBHOOK
    const response = await shopify.webhooks.register({
      session: callback.session,
    });
    console.log(response);
    console.log(response["FULFILLMENTS_CREATE"][0].result);
  } catch (e) {
    console.error(e);
  }

  return res.sendStatus(200);
};

//handle webhook request
exports.shopifyWebhook = async (req, res) => {
  try {
    // Note: the express.text() given above is an Express middleware that will read
    // in the body as a string, and make it available at req.body, for this path only.
    const webhookRes = await shopify.webhooks.process({
      rawBody: req.body, // is a string
      rawRequest: req,
      rawResponse: res,
    });

    console.log(webhookRes);
  } catch (error) {
    console.log(error.message);
  }
};
