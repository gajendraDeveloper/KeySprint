


type CommonInputFieldProps = {
    label: string;
    name: string;
    styleInputField?: string;
    styleLabel?: string;
    type: string;
    placeholder: string;
    readOnly?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    styleIcon?: string;
    styleWrapper?: string;
    register?: any;
    errors?: any;
}

const CommonInputField = ({
    label,
    name,
    styleInputField,
    styleLabel,
    type,
    placeholder,
    readOnly,
    disabled,
    icon,
    iconPosition,
    styleIcon,
    styleWrapper,
    register,
    errors,
}: CommonInputFieldProps) => {
    return (
        <div className={`${styleWrapper} flex flex-col gap-1`}>
            <label className={`${styleLabel}`}>{label}</label>
            <div className={`${styleInputField} flex items-center gap-2`}>
                {iconPosition === "left" && <span className={`${styleIcon}`}>{icon}</span>}
                <input
                    className="bg-transparent border-none outline-none w-full h-full py-2.5 text-zinc-900 placeholder:text-zinc-400"
                    type={type}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    disabled={disabled}
                    {...register && register(name)}
                />
                {iconPosition === "right" && <span className={`${styleIcon}`}>{icon}</span>}
            </div>
            {errors && <p className="text-red-500 text-xs font-medium">{errors}</p>}
        </div>
    )
}

export default CommonInputField