export const COMPANY_LABELS: Record<string, string> = {
    citi: "Citi",
    deloitte: "Deloitte",
    verizon: "Verizon",
    "florida dep": "Florida DEP",
    "ohio dfs": "Ohio DFS",
    "washington dshs": "Washington DSHS",
    "illinois dhs": "Illinois DHS",
};

export const COMPANY_ALIASES: Record<string, string[]> = {
    citi: [
        "citi",
        "banking client",
        "banking platform",
    ],
    deloitte: [
        "deloitte",
    ],
    verizon: [
        "verizon",
        "telecom client",
        "telecommunications client",
    ],
    "florida dep": [
        "florida dep",
        "fl dep",
    ],
    "ohio dfs": [
        "ohio dfs",
    ],
    "washington dshs": [
        "washington dshs",
        "wa dshs",
    ],
    "illinois dhs": [
        "illinois dhs",
        "il dhs",
    ],
};

export const COMPANY_KEYS =
    Object.keys(COMPANY_LABELS);

export function normalizeForMatching(
    value: string
): string {
    return value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

export function detectCompanyKey(
    text: string
): string | undefined {
    const normalizedText =
        normalizeForMatching(text);

    return Object.entries(COMPANY_ALIASES)
        .find(([, aliases]) =>
            aliases.some((alias) =>
                normalizedText.includes(
                    normalizeForMatching(alias)
                )
            )
        )?.[0];
}

export function detectCompanyLabel(
    text: string
): string | undefined {
    const companyKey = detectCompanyKey(text);

    return companyKey
        ? COMPANY_LABELS[companyKey]
        : undefined;
}