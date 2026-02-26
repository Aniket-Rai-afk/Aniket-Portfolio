"use client";

import { ReactNode, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { MeshReflectorMaterial, RoundedBox, Html } from "@react-three/drei"
import { Group, Mesh, Vector3, Color } from "three"
import * as THREE from 'three';

const cn = (...classes: unknown[]) => classes.filter(Boolean).join(' ');

interface Card3DProps {
    children?: ReactNode
    className?: string
    maxRotation?: number
    scale?: number
    position?: [number, number, number]
    color?: string
    opacity?: number
    reflective?: boolean
    title?: string
    content?: ReactNode
    rotationSmoothness?: number
    hoverScale?: number
    hoverLift?: number
    hoverColor?: string
    hoverLightIntensity?: number
    dynamicLight?: boolean
}

const CardContent = ({
    content,
    groupRef,
    mousePosition,
    viewport,
}: {
    title?: string
    content?: ReactNode
    groupRef?: React.RefObject<THREE.Group | null>
    mousePosition?: THREE.Vector2
    viewport?: { width: number, height: number }
}) => {
    const contentRef = useRef<THREE.Group>(null);
    const parallaxAmount = 0.1;

    useFrame(() => {
        if (contentRef.current && groupRef?.current && mousePosition && viewport) {
            const parallaxX = -groupRef.current.rotation.y * parallaxAmount * 10;
            const parallaxY = groupRef.current.rotation.x * parallaxAmount * 10;

            contentRef.current.position.x = parallaxX;
            contentRef.current.position.y = parallaxY;
        }
    });

    return (
        <group ref={contentRef} position={[0, 0, 0.7]}>
            <Html transform pointerEvents="none">
                <div style={{
                }}>
                    {content}
                </div>
            </Html>
        </group>
    );
}

const Scene = ({
    children,
    maxRotation = 0.05,
    scale = 1.2,
    position = [0, 0, 0],
    color = "#111",
    opacity = 0.9,
    reflective = true,
    title,
    content,
    rotationSmoothness = 0.1,
    hoverScale = 1.03,
    hoverLift = 0.3,
    hoverColor = "#333",
    hoverLightIntensity = 5,
    dynamicLight = true,
}: Omit<Card3DProps, "className">) => {
    const group = useRef<Group>(null);
    const cardMesh = useRef<Mesh>(null);
    const dynamicLightRef = useRef<THREE.PointLight>(null);

    const [hover, setHover] = useState(false);
    const { mouse, viewport, gl } = useThree();

    const targetRotation = useRef(new Vector3(0, 0, 0));
    const targetScale = useRef(scale);
    const targetZ = useRef(position[2]);
    const targetColor = useRef(new Color(color));
    const baseColor = useRef(new Color(color));
    const hoverColorTarget = useRef(new Color(hoverColor));

    useEffect(() => {
        baseColor.current.set(color);
        hoverColorTarget.current.set(hoverColor);
        targetScale.current = scale;
        targetZ.current = position[2];
        targetColor.current.set(color);
    }, [scale, position, color, hoverColor]);


    useEffect(() => {
        if (hover) {
            targetScale.current = scale * hoverScale;
            targetZ.current = position[2] + hoverLift;
            targetColor.current.set(hoverColor);
        } else {
            targetScale.current = scale;
            targetZ.current = position[2];
            targetColor.current.set(color);
        }
    }, [hover, scale, position, hoverScale, hoverLift, color, hoverColor]);


    useFrame(() => {
        if (!group.current || !cardMesh.current) return;

        const rotationTargetX = mouse.y * -maxRotation;
        const rotationTargetY = mouse.x * maxRotation;

        group.current.rotation.x = THREE.MathUtils.lerp(
            group.current.rotation.x,
            hover ? rotationTargetX : 0,
            rotationSmoothness
        );
        group.current.rotation.y = THREE.MathUtils.lerp(
            group.current.rotation.y,
            hover ? rotationTargetY : 0,
            rotationSmoothness
        );

        group.current.scale.x = group.current.scale.y = group.current.scale.z = THREE.MathUtils.lerp(
            group.current.scale.x,
            targetScale.current,
            rotationSmoothness
        );

        group.current.position.z = THREE.MathUtils.lerp(
            group.current.position.z,
            targetZ.current,
            rotationSmoothness
        );

        if (cardMesh.current.material) {
            const material = cardMesh.current.material as THREE.Material & { color?: THREE.Color };
            if (material.color) {
                material.color.lerp(targetColor.current, rotationSmoothness * 0.5);
            }
        }

        if (dynamicLightRef.current && dynamicLight) {
            const lightOffset = new THREE.Vector3(
                group.current.rotation.y * 5,
                -group.current.rotation.x * 5 + 3,
                2
            );

            lightOffset.applyEuler(group.current.rotation);

            dynamicLightRef.current.position.copy(lightOffset);

            dynamicLightRef.current.intensity = THREE.MathUtils.lerp(
                dynamicLightRef.current.intensity,
                hover ? hoverLightIntensity : 0,
                rotationSmoothness
            );
        }

    });


    return (
        <group
            ref={group}
            scale={5}
            position={position}
            onPointerEnter={() => setHover(true)}
            onPointerLeave={() => setHover(false)}
        >
            <RoundedBox ref={cardMesh} args={[12, 8.4, 0.4]} radius={0.4} smoothness={10} castShadow receiveShadow>
                {reflective ? (
                    <MeshReflectorMaterial
                        color={color}
                        roughness={0.2}
                        metalness={0.8}
                        opacity={opacity}
                        transparent={opacity < 1}
                    />
                ) : (
                    <meshStandardMaterial
                        color={color}
                        roughness={0.3}
                        metalness={0.7}
                        opacity={opacity}
                        transparent={opacity < 1}
                    />
                )}
            </RoundedBox>

            <CardContent
                title={title}
                content={content}
                groupRef={group}
                mousePosition={mouse}
                viewport={viewport}
            />

            {dynamicLight && (
                <pointLight
                    ref={dynamicLightRef}
                    position={[0, 0, 0]}
                    intensity={0}
                    distance={15}
                    decay={2}
                    color="#ffffff"
                    castShadow
                    visible={false}
                />
            )}


            <group position={[0, 0, 0.16]}>
                {children}
            </group>
        </group>
    );
}


const Card3D = ({
    children,
    className,
    maxRotation,
    scale = 0.8,
    position,
    color = "#111",
    opacity = 0.9,
    reflective = true,
    title,
    content,
    rotationSmoothness,
    hoverScale,
    hoverLift,
    hoverColor,
    hoverLightIntensity,
    dynamicLight,
}: Card3DProps) => {
    return (
        <div className={cn("h-[300px] w-[400px] relative", className)}>
            <style jsx>{`
        .relative {
          --card-base-scale: ${scale};
          --card-width: ${10 * scale} units; /* Note: 'units' is not a valid CSS unit. Fix if needed. */
          --card-height: ${7 * scale} units; /* Note: 'units' is not a valid CSS unit. Fix if needed. */
        }
      `}</style>
            <Canvas
                shadows
                dpr={[1, 2]}
                camera={{ position: [0, 0, 23], fov: 20 }}
                flat
            >
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[5, 10, 25]}
                    intensity={1}
                    castShadow
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-camera-far={50}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                />
                <directionalLight
                    position={[-5, -10, -10]}
                    intensity={0.3}
                />

                <directionalLight
                    position={[0, -10, 5]}
                    color="cyan"
                />
                <directionalLight
                    position={[10, 0, 5]}
                    intensity={0.4}
                    color="blue"
                />

                <Scene
                    maxRotation={maxRotation}
                    scale={scale}
                    position={position}
                    color={color}
                    opacity={opacity}
                    reflective={reflective}
                    title={title}
                    content={content}
                    rotationSmoothness={rotationSmoothness}
                    hoverScale={hoverScale}
                    hoverLift={hoverLift}
                    hoverColor={hoverColor}
                    hoverLightIntensity={hoverLightIntensity}
                    dynamicLight={dynamicLight}
                >
                    {children}
                </Scene>
            </Canvas>
        </div>
    )
}


type NavItem = {
    title: string;
    href: string;
};

const navItems: NavItem[] = [
    {
        title: "HOME",
        href: "/",
    },
    {
        title: "ABOUT",
        href: "/#about",
    },
    {
        title: "EXPERIENCE",
        href: "/#experience",
    },
    {
        title: "PROJECTS",
        href: "/#projects",
    },
    {
        title: "BLOG",
        href: "/blogs",
    },
    {
        title: "RESUME",
        href: "/assets/Aniket_Rai_Resume.pdf",
    },
    {
        title: "GITHUB",
        href: "https://github.com/Aniket-Rai-afk",
    },
];

const componentItems = [
    { id: "SEC_001", title: "Malware Lab setup", previewImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1080&auto=format&fit=crop", url: "/#projects" },
    { id: "SEC_002", title: "Cloud WAF Configs", previewImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1080&auto=format&fit=crop", url: "/#projects" },
    { id: "SEC_003", title: "Threat Hunt Automation", previewImage: "https://images.unsplash.com/photo-1624969862644-791f3dc98927?q=80&w=1080&auto=format&fit=crop", url: "/#projects" },
    { id: "SEC_004", title: "Identity Breach Analysis", previewImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1080&auto=format&fit=crop", url: "/blogs" },
];

function NavbarItem({ item }: { item: NavItem }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link
            href={item.href}
            className="relative py-2 text-xs font-medium tracking-wider text-white/70 transition-colors hover:text-white/100"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className="inline-block relative" style={{ minWidth: `${item.title.length}ch` }}>
                {isHovered ? (
                    <DecryptEffect text={item.title} />
                ) : (
                    <span className="font-medium">{item.title}</span>
                )}
            </span>
        </Link>
    );
}

function MenuIcon({ isOpen = false, isWhite = true }: { isOpen?: boolean, isWhite?: boolean }) {
    if (isOpen) {
        return (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    }

    return (
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1H17" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M1 6H17" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M1 11H17" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}


function ComponentsLink({ onDropdownChange }: { onDropdownChange?: (isOpen: boolean) => void }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const megaDropdownRef = useRef<{ startClosingAnimation: () => void } | null>(null);
    const text = "PLAYBOOKS";

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                if (megaDropdownRef.current) {
                    megaDropdownRef.current.startClosingAnimation();
                } else {
                    setIsDropdownOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (onDropdownChange) {
            onDropdownChange(isDropdownOpen);
        }
    }, [isDropdownOpen, onDropdownChange]);

    const showDottedGrid = isHovered && !isDropdownOpen;

    return (
        <div
            className={`relative h-full z-[100] border-white/10`}
            ref={dropdownRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <style jsx>{`
        .components-button {
          position: relative; 
          overflow: hidden; 
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 2.5rem; 
          padding-right: 2.5rem; 
          min-width: 180px;
          max-width: 180px;
          transition: color 0.3s ease;
        }

        .components-button::before {
          content: '';
          position: absolute;
          inset: 0; 
          background-image: radial-gradient(circle, #444 1px, transparent 1px); 
          background-size: 8px 8px; 
          opacity: 0; 
          transition: opacity 0.4s ease-in-out; 
          z-index: 0; 
          pointer-events: none; 
        }

        .components-button.dotted-grid-active::before {
          opacity: 1;
        }

        .components-button-content {
           position: relative;
           z-index: 2; 
           width: 100%;
           display: flex;
           align-items: center;
           justify-content: center;
        }
        
        .components-button-content span {
             color: white; 
             transition: color 0.3s ease;
        }

        .components-button.dropdown-open .components-button-content span {
             color: black; 
        }

      `}</style>
            <motion.button
                className={`components-button ${showDottedGrid ? 'dotted-grid-active' : ''} ${isDropdownOpen ? 'dropdown-open' : ''}`}
                onClick={() => {
                    if (isDropdownOpen && megaDropdownRef.current) {
                        megaDropdownRef.current.startClosingAnimation();
                    } else {
                        setIsDropdownOpen(true);
                    }
                }}
            >
                {isDropdownOpen && (
                    <motion.div
                        className="absolute inset-0 bg-[#06b6d4]"
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        style={{ zIndex: 1 }}
                    />
                )}

                <div className="components-button-content">
                    <div className="text-xs font-medium tracking-wider">
                        {showDottedGrid ? (
                            <StableDecryptEffect text={text} />
                        ) : (
                            <span>{text}</span>
                        )}
                    </div>
                </div>
            </motion.button>

            <AnimatePresence>
                {isDropdownOpen && (
                    <motion.div
                        className="fixed top-20 left-0 w-full bg-[#0a0d11] border-b border-white/10 z-[100] overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "calc(100vh - 5rem)", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                            duration: 0.5,
                            ease: "easeOut",
                            opacity: { duration: 0.5 }
                        }}
                    >
                        <MegaDropdown
                            ref={megaDropdownRef}
                            onClose={() => setIsDropdownOpen(false)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}


const MegaDropdown = React.forwardRef<{ startClosingAnimation: () => void }, { onClose: () => void }>(
    function MegaDropdown({ onClose }, ref) {
        const [visibleRows, setVisibleRows] = useState<number>(0);
        const [hoveredItem, setHoveredItem] = useState<string | null>(null);
        const [lockedItem, setLockedItem] = useState<string | null>(null);
        const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

        const preloadImage = (src: string) => {
            if (loadedImages.has(src)) return;

            const img = new globalThis.Image();
            img.src = src;
            img.onload = () => {
                setLoadedImages(prev => new Set(prev).add(src));
            };
        };

        useEffect(() => {
            if (hoveredItem) {
                const item = componentItems.find(item => item.id === hoveredItem);
                if (item) {
                    preloadImage(item.previewImage);
                }
            }
        }, [hoveredItem]);

        useEffect(() => {
            if (ref) {
                if (typeof ref === 'function') {
                    ref({ startClosingAnimation });
                } else {
                    ref.current = { startClosingAnimation };
                }
            }
        }, [ref]);

        useEffect(() => {
            const rowsCount = Math.ceil(componentItems.length / 2);
            let currentRow = 0;

            const timer = setInterval(() => {
                if (currentRow < rowsCount) {
                    setVisibleRows(prev => prev + 1);
                    currentRow++;
                } else {
                    clearInterval(timer);
                }
            }, 200);

            return () => clearInterval(timer);
        }, []);

        const startClosingAnimation = () => {
            onClose();
        };

        const handleComponentClick = (id: string) => {
            if (lockedItem === id) {
                setLockedItem(null);
            } else {
                setLockedItem(id);
                const item = componentItems.find(item => item.id === id);
                if (item) {
                    preloadImage(item.previewImage);
                }
            }
        };

        const displayedComponent = lockedItem
            ? componentItems.find(item => item.id === lockedItem)
            : (hoveredItem ? componentItems.find(item => item.id === hoveredItem) : null);

        const rows = [];
        for (let i = 0; i < componentItems.length; i += 2) {
            const rowItems = componentItems.slice(i, i + 2);
            rows.push(rowItems);
        }

        return (
            <div className="h-full overflow-auto">
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-[minmax(300px,1fr)_2fr] h-full max-w-7xl mx-auto"
                    initial="hidden"
                    animate="show"
                >
                    <motion.div
                        className="p-10 flex flex-col h-full bg-[#111]"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.4, ease: "easeOut" }
                            }
                        }}
                    >
                        <div className="text-xs text-[#06b6d4] font-mono tracking-wider mb-4">
                            _PLAYBOOKS
                        </div>
                        <h2 className="text-3xl lg:text-5xl font-extralight leading-[1.1] mb-auto text-white">
                            Tactical insights for modern security ops.
                        </h2>
                        <div className="mt-8 mb-4 w-full h-[300px]">
                            <Card3D
                                content={
                                    <div className="flex p-8 flex-col h-[300px] text-center pointer-events-none">
                                        {displayedComponent ? (
                                            <>
                                                <div className="text-xs text-gray-500 font-mono mb-2">
                                                    {displayedComponent.id}
                                                </div>
                                                <div className="text-xl font-bold mb-4 text-white">
                                                    {displayedComponent.title}
                                                </div>
                                                <div className="flex-1 flex items-center justify-center rounded-lg mb-4 overflow-hidden border border-white/10">
                                                    <div className="relative w-full h-[120px]" style={{
                                                        backgroundImage: `url(${displayedComponent.previewImage})`,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center'
                                                    }}>
                                                    </div>
                                                </div>
                                                <Link
                                                    href={displayedComponent.url}
                                                    className="pointer-events-auto px-6 py-2 bg-[#06b6d4] text-black text-xs font-bold tracking-wider rounded-md hover:bg-[#3b82f6] transition-colors inline-block"
                                                >
                                                    ACCESS RESOURCE
                                                </Link>
                                            </>
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-white/50 text-sm">
                                                <span>Hover over an item to inspect</span>
                                            </div>
                                        )}
                                    </div>
                                }
                                maxRotation={0.03}
                                className="mx-auto w-[400px] h-[300px]"
                            />
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 h-full bg-[#0a0d11]">
                        {rows.slice(0, visibleRows).map((rowItems, rowIndex) => (
                            <React.Fragment key={`row-${rowIndex}`}>
                                {rowItems.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        className={`relative border border-white/5 text-center transition-colors`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                    >
                                        <div
                                            className={`flex flex-col justify-center items-center h-full px-6 py-12 relative overflow-hidden cursor-pointer ${lockedItem === item.id ? 'bg-white/5' : ''
                                                }`}
                                            onMouseEnter={() => setHoveredItem(item.id)}
                                            onMouseLeave={() => setHoveredItem(null)}
                                            onClick={() => handleComponentClick(item.id)}
                                        >
                                            <motion.div
                                                className="absolute inset-0 bg-[#06b6d4]/10"
                                                initial={{ scaleX: 0, originX: 0 }}
                                                animate={{
                                                    scaleX: (hoveredItem === item.id && !lockedItem) || lockedItem === item.id ? 1 : 0
                                                }}
                                                transition={{ duration: 0.4, ease: "easeOut" }}
                                            />

                                            <div className="text-xs text-[#06b6d4] mb-4 font-mono relative z-10">
                                                {hoveredItem === item.id || lockedItem === item.id ? (
                                                    <DecryptEffect text={`/ ${item.id}`} startDecrypting={true} />
                                                ) : (
                                                    `/ ${item.id}`
                                                )}
                                            </div>
                                            <div className="text-white text-lg font-medium tracking-wide relative z-10">
                                                {item.title}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </motion.div>
            </div>
        );
    }
);

function DecryptEffect({ text, startDecrypting = false }: { text: string, startDecrypting?: boolean }) {
    const [decodedText, setDecodedText] = useState(startDecrypting ? "" : text);

    useEffect(() => {
        let iteration = 0;
        const shouldAnimate = true;
        const interval = setInterval(() => {
            if (!shouldAnimate) return;
            setDecodedText(prev => {
                const result = text.split("").map((letter, index) => {
                    if (index < iteration) return text[index];
                    return "01"[Math.floor(Math.random() * 2)]
                }).join("");
                iteration += 0.5;
                if (iteration >= text.length) clearInterval(interval);
                return result;
            });
        }, 30);
        return () => clearInterval(interval);
    }, [text, startDecrypting]);

    return <span>{decodedText}</span>;
}

function StableDecryptEffect({ text }: { text: string }) {
    const [decodedText, setDecodedText] = useState(text);
    useEffect(() => {
        let iteration = 0;
        const shouldAnimate = true;
        const interval = setInterval(() => {
            if (!shouldAnimate) return;
            setDecodedText(prev => {
                const result = text.split("").map((letter, index) => {
                    if (index < iteration) return text[index];
                    return "01"[Math.floor(Math.random() * 2)]
                }).join("");
                iteration += 0.5;
                if (iteration >= text.length) clearInterval(interval);
                return result;
            });
        }, 30);
        return () => clearInterval(interval);
    }, [text]);
    return <span>{decodedText}</span>;
}


export function InteractiveNavbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#0f1419]/90 backdrop-blur-md border-b border-white/10 text-white">
            <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_auto_1fr_auto] items-center h-16 max-w-7xl mx-auto px-4 md:px-0">

                <div className="md:px-10 h-full flex items-center md:border-r border-white/10">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/logo.png" alt="Aniket Rai" className="w-8 h-8 object-contain drop-shadow" />
                        <span className="font-bold tracking-widest uppercase">Aniket Rai</span>
                    </Link>
                </div>

                <div className="h-full flex md:hidden items-center justify-end col-start-3">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="flex items-center justify-center w-10 h-10 rounded-full"
                        aria-label="Open menu"
                    >
                        <MenuIcon isOpen={isMobileMenuOpen} isWhite={true} />
                    </button>
                </div>

                <div className="border-r border-white/10 h-full hidden md:block">
                    <ComponentsLink />
                </div>

                <div className="hidden md:flex items-center justify-end h-full px-10">
                    <div className="flex gap-x-8">
                        {navItems.map((item) => (
                            <NavbarItem key={item.title} item={item} />
                        ))}
                        <div className="flex items-center gap-3 ml-4">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-[10px] text-green-400 font-mono tracking-widest uppercase mt-0.5">Open to Work</span>
                        </div>
                    </div>
                </div>

            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="md:hidden fixed top-16 left-0 right-0 z-50 bg-[#0f1419] border-b border-white/10"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="py-4 px-6 flex flex-col space-y-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.title}
                                    href={item.href}
                                    className="text-sm font-medium tracking-widest text-white/70 hover:text-white py-2"
                                >
                                    {item.title}
                                </Link>
                            ))}
                            <div className="my-2 border-t border-white/10 pt-4 flex items-center gap-3">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-[10px] text-green-400 font-mono tracking-widest uppercase mt-0.5">Open to Work</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
