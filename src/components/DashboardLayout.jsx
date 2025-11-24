import React, { useState } from 'react';
import { Menu, BookOpen, Globe, Rocket, Settings, Download, Upload, Save, Cloud } from 'lucide-react';
import Sidebar from './Sidebar';
import NavContent from './NavContent';
import ProgramInfoModal from './ProgramInfoModal';
import ProjectRegistrationModal from './ProjectRegistrationModal';
import CloudSyncModal from './CloudSyncModal';
import { useLanguage } from '../contexts/LanguageContext';

const DashboardLayout = ({ children, currentView, onSwitchView, totalProgress, projectInfo, onUpdateProjectInfo, onExportData, onImportData, onCloudSave, onCloudLoad, isFirebaseConfigured }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [isCloudSyncOpen, setIsCloudSyncOpen] = useState(false);
    const { language, toggleLanguage, t } = useLanguage();

    const handleExport = () => {
        const fileName = onExportData();
        alert(t('header.exportSuccess') + `\n${fileName}`);
    };

    const handleImport = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';

        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            // Confirm overwrite
            if (!confirm(t('header.importConfirm'))) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const jsonData = JSON.parse(event.target.result);
                    const success = onImportData(jsonData);

                    if (success) {
                        alert(t('header.importSuccess'));
                        window.location.reload(); // Refresh to show updated data
                    } else {
                        alert(t('header.importError'));
                    }
                } catch (error) {
                    alert(t('header.importError'));
                }
            };
            reader.readAsText(file);
        };

        input.click();
    };

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
                    <div className="font-bold text-lg text-slate-900">
                        {projectInfo?.name || t('appTitle')}
                    </div>
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
                        onClick={() => setIsProjectModalOpen(true)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-sm text-sm font-medium transition-all
                            ${projectInfo?.status === 'active'
                                ? 'bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md'}
                        `}
                    >
                        {projectInfo?.status === 'active' ? <Settings size={16} /> : <Rocket size={16} />}
                        <span>{projectInfo?.status === 'active' ? t('project.settings') : t('project.register')}</span>
                    </button>

                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-full shadow-sm text-sm font-medium hover:bg-emerald-700 transition-all"
                        title={t('header.export')}
                    >
                        <Save size={16} />
                        <span>현재사항 저장</span>
                    </button>

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
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm text-sm font-medium text-slate-600 hover:text-emerald-600 hover:border-emerald-200 transition-all"
                        title={t('header.export')}
                    >
                        <Download size={16} />
                        <span>{t('header.export')}</span>
                    </button>
                    <button
                        onClick={handleImport}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm text-sm font-medium text-slate-600 hover:text-blue-600 hover:border-blue-200 transition-all"
                        title={t('header.import')}
                    >
                        <Upload size={16} />
                        <span>{t('header.import')}</span>
                    </button>
                    {isFirebaseConfigured && (
                        <button
                            onClick={() => setIsCloudSyncOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full shadow-sm text-sm font-medium hover:bg-blue-700 transition-all"
                            title="Cloud Sync"
                        >
                            <Cloud size={16} />
                            <span>Cloud Sync</span>
                        </button>
                    )}
                </div>

                {/* Mobile Header Actions (Inline) */}
                <div className="md:hidden px-6 pt-4 flex justify-end gap-2">
                    <button
                        onClick={() => setIsProjectModalOpen(true)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full shadow-sm text-xs font-medium transition-all
                            ${projectInfo?.status === 'active'
                                ? 'bg-white border border-slate-200 text-slate-600'
                                : 'bg-indigo-600 text-white'}
                        `}
                    >
                        {projectInfo?.status === 'active' ? <Settings size={14} /> : <Rocket size={14} />}
                        <span>{projectInfo?.status === 'active' ? t('project.settings') : t('project.register')}</span>
                    </button>
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600 text-white rounded-full shadow-sm text-xs font-medium"
                    >
                        <Save size={14} />
                    </button>
                    <button
                        onClick={() => setIsInfoOpen(true)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full shadow-sm text-xs font-medium text-slate-600 hover:text-indigo-600 transition-all"
                    >
                        <BookOpen size={14} />
                        <span>{t('nav.info')}</span>
                    </button>
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full shadow-sm text-xs font-medium text-slate-600"
                    >
                        <Download size={14} />
                    </button>
                    <button
                        onClick={handleImport}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full shadow-sm text-xs font-medium text-slate-600"
                    >
                        <Upload size={14} />
                    </button>
                </div>

                <div className="p-6 md:p-12 max-w-7xl mx-auto w-full">
                    {/* Project Title Header (Desktop) */}
                    {projectInfo?.name && (
                        <div className="hidden md:block mb-8">
                            <h1 className="text-3xl font-bold text-slate-900">{projectInfo.name}</h1>
                            {projectInfo.description && (
                                <p className="text-slate-500 mt-2">{projectInfo.description}</p>
                            )}
                        </div>
                    )}
                    {children}
                </div>
            </main>

            {/* Modals */}
            <ProgramInfoModal
                isOpen={isInfoOpen}
                onClose={() => setIsInfoOpen(false)}
            />
            <ProjectRegistrationModal
                isOpen={isProjectModalOpen}
                onClose={() => setIsProjectModalOpen(false)}
                projectInfo={projectInfo}
                onSave={onUpdateProjectInfo}
            />
            <CloudSyncModal
                isOpen={isCloudSyncOpen}
                onClose={() => setIsCloudSyncOpen(false)}
                onCloudSave={onCloudSave}
                onCloudLoad={onCloudLoad}
            />
        </div>
    );
};

export default DashboardLayout;
