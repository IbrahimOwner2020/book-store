import React from "react";
import { Heading, Box, Text, Button } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { DELETE_BOOK } from "../graphql/mutations";

type Book = {
	name: string;
	id: string;
	genre: string;
};

const BookItem: React.FC<{ book: Book }> = ({ book }): JSX.Element => {
	const [deleteBook, { loading, error, data }] = useMutation(DELETE_BOOK, {
		refetchQueries: ["GetBooks"],
	});
	console.log(data);
	console.log(loading);
	console.log(error);

	return (
		<Box p="20px" w="full" borderWidth="1px">
			<Heading fontSize="xl">{book.name}</Heading>
			<Text mt={4}>{book.genre}</Text>
			<Button
				onClick={() => {
					console.log(book.id);
					console.log(`Deleting ${book.name}`);
					deleteBook({
						variables: {
							id: book.id,
						},
					});
				}}
				colorScheme="red"
				size="xs"
			>
				Button
			</Button>
		</Box>
	);
};

export default BookItem;
