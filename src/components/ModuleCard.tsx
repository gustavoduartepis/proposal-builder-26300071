import { Check } from 'lucide-react';
import { Module, FidelityType, formatCurrency, getMonthlyPrice, getTotalPrice } from '@/data/pricingData';
import { cn } from '@/lib/utils';

interface ModuleCardProps {
  module: Module;
  fidelity: FidelityType | null;
  isSelected: boolean;
  onToggle: () => void;
}

export const ModuleCard = ({ module, fidelity, isSelected, onToggle }: ModuleCardProps) => {
  const monthlyPrice = fidelity ? getMonthlyPrice(module.pricing, fidelity) : module.pricing.mensal;
  const totalPrice = fidelity ? getTotalPrice(module.pricing, fidelity) : module.pricing.mensal;

  return (
    <div
      onClick={onToggle}
      className={cn(
        'card-module group',
        isSelected && 'active'
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          'w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 mt-0.5',
          isSelected 
            ? 'border-primary bg-primary' 
            : 'border-muted-foreground/30 group-hover:border-primary/50'
        )}>
          {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{module.icon}</span>
            <span className="font-semibold text-foreground text-sm">{module.name}</span>
          </div>
          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{module.description}</p>
          
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold text-primary">
              {formatCurrency(monthlyPrice)}
              <span className="text-xs font-normal text-muted-foreground">/mês</span>
            </span>
            {fidelity && fidelity !== 'mensal' && (
              <span className="text-xs text-muted-foreground">
                (total: {formatCurrency(totalPrice)})
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
