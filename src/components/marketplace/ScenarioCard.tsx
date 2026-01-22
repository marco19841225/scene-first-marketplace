import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ScenarioCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  category: string;
  gradient?: string;
}

export function ScenarioCard({ 
  title, 
  description, 
  icon: Icon, 
  category,
  gradient = "from-primary to-primary-glow"
}: ScenarioCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/services?scenario=${encodeURIComponent(category)}`);
  };

  return (
    <button
      onClick={handleClick}
      className="group relative w-full text-left p-6 bg-card rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden"
    >
      {/* Background gradient on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      
      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-6 h-6 text-primary-foreground" />
      </div>
      
      {/* Content */}
      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground line-clamp-2">
        {description}
      </p>
      
      {/* Arrow indicator */}
      <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-secondary flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
        <svg className="w-4 h-4 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}
