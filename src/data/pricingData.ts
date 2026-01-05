export type FidelityType = 'mensal' | 'trimestral' | 'semestral' | 'anual';
export type PlanType = 'mesas' | 'delivery' | 'premium';
export type ModuleType = 'ifood' | 'estoque' | 'roteirizacao' | 'cupom' | 'financeiro';

export interface PlanPricing {
  mensal: number;
  trimestral: number;
  semestral: number;
  anual: number;
}

export interface Plan {
  id: PlanType;
  name: string;
  icon: string;
  pricing: PlanPricing;
}

export interface Module {
  id: ModuleType;
  name: string;
  price: number;
}

export interface Fidelity {
  id: FidelityType;
  name: string;
  icon: string;
  months: number;
  popular?: boolean;
  bestValue?: boolean;
}

export const plans: Plan[] = [
  {
    id: 'delivery',
    name: 'Plano Delivery',
    icon: '🚚',
    pricing: {
      mensal: 179.99,
      trimestral: 495.00,
      semestral: 930.00,
      anual: 1740.00,
    },
  },
  {
    id: 'mesas',
    name: 'Plano Mesas',
    icon: '🪑',
    pricing: {
      mensal: 179.99,
      trimestral: 495.00,
      semestral: 930.00,
      anual: 1740.00,
    },
  },
  {
    id: 'premium',
    name: 'Plano Premium',
    icon: '⭐',
    pricing: {
      mensal: 249.99,
      trimestral: 690.00,
      semestral: 1290.00,
      anual: 2400.00,
    },
  },
];

export const modules: Module[] = [
  {
    id: 'ifood',
    name: 'Integração com Ifood',
    price: 19.90,
  },
  {
    id: 'estoque',
    name: 'Controle de Estoque Completo',
    price: 19.90,
  },
  {
    id: 'roteirizacao',
    name: 'Roteirização de entregas',
    price: 49.90,
  },
  {
    id: 'cupom',
    name: 'Emissão de Cupom Fiscal',
    price: 59.90,
  },
  {
    id: 'financeiro',
    name: 'Módulo Financeiro',
    price: 49.90,
  },
];

export const fidelities: Fidelity[] = [
  {
    id: 'mensal',
    name: 'Mensal',
    icon: '📅',
    months: 1,
  },
  {
    id: 'trimestral',
    name: 'Trimestral',
    icon: '🎯',
    months: 3,
  },
  {
    id: 'semestral',
    name: 'Semestral',
    icon: '⚡',
    months: 6,
    popular: true,
  },
  {
    id: 'anual',
    name: 'Anual',
    icon: '🏆',
    months: 12,
    bestValue: true,
  },
];

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const getMonthlyPrice = (total: number, months: number): number => {
  return total / months;
};

export const getPlanTotal = (plan: Plan, fidelity: FidelityType): number => {
  return plan.pricing[fidelity];
};

export const getModuleTotal = (module: Module, months: number): number => {
  return module.price * months;
};
