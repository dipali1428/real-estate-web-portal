import React from 'react';

interface ResultCardProps {
    title: string;
    value: number | string;
    subtitle?: string;
    icon?: React.ReactNode;
    color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'teal';
    prefix?: string;
    suffix?: string;
    className?: string;
}

const ResultCard: React.FC<ResultCardProps> = ({
    title,
    value,
    subtitle,
    icon,
    color = 'blue',
    prefix = '₹',
    suffix = '',
    className = ''
}) => {
    const colorClasses = {
        blue: 'bg-blue-50 border-blue-200',
        green: 'bg-green-50 border-green-200',
        red: 'bg-red-50 border-red-200',
        yellow: 'bg-yellow-50 border-yellow-200',
        purple: 'bg-purple-50 border-purple-200',
        teal: 'bg-teal-50 border-teal-200'
    };

    const textColorClasses = {
        blue: 'text-primary',
        green: 'text-green-600',
        red: 'text-red-600',
        yellow: 'text-yellow-600',
        purple: 'text-purple-600',
        teal: 'text-accent-teal'
    };

    const formatValue = (val: number | string) => {
        if (typeof val === 'number') {
            if (prefix === '₹') {
                return `₹${new Intl.NumberFormat('en-IN').format(Math.round(val))}`;
            }
            return `${prefix}${val.toLocaleString('en-IN')}${suffix}`;
        }
        return val;
    };

    return (
        <div className={`p-4 rounded-lg border ${colorClasses[color]} ${className}`}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="text-sm text-slate-muted mb-1">{title}</div>
                    <div className={`text-2xl font-bold ${textColorClasses[color]}`}>
                        {formatValue(value)}
                    </div>
                    {subtitle && (
                        <div className="text-sm text-slate-muted mt-1">{subtitle}</div>
                    )}
                </div>
                {icon && (
                    <div className={`ml-3 ${textColorClasses[color]}`}>
                        {icon}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultCard;
