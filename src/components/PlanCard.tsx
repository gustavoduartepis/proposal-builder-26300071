import { Check, Sparkles } from 'lucide-react';
import { Plan, formatCurrency } from '@/data/pricingData';
import { cn } from '@/lib/utils';

interface PlanCardProps {
  plan: Plan;
  isSelected: boolean;
  onSelect: () => void;
}

export const PlanCard = ({ plan, isSelected, onSelect }: PlanCardProps) => {
  // Menor preço = anual
  const lowestPrice = plan.pricing.anual;

  return (
    <div
      onClick={onSelect}
      className={cn(
        'card-plan group relative',
        isSelected && 'active ring-primary scale-[1.02]',
        plan.popular && !isSelected && 'ring-1 ring-coral/30'
      )}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span className="badge-discount flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Mais Popular
          </span>
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <span className="text-4xl transition-transform duration-300 group-hover:scale-110">{plan.icon}</span>
        <div className={cn(
          'w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300',
          isSelected 
            ? 'bg-gradient-purple animate-scale-in' 
            : 'bg-muted opacity-0 group-hover:opacity-100'
        )}>
          <Check className={cn(
            'w-4 h-4 transition-colors',
            isSelected ? 'text-primary-foreground' : 'text-muted-foreground'
          )} />
        </div>
      </div>

      <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
      <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

      <div className="space-y-1">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">A partir de</p>
        <div className="flex items-baseline gap-2">
          <span className="price-tag">{formatCurrency(lowestPrice)}</span>
          <span className="text-sm text-muted-foreground">/mês</span>
        </div>
      </div>
    </div>
  );
};
