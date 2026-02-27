"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const systems = [
    { name: "iiko", detail: "iikoTransport API, iikoCloud" },
    { name: "r_keeper", detail: "Полная интеграция" },
    { name: "FrontPad", detail: "API для заказов" },
    { name: "Альфа-Банк", detail: "Эквайринг, онлайн-оплата" },
    { name: "СБП", detail: "Система быстрых платежей" },
    { name: "Telegram", detail: "Боты, уведомления, управление" },
    { name: "Supabase", detail: "БД, Auth, Realtime" },
    { name: "Vercel", detail: "Хостинг, Edge Functions" },
];

export default function IntegrationsSection() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="integrations" className="py-24 lg:py-32 relative" ref={ref}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7 }}
                    >
                        <p
                            className="text-sm font-mono font-medium tracking-widest uppercase mb-3"
                            style={{ color: "var(--color-accent-warm)" }}
                        >
                            Под капотом
                        </p>
                        <h2
                            className="text-3xl sm:text-4xl font-bold tracking-tight mb-6"
                            style={{ color: "var(--color-text)" }}
                        >
                            Не просто «картинки», а отказоустойчивые бизнес-инструменты
                        </h2>
                        <p className="text-base leading-relaxed mb-8" style={{ color: "var(--color-text-muted)" }}>
                            Каждый продукт интегрируется с вашей кассовой системой, платёжным шлюзом и мессенджерами.
                            Архитектура строится на серверлесс-функциях и реалтайм базах данных для максимальной надёжности
                            и минимальных затрат на эксплуатацию.
                        </p>
                        <div className="flex items-center gap-6">
                            <div className="text-center">
                                <p className="text-3xl font-bold" style={{ color: "var(--color-text)" }}>8+</p>
                                <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>Интеграций</p>
                            </div>
                            <div
                                className="w-px h-12"
                                style={{ background: "var(--color-accent)", opacity: 0.3 }}
                            />
                            <div className="text-center">
                                <p className="text-3xl font-bold" style={{ color: "var(--color-text)" }}>99.9%</p>
                                <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>Аптайм</p>
                            </div>
                            <div
                                className="w-px h-12"
                                style={{ background: "var(--color-accent)", opacity: 0.3 }}
                            />
                            <div className="text-center">
                                <p className="text-3xl font-bold" style={{ color: "var(--color-text)" }}>0</p>
                                <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>Серверов для обслуживания</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Grid of systems */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="grid grid-cols-2 gap-3"
                    >
                        {systems.map((s, i) => (
                            <motion.div
                                key={s.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                                whileHover={{ scale: 1.03, y: -2 }}
                                className="glass-card rounded-2xl p-5 cursor-default"
                            >
                                <p className="font-mono text-sm font-bold mb-1" style={{ color: "var(--color-text)" }}>
                                    {s.name}
                                </p>
                                <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                                    {s.detail}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
