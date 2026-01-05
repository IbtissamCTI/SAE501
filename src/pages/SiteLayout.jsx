import { Outlet, Link } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";

function SiteLayout() {
	return (
		<>
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

export default SiteLayout;
