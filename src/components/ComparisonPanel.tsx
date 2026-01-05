import { Plan, Fidelity, Module, formatCurrency, getPlanTotal, getModuleTotal } from '@/data/pricingData';
import { FileText } from 'lucide-react';

interface ComparisonPanelProps {
  title: string;
  icon: string;
  plan: Plan | null;
  fidelity: Fidelity | null;
  modules: Module[];
}

export const ComparisonPanel = ({ title, icon, plan, fidelity, modules }: ComparisonPanelProps) => {
  const hasSelection = plan && fidelity;

  const planTotal = plan && fidelity ? getPlanTotal(plan, fidelity.id) : 0;
  const modulesTotal = fidelity ? modules.reduce((sum, m) => sum + getModuleTotal(m, fidelity.months), 0) : 0;
  const grandTotal = planTotal + modulesTotal;

  return (
    <div className="bg-secondary/50 rounded-2xl p-5 min-h-[200px]">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">{icon}</span>
        <h3 className="text-lg font-bold text-primary">{title}</h3>
        <span className="w-2 h-2 rounded-full bg-accent" />
      </div>

      {!hasSelection ? (
        <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
          <FileText className="w-12 h-12 mb-2 opacity-30" />
          <span className="text-sm">Selecione um plano e módulos</span>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="bg-card rounded-lg p-3 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Plano:</span>
              <span className="font-semibold">{plan.icon} {plan.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Período:</span>
              <span className="font-semibold">{fidelity.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Valor do plano:</span>
              <span className="font-bold text-primary">{formatCurrency(planTotal)}</span>
            </div>
          </div>

          {modules.length > 0 && (
            <div className="bg-card rounded-lg p-3 space-y-2">
              <span className="text-sm font-medium text-muted-foreground">Módulos:</span>
              {modules.map((m) => (
                <div key={m.id} className="flex justify-between items-center text-sm">
                  <span>{m.name}</span>
                  <span className="font-medium">{formatCurrency(getModuleTotal(m, fidelity.months))}</span>
                </div>
              ))}
            </div>
          )}

          <div className="bg-gradient-purple rounded-lg p-4 text-white">
            <div className="flex justify-between items-center">
              <span className="font-medium">Total:</span>
              <span className="text-2xl font-bold">{formatCurrency(grandTotal)}</span>
            </div>
            <div className="text-sm opacity-80 text-right">
              {formatCurrency(grandTotal / fidelity.months)}/mês
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
