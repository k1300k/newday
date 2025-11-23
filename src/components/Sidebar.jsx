import React from 'react';
import { LayoutDashboard, CheckSquare } from 'lucide-react';
import NavContent from './NavContent';
import { useLanguage } from '../contexts/LanguageContext';

const Sidebar = ({ currentView, onSwitchView, totalProgress }) => {
    const { t } = useLanguage();

    return (
        <div className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0">
            <div className="p-8 border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-indigo-200">
                        V
                    </div>
                    <span className="font-bold text-xl text-slate-900 tracking-tight">{t('appTitle')}</span>
                </div>
            </div>

            <NavContent
                currentView={currentView}
                onSwitchView={onSwitchView}
                totalProgress={totalProgress}
            />

            <div className="mt-auto p-6 border-t border-slate-100">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
                        <span>{t('overview.totalProgress')}</span>
                        <span className="text-indigo-600">{totalProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                            className="bg-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${totalProgress}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
