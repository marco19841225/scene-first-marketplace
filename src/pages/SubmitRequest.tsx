import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/marketplace/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const serviceTypes = [
  { value: "appeal", label: "账号申诉" },
  { value: "global-store", label: "全球开店" },
  { value: "operations", label: "代运营" },
  { value: "tax", label: "税务合规" },
  { value: "logistics", label: "物流仓储" },
  { value: "brand", label: "品牌备案" },
];

const platforms = [
  { value: "amazon", label: "Amazon" },
  { value: "tiktok", label: "TikTok Shop" },
  { value: "shopee", label: "Shopee" },
  { value: "lazada", label: "Lazada" },
  { value: "ebay", label: "eBay" },
];

export default function SubmitRequest() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const providerId = searchParams.get("provider");
  const initialService = searchParams.get("service") || "";

  const [formData, setFormData] = useState({
    serviceType: initialService ? "appeal" : "",
    platform: "",
    problemDescription: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.serviceType || !formData.platform || !formData.problemDescription) {
      toast.error("请填写必填项");
      return;
    }

    if (!formData.contactName || !formData.contactPhone) {
      toast.error("请填写联系方式");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 max-w-lg">
          <div className="bg-card rounded-2xl border border-border p-8 shadow-card text-center animate-scale-in">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-3">需求提交成功</h1>
            <p className="text-muted-foreground mb-6">
              服务商将在 1-2 个工作日内与您联系，请保持电话畅通
            </p>
            <div className="space-y-3">
              <Button onClick={() => navigate("/")} className="w-full">
                返回首页
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/services")}
                className="w-full"
              >
                继续浏览服务
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          返回
        </button>

        <div className="bg-card rounded-2xl border border-border p-8 shadow-card animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground mb-2">提交服务需求</h1>
          <p className="text-muted-foreground mb-8">
            填写您的需求信息，我们将为您匹配合适的服务商
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Type */}
            <div className="space-y-2">
              <Label htmlFor="serviceType">
                服务类型 <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.serviceType}
                onValueChange={(value) => handleInputChange("serviceType", value)}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="选择服务类型" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {serviceTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Platform */}
            <div className="space-y-2">
              <Label htmlFor="platform">
                电商平台 <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.platform}
                onValueChange={(value) => handleInputChange("platform", value)}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="选择电商平台" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {platforms.map((platform) => (
                    <SelectItem key={platform.value} value={platform.value}>
                      {platform.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Problem Description */}
            <div className="space-y-2">
              <Label htmlFor="problemDescription">
                问题描述 <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="problemDescription"
                value={formData.problemDescription}
                onChange={(e) => handleInputChange("problemDescription", e.target.value)}
                placeholder="请详细描述您遇到的问题或服务需求..."
                className="min-h-[120px] bg-background"
              />
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-medium text-foreground mb-4">联系方式</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Contact Name */}
                <div className="space-y-2">
                  <Label htmlFor="contactName">
                    联系人 <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange("contactName", e.target.value)}
                    placeholder="您的姓名"
                    className="bg-background"
                  />
                </div>

                {/* Contact Phone */}
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">
                    联系电话 <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                    placeholder="您的电话号码"
                    className="bg-background"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2 mt-4">
                <Label htmlFor="contactEmail">邮箱（选填）</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                  placeholder="您的邮箱地址"
                  className="bg-background"
                />
              </div>
            </div>

            {/* Hidden provider ID */}
            {providerId && (
              <input type="hidden" name="providerId" value={providerId} />
            )}

            <Button
              type="submit"
              className="w-full py-6 text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? "提交中..." : "提交需求"}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              提交即表示您同意我们的服务条款，您的信息将被安全保护
            </p>
          </form>
        </div>
      </main>

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
