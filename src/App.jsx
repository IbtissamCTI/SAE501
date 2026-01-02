import { Outlet, useLocation } from "react-router-dom";

import Header from "./component/Header";

import HeaderEleve from "./component/HeaderEleve";
import Footer from "./component/Footer";

function App() {
	const location = useLocation();
	const isElevePage = location.pathname.startsWith("/eleve");

	return (
		<>
			{isElevePage ? <HeaderEleve /> : <Header />}
			<main>
				<Outlet />
			</main>
			{!isElevePage && <Footer />}
		</>
	);
}

export default App;
