const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;
// dummy data for testing
const books = [
	{
		id: 1,
		name: "Name of the Wind",
		genre: "Fantasy",
	},
	{
		id: 2,
		name: "Name of the Wind",
		genre: "Fantasy",
	},
	{
		id: 3,
		name: "Name of the Wind",
		genre: "Fantasy",
	},
];

const authors = [
	{
		name: "Ibrahim",
		age: "25",
		id: "1",
	},
	{
		name: "Ahmad",
		age: "25",
		id: "2",
	},
];

const BookType = new GraphQLObjectType({
	name: "Book",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
	}),
});

const AuthorType = new GraphQLObjectType({
	name: "Author",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLString },
	}),
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return books.find((e) => e.id == args.id);
			},
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return authors.find((e) => e.id == args.id);
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
