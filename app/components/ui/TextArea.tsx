type TextAreaProps = {
    label: string;
    name: string;
    value: string;
    placeholder?: string;
    rows?: number;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string;
    disabled?: boolean;
};

export default function TextArea({ label, name, value, placeholder, rows, onChange, error, disabled }: TextAreaProps) {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-1">
                {label}
            </label>
            <textarea
                id={name}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={`w-full px-4 py-3 rounded-lg bg-slate-800 text-white border focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-slate-600'}`}
                rows={rows || 5}
                disabled={disabled}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}
