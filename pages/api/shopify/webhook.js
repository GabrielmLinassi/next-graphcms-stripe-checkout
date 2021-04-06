const algoliasearch = require("algoliasearch");
const client = algoliasearch("MRLYG735R2", "553f555a65bcc73f82e29ffdc73e503b");
const index = client.initIndex("products-shopify");

export default async function AddtoAlgolia(req, res) {
  //console.log({ product: JSON.stringify(req.body) });

  try {
    const { id, title, body_html, handle, status, variants, images, metafields } = req.body;
    const { price, inventory_quantity } = variants[0];

    const { value: comments } = metafields.find((metafield) => metafield.key === "comments");
    const { value: stars } = metafields.find((metafield) => metafield.key === "rating");

    const product = {
      objectID: id,
      title,
      body_html,
      handle,
      status,
      price,
      inventory_quantity,
      rating: Math.floor(stars),
      stars,
      comments,
      image: images[0].src,
      images: images.map(({ id, src }) => ({
        objectID: id,
        src,
      })),
    };

    console.log({ product });
    await index.saveObject(product);
    res.send(201);
  } catch (err) {
    console.log(err);
    res.status(400).send(err?.message);
  }
}
