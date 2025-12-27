import { useState } from "react";

import Header from "./component/header";
import "./App.css";
import Acceuil from "./pages/Acceuil.jsx";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<Header />
			<Acceuil />
		</>
	);
}

export default App;
