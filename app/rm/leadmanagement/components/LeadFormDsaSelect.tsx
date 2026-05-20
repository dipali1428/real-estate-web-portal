"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { RmService } from "@/app/services/rmService";

export type LeadFormDsaOption = {
  id: string;
  adv_id: string;
  name: string;
};

function mapDsas(raw: unknown[]): LeadFormDsaOption[] {
  return raw
    .map((item: any) => ({
      id: item?.id != null ? String(item.id) : "",
      adv_id: item?.adv_id ?? "",
      name: item?.name ?? "",
    }))
    .filter((d) => d.id);
}

/** Use in `DashboardService.createLead` payloads so every form sends DSA the same way. */
export function detailLeadMeta(opts: { is_self_login: boolean }) {
  return {
    is_self_login: opts.is_self_login,
  };
}

type LeadFormDsaSelectProps = {
  value: string;
  onChange: (dsaId: string) => void;
  error?: string;
  required?: boolean;
  label?: string;
  className?: string;
};

const LABEL_CLASS = "block text-sm font-medium mb-1 text-gray-700";
const inputClass = (err: boolean) =>
  `w-full border rounded-md p-2 bg-white text-gray-700 outline-none text-sm sm:text-base transition-all appearance-none ${
    err
      ? "border-red-500 focus:ring-1 focus:ring-red-500"
      : "border-gray-300 focus:ring-2 focus:ring-[#1CADA3] focus:border-[#1CADA3]"
  } cursor-pointer font-medium text-[#1CADA3]`;

export default function LeadFormDsaSelect({
  value,
  onChange,
  error,
  required,
  label = "DSA partner",
  className = "",
}: LeadFormDsaSelectProps) {
  const [options, setOptions] = useState<LeadFormDsaOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await RmService.getYourDsaList();
        if (cancelled) return;
        const list = Array.isArray((res as any)?.dsas) ? mapDsas((res as any).dsas) : [];
        list.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));
        setOptions(list);
        setLoadError(null);
      } catch {
        if (!cancelled) {
          setLoadError("Could not load DSA list");
          setOptions([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const showError = error || loadError;

  return (
    <div className={`w-full relative ${className}`}>
      <label className={LABEL_CLASS}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={loading}
          className={`${inputClass(!!showError)} pr-9`}
        >
          <option value="">{loading ? "Loading DSAs…" : "Select DSA partner"}</option>
          {options.map((d) => (
            <option key={d.id} value={d.id} className="text-gray-700">
              {d.name}
              {d.adv_id ? ` — ${d.adv_id}` : ""}
            </option>
          ))}
        </select>
        {loading ? (
          <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-gray-400 pointer-events-none" />
        ) : (
          <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
        )}
      </div>
      {error ? <p className="text-red-500 text-xs mt-1">{error}</p> : null}
      {!error && loadError ? <p className="text-red-500 text-xs mt-1">{loadError}</p> : null}
    </div>
  );
}
