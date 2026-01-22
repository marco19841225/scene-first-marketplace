import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  CheckCircle2, 
  Shield, 
  ChevronDown, 
  ChevronUp,
  AlertTriangle,
  MessageCircle,
  FileText,
  Clock,
  Target,
  ArrowRight
} from "lucide-react";
import { Header } from "@/components/marketplace/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock data - in production this would come from API
const providerData = {
  id: "1",
  name: "跨境通申诉服务",
  logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop",
  isCertified: true,
  platforms: ["Amazon", "eBay", "Walmart"],
  description: "专业跨境电商账号申诉团队，拥有10年+申诉经验，累计帮助3000+卖家成功恢复账号。",
  services: [
    {
      id: "s1",
      name: "账号申诉服务",
      description: "针对账号被封、受限、绩效不达标等问题，提供专业的申诉方案设计与执行服务。我们的团队熟悉各平台的申诉流程和审核标准，能够快速分析问题根源，制定有效的申诉策略。",
      scenarios: [
        "账号被暂停或永久封禁",
        "销售权限被移除",
        "绩效指标不达标收到警告",
        "知识产权投诉导致下架"
      ],
      deliveryTime: "根据案件复杂程度，通常需要3-15个工作日完成申诉流程"
    },
    {
      id: "s2",
      name: "品牌备案服务",
      description: "协助卖家完成品牌在各平台的官方备案流程，获取品牌保护权益和额外的销售功能权限。",
      scenarios: [
        "新品牌首次备案",
        "已有商标需要平台备案",
        "品牌备案被拒需要重新申请"
      ],
      deliveryTime: "品牌备案周期约15-30个工作日，视平台审核进度而定"
    },
    {
      id: "s3",
      name: "侵权处理服务",
      description: "针对知识产权侵权投诉，提供专业的应对策略和申诉服务，帮助卖家解除侵权标记。",
      scenarios: [
        "收到侵权投诉通知",
        "Listing因侵权被下架",
        "需要与投诉方协商撤诉"
      ],
      deliveryTime: "处理周期约5-20个工作日，根据投诉类型和复杂程度不同"
    }
  ],
  processNote: "我们将在每个环节保持与您的充分沟通，确保您了解服务进展。",
  cases: [
    {
      id: "c1",
      title: "某3C卖家账号恢复案例",
      platform: "Amazon",
      situation: "因产品真实性投诉导致账号被暂停",
      result: "成功提交申诉并在7天内恢复销售权限",
      anonymous: true
    },
    {
      id: "c2",
      title: "某服装卖家侵权申诉案例",
      platform: "Amazon",
      situation: "因图片侵权收到投诉，多个Listing被下架",
      result: "协商撤诉后成功恢复所有商品上架",
      anonymous: true
    }
  ]
};

const processSteps = [
  { step: 1, title: "卖家提交需求", description: "填写详细的问题描述和相关资料" },
  { step: 2, title: "服务商评估", description: "服务商分析案件情况并给出方案" },
  { step: 3, title: "卖家确认合作", description: "双方确认服务内容和条款" },
  { step: 4, title: "服务执行", description: "服务商按方案执行服务" },
  { step: 5, title: "服务结束", description: "交付成果并完成服务确认" },
];

export default function ProviderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expandedService, setExpandedService] = useState<string>("s1");
  const [expandedCase, setExpandedCase] = useState<string | null>(null);
  const [showConsultDialog, setShowConsultDialog] = useState(false);

  const provider = providerData; // In production, fetch based on id

  const handleSubmitRequest = () => {
    navigate(`/submit-request?provider=${id}&service=${expandedService}`);
  };

  const toggleService = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? "" : serviceId);
  };

  const toggleCase = (caseId: string) => {
    setExpandedCase(expandedCase === caseId ? null : caseId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Top Info Section - Trust Anchor */}
        <section className="bg-card rounded-2xl border border-border p-8 shadow-card mb-6 animate-fade-in">
          <div className="flex items-start gap-6">
            {/* Logo */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 rounded-2xl bg-secondary overflow-hidden shadow-md">
                <img
                  src={provider.logo}
                  alt={provider.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {provider.isCertified && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-accent-foreground" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-2xl font-bold text-foreground">{provider.name}</h1>
                {provider.isCertified && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge 
                        variant="secondary" 
                        className="bg-accent-light text-accent border-0 cursor-help gap-1"
                      >
                        <Shield className="w-3 h-3" />
                        紫鸟认证
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs bg-popover text-popover-foreground border border-border">
                      <p className="text-sm">该服务商已通过紫鸟企业资质审核，不代表服务结果承诺</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>

              <p className="text-muted-foreground mb-4">{provider.description}</p>

              {/* Platform Tags */}
              <div className="flex flex-wrap gap-2">
                {provider.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="text-sm bg-muted text-muted-foreground px-3 py-1 rounded-full"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Service Capability Section */}
        <section className="bg-card rounded-2xl border border-border p-8 shadow-card mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            服务能力
          </h2>

          <div className="space-y-4">
            {provider.services.map((service) => (
              <div
                key={service.id}
                className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                  expandedService === service.id
                    ? "border-primary/30 bg-primary-light/30"
                    : "border-border hover:border-primary/20"
                }`}
              >
                <button
                  onClick={() => toggleService(service.id)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-foreground">{service.name}</span>
                  {expandedService === service.id ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>

                {expandedService === service.id && (
                  <div className="px-5 pb-5 animate-fade-in">
                    <div className="border-t border-border/50 pt-5 space-y-4">
                      {/* Service Description */}
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">服务内容</h4>
                        <p className="text-foreground">{service.description}</p>
                      </div>

                      {/* Applicable Scenarios */}
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">适用场景</h4>
                        <ul className="space-y-2">
                          {service.scenarios.map((scenario, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-foreground">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                              {scenario}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Delivery Time */}
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <Clock className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-1">交付周期</h4>
                          <p className="text-sm text-muted-foreground">{service.deliveryTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Service Process Section */}
        <section className="bg-card rounded-2xl border border-border p-8 shadow-card mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            服务流程
          </h2>

          {/* Process Steps */}
          <div className="relative">
            <div className="flex justify-between items-start">
              {processSteps.map((step, idx) => (
                <div key={step.step} className="flex flex-col items-center text-center flex-1 relative">
                  {/* Connector line */}
                  {idx < processSteps.length - 1 && (
                    <div className="absolute top-5 left-[50%] w-full h-0.5 bg-border">
                      <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                  
                  {/* Step circle */}
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm mb-3 relative z-10">
                    {step.step}
                  </div>
                  
                  {/* Step info */}
                  <h4 className="text-sm font-medium text-foreground mb-1">{step.title}</h4>
                  <p className="text-xs text-muted-foreground max-w-[120px]">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Provider Note */}
          {provider.processNote && (
            <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
              <p className="text-sm text-muted-foreground">{provider.processNote}</p>
            </div>
          )}
        </section>

        {/* Success Cases Section */}
        <section className="bg-card rounded-2xl border border-border p-8 shadow-card mb-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <h2 className="text-xl font-semibold text-foreground mb-6">成功案例</h2>

          {provider.cases.length > 0 ? (
            <div className="space-y-4">
              {provider.cases.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className="border border-border rounded-xl overflow-hidden hover:border-primary/20 transition-colors"
                >
                  <button
                    onClick={() => toggleCase(caseItem.id)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm bg-muted text-muted-foreground px-2 py-0.5 rounded">
                        {caseItem.platform}
                      </span>
                      <span className="font-medium text-foreground">{caseItem.title}</span>
                    </div>
                    {expandedCase === caseItem.id ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>

                  {expandedCase === caseItem.id && (
                    <div className="px-5 pb-5 animate-fade-in">
                      <div className="border-t border-border/50 pt-5 space-y-3">
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">问题情况：</span>
                          <p className="text-foreground mt-1">{caseItem.situation}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-muted-foreground">处理结果：</span>
                          <p className="text-foreground mt-1">{caseItem.result}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">该服务商暂无公开案例</p>
            </div>
          )}
        </section>

        {/* Risk Warning Section - Mandatory */}
        <section className="bg-warning/10 border border-warning/30 rounded-xl p-5 mb-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-foreground mb-1">风险提示</h3>
              <p className="text-sm text-muted-foreground">
                紫鸟仅提供服务信息展示与撮合，不参与具体服务交付。服务结果受多种因素影响，请卖家谨慎评估。
              </p>
            </div>
          </div>
        </section>

        {/* Action Area - CTA */}
        <section className="bg-card rounded-2xl border border-border p-6 shadow-card sticky bottom-4 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              有疑问？可先咨询了解详情
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowConsultDialog(true)}
                className="gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                立即咨询
              </Button>
              <Button onClick={handleSubmitRequest} className="gap-2 px-6">
                <FileText className="w-4 h-4" />
                提交需求
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Consult Dialog */}
      <Dialog open={showConsultDialog} onOpenChange={setShowConsultDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>联系服务商</DialogTitle>
            <DialogDescription>
              提交需求后，服务商将在 1-2 个工作日内联系你
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-4">
              为保护双方权益，请通过「提交需求」功能发起合作。我们将协助匹配并保障沟通顺畅。
            </p>
            <Button onClick={handleSubmitRequest} className="w-full gap-2">
              <FileText className="w-4 h-4" />
              提交需求
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="py-8 border-t border-border mt-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-muted-foreground">
            © 2024 紫鸟. 专业跨境电商服务平台
          </div>
        </div>
      </footer>
    </div>
  );
}
