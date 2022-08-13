import { ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

console.log(process.env.REACT_APP_BACKEND_URI)
const client = new ApolloClient({
	uri: process.env.REACT_APP_BACKEND_URI,
	cache: new InMemoryCache(),
});

root.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<ColorModeScript />
			<App />
		</ApolloProvider>
	</React.StrictMode>
);
