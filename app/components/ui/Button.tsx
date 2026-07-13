type ButtonProps = {
    text: string;
    variant?: "primary" | "secondary";
    href?: string;
    onClick?: () => void;
};

const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "border border-gray-500 hover:bg-gray-800 text-white",
};

export default function Button({ text, variant ="primary", href, onClick }: ButtonProps) {
    const className =
            `${variants[variant]} px-6 py-3 rounded-lg transition inline-block`;

    if (href) {
        return (
            <a href={href} className={className}>
                {text}
            </a>
        );
    }

    return (
        <button className={className} onClick={onClick}>
            {text}
        </button>
    );
}