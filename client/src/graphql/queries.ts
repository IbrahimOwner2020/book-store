import { gql } from "@apollo/client";

const GET_BOOKS = gql`
	query GetBooks {
		books {
			id
			name
			genre
		}
	}
`;

const GET_BOOK = gql`
	query GetBook($id: ID!) {
		book(id: $id) {
			id
			name
			genre
			author {
				name
				age
			}
		}
	}
`;

export { GET_BOOKS, GET_BOOK };
