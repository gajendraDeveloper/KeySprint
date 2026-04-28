

type CardProps = {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    onClick?: () => void;
    styleIcon?: string;
    styleCard?: string;
    styleTitle?: string;
    styleDescription?: string;
}

const CommonCard = ({ icon, title, description, onClick, styleIcon, styleCard, styleTitle, styleDescription }: CardProps) => {
    return (
        <div className={`${styleCard} ${onClick ? 'cursor-pointer' : ''} flex flex-col gap-3 items-center justify-center rounded-xl p-2`} onClick={onClick}>
            <span className={`${styleIcon}`}>{icon}</span>
            <p className={`${styleTitle}`}>{title}</p>
            <p className={`${styleDescription}`}>{description}</p>
        </div>
    )
}
export default CommonCard