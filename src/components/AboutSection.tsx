import { Terminal } from 'lucide-react';
import { GradientButton } from '@/components/ui/gradient-button';
import { useAboutAnimation } from '@/hooks/useAboutAnimation';
import { aboutData } from '@/data/about.data';

const AboutSection = () => {
    // Destructure refs from the custom hook containing the "supreme" animation logic
    const { sectionRef, triggerRef, cardRef, contentRef, finalContentRef } = useAboutAnimation();
    const { title, description, buttons, image } = aboutData;

    const renderDesktopDescription = () => {
        const parts = description.desktop.text.split(description.desktop.highlight);
        return (
            <>
                {parts[0]}
                <span className="text-primary font-medium">{description.desktop.highlight}</span>
                {parts[1]}
            </>
        );
    };

    return (
        // The trigger container provides the scroll distance
        <div id="about" ref={triggerRef} className="relative h-[180vh] md:h-[250vh] bg-background">

            {/* Pinned Section */}
            <div ref={sectionRef} className="h-screen w-full flex flex-col items-center justify-center sticky top-0 z-10 perspective-1000 overflow-hidden">

                {/* Background Effects - Hidden on mobile for performance */}
                <div className="absolute inset-0 pointer-events-none hidden md:block">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float opacity-40" />
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float opacity-30" style={{ animationDelay: '3s' }} />
                </div>

                <div ref={contentRef} className="hidden" />

                {/* Final Content */}
                <div
                    ref={finalContentRef}
                    className="absolute inset-0 h-full w-full px-6 flex flex-col justify-end pb-[15vh] text-center z-40 opacity-0 md:absolute md:left-1/2 md:top-1/2 md:bottom-auto md:right-auto md:w-[50%] md:h-[60vh] md:flex md:flex-col md:justify-center md:items-start md:pt-0 md:pl-12 md:pb-0 md:text-left md:-translate-y-1/2"
                >


                    <h2 className="hidden md:block text-7xl font-black text-white leading-[0.9] tracking-tight mb-6 drop-shadow-lg">
                        <span className="block text-foreground drop-shadow-2xl">{title.prefix}</span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-accent">
                            {title.highlight}
                        </span>
                    </h2>

                    {/* Mobile Text */}
                    <p className="md:hidden text-lg text-muted-foreground font-medium leading-relaxed mb-8 w-full px-2 drop-shadow-sm">
                        {description.mobile}
                    </p>

                    {/* Desktop Text */}
                    <p className="hidden md:block text-xl text-muted-foreground font-light leading-relaxed border-l-2 border-white/10 pl-6 mb-10">
                        {renderDesktopDescription()}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-0 md:pt-8 justify-center md:justify-start w-full md:w-auto">
                        <button
                            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                            className="hidden lg:flex h-[52px] px-16 min-w-[220px] rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-primary/30 text-foreground text-sm font-bold tracking-wide transition-all duration-300 items-center justify-center gap-3 group backdrop-blur-sm hover:scale-105 active:scale-95 will-change-transform">
                            <Terminal className="w-4 h-4 text-primary/70 group-hover:text-primary transition-colors" />
                            <span>{buttons.portfolio}</span>
                        </button>

                        <div className="block w-auto md:w-auto transition-transform duration-300 hover:scale-105 active:scale-95 p-[2px] transform-gpu will-change-transform backface-hidden">
                            <GradientButton
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                variant="variant"
                                className="h-[48px] md:h-[52px] px-8 md:px-16 min-w-[180px] md:min-w-[220px] text-base md:text-lg font-bold rounded-xl md:rounded-2xl shadow-xl hover:shadow-purple-500/20"
                            >
                                {buttons.contact}
                            </GradientButton>
                        </div>
                    </div>
                </div>

                {/* 3D Card Container */}
                <div
                    ref={cardRef}
                    className="relative bg-[#09090b] md:shadow-2xl origin-center z-30 will-change-transform backface-hidden"
                    style={{ transformStyle: 'preserve-3d', maxWidth: '90vw' }}
                >
                    {/* Premium Border/Glow */}
                    <div className="hidden md:block absolute -inset-[2px] rounded-[inherit] bg-gradient-to-r from-primary via-purple-500 to-accent opacity-50 blur-[2px]" />

                    {/* Inner Content */}
                    <div className="group relative w-full h-full rounded-[inherit] overflow-hidden bg-zinc-900 border border-white/5">
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />

                        <img
                            src={image.src}
                            width="800"
                            height="800"
                            alt={image.alt}
                            className="w-full h-full object-cover relative z-0 transition-transform duration-1000 ease-out group-hover:scale-110 group-hover:saturate-110"
                            style={{ objectPosition: '45% 50%' }}
                            loading="lazy"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutSection;