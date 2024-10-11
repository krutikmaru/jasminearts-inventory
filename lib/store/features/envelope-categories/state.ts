const categories: Category[] = [
  { id: "C1", category: "WEJB", parent: null, instantiable: false },
  { id: "C2", category: "CLLE", parent: null, instantiable: false },
  {
    id: "C3",
    category: "WEJB-70",
    parent: "WEJB",
    instantiable: true,
    name: "White Envelope Jet Bond - 70 GSM",
  },
  {
    id: "C4",
    category: "WEJB-80",
    parent: "WEJB",
    instantiable: true,
    name: "White Envelope Jet Bond - 80 GSM",
  },
  {
    id: "C5",
    category: "CLLE-R",
    parent: "CLLE",
    instantiable: true,
    name: "Cloth Lined Ledger Envelope - Refined",
  },
  {
    id: "C6",
    category: "CLLE-S",
    parent: "CLLE",
    instantiable: true,
    name: "Cloth Lined Ledger Envelope - Sonal",
  },
  {
    id: "C7",
    category: "CLLE-SF",
    parent: "CLLE",
    instantiable: true,
    name: "Cloth Lined Ledger Envelope - Super Fine",
  },
];

export interface Category {
  id: string;
  category: string;
  parent: null | string;
  instantiable: boolean;
  name?: string;
  description?: string;
}

export default categories;
