import { Search, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  searchQuery?: string;
  onSubmitRequest?: () => void;
}

export function EmptyState({ searchQuery, onSubmitRequest }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
        <Search className="w-10 h-10 text-muted-foreground" />
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-2 text-center">
        暂时没有完全匹配的服务商
      </h3>
      
      <p className="text-muted-foreground text-center max-w-md mb-8">
        {searchQuery ? (
          <>
            未找到与"{searchQuery}"相关的服务商。
            <br />
            你可以提交需求，由我们为你推荐合适的服务商。
          </>
        ) : (
          "你可以提交需求，由我们为你推荐合适的服务商。"
        )}
      </p>

      <Button
        onClick={onSubmitRequest}
        className="gap-2 px-8 py-6 text-base rounded-xl"
      >
        <MessageCircle className="w-5 h-5" />
        提交需求
      </Button>
    </div>
  );
}
