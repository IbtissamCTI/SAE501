import { useState } from "react";

import Header from "./component/header";
import "./App.css";
import Acceuil from "./pages/Acceuil.jsx";
import Footer from "./component/Footer"
function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<Header />
			<Acceuil />
			<Footer />
		</>
	);
}

export default App;
