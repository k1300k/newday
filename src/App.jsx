import React, { useState, useEffect } from 'react';
import DashboardLayout from './components/DashboardLayout';
import Stepper from './components/Stepper';
import StepCard from './components/StepCard';
import Overview from './components/Overview';
import { LanguageProvider } from './contexts/LanguageContext';
import { saveToCloud, loadFromCloud, isFirebaseConfigured } from './utils/cloudSync';
import ServiceFlow from './components/ServiceFlow';

const initialSteps = [
  {
    id: 1,
    titleKey: 'phases.1.title',
    descKey: 'phases.1.description',
    isCompleted: false,
    items: [
      {
        id: 'p1',
        text: "Define Service Concept & Target",
        textKey: "items.p1",
        checked: false,
        grade: 'Basic',
        refLink: {
          title: "Value Proposition Canvas",
          titleKey: "checklist.ref.valueProp",
          url: "https://www.strategyzer.com/library/the-value-proposition-canvas"
        },
        guide: {
          descKey: "guides.p1.desc",
          links: [
            { text: "Strategyzer - Value Prop Canvas", url: "https://www.strategyzer.com/library/the-value-proposition-canvas" },
            { text: "Persona Template", url: "https://miro.com/templates/persona/" }
          ]
        }
      },
      {
        id: 'p2',
        text: "Market & Competitor Analysis",
        textKey: "items.p2",
        checked: false,
        grade: 'Basic',
        refLink: {
          title: "Competitive Analysis Template",
          titleKey: "checklist.ref.competitorAnalysis",
          url: "https://www.atlassian.com/software/confluence/templates/competitive-analysis"
        },
        guide: {
          descKey: "guides.p2.desc",
          links: [
            { text: "SWOT Analysis Guide", url: "https://www.mindtools.com/pages/article/newTMC_05.htm" },
            { text: "SimilarWeb (Market Intelligence)", url: "https://www.similarweb.com/" }
          ]
        }
      },
      {
        id: 'p3',
        text: "Select Service Type (Web/App)",
        textKey: "items.p3",
        checked: false,
        type: 'select',
        options: ['web', 'mobile', 'hybrid'],
        value: 'web',
        grade: 'Basic',
        refLink: {
          title: "Web vs Native vs Hybrid",
          titleKey: "checklist.ref.webVsNative",
          url: "https://www.codecademy.com/article/what-is-hybrid-app-development"
        },
        guide: {
          descKey: "guides.p3.desc",
          links: [
            { text: "PWA vs Native App", url: "https://web.dev/pwa-vs-native/" }
          ]
        }
      },
      {
        id: 'p4',
        text: "Define Core Features (MVP)",
        textKey: "items.p4",
        checked: false,
        grade: 'Basic',
        refLink: {
          title: "MVP Guide",
          titleKey: "checklist.ref.mvpGuide",
          url: "https://www.ycombinator.com/library/4Q-a-minimum-viable-product-is-not-a-product-it-s-a-process"
        },
        guide: {
          descKey: "guides.p4.desc",
          links: [
            { text: "MoSCoW Method", url: "https://www.agilebusiness.org/page/ProjectFramework_10_MoSCoWPrioritisation" }
          ]
        }
      },
      {
        id: 'p5',
        text: "Design Information Architecture (IA)",
        textKey: "items.p5",
        checked: false,
        grade: 'Advanced',
        refLink: {
          title: "IA for Beginners",
          titleKey: "checklist.ref.iaGuide",
          url: "https://www.nngroup.com/articles/ia-study-guide/"
        },
        guide: {
          descKey: "guides.p5.desc",
          links: [
            { text: "Miro - Site Map Template", url: "https://miro.com/templates/sitemap/" }
          ]
        }
      },
      {
        id: 'p6',
        text: "Write User Stories",
        textKey: "items.p6",
        checked: false,
        grade: 'Advanced',
        refLink: {
          title: "User Stories with Gherkin",
          titleKey: "checklist.ref.userStories",
          url: "https://cucumber.io/docs/gherkin/reference/"
        },
        guide: {
          descKey: "guides.p6.desc",
          links: [
            { text: "Atlassian - User Stories", url: "https://www.atlassian.com/agile/project-management/user-stories" }
          ]
        }
      },
      {
        id: 'p7',
        text: "Plan Admin Dashboard",
        textKey: "items.p7",
        checked: false,
        grade: 'Advanced',
        guide: {
          descKey: "guides.p7.desc",
          links: [
            { text: "Admin Dashboard Best Practices", url: "https://dribbble.com/tags/admin_dashboard" }
          ]
        }
      },
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
    const saved = localStorage.getItem('vibe-pilot-steps-v9');
    return saved ? JSON.parse(saved) : initialSteps;
  });
  const [currentStepId, setCurrentStepId] = useState(1);
  const [currentView, setCurrentView] = useState('overview');

  const [projectInfo, setProjectInfo] = useState(() => {
    const saved = localStorage.getItem('vibe-pilot-project-info');
    return saved ? JSON.parse(saved) : { name: '', description: '', status: 'planning', startDate: '' };
  });

  useEffect(() => {
    localStorage.setItem('vibe-pilot-steps-v9', JSON.stringify(steps));
  }, [steps]);

  useEffect(() => {
    localStorage.setItem('vibe-pilot-project-info', JSON.stringify(projectInfo));
  }, [projectInfo]);

  // Export data as JSON
  const exportData = () => {
    const dataToExport = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      projectInfo: projectInfo,
      steps: steps
    };

    const jsonString = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    const fileName = `vibe-pilot-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return fileName;
  };

  // Import data from JSON
  const importData = (jsonData) => {
    try {
      // Validate JSON structure
      if (!jsonData.steps || !jsonData.projectInfo) {
        throw new Error('Invalid data structure');
      }

      // Update states
      setSteps(jsonData.steps);
      setProjectInfo(jsonData.projectInfo);

      // Also update localStorage immediately
      localStorage.setItem('vibe-pilot-steps-v9', JSON.stringify(jsonData.steps));
      localStorage.setItem('vibe-pilot-project-info', JSON.stringify(jsonData.projectInfo));

      return true;
    } catch (error) {
      console.error('Import error:', error);
      return false;
    }
  };

  // Cloud Save
  const handleCloudSave = async (projectId) => {
    if (!isFirebaseConfigured()) {
      throw new Error('Firebase is not configured. Please check firebase.js config file.');
    }

    const dataToSave = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      projectInfo: projectInfo,
      steps: steps
    };

    try {
      await saveToCloud(projectId, dataToSave);
      // Store project ID in localStorage for easy access
      localStorage.setItem('vibe-pilot-cloud-project-id', projectId);
      return true;
    } catch (error) {
      console.error('Cloud save error:', error);
      throw error;
    }
  };

  // Cloud Load
  const handleCloudLoad = async (projectId) => {
    if (!isFirebaseConfigured()) {
      throw new Error('Firebase is not configured. Please check firebase.js config file.');
    }

    try {
      const data = await loadFromCloud(projectId);

      // Use importData to update the application state
      const success = importData(data);

      if (success) {
        // Store project ID in localStorage
        localStorage.setItem('vibe-pilot-cloud-project-id', projectId);
      }

      return success;
    } catch (error) {
      console.error('Cloud load error:', error);
      throw error;
    }
  };

  const handleStepClick = (id) => {
    setCurrentStepId(id);
    setCurrentView('workflow');
  };

  const handleToggleItem = (stepId, itemId) => {
    setSteps(prevSteps => prevSteps.map(step => {
      if (step.id !== stepId) return step;

      const newItems = step.items.map(item => {
        if (item.id !== itemId) return item;
        const newChecked = !item.checked;
        return {
          ...item,
          checked: newChecked,
          // If it's a percentage type, sync value with checked status
          value: item.type === 'percentage' ? (newChecked ? 100 : 0) : item.value
        };
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
        id: `custom - ${Date.now()} `,
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
      projectInfo={projectInfo}
      onUpdateProjectInfo={setProjectInfo}
      onExportData={exportData}
      onImportData={importData}
      onCloudSave={handleCloudSave}
      onCloudLoad={handleCloudLoad}
      isFirebaseConfigured={isFirebaseConfigured()}
    >
      {currentView === 'overview' ? (
        <Overview
          steps={steps}
          totalProgress={totalProgress}
          onPhaseClick={handleStepClick}
        />
      ) : currentView === 'serviceFlow' ? (
        <ServiceFlow />
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
                  style={{ width: `${totalProgress}% ` }}
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
