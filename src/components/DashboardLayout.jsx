import React, { useState } from 'react';
import { Menu, BookOpen, Globe } from 'lucide-react';
import Sidebar from './Sidebar';
import NavContent from './NavContent';
import ProgramInfoModal from './ProgramInfoModal';
import { useLanguage } from '../contexts/LanguageContext';

const DashboardLayout = ({ children, currentView, onSwitchView, totalProgress }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const { language, toggleLanguage, t } = useLanguage();

    return (
        <div className="min-h-screen bg-[#F9FAFB] flex font-sans text-slate-800">
            {/* Desktop Sidebar */}
            <Sidebar
                currentView={currentView}
                onSwitchView={onSwitchView}
                totalProgress={totalProgress}
            />

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div
                        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    ></div>
                    <div className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-xl animate-slide-in">
                        <NavContent
                            currentView={currentView}
                            onSwitchView={(view) => {
                                onSwitchView(view);
                                setIsMobileMenuOpen(false);
                            }}
                            totalProgress={totalProgress}
                        />
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-4 flex justify-between items-center md:hidden">
                    <div className="font-bold text-lg text-slate-900">{t('appTitle')}</div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleLanguage}
                            className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors font-bold text-xs"
                        >
                            {language === 'ko' ? 'EN' : '한글'}
                        </button>
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </header>

                {/* Desktop Header Actions (Absolute) */}
                <div className="hidden md:flex absolute top-6 right-8 z-40 gap-3">
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm text-sm font-medium text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-all"
                    >
                        <Globe size={16} />
                        <span>{language === 'ko' ? 'English' : '한국어'}</span>
                    </button>
                    <button
                        onClick={() => setIsInfoOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm text-sm font-medium text-slate-600 hover:text-indigo-600 hover:border-indigo-200 transition-all"
                    >
                        <BookOpen size={16} />
                        <span>{t('nav.programInfo')}</span>
                    </button>
                </div>

                {/* Mobile Header Actions (Inline) */}
                <div className="md:hidden px-6 pt-4 flex justify-end gap-2">
                    <button
                        onClick={() => setIsInfoOpen(true)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full shadow-sm text-xs font-medium text-slate-600 hover:text-indigo-600 transition-all"
                    >
                        <BookOpen size={14} />
                        <span>{t('nav.info')}</span>
                    </button>
                </div>

                <div className="p-6 md:p-12 max-w-7xl mx-auto w-full">
                    {children}
                </div>
            </main>

            {/* Program Info Modal */}
            <ProgramInfoModal
                isOpen={isInfoOpen}
                onClose={() => setIsInfoOpen(false)}
            />
        </div>
    );
};

export default DashboardLayout;
