import { Link } from "react-router-dom";
import { Bird, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Bird className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">紫鸟</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
            >
              服务市场
            </Link>
            <Link 
              to="/services" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              全部服务
            </Link>
            <Link 
              to="/providers" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              服务商入驻
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              登录
            </Button>
            <Button size="sm" className="rounded-xl">
              免费注册
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-2">
              <Link 
                to="/" 
                className="px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary rounded-lg transition-colors duration-200"
              >
                服务市场
              </Link>
              <Link 
                to="/services" 
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary rounded-lg transition-colors duration-200"
              >
                全部服务
              </Link>
              <Link 
                to="/providers" 
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary rounded-lg transition-colors duration-200"
              >
                服务商入驻
              </Link>
              <div className="flex gap-2 px-4 pt-2">
                <Button variant="ghost" size="sm" className="flex-1">
                  登录
                </Button>
                <Button size="sm" className="flex-1 rounded-xl">
                  免费注册
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
