import { Check } from 'lucide-react';
import { Plan, FidelityType, formatCurrency, getMonthlyPrice } from '@/data/pricingData';
import { cn } from '@/lib/utils';

interface PlanCardProps {
  plan: Plan;
  fidelity: FidelityType | null;
  isSelected: boolean;
  onSelect: () => void;
}

export const PlanCard = ({ plan, fidelity, isSelected, onSelect }: PlanCardProps) => {
  const monthlyPrice = fidelity ? getMonthlyPrice(plan.pricing, fidelity) : plan.pricing.mensal;
  const originalPrice = plan.pricing.mensal;
  const hasDiscount = fidelity && fidelity !== 'mensal';

  return (
    <div
      onClick={onSelect}
      className={cn(
        'card-plan group relative',
        isSelected && 'active ring-primary',
        plan.popular && !isSelected && 'ring-1 ring-coral/30'
      )}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="badge-discount">
            Mais Popular
          </span>
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <span className="text-4xl">{plan.icon}</span>
        {isSelected && (
          <div className="w-6 h-6 rounded-full bg-gradient-purple flex items-center justify-center animate-scale-in">
            <Check className="w-4 h-4 text-primary-foreground" />
          </div>
        )}
      </div>

      <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
      <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

      <div className="space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="price-tag">{formatCurrency(monthlyPrice)}</span>
          <span className="text-sm text-muted-foreground">/mês</span>
        </div>
        {hasDiscount && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground line-through">
              {formatCurrency(originalPrice)}
            </span>
            <span className="text-xs font-semibold text-coral">
              Economia!
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
