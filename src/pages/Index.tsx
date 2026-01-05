import { useState } from 'react';
import { plans, fidelities, modules, Plan, Fidelity, Module, getPlanTotal } from '@/data/pricingData';
import { PlanSelector } from '@/components/PlanSelector';
import { PeriodCard } from '@/components/PeriodCard';
import { ModuleCheckbox } from '@/components/ModuleCheckbox';
import { ComparisonPanel } from '@/components/ComparisonPanel';

const Index = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedFidelity, setSelectedFidelity] = useState<Fidelity | null>(null);
  const [selectedModules, setSelectedModules] = useState<Module[]>([]);

  const toggleModule = (module: Module) => {
    setSelectedModules((prev) =>
      prev.find((m) => m.id === module.id)
        ? prev.filter((m) => m.id !== module.id)
        : [...prev, module]
    );
  };

  const currentMonths = selectedFidelity?.months || 1;

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Decorative circles */}
      <div className="fixed top-0 right-0 w-64 h-64 bg-secondary rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
      <div className="fixed bottom-0 left-0 w-48 h-48 bg-secondary rounded-full translate-y-1/2 -translate-x-1/2 opacity-50" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-8">
          <span className="text-foreground">Calculadora </span>
          <span className="text-gradient-purple">CardapioWEB</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Configuration */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card rounded-2xl p-6 shadow-sm">
              {/* Section Number */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <h2 className="text-xl font-bold text-primary">Configuração do Plano</h2>
              </div>

              {/* Plan Selection */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="font-medium text-foreground">Escolha um plano base:</span>
                </div>
                <PlanSelector selectedPlan={selectedPlan} onSelect={setSelectedPlan} />
              </div>

              {/* Period Selection */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="font-medium text-foreground">Período:</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {fidelities.map((fidelity) => (
                    <PeriodCard
                      key={fidelity.id}
                      fidelity={fidelity}
                      totalPrice={selectedPlan ? getPlanTotal(selectedPlan, fidelity.id) : fidelity.months * 179.99}
                      isSelected={selectedFidelity?.id === fidelity.id}
                      onSelect={() => setSelectedFidelity(fidelity)}
                    />
                  ))}
                </div>
              </div>

              {/* Modules */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="font-medium text-foreground">Módulos adicionais:</span>
                </div>
                <div className="space-y-2">
                  {modules.map((module) => (
                    <ModuleCheckbox
                      key={module.id}
                      module={module}
                      months={currentMonths}
                      isSelected={selectedModules.some((m) => m.id === module.id)}
                      onToggle={() => toggleModule(module)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Comparisons */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-primary" />
              </span>
              <h2 className="text-xl font-bold text-primary">Comparações</h2>
            </div>

            <ComparisonPanel
              title="Combinação 1"
              icon="💼"
              plan={selectedPlan}
              fidelity={selectedFidelity}
              modules={selectedModules}
            />

            <ComparisonPanel
              title="Combinação 2"
              icon="🎯"
              plan={null}
              fidelity={null}
              modules={[]}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          Powered by <span className="font-semibold">CardápioWeb</span> - Automatizando seu negócio
        </div>
      </div>
    </div>
  );
};

export default Index;
