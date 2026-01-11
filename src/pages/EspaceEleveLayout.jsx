import React from "react";
import { Outlet } from "react-router-dom";
import HeaderEleve from "../component/HeaderEleve";

function EspaceEleveLayout() {
	return (
		<div className="bg-black min-h-screen">
			<HeaderEleve />
			<main>
				<Outlet />
			</main>
		</div>
	);
}

export default EspaceEleveLayout;
