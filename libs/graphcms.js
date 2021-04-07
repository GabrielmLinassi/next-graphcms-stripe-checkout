import { GraphQLClient } from "graphql-request";

const graphcmsClient = new GraphQLClient(process.env.GRAPHCMS_API);
export default graphcmsClient;
