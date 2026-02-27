"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ContactSection() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const telegramUrl = "https://t.me/fedorenko3d";

    const whatsappUrl =
        "https://wa.me/79508052951?text=" +
        encodeURIComponent(
            "Здравствуйте, Сергей! Видел ваше демо на сайте, хочу обсудить внедрение в мое заведение."
        );

    return (
        <section id="contact" className="py-24 lg:py-32 relative" ref={ref}>
            <div className="max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <p
                        className="text-sm font-mono font-medium tracking-widest uppercase mb-3"
                        style={{ color: "var(--color-accent-warm)" }}
                    >
                        Контакт
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                        Написать напрямую инженеру
                    </h2>
                    <p className="text-base max-w-lg mx-auto mb-2" style={{ color: "var(--color-text-muted)" }}>
                        Без форм, без ожидания. Напишите в удобный мессенджер — отвечу лично в течение часа.
                    </p>
                    <p className="text-sm font-medium mb-8" style={{ color: "var(--color-text)" }}>
                        Федоренко Сергей Владимирович
                    </p>
                </motion.div>

                {/* Phone number */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-10"
                >
                    <a
                        href="tel:+79508052951"
                        className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight transition-colors duration-200"
                        style={{ color: "var(--color-text)" }}
                    >
                        +7 950 805-29-51
                    </a>
                </motion.div>

                {/* Messenger buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <motion.a
                        href={telegramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold text-white shadow-lg transition-shadow hover:shadow-xl"
                        style={{ background: "#2AABEE" }}
                    >
                        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                        </svg>
                        Написать в Telegram
                    </motion.a>

                    <motion.a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold text-white shadow-lg transition-shadow hover:shadow-xl"
                        style={{ background: "#25D366" }}
                    >
                        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                        </svg>
                        Написать в WhatsApp
                    </motion.a>
                </motion.div>

                {/* Footer note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-16 text-xs font-mono"
                    style={{ color: "var(--color-text-muted)" }}
                >
                    © 2026 · Спроектировано и разработано с нуля
                </motion.p>
            </div>
        </section>
    );
}
