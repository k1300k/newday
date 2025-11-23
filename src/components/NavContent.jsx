import React from 'react';
import { LayoutDashboard, CheckSquare } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const NavContent = ({ currentView, onSwitchView }) => {
    const { t } = useLanguage();

    return (
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <button
                onClick={() => onSwitchView('overview')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                    ${currentView === 'overview'
                        ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                `}
            >
                <LayoutDashboard size={20} />
                {t('nav.overview')}
            </button>
            <button
                onClick={() => onSwitchView('workflow')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                    ${currentView === 'workflow'
                        ? 'bg-indigo-50 text-indigo-700 shadow-sm ring-1 ring-indigo-200'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                `}
            >
                <CheckSquare size={20} />
                {t('nav.checklist')}
            </button>
        </nav>
    );
};

export default NavContent;
