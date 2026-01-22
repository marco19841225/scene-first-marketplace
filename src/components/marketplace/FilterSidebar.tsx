import { Check } from "lucide-react";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSidebarProps {
  platforms: FilterOption[];
  serviceTypes: FilterOption[];
  selectedPlatform: string | null;
  selectedServiceType: string | null;
  certifiedOnly: boolean;
  onPlatformChange: (platform: string | null) => void;
  onServiceTypeChange: (type: string | null) => void;
  onCertifiedChange: (certified: boolean) => void;
}

export function FilterSidebar({
  platforms,
  serviceTypes,
  selectedPlatform,
  selectedServiceType,
  certifiedOnly,
  onPlatformChange,
  onServiceTypeChange,
  onCertifiedChange,
}: FilterSidebarProps) {
  return (
    <aside className="w-64 flex-shrink-0">
      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm sticky top-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">筛选条件</h3>

        {/* Platform Filter */}
        <div className="mb-6">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            平台
          </h4>
          <div className="space-y-2">
            <button
              onClick={() => onPlatformChange(null)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                selectedPlatform === null
                  ? "bg-primary-light text-primary font-medium"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              <span>全部平台</span>
              {selectedPlatform === null && <Check className="w-4 h-4" />}
            </button>
            {platforms.map((platform) => (
              <button
                key={platform.value}
                onClick={() => onPlatformChange(platform.value)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                  selectedPlatform === platform.value
                    ? "bg-primary-light text-primary font-medium"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                <span>{platform.label}</span>
                {selectedPlatform === platform.value && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>

        {/* Service Type Filter */}
        <div className="mb-6">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            服务类型
          </h4>
          <div className="space-y-2">
            <button
              onClick={() => onServiceTypeChange(null)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                selectedServiceType === null
                  ? "bg-primary-light text-primary font-medium"
                  : "text-foreground hover:bg-secondary"
              }`}
            >
              <span>全部类型</span>
              {selectedServiceType === null && <Check className="w-4 h-4" />}
            </button>
            {serviceTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => onServiceTypeChange(type.value)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
                  selectedServiceType === type.value
                    ? "bg-primary-light text-primary font-medium"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                <span>{type.label}</span>
                {selectedServiceType === type.value && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>

        {/* Certified Filter */}
        <div>
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            认证状态
          </h4>
          <button
            onClick={() => onCertifiedChange(!certifiedOnly)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${
              certifiedOnly
                ? "bg-accent-light text-accent font-medium"
                : "text-foreground hover:bg-secondary"
            }`}
          >
            <span>仅显示紫鸟认证</span>
            {certifiedOnly && <Check className="w-4 h-4" />}
          </button>
        </div>

        {/* Reset */}
        <button
          onClick={() => {
            onPlatformChange(null);
            onServiceTypeChange(null);
            onCertifiedChange(false);
          }}
          className="w-full mt-6 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          重置筛选
        </button>
      </div>
    </aside>
  );
}
