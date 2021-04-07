const fetchProducts = gql`
  {
    products {
      id
      name
      price
      slug
      images(first: 1) {
        id
        url(transformation: { image: { resize: { width: 500, height: 500, fit: crop } } })
        fileName
        height
        width
      }
    }
  }
`;
