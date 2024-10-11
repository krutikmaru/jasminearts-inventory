import { EnvelopeShape, EnvelopeType, Sizes } from "@/lib/enums";

export interface Envelope {
  category: string;
  itemCode: string;
  size: Sizes;
  shape: EnvelopeShape;
  type: EnvelopeType;
  unitPrice: number;
  basePieces: number;
  price: number;
  stock: number;
  reserved: number;
}
