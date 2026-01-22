import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
  name: string;
  icon: LucideIcon;
  count?: number;
  slug: string;
}

export function CategoryCard({ name, icon: Icon, count, slug }: CategoryCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/services?category=${encodeURIComponent(slug)}`);
  };

  return (
    <button
      onClick={handleClick}
      className="group flex flex-col items-center p-6 bg-card rounded-xl border border-border shadow-sm hover:shadow-card hover:border-primary/20 transition-all duration-300"
    >
      <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center mb-3 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-200">
        {name}
      </span>
      {count !== undefined && (
        <span className="text-xs text-muted-foreground mt-1">
          {count} 家服务商
        </span>
      )}
    </button>
  );
}
