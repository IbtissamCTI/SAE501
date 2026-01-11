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
// Autre approche niveau interface -> non utilisé 
export default EspaceEleveLayout;
