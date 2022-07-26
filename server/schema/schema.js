const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList } = graphql;
// dummy data for testing
const books = [
	{
		id: 1,
		name: "Name of the Wind",
		genre: "Fantasy",
        authorId: "2"
	},
	{
		id: 2,
		name: "End of Watch",
		genre: "Science Fiction",
        authorId: "1"
	},
	{
		id: 3,
		name: "Night of the Living Dead",
		genre: "Fantasy",
        authorId: "2"
	},
	{
		id: 4,
		name: "Wakanda",
		genre: "Fantasy science fiction",
        authorId: "2"
	},
	{
		id: 5,
		name: "The Hobbit",
		genre: "Fantasy",
        authorId: "1"
	},
	{
		id: 6,
		name: "A Game of Thrones",
		genre: "Fantasy",
        authorId: "2"
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
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return authors.find(author => author.id === parent.authorId);
            }
        }
	}),
});

const AuthorType = new GraphQLObjectType({
	name: "Author",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLString },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books.filter(book => book.authorId === parent.id); 
            }
        }
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
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors;
            }
        }
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
