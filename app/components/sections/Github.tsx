"use client";

import { useEffect, useState } from "react";
import GithubRepoCard from "../cards/GithubRepoCard";

type GithubRepo = {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    language?: string;
    updated_at: string;
};

export default function Github() {
    const [repos, setRepos] = useState<GithubRepo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await fetch(
                    "https://api.github.com/users/mahshankar/repos"
                );

                if (!response.ok) {
                    throw new Error(
                        `GitHub API error: ${response.status} ${response.statusText}`
                    );
                }

                const data: GithubRepo[] = await response.json();

                // Sort by updated_at (most recent first) and take top 6
                const sortedRepos = data
                    .sort(
                        (a, b) =>
                            new Date(b.updated_at).getTime() -
                            new Date(a.updated_at).getTime()
                    )
                    .slice(0, 6);

                setRepos(sortedRepos);
            } catch (err) {
                console.error("Error fetching GitHub repos:", err);
                setError("Failed to fetch GitHub repositories");
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, []);

    return (
        <section id="github" className="bg-slate-950 text-white py-24">
            <div className="max-w-6xl mx-auto px-8">
                <h2 className="text-4xl font-bold mb-4">
                    Open Source Projects
                </h2>

                <p className="text-lg text-slate-300 mb-12 max-w-3xl">
                    A selection of my personal projects and open-source repositories,
                    showcasing continuous learning and hands-on experience with modern
                    technologies.
                </p>

                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-gray-400">Loading repositories...</p>
                    </div>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : repos.length === 0 ? (
                    <p className="text-gray-400">No repositories found.</p>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {repos.map((repo) => (
                            <GithubRepoCard
                                key={repo.id}
                                name={repo.name}
                                description={repo.description}
                                url={repo.html_url}
                                stars={repo.stargazers_count}
                                language={repo.language}
                                updatedAt={repo.updated_at}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}