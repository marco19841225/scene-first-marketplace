import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Star } from "lucide-react";

interface ProviderCardProps {
  id: string;
  name: string;
  logo: string;
  services: string[];
  platforms: string[];
  isCertified?: boolean;
  isRecommended?: boolean;
}

export function ProviderCard({
  id,
  name,
  logo,
  services,
  platforms,
  isCertified = false,
  isRecommended = false,
}: ProviderCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/provider/${id}`);
  };

  return (
    <button
      onClick={handleClick}
      className="group w-full text-left bg-card rounded-2xl border border-border p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 rounded-xl bg-secondary overflow-hidden">
            <img
              src={logo}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          {isCertified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-accent-foreground" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-base font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-200">
              {name}
            </h3>
            {isRecommended && (
              <Badge variant="secondary" className="bg-success-light text-success border-0 shrink-0">
                <Star className="w-3 h-3 mr-1" />
                推荐
              </Badge>
            )}
          </div>

          {/* Services */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {services.slice(0, 3).map((service) => (
              <Badge
                key={service}
                variant="secondary"
                className="bg-primary-light text-primary border-0 font-normal"
              >
                {service}
              </Badge>
            ))}
          </div>

          {/* Platforms */}
          <div className="flex items-center gap-2">
            {platforms.map((platform) => (
              <span
                key={platform}
                className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded"
              >
                {platform}
              </span>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </button>
  );
}
