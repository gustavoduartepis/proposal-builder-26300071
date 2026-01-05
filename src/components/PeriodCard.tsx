import { Fidelity, formatCurrency, getMonthlyPrice } from '@/data/pricingData';
import { cn } from '@/lib/utils';

interface PeriodCardProps {
  fidelity: Fidelity;
  totalPrice: number;
  isSelected: boolean;
  onSelect: () => void;
}

export const PeriodCard = ({ fidelity, totalPrice, isSelected, onSelect }: PeriodCardProps) => {
  const monthlyPrice = getMonthlyPrice(totalPrice, fidelity.months);

  return (
    <div
      onClick={onSelect}
      className={cn(
        'relative p-4 rounded-xl cursor-pointer transition-all duration-200 border-2',
        isSelected
          ? 'bg-gradient-purple border-transparent text-white shadow-lg'
          : 'bg-card border-border hover:border-primary/40'
      )}
    >
      {fidelity.popular && (
        <span className="absolute -top-2 right-2 bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">
          ⚡ POPULAR
        </span>
      )}
      {fidelity.bestValue && (
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
          👑 Melhor Custo-Benefício
        </span>
      )}

      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{fidelity.icon}</span>
        <span className={cn(
          'font-semibold capitalize',
          isSelected ? 'text-white' : 'text-foreground'
        )}>
          {fidelity.name}
        </span>
      </div>

      <div className={cn(
        'text-2xl font-bold mb-1',
        isSelected ? 'text-white' : 'text-primary'
      )}>
        {formatCurrency(totalPrice)}
      </div>

      <div className={cn(
        'text-sm',
        isSelected ? 'text-white/80' : 'text-muted-foreground'
      )}>
        {formatCurrency(monthlyPrice)}/mês
      </div>
    </div>
  );
};
