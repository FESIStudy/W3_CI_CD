export interface Item {
  id: number;
  name: string;
  memo: string;
  imageUrl: string;
  nullable: true;
  isCompleted?: boolean;
}
