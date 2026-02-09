import React from 'react';

interface CalculatorSliderProps {
    label: string;
    value: number;
    onChange: (val: number) => void;
    min: number;
    max: number;
    step?: number;
    prefix?: string;
    suffix?: string;
    showValue?: true;
    formatValue?: (val: number) => string;
    className?: string;
}

const CalculatorSlider: React.FC<CalculatorSliderProps> = ({
    label,
    value,
    onChange,
    min,
    max,
    step = 1,
    prefix = '',
    suffix = '',
    showValue = true,
    formatValue,
    className = ''
}) => {
    const formatDisplay = (val: number) => {
        if (formatValue) return formatValue(val);
        if (prefix === '₹') {
            return `₹${new Intl.NumberFormat('en-IN').format(val)}`;
        }
        return `${prefix}${val}${suffix}`;
    };

    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div className={`space-y-3 ${className}`}>
            <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-slate-main">
                    {label}
                </label>
                {showValue && (
                    <span className="text-lg font-bold text-primary">
                        {formatDisplay(value)}
                    </span>
                )}
            </div>
            <div className="relative">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                    style={{
                        background: `linear-gradient(to right, #2076C7 0%, #2076C7 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`
                    }}
                />
            </div>
            <div className="flex justify-between text-xs text-slate-muted">
                <span>{formatDisplay(min)}</span>
                <span>{formatDisplay(max)}</span>
            </div>
        </div>
    );
};

export default CalculatorSlider;
