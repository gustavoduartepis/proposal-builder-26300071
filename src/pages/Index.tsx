import { useState } from 'react';
import { AlertTriangle, Zap, Rocket } from 'lucide-react';
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
import { cn } from '@/lib/utils';

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
        <header className="text-center mb-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary mb-3">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-secondary-foreground">Calculadora de Planos</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-foreground mb-2">
            Monte a <span className="text-gradient-purple">proposta perfeita</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            Selecione o plano ideal, escolha a fidelidade e personalize com módulos extras
          </p>
        </header>

        <div className="grid lg:grid-cols-[1fr,400px] gap-6">
          {/* Left Column - Selection */}
          <div className="space-y-5">
            {/* Plans Section */}
            <section className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 rounded-lg bg-gradient-purple flex items-center justify-center text-sm font-bold text-primary-foreground shadow-button">1</span>
                <h2 className="text-lg font-bold text-foreground">Escolha o Plano</h2>
                {!selectedPlan && <span className="text-xs text-coral font-medium animate-pulse">← Obrigatório</span>}
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {plans.map(plan => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    isSelected={selectedPlan === plan.id}
                    onSelect={() => setSelectedPlan(plan.id)}
                  />
                ))}
              </div>
            </section>

            {/* Fidelity Section */}
            <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 rounded-lg bg-gradient-purple flex items-center justify-center text-sm font-bold text-primary-foreground shadow-button">2</span>
                <h2 className="text-lg font-bold text-foreground">Fidelidade & Pagamento</h2>
                {!selectedFidelity && <span className="text-xs text-coral font-medium animate-pulse">← Obrigatório</span>}
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
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-7 rounded-lg bg-gradient-coral flex items-center justify-center text-sm font-bold text-accent-foreground shadow-coral">3</span>
                <h2 className="text-lg font-bold text-foreground">Módulos Adicionais</h2>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">Opcional</span>
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
              className={cn(
                'btn-calculate w-full mt-4 flex items-center justify-center gap-2',
                isComplete && 'animate-pulse hover:animate-none'
              )}
            >
              {isComplete ? (
                <>
                  <Rocket className="w-5 h-5" />
                  <span>Proposta Pronta!</span>
                </>
              ) : (
                <span className="opacity-70">Selecione plano e fidelidade</span>
              )}
            </button>
          </aside>
        </div>

        {/* Footer */}
        <footer className="text-center mt-6 py-3 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Uso interno • Calculadora para Closers • Valores atualizados
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
