type ContactCardProps = {
    title: string;
    value: string;
    href: string;
};

export default function ContactCard({
    title,
    value,
    href,
}: ContactCardProps) {

    const isExternal = href.startsWith("http");

    return (
        <a
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="
                block
                bg-slate-800
                rounded-xl
                p-8
                hover:bg-slate-700
                hover:-translate-y-1
                hover:shadow-xl
                transition-all
                duration-300
            "
        >
            <h3 className="text-2xl font-bold text-blue-400">
                {title}
            </h3>

            <p className="text-slate-300 mt-3 break-all">
                {value}
            </p>
        </a>
    );
}