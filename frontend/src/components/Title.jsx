export default function Title({ children }) {
    return (
        <h1 className="text-slate-900 dark:text-white mt-20 max-w-[36rem] text-3xl font-extrabold tracking-tight  sm:text-7xl xl:max-w-[43.5rem] mb-8">
            {children}
        </h1>
    );
}
