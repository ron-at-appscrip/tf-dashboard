import * as React from "react";
import { CategoryRow, CategoryNode } from "./CategoryRow";

export type { CategoryNode } from "./CategoryRow";

interface CategoryTreeProps {
  categories: CategoryNode[];
  onEdit?: (node: CategoryNode) => void;
}

export function CategoryTree({ categories, onEdit }: CategoryTreeProps) {
  return (
    <div>
      {categories.map((cat, idx) => (
        <CategoryTreeNode key={cat.name + idx} node={cat} onEdit={onEdit} />
      ))}
    </div>
  );
}

function CategoryTreeNode({ node, onEdit }: { node: CategoryNode; onEdit?: (node: CategoryNode) => void }) {
  if (node.children && node.children.length > 0) {
    return (
      <CategoryRow node={node} onEdit={onEdit}>
        <CategoryTree categories={node.children} onEdit={onEdit} />
      </CategoryRow>
    );
  }
  return <CategoryRow node={node} onEdit={onEdit} />;
} 