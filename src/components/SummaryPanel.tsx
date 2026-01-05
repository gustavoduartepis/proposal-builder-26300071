import { Calculator, CreditCard, FileText, Package, Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';
import { 
  Plan, 
  Module, 
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

  // Calcula economia vs mensal
  const monthlyBasePrice = selectedPlan ? selectedPlan.pricing.mensal : 0;
  const modulesBaseMonthly = selectedModules.reduce((sum, mod) => sum + mod.pricing.mensal, 0);
  const totalBaseMonthly = monthlyBasePrice + modulesBaseMonthly;
  const savingsMonthly = totalBaseMonthly - totalMonthly;
  const savingsTotal = savingsMonthly * (fidelityData?.months || 1);

  const isComplete = selectedPlan && selectedFidelity;

  return (
    <div className="summary-card h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-purple flex items-center justify-center shadow-button">
          <Calculator className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-foreground">Proposta Comercial</h2>
          <p className="text-xs text-muted-foreground">Valores calculados em tempo real</p>
        </div>
      </div>

      {!isComplete ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center py-8 animate-pulse">
            <Sparkles className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
            <p className="text-muted-foreground font-medium">
              Selecione um <span className="text-primary font-bold">plano</span> e <span className="text-primary font-bold">fidelidade</span>
            </p>
            <p className="text-sm text-muted-foreground/70 mt-1">para montar a proposta</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col animate-fade-in">
          {/* Plano */}
          <div className="space-y-3 mb-4">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-gradient-lilac border border-primary/10">
              <span className="text-3xl">{selectedPlan.icon}</span>
              <div className="flex-1">
                <p className="font-bold text-foreground text-lg">{selectedPlan.name}</p>
                <p className="text-sm text-muted-foreground">{selectedPlan.description}</p>
              </div>
              <div className="text-right">
                <p className="font-extrabold text-primary text-xl">{formatCurrency(planMonthly)}</p>
                <p className="text-xs text-muted-foreground">por mês</p>
              </div>
            </div>
          </div>

          {/* Fidelidade */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 mb-4">
            <FileText className="w-5 h-5 text-primary" />
            <span className="text-sm text-foreground flex-1">
              Contrato <span className="font-bold text-primary">{fidelityData?.name}</span>
              {fidelityData?.discount && (
                <span className="ml-2 badge-discount text-[10px]">{fidelityData.discount}</span>
              )}
            </span>
            {fidelityData?.requiresCard && (
              <span className="flex items-center gap-1 text-xs text-coral font-semibold">
                <CreditCard className="w-3.5 h-3.5" />
                Cartão
              </span>
            )}
          </div>

          {/* Módulos */}
          {selectedModules.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-foreground">Módulos Inclusos</span>
                <span className="text-xs text-muted-foreground">({selectedModules.length})</span>
              </div>
              <div className="space-y-1.5">
                {selectedModules.map(mod => (
                  <div key={mod.id} className="flex items-center justify-between text-sm px-3 py-2 rounded-lg bg-secondary/40">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span className="text-foreground font-medium">{mod.name}</span>
                    </span>
                    <span className="font-semibold text-muted-foreground">
                      +{formatCurrency(getMonthlyPrice(mod.pricing, selectedFidelity))}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Economia */}
          {savingsMonthly > 0 && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-coral/10 border border-coral/20 mb-4 animate-scale-in">
              <TrendingUp className="w-5 h-5 text-coral" />
              <div className="flex-1">
                <p className="text-sm font-bold text-coral">
                  Economia de {formatCurrency(savingsTotal)} no período!
                </p>
                <p className="text-xs text-coral/80">
                  {formatCurrency(savingsMonthly)}/mês a menos que o plano mensal
                </p>
              </div>
            </div>
          )}

          {/* Totais */}
          <div className="mt-auto pt-4 border-t border-border space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground font-medium">Investimento mensal</span>
              <span className="price-tag text-2xl">{formatCurrency(totalMonthly)}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-coral/10">
              <span className="text-foreground font-bold">
                Total {fidelityData?.name.toLowerCase()}
              </span>
              <span className="price-tag-coral text-3xl">{formatCurrency(totalPeriod)}</span>
            </div>
            
            {/* Frase de fechamento */}
            <div className="text-center pt-3">
              <p className="text-sm text-muted-foreground italic">
                "Um investimento que transforma seu negócio"
              </p>
              <p className="text-xs text-primary font-semibold mt-1">
                ✨ Proposta válida para fechamento hoje
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
