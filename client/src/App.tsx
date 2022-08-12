import React from "react";
import { ChakraProvider, Box, theme, VStack } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import Book from "./components/Book";
import AddBook from "./components/AddBook";
import BookItem from "./components/BookItem";
import { GET_BOOKS } from "./graphql/queries";

const App: React.FC = (): JSX.Element => {
	const { loading, error, data } = useQuery(GET_BOOKS);
	console.log(loading);
	console.log(error);

	if (loading) {
		return <p>...fetching data</p>;
	}

	if (error) {
		console.log(error);
		return <p>Error Occured during fetching data</p>;
	}

	return (
		<ChakraProvider theme={theme}>
			<Box
				textAlign="center"
				fontSize="xl"
				maxWidth="600px"
				mx="auto"
				my="30px"
			>
				<VStack spacing="30px">
					{data &&
						data.books.map((book: any) => (
							<BookItem key={book.id} book={book} />
						))}
				</VStack>
				<Book />
				<AddBook />
			</Box>
		</ChakraProvider>
	);
};

export default App;
