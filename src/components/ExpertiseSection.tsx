"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
};

export default function ExpertiseSection() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="expertise" className="py-24 lg:py-32 relative" ref={ref}>
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <p
                        className="text-sm font-mono font-medium tracking-widest uppercase mb-3"
                        style={{ color: "var(--color-accent-warm)" }}
                    >
                        Экспертиза
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                        Что я создаю
                    </h2>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="expertise-grid"
                >
                    {/* PWA — wide card */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{ scale: 1.02, y: -4 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="glass-card rounded-3xl p-7 cursor-default relative overflow-hidden"
                        style={{ gridArea: "pwa" }}
                    >
                        <div className="absolute top-[-30px] right-[-30px] w-[120px] h-[120px] rounded-full opacity-[0.07]"
                            style={{ background: "var(--color-accent-warm)" }} />
                        <div className="absolute bottom-[-20px] right-[40px] w-[80px] h-[80px] rounded-full opacity-[0.05]"
                            style={{ background: "var(--color-accent)" }} />
                        <div className="relative z-10">
                            <div
                                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                                style={{ background: "rgba(196, 168, 130, 0.18)", color: "var(--color-accent-warm)" }}
                            >
                                <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.5">
                                    <rect x="5" y="2" width="14" height="20" rx="3" />
                                    <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold mb-2" style={{ color: "var(--color-text)" }}>
                                PWA-приложения
                            </h3>
                            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                                Мгновенный запуск по QR-коду, офлайн-режим через IndexedDB, не нужно скачивать из App Store. Работает как нативное приложение.
                            </p>
                        </div>
                    </motion.div>

                    {/* Native */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{ scale: 1.02, y: -4 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="glass-card rounded-3xl p-7 cursor-default relative overflow-hidden"
                        style={{ gridArea: "native" }}
                    >
                        <div className="absolute bottom-[-20px] left-[-20px] w-[100px] h-[100px] rounded-full opacity-[0.07]"
                            style={{ background: "var(--color-olive)" }} />
                        <div className="relative z-10">
                            <div
                                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                                style={{ background: "rgba(139, 154, 123, 0.18)", color: "var(--color-olive)" }}
                            >
                                <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                    <path d="M2 17l10 5 10-5" />
                                    <path d="M2 12l10 5 10-5" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold mb-2" style={{ color: "var(--color-text)" }}>
                                Нативные мобильные приложения
                            </h3>
                            <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                                iOS и Android разработка с публикацией в App Store и Google Play. Полный цикл от прототипа до релиза.
                            </p>
                        </div>
                    </motion.div>

                    {/* Stats accent card */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{ scale: 1.02, y: -4 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="rounded-3xl p-7 cursor-default relative overflow-hidden flex flex-col justify-between"
                        style={{ gridArea: "stat", background: "var(--color-bg-dark)" }}
                    >
                        <div className="absolute top-[-20px] right-[-20px] w-[100px] h-[100px] rounded-full opacity-10"
                            style={{ background: "var(--color-accent-warm)" }} />
                        <div className="relative z-10">
                            <p className="text-xs font-mono tracking-wider uppercase mb-3" style={{ color: "var(--color-accent-warm)" }}>
                                Опыт
                            </p>
                            <p className="text-4xl font-black text-white leading-none">15+</p>
                            <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                                продуктов в продакшене
                            </p>
                        </div>
                        <div className="relative z-10 mt-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#4ade80" }} />
                                <p className="text-[11px] font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>
                                    все системы online
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Delivery — wide card */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{ scale: 1.02, y: -4 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="glass-card rounded-3xl p-7 cursor-default relative overflow-hidden"
                        style={{ gridArea: "delivery" }}
                    >
                        <div className="absolute top-[-20px] right-[60px] w-[100px] h-[100px] rounded-full opacity-[0.06]"
                            style={{ background: "#6366f1" }} />
                        <div className="relative z-10">
                            <div
                                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                                style={{ background: "rgba(99, 102, 241, 0.12)", color: "#6366f1" }}
                            >
                                <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="9" cy="21" r="1" />
                                    <circle cx="20" cy="21" r="1" />
                                    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold mb-2" style={{ color: "var(--color-text)" }}>
                                Delivery & E-commerce
                            </h3>
                            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                                Сайты доставок с корзиной, эквайрингом Альфа-Банка, личным кабинетом и интеграцией с кассовыми системами.
                            </p>
                        </div>
                    </motion.div>

                    {/* Backend — wide card */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{ scale: 1.02, y: -4 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="glass-card rounded-3xl p-7 cursor-default relative overflow-hidden"
                        style={{ gridArea: "backend" }}
                    >
                        <div className="absolute bottom-[-30px] right-[-30px] w-[120px] h-[120px] rounded-full opacity-[0.06]"
                            style={{ background: "#8b5cf6" }} />
                        <div className="relative z-10">
                            <div
                                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                                style={{ background: "rgba(139, 92, 246, 0.12)", color: "#8b5cf6" }}
                            >
                                <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                                    <line x1="4" y1="22" x2="4" y2="15" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold mb-2" style={{ color: "var(--color-text)" }}>
                                Интеграции и Backend
                            </h3>
                            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                                Связка с кассовыми системами iiko, r_keeper, FrontPad. Архитектура баз данных, API, Telegram-боты для автоматизации.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
