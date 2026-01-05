import React from "react";
import { Github, Chrome } from "lucide-react";

export const SocialButtons = () => (
	<div className="grid grid-cols-2 gap-3">
		<button
			type="button"
			className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-sm font-medium transition-all text-white hover:border-zinc-700"
		>
			<Github size={18} />
			GitHub
		</button>
		<button
			type="button"
			className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-sm font-medium transition-all text-white hover:border-zinc-700"
		>
			<Chrome size={18} className="text-white" />
			Google
		</button>
	</div>
);

export const Divider = ({ text }) => (
	<div className="relative flex py-2 items-center">
		<div className="flex-grow border-t border-zinc-800"></div>
		<span className="flex-shrink-0 mx-4 text-gray-500 text-xs uppercase font-medium tracking-wide">
			{text}
		</span>
		<div className="flex-grow border-t border-zinc-800"></div>
	</div>
);
