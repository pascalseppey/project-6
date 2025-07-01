export interface Page {
  id: string;
  name: string;
  slug: string;
  level: 1 | 2 | 3;
  type: 'home' | 'page';
  isFixed: boolean;
  parentId?: string;
  order: number;
}

export interface DraggedItem {
  id: string;
  type: 'page';
  page: Page;
}

export interface DropTarget {
  id: string;
  position: 'above' | 'below' | 'inside';
  level: 1 | 2 | 3;
}