import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/marketplace/Header";
import { SearchBar } from "@/components/marketplace/SearchBar";
import { FilterSidebar } from "@/components/marketplace/FilterSidebar";
import { ProviderCard } from "@/components/marketplace/ProviderCard";
import { EmptyState } from "@/components/marketplace/EmptyState";
import { SectionHeader } from "@/components/marketplace/SectionHeader";

const platforms = [
  { value: "amazon", label: "Amazon" },
  { value: "tiktok", label: "TikTok Shop" },
  { value: "shopee", label: "Shopee" },
  { value: "lazada", label: "Lazada" },
  { value: "ebay", label: "eBay" },
];

const serviceTypes = [
  { value: "appeal", label: "账号申诉" },
  { value: "global-store", label: "全球开店" },
  { value: "operations", label: "代运营" },
  { value: "tax", label: "税务合规" },
  { value: "logistics", label: "物流仓储" },
  { value: "brand", label: "品牌备案" },
];

const allProviders = [
  {
    id: "1",
    name: "跨境通申诉服务",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
    services: ["账号申诉", "品牌备案", "侵权处理"],
    platforms: ["Amazon", "eBay"],
    isCertified: true,
    isRecommended: true,
    platformKeys: ["amazon", "ebay"],
    serviceKey: "appeal",
  },
  {
    id: "2",
    name: "全球易开店",
    logo: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=100&h=100&fit=crop",
    services: ["全球开店", "资质办理", "店铺托管"],
    platforms: ["Amazon", "Shopee", "Lazada"],
    isCertified: true,
    isRecommended: true,
    platformKeys: ["amazon", "shopee", "lazada"],
    serviceKey: "global-store",
  },
  {
    id: "3",
    name: "税安达合规",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop",
    services: ["VAT注册", "税务申报", "合规咨询"],
    platforms: ["Amazon", "eBay"],
    isCertified: true,
    isRecommended: false,
    platformKeys: ["amazon", "ebay"],
    serviceKey: "tax",
  },
  {
    id: "4",
    name: "速运物流",
    logo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&h=100&fit=crop",
    services: ["FBA头程", "海外仓储", "尾程配送"],
    platforms: ["Amazon", "TikTok"],
    isCertified: true,
    isRecommended: false,
    platformKeys: ["amazon", "tiktok"],
    serviceKey: "logistics",
  },
  {
    id: "5",
    name: "优选代运营",
    logo: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop",
    services: ["店铺运营", "广告优化", "数据分析"],
    platforms: ["Amazon", "TikTok"],
    isCertified: false,
    isRecommended: false,
    platformKeys: ["amazon", "tiktok"],
    serviceKey: "operations",
  },
  {
    id: "6",
    name: "品牌护航",
    logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop",
    services: ["品牌备案", "知识产权", "侵权维权"],
    platforms: ["Amazon"],
    isCertified: false,
    isRecommended: false,
    platformKeys: ["amazon"],
    serviceKey: "brand",
  },
  {
    id: "7",
    name: "云途物流",
    logo: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=100&h=100&fit=crop",
    services: ["国际快递", "专线物流", "清关服务"],
    platforms: ["Amazon", "Shopee", "Lazada"],
    isCertified: true,
    isRecommended: false,
    platformKeys: ["amazon", "shopee", "lazada"],
    serviceKey: "logistics",
  },
  {
    id: "8",
    name: "TikTok运营专家",
    logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop",
    services: ["短视频运营", "直播带货", "达人合作"],
    platforms: ["TikTok"],
    isCertified: true,
    isRecommended: true,
    platformKeys: ["tiktok"],
    serviceKey: "operations",
  },
];

export default function ServiceList() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || null;
  
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedServiceType, setSelectedServiceType] = useState<string | null>(initialCategory);
  const [certifiedOnly, setCertifiedOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const filteredProviders = useMemo(() => {
    return allProviders.filter((provider) => {
      // Platform filter
      if (selectedPlatform && !provider.platformKeys.includes(selectedPlatform)) {
        return false;
      }
      // Service type filter
      if (selectedServiceType && provider.serviceKey !== selectedServiceType) {
        return false;
      }
      // Certified filter
      if (certifiedOnly && !provider.isCertified) {
        return false;
      }
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = provider.name.toLowerCase().includes(query);
        const matchesServices = provider.services.some(s => 
          s.toLowerCase().includes(query)
        );
        const matchesPlatforms = provider.platforms.some(p => 
          p.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesServices && !matchesPlatforms) {
          return false;
        }
      }
      return true;
    });
  }, [selectedPlatform, selectedServiceType, certifiedOnly, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSubmitRequest = () => {
    // In a real app, this would open a modal or navigate to a form
    console.log("Submit request");
  };

  const getPageTitle = () => {
    if (searchQuery) return `搜索结果: ${searchQuery}`;
    if (selectedServiceType) {
      const type = serviceTypes.find(t => t.value === selectedServiceType);
      return type ? type.label : "全部服务";
    }
    return "全部服务";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Search Section */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="搜索服务商名称、服务类型..."
          />
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <FilterSidebar
            platforms={platforms}
            serviceTypes={serviceTypes}
            selectedPlatform={selectedPlatform}
            selectedServiceType={selectedServiceType}
            certifiedOnly={certifiedOnly}
            onPlatformChange={setSelectedPlatform}
            onServiceTypeChange={setSelectedServiceType}
            onCertifiedChange={setCertifiedOnly}
          />

          {/* Provider List */}
          <main className="flex-1">
            <SectionHeader 
              title={getPageTitle()} 
              subtitle={`共 ${filteredProviders.length} 家服务商`}
            />

            {filteredProviders.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {filteredProviders.map((provider) => (
                  <ProviderCard
                    key={provider.id}
                    id={provider.id}
                    name={provider.name}
                    logo={provider.logo}
                    services={provider.services}
                    platforms={provider.platforms}
                    isCertified={provider.isCertified}
                    isRecommended={provider.isRecommended}
                  />
                ))}
              </div>
            ) : (
              <EmptyState 
                searchQuery={searchQuery} 
                onSubmitRequest={handleSubmitRequest}
              />
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-border mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2024 紫鸟. 专业跨境电商服务平台
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
