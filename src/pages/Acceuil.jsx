import { Globe } from "lucide-react";
function FeatureCard({ icon, title, description, gradient }) {
	return (
		<div
			className={`py-20 rounded-2xl bg-slate-950 border border-slate-800 hover:border-indigo-500/30 transition-all duration-300 group relative overflow-hidden`}
		>
			<div
				className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
			></div>

			<div className="relative z-40">
				<div className="w-12 h-12 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 group-hover:bg-slate-800/50">
					{icon}
				</div>
				<h3 className="text-xl font-bold text-white mb-3">{title}</h3>
				<p className="text-slate-400 leading-relaxed text-sm">
					{description}
				</p>
			</div>
		</div>
	);
}
function acceuil() {
	return (
		<>
			<section className="p-40 w-auto h-auto flex flex-col justify-center items-center text-center px-4 relative overflow-hidden ">
				<div
					className={`inline-block px-9 py-1 rounded-full border-4 text-lg mb-6 bg-opacity-40 font-semibold text-2xl`}
					style={{
						backgroundColor: "#431EA7",
						borderColor: "#2F008D",
						color: "#8D83E0",
					}}
				>
					Nouvelle rentre 2026
				</div>
				<div>
					<h1 className="mt-14  font-bold text-8xl font-bold text-white">
						L'Excellence du Code{" "}
						<span
							style={{
								background:
									"linear-gradient(90deg, rgba(38, 28, 202, 1) 0%, rgba(88, 80, 220, 1) 50%, rgba(168, 124, 243, 1) 100%)",
								WebkitBackgroundClip: "text",
								backgroundClip: "text",
								color: "transparent",
							}}
						>
							Accessible à Tous.
						</span>
					</h1>
					<p
						className="mt-8 text-3xl text-gray-300 leading-loose "
						style={{
							color: "#999999",
						}}
					>
						Ne vous contentez pas d'apprendre la syntaxe. Devenez un
						ingénieur logiciel complet grâce à notre pédagogie par
						projet et notre mentorat d'élite.
					</p>
				</div>

				<div className="flex gap-8 justify-center">
					<button
						className="mt-10 text-white px-8 py-4 rounded-2xl transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] font-semibold text-2xl"
						style={{
							background:
								"linear-gradient(90deg, rgba(38, 28, 202, 1) 0%, rgba(88, 80, 220, 1) 70%, rgba(168, 124, 243, 1) 100%)",
							color: "white",
						}}
					>
						Explore les formations
					</button>
					<button
						className="mt-10 bg-white border-2 border-indigo-600  px-8 py-4 rounded-2xl transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] font-semibold text-2xl"
						style={{
							color: "rgba(168, 124, 243, 1)",
						}}
					>
						Explore les formations
					</button>
				</div>
			</section>
			<section className="bg-gray-800">
				<div className="flex justify-center items-center ">
					<h2 className="my-5 text-white text-lg font-bold">
						NOS ALUMNI TRAVAILLENT CHEZ
					</h2>
					<div className="bg scroll mx-10 my-5 overflow-x-hidden whitespace-nowrap scrollbar-hide">
						<img src="" alt="caca" />
						<img src="" alt="caca" />
						<img src="" alt="caca" />
						<img src="" alt="caca" />
						<img src="" alt="caca" />
						<img src="" alt="caca" />
						<img src="" alt="caca" />
					</div>
				</div>
			</section>
			<section className="inline justify-between">
				<h1 className="text-white text-6xl my-10 font-bold text-center ">
					Pourquoi Novatio est different ?
				</h1>
				<div className="grid md:grid-cols-3 gap-8">
					<FeatureCard
						icon={<Globe className="w-6 h-6 text-indigo-300" />}
						title="Apprentissage par Projets "
						description="Codez des applications réelles (Netflix clone, API E-commerce, SaaS) que vous pourrez mettre dans votre portfolio."
						gradient="from-indigo-500/20 to-indigo-500/5"
					/>
					<FeatureCard
						icon={<Globe className="w-6 h-6 text-indigo-300" />}
						title="Apprentissage par Projets "
						description="Codez des applications réelles (Netflix clone, API E-commerce, SaaS) que vous pourrez mettre dans votre portfolio."
						gradient="from-indigo-500/20 to-indigo-500/5"
					/>
					<FeatureCard
						icon={<Globe className="w-6 h-6 text-indigo-300" />}
						title="Apprentissage par Projets "
						description="Codez des applications réelles (Netflix clone, API E-commerce, SaaS) que vous pourrez mettre dans votre portfolio."
						gradient="from-indigo-500/20 to-indigo-500/5"
					/>
				</div>
			</section>
		</>
	);
}

export default acceuil;
