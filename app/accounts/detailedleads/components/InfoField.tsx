// interface Props {
//     label: string;
//     value?: string | number | null;
// }

// export default function InfoField({
//     label,
//     value,
// }: Props) {
//     const formatValue = () => {
//         if (
//             value === null ||
//             value === undefined ||
//             value === ""
//         ) {
//             return "N/A";
//         }

//         // REMOVE QUOTES
//         if (typeof value === "string") {
//             value = value.replace(/"/g, "");
//         }

//         // FORMAT DECIMAL VALUES
//         if (!isNaN(Number(value))) {
//             return Number(value).toLocaleString(
//                 "en-IN",
//                 {
//                     minimumFractionDigits: 2,
//                     maximumFractionDigits: 2,
//                 }
//             );
//         }

//         return value;
//     };

//     return (
//         <div>
//             <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
//                 {label}
//             </p>

//             <p className="text-sm font-semibold text-slate-800 break-words">
//                 {formatValue()}
//             </p>
//         </div>
//     );
// }

interface Props {
    label: string;
    value?: string | number | null;
}

export default function InfoField({
    label,
    value,
}: Props) {

    const amountFields = [
        "Disbursement",
        "Gross Payout",
        "TDS",
        "Net Payout",
        "GST Amount",
    ];

    const shouldFormatAmount = amountFields.includes(label);

    const formatValue = () => {

        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {
            return "N/A";
        }

        let formattedValue = value;

        // REMOVE EXTRA QUOTES
        if (typeof formattedValue === "string") {
            formattedValue = formattedValue.replace(/"/g, "");
        }

        // FORMAT ONLY AMOUNT FIELDS
        if (
            shouldFormatAmount &&
            !isNaN(Number(formattedValue))
        ) {
            return Number(formattedValue).toLocaleString(
                "en-IN",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }
            );
        }

        return formattedValue;
    };

    return (
        <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                {label}
            </p>

            <p className="text-sm font-semibold text-slate-900 break-words">
                {formatValue()}
            </p>
        </div>
    );
}