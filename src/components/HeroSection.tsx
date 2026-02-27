"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-300, 300], [8, -8]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-8, 8]), { stiffness: 150, damping: 20 });

    const handleMouse = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
    };

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
            onMouseMove={handleMouse}
            ref={ref}
        >
            {/* Background gradient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
                    style={{ background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)" }}
                />
                <div
                    className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
                    style={{ background: "radial-gradient(circle, var(--color-olive) 0%, transparent 70%)" }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Left: Text */}
                <div className="flex flex-col gap-8 order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p
                            className="text-sm font-mono font-medium tracking-widest uppercase mb-4"
                            style={{ color: "var(--color-accent-warm)" }}
                        >
                            Full-Stack Инженер / Product Engineer
                        </p>
                        <h1
                            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight"
                            style={{ color: "var(--color-text)" }}
                        >
                            Цифровые решения,{" "}
                            <span className="text-gradient">которые увеличивают средний чек</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="text-lg leading-relaxed max-w-lg"
                        style={{ color: "var(--color-text-muted)" }}
                    >
                        PWA, доставка, автоматизация HoReCa. Попробуйте живое демо моих продуктов
                        прямо здесь — без скачивания и регистрации.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-wrap gap-4 items-center"
                    >
                        <motion.a
                            href="#portfolio"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-7 py-3.5 rounded-full text-sm font-semibold shadow-lg transition-shadow hover:shadow-xl"
                            style={{
                                background: "var(--color-text)",
                                color: "var(--color-bg)",
                            }}
                        >
                            Смотреть проекты вживую
                        </motion.a>
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-7 py-3.5 rounded-full text-sm font-semibold border-2 transition-all"
                            style={{
                                borderColor: "var(--color-accent)",
                                color: "var(--color-text)",
                            }}
                        >
                            Обсудить проект
                        </motion.a>
                    </motion.div>

                    {/* Hand-drawn arrow */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="hidden lg:block mt-[-10px] ml-32"
                    >
                        <svg
                            className="hand-drawn-arrow"
                            width="120"
                            height="60"
                            viewBox="0 0 120 60"
                            fill="none"
                        >
                            <path
                                d="M5 45 C25 35, 45 20, 75 25 C95 28, 100 35, 108 30"
                                stroke="var(--color-accent-warm)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                fill="none"
                            />
                            <path
                                d="M100 22 L110 30 L100 36"
                                stroke="var(--color-accent-warm)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="none"
                            />
                        </svg>
                    </motion.div>
                </div>

                {/* Right: 3D Phone */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex justify-center order-1 lg:order-2"
                    style={{ perspective: "1200px" }}
                >
                    <motion.div
                        style={{ rotateX, rotateY }}
                        className="phone-mockup"
                    >
                        <div className="phone-screen">
                            <iframe
                                src="https://gastro-vibe-qxpq.vercel.app"
                                title="Демо: Gastro-OS — интерактивное меню ресторана"
                                loading="lazy"
                                sandbox="allow-scripts allow-same-origin"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
