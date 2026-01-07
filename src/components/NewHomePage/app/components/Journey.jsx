
const journey = [
    { date: "May 14, 2022", emoji: "🌱", text: "Cargofirst QAHO Corporation Pvt. Ltd. was founded" },
        { date: "2022", emoji: "🌾", text: "Focusing on rice trade and inspection from India and Vietnam" },
    { date: "2023", emoji: "🤖", text: "Developed AI-based model for rice physical inspection" },
    { date: "Nov 2023", emoji: "🚀", text: "Deployed AI model for rice inspection" },
    { date: "Dec 2023", emoji: "💰", text: "Raised pre-seed funding round" },
    { date: "Feb 2024", emoji: "🌍", text: "Market expansion to 17 countries" },
    { date: "May 2024", emoji: "🏆", text: "Targeting top 5 agri commodities and solving for quality" },
    { date: "Feb 2025", emoji: "🌍", text: "Market expansion to 30+ countries" },
    { date: "May 2025", emoji: "🎉", text: "Launch of Quality.ai – marketplace for global quality inspection" },
    { date: "Dec 2025", emoji: "💰", text: "Offered quality inspection for commodities worth over $250M" },
];

export default function Journey() {
    return (
        <section id="journey" className="py-20">
            <h2 className="text-center text-xl font-semibold mb-16">
                Our journey so far
            </h2>

            <div className="relative max-w-5xl mx-auto px-4">
                <div className="absolute left-4 md:left-1/2 top-0 h-full w-px bg-yellow-300 md:-translate-x-1/2" />

                <div className="space-y-12">
                    {journey.map((item, i) => {
                        const isLeft = i % 2 === 0;

                        return (
                            <div
                                key={i}
                                className="
                                    relative
                                    flex items-start gap-4
                                    md:grid md:grid-cols-[1fr_40px_1fr] md:gap-6
                                "
                            >
                                <div className="hidden md:flex flex-col items-end">
                                    {isLeft ? (
                                        <p className="text-sm leading-relaxed max-w-sm text-right">
                                            {item.text}
                                        </p>
                                    ) : (
                                        <span className="px-3 py-1 text-xs rounded bg-blue-100 text-blue-800 whitespace-nowrap">
                                            {item.date}
                                        </span>
                                    )}
                                </div>

                                <div className="relative flex justify-center min-w-[32px]">
                                    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-sm z-10">
                                        {item.emoji}
                                    </div>
                                </div>

                                <div className="flex flex-col items-start">
                                    <span className="md:hidden mb-1 px-3 py-1 text-xs rounded bg-yellow-100 whitespace-nowrap">
                                        {item.date}
                                    </span>

                                    <p className="md:hidden text-sm leading-relaxed">
                                        {item.text}
                                    </p>

                                    {!isLeft ? (
                                        <p className="hidden md:block text-sm leading-relaxed max-w-sm">
                                            {item.text}
                                        </p>
                                    ) : (
                                        <span className="hidden md:inline px-3 py-1 text-xs rounded bg-green-100 text-green-800 whitespace-nowrap">
                                            {item.date}
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}