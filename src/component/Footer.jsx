import React from "react";
import { Instagram, Linkedin, Youtube, School, Twitter, Facebook } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
    // Contenu adapté à Novatio (École de code)
    const footerLinks = [
        {
            title: "Nos Formations",
            links: [
                { name: "Développeur Fullstack", path: "/formation#fullstack" },
                { name: "Data Analyst", path: "/formation#data" },
                { name: "Cybersécurité", path: "/formation#cyber" },
                { name: "UX/UI Design", path: "/formation#design" },
                { name: "Alternance", path: "/formation#alternance" },
            ],
        },
        {
            title: "L'École",
            links: [
                { name: "À propos de nous", path: "/#about" },
                { name: "Notre pédagogie", path: "/#features" },
                { name: "Témoignages Alumni", path: "/#testimonials" },
                { name: "Financement & CPF", path: "/#finance" },
                { name: "Devenir Intervenant", path: "/recrutement" },
            ],
        },
        {
            title: "Légal & Aide",
            links: [
                { name: "Mentions Légales", path: "/legals" },
                { name: "Politique de confidentialité", path: "/privacy" },
                { name: "CGV", path: "/cgv" },
                { name: "Centre d'aide / FAQ", path: "/faq" },
                { name: "Contactez-nous", path: "/contact" },
            ],
        },
    ];

    return (
        <footer className="bg-black text-white py-20 px-6 font-sans border-t border-white/5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">
                
                {/* Colonne 1 : Identité & Réseaux */}
                <div className="md:col-span-2 flex flex-col gap-6 pr-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 w-fit hover:opacity-80 transition">
                        <div className="bg-indigo-600 p-2 rounded-lg">
                            <School className="h-6 w-6 text-white" fill="currentColor" />
                        </div>
                        <span className="text-2xl font-bold tracking-tighter text-white">
                            Novatio
                        </span>
                    </Link>

                    {/* Slogan */}
                    <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                        L'école qui transforme votre passion pour le code en carrière d'excellence. 
                        Rejoignez la prochaine promotion et construisez le futur.
                    </p>

                    {/* Réseaux Sociaux */}
                    <div className="flex items-center gap-5 mt-2">
                        <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                            <Twitter size={20} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                            <Instagram size={22} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                            <Youtube size={24} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                            <Linkedin size={22} />
                        </a>
                    </div>
                </div>

                {/* Colonnes de liens dynamiques */}
                {footerLinks.map((column, index) => (
                    <div key={index} className="flex flex-col gap-4">
                        <h3 className="font-bold text-white text-base">
                            {column.title}
                        </h3>
                        <ul className="space-y-3">
                            {column.links.map((link, linkIndex) => (
                                <li key={linkIndex}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-white transition-colors text-sm font-medium block hover:translate-x-1 duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Copyright */}
            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
                <p>&copy; {new Date().getFullYear()} Novatio School. Tous droits réservés.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <span>Made with ❤️ in Paris</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;