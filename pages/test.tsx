import { getProduct } from "libs/commercejs";

export async function getServerSideProps() {
  const { data } = await getProduct("prod_gvRjwO9YZ54mNL");

  return {
    props: {
      product: data,
    },
  };
}

export default function test() {
  return <div>test</div>;
}
