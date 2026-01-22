import { 
  ShieldAlert, 
  Globe, 
  TrendingUp, 
  FileCheck, 
  AlertTriangle,
  Truck,
  Calculator,
  Users,
  Store,
  Shield,
  ClipboardList,
  Boxes
} from "lucide-react";
import { Header } from "@/components/marketplace/Header";
import { SearchBar } from "@/components/marketplace/SearchBar";
import { ScenarioCard } from "@/components/marketplace/ScenarioCard";
import { CategoryCard } from "@/components/marketplace/CategoryCard";
import { ProviderCard } from "@/components/marketplace/ProviderCard";
import { SectionHeader } from "@/components/marketplace/SectionHeader";
import { Link } from "react-router-dom";

const scenarios = [
  {
    title: "账号被封了怎么办？",
    description: "专业申诉团队，帮你快速恢复账号，挽回损失",
    icon: ShieldAlert,
    category: "account-appeal",
    gradient: "from-red-500 to-orange-500"
  },
  {
    title: "新手卖家开店",
    description: "一站式开店服务，快速入驻全球电商平台",
    icon: Store,
    category: "new-seller",
    gradient: "from-primary to-primary-glow"
  },
  {
    title: "多账号风控优化",
    description: "专业风控方案，降低账号关联风险",
    icon: Shield,
    category: "risk-control",
    gradient: "from-teal-500 to-cyan-500"
  },
  {
    title: "运营效果差",
    description: "数据驱动运营，提升店铺转化率和销量",
    icon: TrendingUp,
    category: "operations",
    gradient: "from-violet-500 to-purple-500"
  },
];

const categories = [
  { name: "账号申诉", icon: ShieldAlert, count: 28, slug: "appeal" },
  { name: "全球开店", icon: Globe, count: 45, slug: "global-store" },
  { name: "代运营", icon: Users, count: 32, slug: "operations" },
  { name: "税务合规", icon: Calculator, count: 18, slug: "tax" },
  { name: "物流仓储", icon: Truck, count: 56, slug: "logistics" },
  { name: "品牌备案", icon: FileCheck, count: 24, slug: "brand" },
  { name: "索赔服务", icon: ClipboardList, count: 15, slug: "claims" },
  { name: "库存管理", icon: Boxes, count: 21, slug: "inventory" },
];

const certifiedProviders = [
  {
    id: "1",
    name: "跨境通申诉服务",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
    services: ["账号申诉", "品牌备案", "侵权处理"],
    platforms: ["Amazon", "eBay"],
    isCertified: true,
    isRecommended: true,
  },
  {
    id: "2",
    name: "全球易开店",
    logo: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=100&h=100&fit=crop",
    services: ["全球开店", "资质办理", "店铺托管"],
    platforms: ["Amazon", "Shopee", "Lazada"],
    isCertified: true,
    isRecommended: true,
  },
  {
    id: "3",
    name: "税安达合规",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop",
    services: ["VAT注册", "税务申报", "合规咨询"],
    platforms: ["Amazon", "eBay"],
    isCertified: true,
    isRecommended: false,
  },
  {
    id: "4",
    name: "速运物流",
    logo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&h=100&fit=crop",
    services: ["FBA头程", "海外仓储", "尾程配送"],
    platforms: ["Amazon", "TikTok"],
    isCertified: true,
    isRecommended: false,
  },
];

const regularProviders = [
  {
    id: "5",
    name: "优选代运营",
    logo: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop",
    services: ["店铺运营", "广告优化", "数据分析"],
    platforms: ["Amazon", "TikTok"],
    isCertified: false,
    isRecommended: false,
  },
  {
    id: "6",
    name: "品牌护航",
    logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop",
    services: ["品牌备案", "知识产权", "侵权维权"],
    platforms: ["Amazon"],
    isCertified: false,
    isRecommended: false,
  },
];

export default function MarketplaceHome() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Search */}
      <section className="gradient-hero pt-12 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              找到靠谱的跨境电商服务
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              紫鸟认证服务商，专业解决开店、运营、物流、合规等问题
            </p>
          </div>
          <SearchBar />
        </div>
      </section>

      {/* Scenario Entry Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="你遇到了什么问题？" 
            subtitle="选择场景，快速找到解决方案"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {scenarios.map((scenario) => (
              <ScenarioCard key={scenario.category} {...scenario} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="服务分类" 
            action={
              <Link 
                to="/services" 
                className="text-sm text-primary hover:underline"
              >
                查看全部
              </Link>
            }
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.slug} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* Certified Providers Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="官方推荐服务商" 
            subtitle="经过紫鸟认证，服务质量有保障"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifiedProviders.map((provider) => (
              <ProviderCard key={provider.id} {...provider} />
            ))}
          </div>
        </div>
      </section>

      {/* Regular Providers Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="更多服务商" 
            action={
              <Link 
                to="/services" 
                className="text-sm text-primary hover:underline"
              >
                查看全部
              </Link>
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {regularProviders.map((provider) => (
              <ProviderCard key={provider.id} {...provider} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2024 紫鸟. 专业跨境电商服务平台
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link to="/about" className="hover:text-primary transition-colors">关于我们</Link>
              <Link to="/contact" className="hover:text-primary transition-colors">联系我们</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">服务条款</Link>
              <Link to="/privacy" className="hover:text-primary transition-colors">隐私政策</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
