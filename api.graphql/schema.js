import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} from 'graphql';
import issuesJSON from '../data/issues.json';
import employeesJSON from '../data/employees.json';
import fs from 'fs';
import path from 'path';

const store = {};

// Some helper methods to load CSV into JSON, which were removed for brevity's sake.
const customerJson = loadCsv();

const ProductsType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    quantity: { type: GraphQLInt },
  }),
});

const CartProduct = new GraphQLObjectType({
  name: 'Store',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    quantity: { type: GraphQLInt },
    amount: { type: GraphQLInt },
  }),
});

export default new GraphQLSchema({
  query: ProductsType,
});
