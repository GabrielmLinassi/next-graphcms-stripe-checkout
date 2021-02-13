import { gql, GraphQLClient } from "graphql-request";

const algoliasearch = require("algoliasearch");

const client = algoliasearch("MRLYG735R2", "553f555a65bcc73f82e29ffdc73e503b");
const index = client.initIndex("products");

const graphcms = new GraphQLClient(process.env.GRAPHCMS_API);

export default async (req, res) => {
  try {
    const { data: product } = req.body;
    const minifiedProduct = await minifyProduct(product);
    console.log(minifiedProduct);
    await index.saveObject(minifiedProduct);
    res.send(201);
  } catch (err) {
    console.log(err);
    res.status(400).send(err?.message);
  }
};

async function minifyProduct({ id, description, name, price, slug }) {
  const QueryFetchImage = gql`
    query fetchImages($slug: String!) {
      product(where: { slug: $slug }) {
        images {
          id
          url
        }
      }
    }
  `;

  const fetchImages = (slug) => graphcms.request(QueryFetchImage, { slug });

  const {
    product: { images },
  } = await fetchImages(slug);

  const imageURLs = images.map(({ url }) => url);

  return { objectID: id, description, name, price, slug, images: imageURLs };
}
