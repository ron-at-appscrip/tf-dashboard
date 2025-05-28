import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Pencil, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as React from "react";

export type CategoryNode = {
  name: string;
  description?: string;
  level: number;
  children?: CategoryNode[];
  stats?: {
    products: number;
    views: number;
    conversion: number;
    level: number;
  };
  tags?: string[];
};

interface CategoryRowProps {
  node: CategoryNode;
  children?: React.ReactNode;
  onEdit?: (node: CategoryNode) => void;
}

export function CategoryRow({ node, children, onEdit }: CategoryRowProps) {
  const hasChildren = !!node.children && node.children.length > 0;
  const isTopLevel = node.level === 0;
  const [expanded, setExpanded] = React.useState(false);

  // Indent based on level (32px per level)
  const indentStyle = { marginLeft: `${node.level * 32}px` };

  return (
    <Card className={`mb-2 ${isTopLevel ? "" : "border-none"} shadow-none`}>
      <CardContent className="flex items-center gap-2 py-4 px-2" style={indentStyle}>
        <span className="font-semibold text-base">{node.name}</span>
        {node.tags?.map((tag) => (
          <Badge key={tag} variant="secondary" className="ml-2">{tag}</Badge>
        ))}
        <span className="ml-2 text-muted-foreground text-sm">{node.description}</span>
        <div className="flex-1" />
        <span className="text-xs text-muted-foreground">{node.stats?.products} products</span>
        <span className="text-xs text-muted-foreground ml-4">{node.stats?.views} views</span>
        <span className="text-xs text-muted-foreground ml-4">{node.stats?.conversion?.toFixed(2)}% conversion</span>
        <span className="text-xs text-muted-foreground ml-4">Level {node.stats?.level}</span>
        <Button variant="ghost" size="icon" className="ml-2">
          <Eye className="w-4 h-4" />
        </Button>
        {onEdit && (
          <Button variant="ghost" size="icon" onClick={() => onEdit(node)}>
            <Pencil className="w-4 h-4" />
          </Button>
        )}
        {hasChildren && (
          <Button
            variant="ghost"
            size="icon"
            className="ml-2"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </Button>
        )}
        {isTopLevel && (
          <ChevronRight className="w-5 h-5 ml-2 text-muted-foreground" />
        )}
      </CardContent>
      {/* Render children only if expanded */}
      {hasChildren && expanded && <div className="ml-6">{children}</div>}
    </Card>
  );
}
