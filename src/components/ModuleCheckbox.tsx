import { Module, formatCurrency } from '@/data/pricingData';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

interface ModuleCheckboxProps {
  module: Module;
  months: number;
  isSelected: boolean;
  onToggle: () => void;
}

export const ModuleCheckbox = ({ module, months, isSelected, onToggle }: ModuleCheckboxProps) => {
  const totalPrice = module.price * months;

  return (
    <div
      onClick={onToggle}
      className={cn(
        'flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 bg-card',
        isSelected
          ? 'border-primary bg-primary/5'
          : 'border-border hover:border-primary/30'
      )}
    >
      <Checkbox
        checked={isSelected}
        className="w-5 h-5 border-2"
      />

      <div className="flex-1">
        <span className="font-medium text-foreground">{module.name}</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="bg-accent/20 text-accent font-bold text-sm px-2 py-1 rounded-md">
          {formatCurrency(totalPrice)}
        </span>
        <span className="text-sm text-muted-foreground">
          {formatCurrency(module.price)}/mês
        </span>
      </div>
    </div>
  );
};
