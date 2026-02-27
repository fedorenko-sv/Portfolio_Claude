"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function PricingSection() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            id="pricing"
            className="py-24 lg:py-32 relative"
            style={{ background: "var(--color-bg-card)" }}
            ref={ref}
        >
            <div className="max-w-4xl mx-auto px-6">
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
                        Прозрачная смета
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                        Финансовые модели
                    </h2>
                    <p className="mt-4 text-sm max-w-md mx-auto" style={{ color: "var(--color-text-muted)" }}>
                        Я инженер, а не маркетолог. Вот прозрачные цены без скрытых платежей и уловок.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* SaaS Model */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        whileHover={{ y: -4 }}
                        className="rounded-3xl p-1"
                        style={{
                            background: "linear-gradient(145deg, rgba(196,168,130,0.3), rgba(139,154,123,0.2))",
                        }}
                    >
                        <div
                            className="rounded-[22px] p-8 h-full"
                            style={{
                                background: "var(--color-bg)",
                                fontFamily: "var(--font-mono)",
                            }}
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-2 h-2 rounded-full" style={{ background: "var(--color-olive)" }} />
                                <span className="text-xs tracking-wider uppercase" style={{ color: "var(--color-text-muted)" }}>
                                    Модель 01
                                </span>
                            </div>

                            <h3 className="text-xl font-bold mb-1" style={{ color: "var(--color-text)" }}>
                                Подписка (SaaS)
                            </h3>
                            <p className="text-xs mb-8" style={{ color: "var(--color-text-muted)" }}>
                                Идеально для старта. Минимум вложений.
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-baseline justify-between">
                                        <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>SETUP_FEE</span>
                                        <div className="flex-1 mx-3 dot-line" />
                                        <span className="text-lg font-bold" style={{ color: "var(--color-text)" }}>от 25 000 ₽</span>
                                    </div>
                                    <p className="text-[10px] mt-1" style={{ color: "var(--color-text-muted)" }}>
                                        Запуск, кастомизация, брендинг
                                    </p>
                                </div>

                                <div className="h-px" style={{ background: "rgba(42,42,42,0.08)" }} />

                                <div>
                                    <div className="flex items-baseline justify-between">
                                        <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>MONTHLY_FEE</span>
                                        <div className="flex-1 mx-3 dot-line" />
                                        <span className="text-lg font-bold" style={{ color: "var(--color-text)" }}>от 5 000 ₽</span>
                                    </div>
                                    <p className="text-[10px] mt-1" style={{ color: "var(--color-text-muted)" }}>
                                        Хостинг, БД, поддержка / мес.
                                    </p>
                                </div>

                                <div className="h-px" style={{ background: "rgba(42,42,42,0.08)" }} />

                                <div className="pt-2">
                                    <div className="flex items-baseline justify-between">
                                        <span className="text-xs font-bold" style={{ color: "var(--color-olive)" }}>ИТОГО (1-й мес.)</span>
                                        <div className="flex-1 mx-3 dot-line" />
                                        <span className="text-xl font-bold" style={{ color: "var(--color-text)" }}>от 30 000 ₽</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6" style={{ borderTop: "2px dashed rgba(42,42,42,0.1)" }}>
                                <ul className="space-y-2 text-xs" style={{ color: "var(--color-text-muted)" }}>
                                    <li className="flex gap-2"><span style={{ color: "var(--color-olive)" }}>✓</span> Обновления включены</li>
                                    <li className="flex gap-2"><span style={{ color: "var(--color-olive)" }}>✓</span> Техподдержка 7 дней/нед</li>
                                    <li className="flex gap-2"><span style={{ color: "var(--color-olive)" }}>✓</span> Без привязки, отмена в любой момент</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    {/* Lifetime Model */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        whileHover={{ y: -4 }}
                        className="rounded-3xl p-1"
                        style={{
                            background: "linear-gradient(145deg, rgba(212,149,106,0.4), rgba(196,168,130,0.3))",
                        }}
                    >
                        <div
                            className="rounded-[22px] p-8 h-full"
                            style={{
                                background: "var(--color-bg-dark)",
                                fontFamily: "var(--font-mono)",
                            }}
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-2 h-2 rounded-full" style={{ background: "var(--color-accent-warm)" }} />
                                <span className="text-xs tracking-wider uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>
                                    Модель 02
                                </span>
                            </div>

                            <h3 className="text-xl font-bold mb-1 text-white">
                                Выкуп лицензии
                            </h3>
                            <p className="text-xs mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
                                Полная автономия. Разворачиваем на ваших серверах.
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-baseline justify-between">
                                        <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>ONE_TIME_PAYMENT</span>
                                        <div className="flex-1 mx-3 dot-line" />
                                        <span className="text-2xl font-bold text-white">от 120 000 ₽</span>
                                    </div>
                                    <p className="text-[10px] mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                                        Единоразовый платёж
                                    </p>
                                </div>

                                <div className="h-px" style={{ background: "rgba(255,255,255,0.08)" }} />

                                <div>
                                    <div className="flex items-baseline justify-between">
                                        <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>HOSTING_SUPPORT</span>
                                        <div className="flex-1 mx-3 dot-line" />
                                        <span className="text-sm font-bold text-white">опционально</span>
                                    </div>
                                    <p className="text-[10px] mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                                        Поддержка по договорённости
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 pt-6" style={{ borderTop: "2px dashed rgba(255,255,255,0.08)" }}>
                                <ul className="space-y-2 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                                    <li className="flex gap-2"><span style={{ color: "var(--color-accent-warm)" }}>✓</span> Полный доступ к исходному коду</li>
                                    <li className="flex gap-2"><span style={{ color: "var(--color-accent-warm)" }}>✓</span> Развёртывание на ваших серверах</li>
                                    <li className="flex gap-2"><span style={{ color: "var(--color-accent-warm)" }}>✓</span> Без ежемесячных платежей</li>
                                    <li className="flex gap-2"><span style={{ color: "var(--color-accent-warm)" }}>✓</span> Передача всех прав</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
