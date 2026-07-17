type ButtonProps = {
    text: string;
    variant?: "primary" | "secondary";
    href?: string;
    target?: string;
    download?: boolean | string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    className?: string;
};

const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "border border-gray-500 hover:bg-gray-800 text-white",
};

export default function Button({ text, variant ="primary", href, target, download, onClick, type ="button", disabled = false, className = "" }: ButtonProps) {
    const baseClassName =
            `${variants[variant]} px-6 py-3 rounded-lg transition inline-block`;

    if (href) {
        const rel = target === "_blank" ? "noopener noreferrer" : undefined;
        const downloadAttr = download ? (typeof download === "string" ? download : "") : undefined;

        return (
            <a href={href} target={target} rel={rel} {...(download ? {download: downloadAttr} : {})} className={` ${baseClassName} ${className ?? ""}`}>
                {text}
            </a>
        );
    }

    return (
        <button className={` ${baseClassName} ${className ?? ""}`} onClick={onClick} type={type} disabled={disabled}>
            {text}
        </button>
    );
}