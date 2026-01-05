export type FidelityType = 'mensal' | 'trimestral' | 'semestral' | 'anual';
export type PlanType = 'mesas' | 'delivery' | 'premium';
export type ModuleType = 'ifood' | 'estoque' | 'cupom' | 'roteirizacao' | 'financeiro';

export interface PlanPricing {
  mensal: number;
  trimestral: number;
  semestral: number;
  anual: number;
}

export interface Plan {
  id: PlanType;
  name: string;
  description: string;
  icon: string;
  pricing: PlanPricing;
  popular?: boolean;
}

export interface Module {
  id: ModuleType;
  name: string;
  description: string;
  icon: string;
  pricing: PlanPricing;
}

export interface Fidelity {
  id: FidelityType;
  name: string;
  months: number;
  discount: string;
  requiresCard: boolean;
}

export const plans: Plan[] = [
  {
    id: 'mesas',
    name: 'Plano Mesas',
    description: 'Ideal para restaurantes e bares',
    icon: '🍽️',
    pricing: {
      mensal: 169.99,
      trimestral: 159.99,
      semestral: 149.99,
      anual: 139.99,
    },
  },
  {
    id: 'delivery',
    name: 'Plano Delivery',
    description: 'Perfeito para operações de entrega',
    icon: '🛵',
    pricing: {
      mensal: 209.99,
      trimestral: 199.99,
      semestral: 189.99,
      anual: 179.99,
    },
  },
  {
    id: 'premium',
    name: 'Plano Premium',
    description: 'Solução completa para seu negócio',
    icon: '⭐',
    pricing: {
      mensal: 269.99,
      trimestral: 259.99,
      semestral: 249.99,
      anual: 239.99,
    },
    popular: true,
  },
];

export const modules: Module[] = [
  {
    id: 'ifood',
    name: 'iFood',
    description: 'Integração completa com iFood',
    icon: '📱',
    pricing: {
      mensal: 29.99,
      trimestral: 89.97,
      semestral: 179.94,
      anual: 359.88,
    },
  },
  {
    id: 'estoque',
    name: 'Estoque Avançado',
    description: 'Controle completo de estoque',
    icon: '📦',
    pricing: {
      mensal: 29.99,
      trimestral: 89.97,
      semestral: 179.94,
      anual: 359.88,
    },
  },
  {
    id: 'cupom',
    name: 'Cupom Fiscal',
    description: 'Emissão de cupom fiscal',
    icon: '🧾',
    pricing: {
      mensal: 69.99,
      trimestral: 209.97,
      semestral: 419.94,
      anual: 839.88,
    },
  },
  {
    id: 'roteirizacao',
    name: 'Roteirização de Entregas',
    description: 'Otimização de rotas',
    icon: '🗺️',
    pricing: {
      mensal: 54.99,
      trimestral: 164.97,
      semestral: 329.94,
      anual: 659.88,
    },
  },
  {
    id: 'financeiro',
    name: 'Financeiro',
    description: 'Gestão financeira completa',
    icon: '💰',
    pricing: {
      mensal: 69.99,
      trimestral: 209.97,
      semestral: 419.94,
      anual: 839.88,
    },
  },
];

export const fidelities: Fidelity[] = [
  {
    id: 'mensal',
    name: 'Mensal',
    months: 1,
    discount: '',
    requiresCard: false,
  },
  {
    id: 'trimestral',
    name: 'Trimestral',
    months: 3,
    discount: '6% OFF',
    requiresCard: true,
  },
  {
    id: 'semestral',
    name: 'Semestral',
    months: 6,
    discount: '12% OFF',
    requiresCard: true,
  },
  {
    id: 'anual',
    name: 'Anual',
    months: 12,
    discount: '18% OFF',
    requiresCard: true,
  },
];

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const getMonthlyPrice = (pricing: PlanPricing, fidelity: FidelityType): number => {
  return pricing[fidelity];
};

export const getTotalPrice = (pricing: PlanPricing, fidelity: FidelityType): number => {
  const monthly = pricing[fidelity];
  const fidelityData = fidelities.find(f => f.id === fidelity);
  return monthly * (fidelityData?.months || 1);
};
