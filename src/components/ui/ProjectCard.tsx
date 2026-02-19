import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Github, Loader2, ExternalLink } from 'lucide-react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface Project {
    title: string;
    description: string;
    tech: string[];
    url: string;
    imageDesktop: string;
    imageMobile: string;
    category: string;
}

interface ProjectCardProps {
    project: Project;
    index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const isMobile = useMediaQuery("(max-width: 1024px)");

    // Eager load ALL iframes on desktop immediately on mount
    // This effectively disables "lazy viewport loading" in favor of "immediate mount loading"
    // ensuring BOTH cards are ready before interaction.
    // Eager load ALL iframes on desktop, but DELAY the start to allow Hero animation to finish
    const [shouldLoad, setShouldLoad] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    // Update shouldLoad if screen resizes from mobile to desktop
    useEffect(() => {
        // Wait 3 seconds before starting heavy iframe loads
        const timer = setTimeout(() => {
            setShouldLoad(!isMobile);
        }, 3000);
        return () => clearTimeout(timer);
    }, [isMobile]);

    const handleMouseEnter = () => {
        if (!isMobile) {
            setIsHovered(true);
            setShouldLoad(true); // Redundant backup trigger
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        // We DO NOT reset iframeLoaded or shouldLoad. 
        // Keep-Alive strategy: Once loaded, stays loaded.
    };

    const handleClick = () => {
        if (isMobile) window.open(project.url, '_blank');
    };

    const handleViewProject = (e: React.MouseEvent) => {
        e.stopPropagation();
        window.open(project.url, '_blank');
    };

    return (
        <div
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="project-card group relative rounded-[2rem] overflow-hidden border border-white/10 bg-card/80 backdrop-blur-2xl shadow-2xl transition-shadow duration-500"
        >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                {/* Live Preview Window */}
                <div className={`project-preview relative aspect-[4/3] lg:h-[600px] lg:aspect-auto w-full overflow-hidden bg-background border-b lg:border-b-0 lg:border-r border-white/10 lg:col-span-3 rounded-t-[2rem] ${index % 2 === 0 ? "lg:rounded-tr-none lg:rounded-bl-[2rem]" : "lg:order-last lg:border-r-0 lg:border-l lg:rounded-tl-none lg:rounded-br-[2rem]"} `}>

                    {/* Browser Header */}
                    <div className="absolute top-0 left-0 right-0 h-10 bg-[#1a1a1c] flex items-center justify-between px-4 z-20 border-b border-white/5">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500 border border-red-600" />
                            <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500 border border-green-600" />
                        </div>
                        <div className="flex-1 mx-6 h-6 bg-[#000000]/20 rounded flex items-center justify-center border border-white/5 transition-colors">
                            <span className="text-[11px] text-zinc-500 font-mono tracking-wide transition-colors">{project.url.replace('https://', '')}</span>
                        </div>
                        <div className="w-8" />
                    </div>

                    {/* Preview Image (Facade) */}
                    <div
                        className={`absolute inset-0 pt-10 w-full h-full bg-[#0A0A0B] transition-all duration-500 z-10 ${isHovered && iframeLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'} ${isMobile ? 'cursor-pointer' : ''}`}
                        onClick={handleClick}
                    >
                        <img
                            src={isMobile ? project.imageMobile : project.imageDesktop}
                            alt={project.title}
                            className="w-full h-full object-cover opacity-90 transition-opacity duration-700"
                            loading="lazy"
                        />
                        {!isMobile && (
                            <div className={`absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-all ${iframeLoaded ? 'hidden' : ''}`}>
                                <span className={`px-4 py-2 rounded-full bg-black/50 backdrop-blur-md text-white/90 text-sm font-medium border border-white/10 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
                                    Interagir
                                </span>
                            </div>
                        )}

                        {/* Loading Spinner - shows when preloading or waiting for connection */}
                        {isHovered && !iframeLoaded && !isMobile && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-20 animate-in fade-in duration-300">
                                <div className="flex flex-col items-center gap-4 p-6 rounded-xl">
                                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                                    <span className="text-sm text-white/90 font-medium tracking-wide">
                                        Conectando...
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Iframe Preview - NOW Persistent (Keep-Alive) */}
                    {/* Rendered if shouldLoad is true (viewport triggered), but only visible on hover */}
                    {shouldLoad && !isMobile && (
                        <div className={`absolute inset-0 pt-10 w-full h-full bg-[#0A0A0B] transition-opacity duration-300 ${isHovered ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                            <iframe
                                src={project.url}
                                title={project.title}
                                className="w-full h-full bg-white"
                                style={{ border: 'none' }}
                                loading="eager"
                                onLoad={() => setIframeLoaded(true)}
                            />
                        </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />
                </div>

                {/* Project Info */}
                <div className="project-info relative p-8 lg:p-12 flex flex-col justify-center overflow-hidden lg:col-span-2">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10 pointer-events-none">
                        <div className="project-reveal-item flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
                                {project.category}
                            </span>
                        </div>

                        <h3 className="project-reveal-item text-3xl lg:text-5xl font-bold text-white mb-6 leading-tigher transition-all duration-300">
                            {project.title}
                        </h3>

                        <p className="project-reveal-item text-zinc-400 text-lg leading-relaxed mb-8">
                            {project.description}
                        </p>

                        <div className="project-reveal-item flex flex-wrap gap-2 mb-10">
                            {project.tech.map((tech, i) => (
                                <span key={i} className="px-3 py-1.5 rounded-md bg-white/5 border border-white/5 text-xs text-zinc-300 font-mono">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <div className="project-reveal-item flex gap-4 pointer-events-auto">
                            <button
                                onClick={handleViewProject}
                                className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95"
                            >
                                Ver Projeto <ArrowUpRight className="w-4 h-4" />
                            </button>
                            <button className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all hover:scale-105 active:scale-95">
                                <Github className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
