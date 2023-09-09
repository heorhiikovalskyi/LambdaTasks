import graphql from "graphql";
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = graphql;
import { Clinic } from "./types.js";
import { ClinicsRepo } from "../repositories/clinicsRepo.js";

const { getByCity, getByName, getByState, getBySuburb, getByZip } = ClinicsRepo.getInstance();

const serverError = { message: "Internal server error", code: 500 };

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getByCity: {
      type: new GraphQLList(Clinic),
      args: { city: { type: GraphQLString } },
      async resolve(parent, args) {
        return await getByCity(args.city).catch((err) => {
          throw serverError;
        });
      },
    },
    getByName: {
      type: new GraphQLList(Clinic),
      args: { name: { type: GraphQLString } },
      async resolve(parent, args) {
        return await getByName(args.name).catch((err) => {
          throw serverError;
        });
      },
    },
    getByState: {
      type: new GraphQLList(Clinic),
      args: { state: { type: GraphQLString } },
      async resolve(parent, args) {
        return await getByState(args.state).catch((err) => {
          throw serverError;
        });
      },
    },
    getBySuburb: {
      type: new GraphQLList(Clinic),
      args: { suburb: { type: GraphQLString } },
      async resolve(parent, args) {
        return await getBySuburb(args.suburb).catch((err) => {
          throw serverError;
        });
      },
    },
    getByZip: {
      type: new GraphQLList(Clinic),
      args: { zip: { type: GraphQLString } },
      async resolve(parent, args) {
        return await getByZip(args.zip).catch((err) => {
          throw serverError;
        });
      },
    },
  },
});

export const schema = new GraphQLSchema({ query: RootQuery });
