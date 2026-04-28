
type KpiProps = {
    label: string;
    value: string | number;
    icon?: React.ReactNode;
    trend?: string;
    styleWrapper?: string;
    styleLabel?: string;
    styleValue?: string;
    styleIcon?: string;
}

const CommonKpi = ({ label, value, icon, trend, styleWrapper, styleLabel, styleValue, styleIcon }: KpiProps) => {
    return (
        <div className={`${styleWrapper} flex flex-col p-4 bg-[#1a1a1a] border border-[#2f2f2f] rounded-2xl gap-2`}>
            <div className="flex items-center justify-between">
                <p className={`${styleLabel} text-[#a1a1a1] text-sm font-medium`}>{label}</p>
                <span className={`${styleIcon} text-[#a1a1a1]`}>{icon}</span>
            </div>
            <div className="flex items-end justify-between">
                <h3 className={`${styleValue} text-2xl font-bold text-white`}>{value}</h3>
                {trend && <span className="text-xs text-green-500">{trend}</span>}
            </div>
        </div>
    )
}

export default CommonKpi
