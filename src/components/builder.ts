export interface ContentBlock {
  id: string;
  type: 'container' | 'text' | 'image';
  content?: string;
  imageUrl?: string;
  children?: ContentBlock[];
  parentId?: string;
  order: number;
  columns?: number; // For container layout (1, 2, 3, etc.)
}

export interface DraggedBlock {
  id: string;
  type: ContentBlock['type'];
  block: ContentBlock;
}

export interface DropTarget {
  id: string;
  position: 'above' | 'below' | 'inside';
  type: 'container' | 'root';
}