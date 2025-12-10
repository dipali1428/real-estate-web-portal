function SectionHeader({ title }: { title: string }) {
    return (
        <div className="flex items-center gap-3 mb-6">
            <div className="h-6 w-1.5 rounded-full bg-linear-to-b from-blue-500 to-cyan-500"></div>
            <h3 className="text-xl font-bold tracking-tight text-gray-900">{title}</h3>
        </div>
    );
}
export default SectionHeader;