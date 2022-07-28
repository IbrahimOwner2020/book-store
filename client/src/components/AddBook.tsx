import { useForm, SubmitHandler } from "react-hook-form";
import {
	FormErrorMessage,
	FormLabel,
	FormControl,
	Input,
	Button,
} from "@chakra-ui/react";
import { useMutation, gql } from "@apollo/client";

const ADD_BOOK = gql`
	mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
		addBook(name: $name, genre: $genre, authorId: $authorId) {
			id
			name
			genre
			author {
				name
				age
				id
			}
		}
	}
`;

type Form = {
	name: string;
	genre: string;
	authorId: string;
};

const AddBook = (): JSX.Element => {
	const {
		handleSubmit,
		register,
        reset,
		formState: { errors, isSubmitting },
	} = useForm<Form>();

	const [addBook, { data, loading, error }] = useMutation(ADD_BOOK, {
        refetchQueries: ["GetBooks"],
    });
	console.log(data);
	console.log(loading);
	console.log(error);

	const submit: SubmitHandler<Form> = (values) => {
		addBook({
			variables: values,
		});
        reset();
	};

	return (
		<form onSubmit={handleSubmit(submit)}>
			<FormControl isInvalid={errors.name ? true : false}>
				<FormLabel htmlFor="name">Book name</FormLabel>
				<Input
					id="name"
					placeholder="Book's name"
					{...register("name", {
						required: "Please fill the name of the book",
						minLength: {
							value: 3,
							message: "Minimum length should be 3",
						},
					})}
				/>
				<FormErrorMessage>
					{errors.name && errors.name.message}
				</FormErrorMessage>
			</FormControl>
			<FormControl isInvalid={errors.genre ? true : false}>
				<FormLabel htmlFor="genre">Book genre</FormLabel>
				<Input
					id="genre"
					placeholder="Book's genre"
					{...register("genre", {
						required: "Please fill the genre of the book",
						minLength: {
							value: 3,
							message: "Minimum length should be 3",
						},
					})}
				/>
				<FormErrorMessage>
					{errors.genre && errors.genre.message}
				</FormErrorMessage>
			</FormControl>
			<FormControl isInvalid={errors.authorId ? true : false}>
				<FormLabel htmlFor="authorId">Book authorId</FormLabel>
				<Input
					id="authorId"
					placeholder="Book's Author Id"
					{...register("authorId", {
						required: "Please fill the author's id of the book",
					})}
				/>
				<FormErrorMessage>
					{errors.authorId && errors.authorId.message}
				</FormErrorMessage>
			</FormControl>
			<Button
				mt={4}
				colorScheme="teal"
				isLoading={isSubmitting}
				type="submit"
			>
				Submit
			</Button>
		</form>
	);
};

export default AddBook;
