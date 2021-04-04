import CommerceSDK from "@chec/commerce.js";
const commerceClient = new CommerceSDK(process.env.NEXT_PUBLIC_COMMERCEJS_PK);

export default commerceClient;
