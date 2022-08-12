import React from "react";
import { useQuery } from "@apollo/client";
import { Box, Heading } from "@chakra-ui/react";
import { GET_BOOK } from "./../graphql/queries";

const Book = (): JSX.Element => {
	const { loading, error, data } = useQuery(GET_BOOK, {
		variables: { id: "62dfd071f62b27199e664564" },
        pollInterval: 2000,
	});

	console.log(loading);
	console.log(error);
	console.log(data);

	return (
		<Box>
			<Heading>Book</Heading>
		</Box>
	);
};

export default Book;
