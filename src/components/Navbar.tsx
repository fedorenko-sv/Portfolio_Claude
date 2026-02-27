"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { href: "#expertise", label: "Экспертиза" },
    { href: "#portfolio", label: "Портфолио" },
    { href: "#integrations", label: "Технологии" },
    { href: "#pricing", label: "Прайс" },
    { href: "#contact", label: "Контакт" },
];

export default function Navbar() {
    const [hidden, setHidden] = useState(false);
    const [lastY, setLastY] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY;
            setHidden(y > lastY && y > 100);
            setLastY(y);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastY]);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: hidden ? -100 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 right-0 z-50 glass"
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <a href="#" className="text-lg font-bold tracking-tight" style={{ color: "var(--color-text)" }}>
                    <span style={{ color: "var(--color-accent-warm)" }}>&lt;</span>
                    engineer
                    <span style={{ color: "var(--color-accent-warm)" }}>/&gt;</span>
                </a>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium transition-colors duration-200 hover:opacity-70"
                            style={{ color: "var(--color-text-muted)" }}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105"
                        style={{
                            background: "var(--color-text)",
                            color: "var(--color-bg)",
                        }}
                    >
                        Обсудить проект
                    </a>
                </div>

                {/* Mobile burger */}
                <button
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Меню"
                >
                    <motion.span
                        animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
                        className="block w-6 h-0.5 rounded-full"
                        style={{ background: "var(--color-text)" }}
                    />
                    <motion.span
                        animate={{ opacity: menuOpen ? 0 : 1 }}
                        className="block w-6 h-0.5 rounded-full"
                        style={{ background: "var(--color-text)" }}
                    />
                    <motion.span
                        animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
                        className="block w-6 h-0.5 rounded-full"
                        style={{ background: "var(--color-text)" }}
                    />
                </button>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden overflow-hidden glass"
                    >
                        <div className="px-6 py-6 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="text-base font-medium"
                                    style={{ color: "var(--color-text)" }}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                onClick={() => setMenuOpen(false)}
                                className="mt-2 px-5 py-3 rounded-full text-center text-sm font-semibold"
                                style={{
                                    background: "var(--color-text)",
                                    color: "var(--color-bg)",
                                }}
                            >
                                Обсудить проект
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
