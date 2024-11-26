export type Status =
  | "PENDING_APPROVAL"
  | "PENDING_RECEIVE"
  | "RECEIVED"
  | "REJECTED";

export interface PurchaseOrder {
  id: string;
  createdAt: string;
  status: Status;
  items: PurchaseOrderItem[];
}

export interface PurchaseOrderItem {
  id: string;
  itemCode: string;
  itemName: string;
  quantity: number;
  inventories: Inventory[];
}

export interface Inventory {
  id: string;
  number: string;
  quantity: number;
}
