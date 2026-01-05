import { useState } from 'react';
import { AlertTriangle, Zap } from 'lucide-react';
import { PlanCard } from '@/components/PlanCard';
import { FidelityCard } from '@/components/FidelityCard';
import { ModuleCard } from '@/components/ModuleCard';
import { SummaryPanel } from '@/components/SummaryPanel';
import { 
  plans, 
  modules, 
  fidelities, 
  PlanType, 
  FidelityType, 
  ModuleType 
} from '@/data/pricingData';

const Index = () => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [selectedFidelity, setSelectedFidelity] = useState<FidelityType | null>(null);
  const [selectedModules, setSelectedModules] = useState<ModuleType[]>([]);

  const handleModuleToggle = (moduleId: ModuleType) => {
    setSelectedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(m => m !== moduleId)
        : [...prev, moduleId]
    );
  };

  const selectedPlanData = plans.find(p => p.id === selectedPlan) || null;
  const selectedFidelityData = fidelities.find(f => f.id === selectedFidelity);
  const selectedModulesData = modules.filter(m => selectedModules.includes(m.id));
  
  const isComplete = selectedPlan && selectedFidelity;
  const showCardWarning = selectedFidelity && selectedFidelity !== 'mensal';

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <header className="text-center mb-6 lg:mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary mb-4">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-secondary-foreground">Calculadora de Planos</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-2">
            Monte a <span className="text-gradient-purple">proposta perfeita</span>
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Selecione o plano, fidelidade e módulos para gerar a proposta comercial
          </p>
        </header>

        <div className="grid lg:grid-cols-[1fr,380px] gap-6">
          {/* Left Column - Selection */}
          <div className="space-y-6">
            {/* Plans Section */}
            <section className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-7 h-7 rounded-lg bg-gradient-purple flex items-center justify-center text-sm font-bold text-primary-foreground">1</span>
                <h2 className="text-lg font-bold text-foreground">Escolha o Plano</h2>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {plans.map(plan => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    fidelity={selectedFidelity}
                    isSelected={selectedPlan === plan.id}
                    onSelect={() => setSelectedPlan(plan.id)}
                  />
                ))}
              </div>
            </section>

            {/* Fidelity Section */}
            <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-7 h-7 rounded-lg bg-gradient-purple flex items-center justify-center text-sm font-bold text-primary-foreground">2</span>
                <h2 className="text-lg font-bold text-foreground">Fidelidade & Pagamento</h2>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {fidelities.map(fidelity => (
                  <FidelityCard
                    key={fidelity.id}
                    fidelity={fidelity}
                    isSelected={selectedFidelity === fidelity.id}
                    onSelect={() => setSelectedFidelity(fidelity.id)}
                  />
                ))}
              </div>
              
              {showCardWarning && (
                <div className="warning-card mt-3 animate-fade-in">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>
                    Essa opção exige <strong>limite disponível no cartão</strong> para parcelamento
                  </span>
                </div>
              )}
            </section>

            {/* Modules Section */}
            <section className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-7 h-7 rounded-lg bg-gradient-coral flex items-center justify-center text-sm font-bold text-accent-foreground">3</span>
                <h2 className="text-lg font-bold text-foreground">Módulos Adicionais</h2>
                <span className="text-xs text-muted-foreground">(opcional)</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {modules.map(module => (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    fidelity={selectedFidelity}
                    isSelected={selectedModules.includes(module.id)}
                    onToggle={() => handleModuleToggle(module.id)}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Summary */}
          <aside className="lg:sticky lg:top-6 lg:self-start animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <SummaryPanel
              selectedPlan={selectedPlanData}
              selectedFidelity={selectedFidelity}
              selectedModules={selectedModulesData}
            />
            
            <button
              disabled={!isComplete}
              className="btn-calculate w-full mt-4"
            >
              {isComplete ? '✨ Proposta Pronta!' : 'Selecione plano e fidelidade'}
            </button>
          </aside>
        </div>

        {/* Footer */}
        <footer className="text-center mt-8 py-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Calculadora para uso interno • Valores atualizados em tempo real
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
