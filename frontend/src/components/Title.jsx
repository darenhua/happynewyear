export default function Title({ children }) {
    return (
        <h1 className="text-slate-900 dark:text-white mt-20 max-w-[36rem] text-7xl -lg:text-center -lg:text-6xl -lg:mt-8 -sm:text-3xl font-extrabold tracking-tight xl:max-w-[43.5rem] mb-8">
            {children}
        </h1>
    );
}
