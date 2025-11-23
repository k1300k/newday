```javascript
import React, { useState, useEffect } from 'react';
import DashboardLayout from './components/DashboardLayout';
import Stepper from './components/Stepper';
import StepCard from './components/StepCard';
import Overview from './components/Overview';
import { LanguageProvider } from './contexts/LanguageContext';

const initialSteps = [
  {
    id: 1,
    titleKey: 'phases.1.title',
    descKey: 'phases.1.description',
    isCompleted: false,
    items: [
      { id: 'p1', textKey: 'items.p1', type: 'select', options: ['Web Service', 'Mobile App', 'Hybrid App'], value: '', grade: 'Basic' },
      { id: 'p2', textKey: 'items.p2', type: 'percentage', value: 0, grade: 'Basic' },
      { id: 'p3', textKey: 'items.p3', type: 'checkbox', checked: false, grade: 'Basic' },
      { id: 'p4', textKey: 'items.p4', type: 'checkbox', checked: false, grade: 'Advanced' },
      { id: 'p5', textKey: 'items.p5', type: 'select', options: ['React/Node', 'Next.js', 'Flutter', 'Native'], value: '', grade: 'Advanced' },
      { id: 'p6', textKey: 'items.p6', type: 'checkbox', checked: false, grade: 'Advanced' },
      { id: 'p7', textKey: 'items.p7', type: 'checkbox', checked: false, grade: 'Basic' },
    ]
  },
  {
    id: 2,
    titleKey: 'phases.2.title',
    descKey: 'phases.2.description',
    isCompleted: false,
    items: [
      { id: 'r1', textKey: 'items.r1', type: 'percentage', value: 0, grade: 'Basic' },
      { id: 'r2', textKey: 'items.r2', type: 'checkbox', checked: false, grade: 'Basic' },
      { id: 'r3', textKey: 'items.r3', type: 'checkbox', checked: false, grade: 'Basic' },
      { id: 'r4', textKey: 'items.r4', type: 'checkbox', checked: false, grade: 'Basic' },
      { id: 'r5', textKey: 'items.r5', type: 'checkbox', checked: false, grade: 'Advanced' },
      { id: 'r6', textKey: 'items.r6', type: 'checkbox', checked: false, grade: 'Advanced' },
      { id: 'r7', textKey: 'items.r7', type: 'checkbox', checked: false, grade: 'Basic' },
    ]
  },
  {
    id: 3,
    titleKey: 'phases.3.title',
    descKey: 'phases.3.description',
    isCompleted: false,
    items: [
      { id: 'd1', textKey: 'items.d1', type: 'checkbox', checked: false, grade: 'Basic' },
      { id: 'd2', textKey: 'items.d2', type: 'checkbox', checked: false, grade: 'Basic' },
      { id: 'd3', textKey: 'items.d3', type: 'checkbox', checked: false, grade: 'Advanced' },
      { id: 'd4', textKey: 'items.d4', type: 'checkbox', checked: false, grade: 'Advanced' },
      { id: 'd5', textKey: 'items.d5', type: 'percentage', value: 0, grade: 'Basic' },
      { id: 'd6', textKey: 'items.d6', type: 'checkbox', checked: false, grade: 'Basic' },
      { id: 'd7', textKey: 'items.d7', type: 'checkbox', checked: false, grade: 'Basic' },
    ]
  },
  {
    id: 4,
    titleKey: 'phases.4.title',
    descKey: 'phases.4.description',
    isCompleted: false,
    items: [
      { id: 'l1', textKey: 'items.l1', type: 'percentage', value: 0, grade: 'Basic' },
      { id: 'l2', textKey: 'items.l2', type: 'checkbox', checked: false, grade: 'Advanced' },
      { id: 'l3', textKey: 'items.l3', type: 'checkbox', checked: false, grade: 'Basic' },
      { id: 'l4', textKey: 'items.l4', type: 'checkbox', checked: false, grade: 'Basic' },
      { id: 'l5', textKey: 'items.l5', type: 'checkbox', checked: false, grade: 'Advanced' },
      { id: 'l6', textKey: 'items.l6', type: 'checkbox', checked: false, grade: 'Basic' },
      { id: 'l7', textKey: 'items.l7', type: 'checkbox', checked: false, grade: 'Advanced' },
    ]
  }
];

function AppContent() {
  const [steps, setSteps] = useState(() => {
    const saved = localStorage.getItem('vibe-pilot-steps-v4');
    return saved ? JSON.parse(saved) : initialSteps;
  });
  const [currentStepId, setCurrentStepId] = useState(1);
  const [currentView, setCurrentView] = useState('overview');

  useEffect(() => {
    localStorage.setItem('vibe-pilot-steps-v4', JSON.stringify(steps));
  }, [steps]);

  const handleStepClick = (id) => {
    setCurrentStepId(id);
    setCurrentView('workflow');
  };

  const handleToggleItem = (stepId, itemId) => {
    setSteps(prevSteps => prevSteps.map(step => {
      if (step.id !== stepId) return step;

      const newItems = step.items.map(item => {
        if (item.id !== itemId) return item;
        return { ...item, checked: !item.checked };
      });

      // Check if all items are completed (for select, value must be present)
      const allCompleted = newItems.every(item => {
        if (item.type === 'select') return item.value && item.value.length > 0;
        if (item.type === 'percentage') return item.value === 100;
        return item.checked;
      });

      return { ...step, items: newItems, isCompleted: allCompleted };
    }));
  };

  const handleSelectOption = (stepId, itemId, value) => {
    setSteps(prevSteps => prevSteps.map(step => {
      if (step.id !== stepId) return step;

      const newItems = step.items.map(item => {
        if (item.id !== itemId) return item;
        return { ...item, value: value };
      });

      const allCompleted = newItems.every(item => {
        if (item.type === 'select') return item.value && item.value.length > 0;
        if (item.type === 'percentage') return item.value === 100;
        return item.checked;
      });

      return { ...step, items: newItems, isCompleted: allCompleted };
    }));
  };

  const handleProgressChange = (itemId, value) => {
    // This function was missing in the previous context but used in StepCard
    // Assuming it's handled via handleUpdateItem usually, but let's ensure it's here if needed
    // Actually StepCard uses handleUpdateItem for progress, so this might be redundant if not passed
  };

  const handleAddItem = (stepId, text, type = 'checkbox') => {
    setSteps(prevSteps => prevSteps.map(step => {
      if (step.id !== stepId) return step;
      const newItem = {
        id: `custom - ${ Date.now() } `,
        text: text, // Custom items won't have textKey
        type: type,
        checked: false,
        value: type === 'percentage' ? 0 : undefined
      };
      return { ...step, items: [...step.items, newItem], isCompleted: false };
    }));
  };

  const handleUpdateItem = (stepId, itemId, updates) => {
    setSteps(prevSteps => prevSteps.map(step => {
      if (step.id !== stepId) return step;
      const newItems = step.items.map(item => {
        if (item.id !== itemId) return item;
        return { ...item, ...updates };
      });

      // Re-evaluate completion status
      const allCompleted = newItems.every(item => {
        if (item.type === 'select') return item.value && item.value.length > 0;
        if (item.type === 'percentage') return item.value === 100;
        return item.checked;
      });

      return { ...step, items: newItems, isCompleted: allCompleted };
    }));
  };

  const handleDeleteItem = (stepId, itemId) => {
    setSteps(prevSteps => prevSteps.map(step => {
      if (step.id !== stepId) return step;
      const newItems = step.items.filter(item => item.id !== itemId);

      // Re-evaluate completion status
      const allCompleted = newItems.every(item => {
        if (item.type === 'select') return item.value && item.value.length > 0;
        if (item.type === 'percentage') return item.value === 100;
        return item.checked;
      });

      return { ...step, items: newItems, isCompleted: allCompleted };
    }));
  };

  const calculateTotalProgress = () => {
    let totalItems = 0;
    let totalCompletedValue = 0;

    steps.forEach(step => {
      step.items.forEach(item => {
        totalItems++;
        if (item.type === 'select') {
          totalCompletedValue += (item.value && item.value.length > 0) ? 1 : 0;
        } else if (item.type === 'percentage') {
          totalCompletedValue += (item.value || 0) / 100;
        } else {
          totalCompletedValue += item.checked ? 1 : 0;
        }
      });
    });

    return totalItems === 0 ? 0 : Math.round((totalCompletedValue / totalItems) * 100);
  };

  const currentStep = steps.find(s => s.id === currentStepId);
  const totalProgress = calculateTotalProgress();

  return (
    <DashboardLayout
      currentView={currentView}
      onSwitchView={setCurrentView}
      totalProgress={totalProgress}
    >
      {currentView === 'overview' ? (
        <Overview
          steps={steps}
          totalProgress={totalProgress}
          onPhaseClick={handleStepClick}
        />
      ) : (
        <div className="animate-fade-in">
          <div className="mb-8 text-center md:hidden">
            <h2 className="text-2xl font-bold text-slate-900">
              Project Setup Progress
            </h2>
            <div className="mt-4 flex justify-center items-center gap-2">
              <div className="w-48 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all duration-500"
                  style={{ width: `${ totalProgress }% ` }}
                ></div>
              </div>
              <span className="font-bold text-indigo-600 text-sm">{totalProgress}%</span>
            </div>
          </div>

          <Stepper
            steps={steps}
            currentStep={currentStepId}
            onStepClick={handleStepClick}
          />

          <div className="mt-8">
            <StepCard
              step={currentStep}
              onToggleItem={handleToggleItem}
              onSelectOption={handleSelectOption}
              onAddItem={handleAddItem}
              onUpdateItem={handleUpdateItem}
              onDeleteItem={handleDeleteItem}
              allSteps={steps}
            />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
```
