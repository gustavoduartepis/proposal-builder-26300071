import { Check, CreditCard } from 'lucide-react';
import { Fidelity } from '@/data/pricingData';
import { cn } from '@/lib/utils';

interface FidelityCardProps {
  fidelity: Fidelity;
  isSelected: boolean;
  onSelect: () => void;
}

export const FidelityCard = ({ fidelity, isSelected, onSelect }: FidelityCardProps) => {
  return (
    <div
      onClick={onSelect}
      className={cn(
        'card-fidelity group flex items-center gap-3',
        isSelected && 'active'
      )}
    >
      <div className={cn(
        'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
        isSelected 
          ? 'border-primary bg-primary' 
          : 'border-muted-foreground/30 group-hover:border-primary/50'
      )}>
        {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">{fidelity.name}</span>
          {fidelity.discount && (
            <span className="badge-discount text-[10px]">{fidelity.discount}</span>
          )}
        </div>
        {fidelity.requiresCard && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
            <CreditCard className="w-3 h-3" />
            <span>Cartão</span>
          </div>
        )}
      </div>
    </div>
  );
};
