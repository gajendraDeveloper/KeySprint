type ButtonProps = {
    label: string;
    onClick?: () => void;
    styleButton?: string;
    styleLabel?: string;
    icon?: React.ReactNode;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    title?: string;
}

const CommonButton = ({ label, onClick, styleButton, title, styleLabel, icon, type = "button", disabled = false }: ButtonProps) => {
    return (
        <button className={`${styleButton} cursor-pointer`} title={title} type={type} onClick={onClick} disabled={disabled}><p className={`${styleLabel}`}>{label}</p>{icon}</button>
    )
}
export default CommonButton