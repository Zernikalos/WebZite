import clsx from "clsx";

export default function SectionTitle({title}: {title: string}) {
    return (
        <h2
            className={clsx(
                'tw:text-5xl lg:tw:text-6xl tw:font-extrabold tw:tracking-tight',
                'tw:bg-gradient-to-r tw:from-cyan-400 tw:via-sky-500 tw:to-purple-600',
                'tw:bg-clip-text tw:text-transparent',
                'tw:animate-[gradientShift_10s_ease-in-out_infinite]',
                'tw:drop-shadow-[0_0_8px_rgba(99,102,255,0.7)]'
            )}
        >
            {title}
        </h2>
    );
}