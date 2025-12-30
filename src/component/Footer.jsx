
import { Instagram, Twitter, Linkedin, Youtube, Facebook } from "lucide-react";

function footer() {

	// Les données des colonnes de liens
	const footerLinks = [
		{
			title: "Use cases",
			links: [
				"UI design",
				"UX design",
				"Wireframing",
				"Diagramming",
				"Brainstorming",
				"Online whiteboard",
				"Team collaboration",
			],
		},
		{
			title: "Explore",
			links: [
				"Design",
				"Prototyping",
				"Development features",
				"Design systems",
				"Collaboration features",
				"Design process",
				"FigJam",
			],
		},
		{
			title: "Resources",
			links: [
				"Blog",
				"Best practices",
				"Colors",
				"Color wheel",
				"Support",
				"Developers",
				"Resource library",
			],
		},
	];

	return (
		<footer className="bg-black text-white py-16 px-6 font-sans border-t border-white/10">
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
				{/* Colonne 1 : Logo + Réseaux Sociaux */}
				<div className="flex flex-col gap-6">
					{/* Logo (J'ai refait le logo style Figma en SVG pour que ça ressemble à ton image) */}
					<div className="mb-2">
						<svg
							width="30"
							height="45"
							viewBox="0 0 30 45"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M7.5 45C3.35786 45 0 41.6421 0 37.5C0 33.3579 3.35786 30 7.5 30H15V45H7.5Z"
								fill="#0ACF83"
							/>
							<path
								d="M0 22.5C0 18.3579 3.35786 15 7.5 15H15V30H7.5C3.35786 30 0 26.6421 0 22.5Z"
								fill="#A259FF"
							/>
							<path
								d="M0 7.5C0 3.35786 3.35786 0 7.5 0H15V15H7.5C3.35786 15 0 11.6421 0 7.5Z"
								fill="#F24E1E"
							/>
							<path
								d="M15 0H22.5C26.6421 0 30 3.35786 30 7.5C30 11.6421 26.6421 15 22.5 15H15V0Z"
								fill="#FF7262"
							/>
							<path
								d="M30 22.5C30 26.6421 26.6421 30 22.5 30C18.3579 30 15 26.6421 15 22.5C15 18.3579 18.3579 15 22.5 15C26.6421 15 30 18.3579 30 22.5Z"
								fill="#1ABCFE"
							/>
						</svg>
					</div>

					{/* Icônes Réseaux Sociaux */}
					<div className="flex items-center gap-5">
						<a
							href="#"
							className="hover:text-gray-400 transition-colors"
						>
							{/* Icône X (Twitter) manuelle car Lucide a parfois l'oiseau selon la version */}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="22"
								height="22"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M4 4l11.733 16h4.267l-11.733 -16z" />
								<path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
							</svg>
						</a>
						<a
							href="#"
							className="hover:text-gray-400 transition-colors"
						>
							<Instagram size={22} />
						</a>
						<a
							href="#"
							className="hover:text-gray-400 transition-colors"
						>
							<Youtube size={22} />
						</a>
						<a
							href="#"
							className="hover:text-gray-400 transition-colors"
						>
							<Linkedin size={22} />
						</a>
					</div>
				</div>

				{/* Colonnes 2, 3, 4 : Les Liens (Map) */}
				{footerLinks.map((column, index) => (
					<div key={index}>
						<h3 className="font-bold text-white mb-6">
							{column.title}
						</h3>
						<ul className="space-y-4">
							{column.links.map((link, linkIndex) => (
								<li key={linkIndex}>
									<a
										href="#"
										className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
									>
										{link}
									</a>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</footer>
	);
};

export default footer;
