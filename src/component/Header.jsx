import { useState, useEffect } from "react";
import { Zap } from "lucide-react";

function header() {
	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	return (
		
			<nav
				className={`fixed w-full z-50 transition-all duration-300 border-b border-transparent ${
					scrolled || isMenuOpen
						? "bg-slate-950/80 backdrop-blur-md border-slate-800 py-4"
						: "bg-transparent py-6"
				}`}
			>
				<div className="mx-auto px-6 flex justify-between items-center">
					<div className="flex items-center gap-2.5 font-bold text-2xl tracking-tighter text-white cursor-pointer hover:text-indigo-400 transition-colors">
						<div className="bg-indigo-600 p-1.5 rounded-lg">
							<Zap
								className="h-5 w-5 text-white"
								fill="currentColor"
							/>
						</div>
						<span>MonProjet.</span>
					</div>

					{/* Desktop Menu */}
					<div className="hidden md:flex space-x-8 items-center font-medium text-sm text-slate-300">
						<a
							href="#home"
							className="hover:text-white transition-colors"
						>
							Accueil
						</a>
						<a
							href="#features"
							className="hover:text-white transition-colors"
						>
							Services
						</a>
						<a
							href="#about"
							className="hover:text-white transition-colors"
						>
							À propos
						</a>
						<a
							href="#testimonials"
							className="hover:text-white transition-colors"
						>
							Témoignages
						</a>
						<button className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-full transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] font-semibold">
							Commencer
						</button>
					</div>
				</div>
			</nav>
	);
}

export default header;
