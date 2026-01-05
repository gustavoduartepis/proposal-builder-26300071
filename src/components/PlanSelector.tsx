import { ChevronDown } from 'lucide-react';
import { plans, Plan } from '@/data/pricingData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PlanSelectorProps {
  selectedPlan: Plan | null;
  onSelect: (plan: Plan) => void;
}

export const PlanSelector = ({ selectedPlan, onSelect }: PlanSelectorProps) => {
  return (
    <Select
      value={selectedPlan?.id || ''}
      onValueChange={(value) => {
        const plan = plans.find((p) => p.id === value);
        if (plan) onSelect(plan);
      }}
    >
      <SelectTrigger className="w-full h-14 bg-card border-border rounded-xl text-base font-medium">
        <SelectValue placeholder="Escolha um plano...">
          {selectedPlan && (
            <span className="flex items-center gap-2">
              <span className="text-xl">{selectedPlan.icon}</span>
              <span>{selectedPlan.name}</span>
            </span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-card border-border rounded-xl">
        {plans.map((plan) => (
          <SelectItem
            key={plan.id}
            value={plan.id}
            className="h-12 text-base cursor-pointer hover:bg-primary/10 rounded-lg"
          >
            <span className="flex items-center gap-2">
              <span className="text-xl">{plan.icon}</span>
              <span className="font-medium">{plan.name}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
