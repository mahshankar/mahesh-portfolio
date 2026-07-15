type GithubRepoCardProps = {
    name: string;
    description: string;
    url: string;
    stars: number;
    language: string | null;
    updatedAt: string;
};

export default function GithubRepoCard({
    name,
    description,
    url,
    stars,
    language,
    updatedAt,
}: GithubRepoCardProps) {
    const formattedDate = new Date(updatedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    return (
        <a
            href={url}
            aria-label={`View GitHub repository ${name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
            bg-slate-800
            rounded-xl
            p-6
            block
            group
            transition-all
            duration-300
            hover:bg-slate-700
            hover:-translate-y-2
            hover:shadow-xl
            hover:shadow-blue-500/10
            "
        >
            <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold text-blue-400 group-hover:text-blue-300 transition">
                    {name}
                </h3>
                <span className="text-yellow-400 text-sm">⭐ {stars}</span>
            </div>

            <p className="text-gray-300 mb-4 line-clamp-2">
                {description || "No project description available"}
            </p>

            <div className="flex items-center justify-between text-sm">
                <div className="flex gap-3 items-center">
                    {language && (
                        <span className="bg-slate-700 text-gray-300 px-3 py-1 rounded-full text-xs">
                            {language}
                        </span>
                    )}
                </div>
                <span className="text-gray-400">
                    Updated {formattedDate}
                </span>
            </div>
        </a>
    );
}
