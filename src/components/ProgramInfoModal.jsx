import React, { useState } from 'react';
import { X, History, BookOpen, Terminal, Code2, Layers, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { devHistory } from '../data/devHistory';
import { useLanguage } from '../contexts/LanguageContext';

const ProgramInfoModal = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('manual'); // 'history' or 'manual'
    const [selectedVersion, setSelectedVersion] = useState(devHistory[devHistory.length - 1]);
    const { t } = useLanguage();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-5xl h-[85vh] shadow-2xl flex flex-col overflow-hidden border border-slate-200">

                {/* Modal Header & Tabs */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200 bg-slate-50">
                    <div className="flex items-center gap-4">
                        <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
                            <button
                                onClick={() => setActiveTab('manual')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all
                  ${activeTab === 'manual'
                                        ? 'bg-indigo-600 text-white shadow-md'
                                        : 'text-slate-500 hover:bg-slate-50'}
                `}
                            >
                                <BookOpen size={16} />
                                {t('modal.userManual')}
                            </button>
                            <button
                                onClick={() => setActiveTab('history')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all
                  ${activeTab === 'history'
                                        ? 'bg-indigo-600 text-white shadow-md'
                                        : 'text-slate-500 hover:bg-slate-50'}
                `}
                            >
                                <History size={16} />
                                {t('modal.devHistory')}
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-hidden flex">

                    {/* --- USER MANUAL TAB --- */}
                    {activeTab === 'manual' && (
                        <div className="flex-1 overflow-y-auto p-8 bg-white">
                            <div className="max-w-3xl mx-auto space-y-12">

                                {/* Intro */}
                                <section className="text-center mb-12">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl mb-6">
                                        <BookOpen size={32} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('modal.introTitle')}</h2>
                                    <p className="text-lg text-slate-600 leading-relaxed">
                                        {t('modal.introText')}
                                    </p>
                                </section>

                                {/* Key Features Grid */}
                                <section className="grid md:grid-cols-2 gap-6">
                                    <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                                        <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                            <CheckCircle2 size={18} className="text-emerald-500" />
                                            {t('modal.featureChecklist')}
                                        </h3>
                                        <p className="text-sm text-slate-600">
                                            {t('modal.featureChecklistDesc')}
                                        </p>
                                    </div>
                                    <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                                        <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                            <Layers size={18} className="text-indigo-500" />
                                            {t('modal.featureOverview')}
                                        </h3>
                                        <p className="text-sm text-slate-600">
                                            {t('modal.featureOverviewDesc')}
                                        </p>
                                    </div>
                                </section>

                                {/* Detailed Guide */}
                                <section className="space-y-8">
                                    <h3 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-4">{t('modal.howToUse')}</h3>

                                    <div className="flex gap-6">
                                        <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl shrink-0">1</div>
                                        <div>
                                            <h4 className="text-lg font-bold text-slate-900 mb-2">{t('modal.step1Title')}</h4>
                                            <p className="text-slate-600 mb-4">
                                                {t('modal.step1Desc')}
                                            </p>
                                            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 flex gap-3">
                                                <AlertCircle className="text-amber-500 shrink-0" size={20} />
                                                <p className="text-sm text-amber-800">
                                                    <strong>{t('modal.tip')}</strong> {t('modal.tipDesc')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-6">
                                        <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl shrink-0">2</div>
                                        <div>
                                            <h4 className="text-lg font-bold text-slate-900 mb-2">{t('modal.step2Title')}</h4>
                                            <p className="text-slate-600 mb-4">
                                                {t('modal.step2Desc')}
                                            </p>
                                            <ul className="space-y-2">
                                                <li className="flex items-center gap-2">
                                                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider bg-blue-50 text-blue-600 border-blue-100">Basic</span>
                                                    <span className="text-sm text-slate-600">{t('modal.gradeBasicDesc')}</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider bg-purple-50 text-purple-600 border-purple-100">Advanced</span>
                                                    <span className="text-sm text-slate-600">{t('modal.gradeAdvancedDesc')}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="flex gap-6">
                                        <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xl shrink-0">3</div>
                                        <div>
                                            <h4 className="text-lg font-bold text-slate-900 mb-2">{t('modal.step3Title')}</h4>
                                            <p className="text-slate-600">
                                                {t('modal.step3Desc')}
                                            </p>
                                        </div>
                                    </div>
                                </section>

                            </div>
                        </div>
                    )}

                    {/* --- DEV HISTORY TAB --- */}
                    {activeTab === 'history' && (
                        <div className="flex-1 flex overflow-hidden">
                            {/* Sidebar: Version Timeline */}
                            <div className="w-1/3 bg-slate-50 border-r border-slate-200 p-6 overflow-y-auto">
                                <div className="space-y-4">
                                    {devHistory.map((item, index) => (
                                        <div
                                            key={item.version}
                                            onClick={() => setSelectedVersion(item)}
                                            className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-200 group
                        ${selectedVersion.version === item.version
                                                    ? 'bg-white border-indigo-500 shadow-md ring-1 ring-indigo-500'
                                                    : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm'}
                      `}
                                        >
                                            {/* Connector Line */}
                                            {index !== devHistory.length - 1 && (
                                                <div className="absolute left-6 top-full h-4 w-0.5 bg-slate-200 -mb-4 z-0"></div>
                                            )}

                                            <div className="flex justify-between items-start mb-1 relative z-10">
                                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full
                          ${selectedVersion.version === item.version ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}
                        `}>
                                                    {item.version}
                                                </span>
                                                <span className="text-xs text-slate-400">{item.date}</span>
                                            </div>
                                            <h3 className={`font-bold text-sm mb-1 ${selectedVersion.version === item.version ? 'text-slate-900' : 'text-slate-700'}`}>
                                                {item.title}
                                            </h3>
                                            <p className="text-xs text-slate-500 line-clamp-2">
                                                {item.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Main Content: Details */}
                            <div className="w-2/3 flex flex-col bg-white">
                                {/* Header */}
                                <div className="p-6 border-b border-slate-100">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h2 className="text-2xl font-bold text-slate-900">{selectedVersion.title}</h2>
                                        <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full">
                                            {selectedVersion.version}
                                        </span>
                                    </div>
                                    <p className="text-slate-500 text-sm">{selectedVersion.description}</p>
                                </div>

                                {/* Scrollable Content */}
                                <div className="flex-1 overflow-y-auto p-8 space-y-8">

                                    {/* User Prompt Section */}
                                    <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                                        <div className="flex items-center gap-2 mb-4 text-indigo-600 font-bold text-sm uppercase tracking-wider">
                                            <Terminal size={16} />
                                            {t('modal.userPrompt')}
                                        </div>
                                        <div className="bg-slate-900 text-slate-200 p-4 rounded-lg font-mono text-sm leading-relaxed shadow-inner">
                                            <span className="text-green-400 mr-2">$</span>
                                            {selectedVersion.userPrompt}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        {/* Features Section */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold text-sm uppercase tracking-wider">
                                                <Layers size={16} />
                                                {t('modal.newFeatures')}
                                            </div>
                                            <ul className="space-y-3">
                                                {selectedVersion.features.map((feature, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></div>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Tech Stack Section */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold text-sm uppercase tracking-wider">
                                                <Code2 size={16} />
                                                {t('modal.techImpl')}
                                            </div>
                                            <div className="bg-white border border-slate-200 rounded-lg p-4 text-sm text-slate-600 leading-relaxed">
                                                {selectedVersion.techStack}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default ProgramInfoModal;
