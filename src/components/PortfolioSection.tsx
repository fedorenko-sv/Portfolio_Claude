"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const cases = [
    {
        id: "gastro",
        tab: "Ресторан",
        title: "Gastro-OS",
        subtitle: "Интерактивное меню для ресторана",
        url: "https://gastro-vibe-qxpq.vercel.app",
        features: [
            "Видео-меню с анимациями",
            "Корзина и система заказов",
            "Сплит счета между гостями",
            "Интеграция с iiko",
        ],
        color: "var(--color-olive)",
    },
    {
        id: "hookah",
        tab: "Кальянная",
        title: "Smoke-Vibe",
        subtitle: "PWA для кальянного лаунжа",
        url: "https://smoke-vibe-qr-menu.vercel.app",
        features: [
            "Вызов мастера через Telegram",
            "Геймификация для гостей",
            "Рулетка подарков и бонусов",
            "Управление PS5 со стола",
        ],
        color: "var(--color-accent-warm)",
    },
    {
        id: "delivery",
        tab: "QR-Меню",
        title: "Хочу Другого",
        subtitle: "QR-меню в тёмной теме",
        url: "https://hochu-drugogo.vercel.app",
        features: [
            "Стильная тёмная тема",
            "Каталог с фильтрами",
            "Быстрый заказ без регистрации",
            "Мгновенный запуск по QR",
        ],
        color: "var(--color-accent)",
    },
];

const factoids = [
    { value: "+20%", label: "к среднему чеку", position: "top-4 right-4 lg:top-8 lg:right-[-40px]" },
    { value: "−40%", label: "нагрузки на официантов", position: "bottom-4 left-4 lg:bottom-24 lg:left-[-30px]" },
    { value: "< 2с", label: "загрузка без App Store", position: "top-4 left-4 lg:top-32 lg:left-[-50px]" },
    { value: "24/7", label: "работа без сбоев", position: "bottom-4 right-4 lg:bottom-8 lg:right-[-30px]" },
];

export default function PortfolioSection() {
    const [activeCase, setActiveCase] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const current = cases[activeCase];

    return (
        <section
            id="portfolio"
            className="py-24 lg:py-32 relative"
            style={{ background: "var(--color-bg-dark)" }}
            ref={ref}
        >
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
                        Портфолио
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                        Попробуйте прямо сейчас
                    </h2>
                    <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.5)" }}>
                        Каждый проект — рабочий продукт. Покликайте меню, добавьте товар в корзину, ощутите скорость.
                    </p>
                </motion.div>

                {/* Case switcher tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center gap-2 mb-12"
                >
                    {cases.map((c, i) => (
                        <motion.button
                            key={c.id}
                            onClick={() => setActiveCase(i)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 relative"
                            style={{
                                background: activeCase === i ? "rgba(255,255,255,0.12)" : "transparent",
                                color: activeCase === i ? "#fff" : "rgba(255,255,255,0.4)",
                                border: activeCase === i ? "1px solid rgba(255,255,255,0.15)" : "1px solid transparent",
                            }}
                        >
                            {c.tab}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Main bento grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative">
                    {/* Left: Description */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="lg:col-span-4 glass-dark rounded-3xl p-8"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                <div
                                    className="w-3 h-3 rounded-full mb-4"
                                    style={{ background: current.color }}
                                />
                                <h3 className="text-2xl font-bold text-white mb-1">{current.title}</h3>
                                <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
                                    {current.subtitle}
                                </p>
                                <ul className="space-y-3">
                                    {current.features.map((f) => (
                                        <li
                                            key={f}
                                            className="flex items-start gap-3 text-sm"
                                            style={{ color: "rgba(255,255,255,0.7)" }}
                                        >
                                            <span
                                                className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                                style={{ background: current.color }}
                                            />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* Center: Phone */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="lg:col-span-4 flex justify-center relative py-8"
                    >
                        {/* Factoids */}
                        {factoids.map((f, i) => (
                            <motion.div
                                key={f.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                                className={`absolute ${f.position} hidden lg:block glass-dark rounded-2xl px-4 py-3 z-20 ${i % 2 === 0 ? "animate-float" : "animate-float-delay"
                                    }`}
                            >
                                <p className="text-lg font-bold text-white leading-none">{f.value}</p>
                                <p className="text-[11px] mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                                    {f.label}
                                </p>
                            </motion.div>
                        ))}

                        <div className="phone-mockup">
                            <div className="phone-screen">
                                <AnimatePresence mode="wait">
                                    <motion.iframe
                                        key={current.url}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        src={current.url}
                                        title={`Демо: ${current.title}`}
                                        loading="lazy"
                                        sandbox="allow-scripts allow-same-origin"
                                        style={{ width: "100%", height: "100%", border: "none", borderRadius: "30px" }}
                                    />
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Stats & Tech */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        className="lg:col-span-4 flex flex-col gap-5"
                    >
                        <div className="glass-dark rounded-3xl p-8">
                            <p className="text-sm font-mono mb-4" style={{ color: "var(--color-accent-warm)" }}>
                // Стек технологий
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {["React", "Next.js", "TypeScript", "Supabase", "Tailwind", "Vercel", "PWA", "Telegram API"].map(
                                    (t) => (
                                        <span
                                            key={t}
                                            className="px-3 py-1.5 rounded-lg text-xs font-mono"
                                            style={{
                                                background: "rgba(255,255,255,0.06)",
                                                color: "rgba(255,255,255,0.6)",
                                                border: "1px solid rgba(255,255,255,0.08)",
                                            }}
                                        >
                                            {t}
                                        </span>
                                    )
                                )}
                            </div>
                        </div>

                        <div className="glass-dark rounded-3xl p-8">
                            <p className="text-sm font-mono mb-4" style={{ color: "var(--color-accent-warm)" }}>
                // Результаты клиентов
                            </p>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-2xl font-bold text-white">+20%</p>
                                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                                        рост среднего чека за 1-й месяц
                                    </p>
                                </div>
                                <div className="h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
                                <div>
                                    <p className="text-2xl font-bold text-white">3 дня</p>
                                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                                        среднее время запуска MVP
                                    </p>
                                </div>
                                <div className="h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
                                <div>
                                    <p className="text-2xl font-bold text-white">99.9%</p>
                                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                                        аптайм продуктов
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
