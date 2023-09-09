import graphql from "graphql";
const { GraphQLObjectType, GraphQLInt, GraphQLString } = graphql;

export const Clinic = new GraphQLObjectType({
  name: "Clinic",
  fields: () => ({
    id: { type: GraphQLInt },
    slug: { type: GraphQLString },
    name: { type: GraphQLString },
    longName: { type: GraphQLString },
    suburbSlug: { type: GraphQLString },
    city: { type: GraphQLString },
    suburbName: { type: GraphQLString },
    fullAddress: { type: GraphQLString },
    pms: { type: GraphQLString },
    metaTitle: { type: GraphQLString },
    metaDesc: { type: GraphQLString },
    typeform: { type: GraphQLString },
    website: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    about: { type: GraphQLString },
    state: { type: GraphQLString },
    postCode: { type: GraphQLString },
  }),
});
