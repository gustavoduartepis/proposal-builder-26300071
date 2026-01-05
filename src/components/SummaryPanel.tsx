import { Calculator, CreditCard, FileText, Package, Sparkles } from 'lucide-react';
import { 
  Plan, 
  Module, 
  Fidelity, 
  FidelityType, 
  formatCurrency, 
  getMonthlyPrice, 
  getTotalPrice,
  fidelities 
} from '@/data/pricingData';

interface SummaryPanelProps {
  selectedPlan: Plan | null;
  selectedFidelity: FidelityType | null;
  selectedModules: Module[];
}

export const SummaryPanel = ({ selectedPlan, selectedFidelity, selectedModules }: SummaryPanelProps) => {
  const fidelityData = fidelities.find(f => f.id === selectedFidelity);
  
  const planMonthly = selectedPlan && selectedFidelity 
    ? getMonthlyPrice(selectedPlan.pricing, selectedFidelity) 
    : 0;
  
  const planTotal = selectedPlan && selectedFidelity 
    ? getTotalPrice(selectedPlan.pricing, selectedFidelity) 
    : 0;
  
  const modulesMonthly = selectedModules.reduce((sum, mod) => {
    return sum + (selectedFidelity ? getMonthlyPrice(mod.pricing, selectedFidelity) : mod.pricing.mensal);
  }, 0);
  
  const modulesTotal = selectedModules.reduce((sum, mod) => {
    return sum + (selectedFidelity ? getTotalPrice(mod.pricing, selectedFidelity) : mod.pricing.mensal);
  }, 0);
  
  const totalMonthly = planMonthly + modulesMonthly;
  const totalPeriod = planTotal + modulesTotal;

  const isComplete = selectedPlan && selectedFidelity;

  return (
    <div className="summary-card h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-purple flex items-center justify-center">
          <Calculator className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">Resumo da Proposta</h2>
          <p className="text-xs text-muted-foreground">Valores atualizados em tempo real</p>
        </div>
      </div>

      {!isComplete ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center py-8">
            <Sparkles className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">
              Selecione um plano e fidelidade<br />para ver o resumo
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          {/* Plano */}
          <div className="space-y-3 mb-4">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50">
              <span className="text-2xl">{selectedPlan.icon}</span>
              <div className="flex-1">
                <p className="font-semibold text-foreground">{selectedPlan.name}</p>
                <p className="text-sm text-muted-foreground">{selectedPlan.description}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">{formatCurrency(planMonthly)}/mês</p>
                <p className="text-xs text-muted-foreground">Total: {formatCurrency(planTotal)}</p>
              </div>
            </div>
          </div>

          {/* Fidelidade */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-secondary/50 mb-4">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-foreground flex-1">
              Fidelidade <span className="font-semibold">{fidelityData?.name}</span>
            </span>
            {fidelityData?.requiresCard && (
              <span className="flex items-center gap-1 text-xs text-coral font-medium">
                <CreditCard className="w-3 h-3" />
                Cartão obrigatório
              </span>
            )}
          </div>

          {/* Módulos */}
          {selectedModules.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Módulos Adicionais</span>
              </div>
              <div className="space-y-2">
                {selectedModules.map(mod => (
                  <div key={mod.id} className="flex items-center justify-between text-sm px-3 py-2 rounded-lg bg-secondary/30">
                    <span className="flex items-center gap-2">
                      <span>{mod.icon}</span>
                      <span className="text-muted-foreground">{mod.name}</span>
                    </span>
                    <span className="font-medium text-foreground">
                      +{formatCurrency(getMonthlyPrice(mod.pricing, selectedFidelity))}/mês
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Totais */}
          <div className="mt-auto pt-4 border-t border-border">
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground">Total mensal</span>
              <span className="price-tag text-2xl">{formatCurrency(totalMonthly)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">
                Total {fidelityData?.name.toLowerCase()}
              </span>
              <span className="price-tag-coral text-2xl">{formatCurrency(totalPeriod)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
