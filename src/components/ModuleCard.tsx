import { Check, Plus } from 'lucide-react';
import { Module, FidelityType, formatCurrency, getMonthlyPrice } from '@/data/pricingData';
import { cn } from '@/lib/utils';

interface ModuleCardProps {
  module: Module;
  fidelity: FidelityType | null;
  isSelected: boolean;
  onToggle: () => void;
}

export const ModuleCard = ({ module, fidelity, isSelected, onToggle }: ModuleCardProps) => {
  const monthlyPrice = fidelity ? getMonthlyPrice(module.pricing, fidelity) : module.pricing.mensal;

  return (
    <div
      onClick={onToggle}
      className={cn(
        'card-module group transition-all duration-300',
        isSelected && 'active scale-[1.02]',
        !isSelected && 'opacity-80 hover:opacity-100'
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          'w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300 flex-shrink-0',
          isSelected 
            ? 'bg-gradient-purple shadow-button' 
            : 'bg-muted group-hover:bg-primary/10'
        )}>
          {isSelected 
            ? <Check className="w-4 h-4 text-primary-foreground" />
            : <Plus className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          }
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-xl transition-transform duration-300 group-hover:scale-110">{module.icon}</span>
            <span className="font-bold text-foreground text-sm">{module.name}</span>
          </div>
          <p className="text-xs text-muted-foreground mb-2">{module.description}</p>
          
          <div className="flex items-center gap-2">
            <span className={cn(
              'text-sm font-bold transition-colors',
              isSelected ? 'text-primary' : 'text-muted-foreground'
            )}>
              +{formatCurrency(monthlyPrice)}
              <span className="text-xs font-normal opacity-70">/mês</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
