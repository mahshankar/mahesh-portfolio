type ButtonProps = {
    text: string;
    variant?: "primary" | "secondary";
    };

const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "border border-gray-500 hover:bg-gray-800 text-white",
};

export default function Button({ text, variant, }: ButtonProps) {
    return (
        <button className={`${variants[variant]} px-6 py-3 rounded-lg transition`}>
            {text}
        </button>
    );
}