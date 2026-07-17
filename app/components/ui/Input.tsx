type InputProps = {
    label: string;
    name: string;
    type?: "text" | "email" | "password"|"number"| "tel"| "url";
    value: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    disabled?: boolean;
};

export default function Input({ label, name, type = "text", value, placeholder, onChange, error, disabled }: InputProps) {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-1">
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={`w-full px-4 py-3 rounded-lg bg-slate-800 text-white border focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-slate-600'}`}
                disabled={disabled}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}
