import { gql } from "@apollo/client";

const DELETE_BOOK = gql`
	mutation DeleteBook($id: ID!) {
		deleteBook(id: $id) {
			name
		}
	}
`;

const ADD_BOOK = gql`
	mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
		addBook(name: $name, genre: $genre, authorId: $authorId) {
			name
			genre
			id
		}
	}
`;
export { DELETE_BOOK, ADD_BOOK };
