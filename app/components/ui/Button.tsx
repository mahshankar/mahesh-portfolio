type ButtonProps = {
    text: string;
    variant: "primary" | "secondary";
    href: string;
};

const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "border border-gray-500 hover:bg-gray-800 text-white",
};

export default function Button({ text, variant, href }: ButtonProps) {
    if (href) {
        return (
            <a href={href} className={`${variants[variant]} px-6 py-3 rounded-lg transition inline-block`}>
                {text}
            </a>
        );
    }
    return (
        <button className={`${variants[variant]} px-6 py-3 rounded-lg transition`}>
            {text}
        </button>
    );
}