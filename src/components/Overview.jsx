import React from 'react';
import { CheckCircle2, Circle, ArrowRight, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Overview = ({ steps, totalProgress, onPhaseClick }) => {
    const { t } = useLanguage();

    const getPhaseProgress = (step) => {
        let totalItems = 0;
        let totalCompletedValue = 0;

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

        return totalItems === 0 ? 0 : Math.round((totalCompletedValue / totalItems) * 100);
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">{t('overview.title')}</h2>
                    <p className="text-slate-500 mt-1">{t('overview.totalProgress')}: <span className="font-bold text-indigo-600">{totalProgress}%</span></p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {steps.map((step) => {
                    const progress = getPhaseProgress(step);
                    const isComplete = progress === 100;

                    return (
                        <div
                            key={step.id}
                            onClick={() => onPhaseClick(step.id)}
                            className={`bg-white rounded-2xl p-6 border transition-all duration-300 cursor-pointer group hover:shadow-lg
                ${isComplete ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-200 hover:border-indigo-300'}
              `}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                    <span className="font-bold text-lg">{step.id}</span>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold
                  ${isComplete ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}
                `}>
                                    {isComplete ? t('overview.completed') : t('overview.pending')}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-700 transition-colors">
                                {step.titleKey ? t(step.titleKey) : step.title}
                            </h3>
                            <p className="text-slate-500 text-sm mb-6 line-clamp-2">
                                {step.descKey ? t(step.descKey) : step.description}
                            </p>

                            {/* Progress Bar */}
                            <div className="mb-6">
                                <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
                                    <span>Progress</span>
                                    <span>{progress}%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                    <div
                                        className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${isComplete ? 'bg-emerald-500' : 'bg-indigo-600'}`}
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Detailed Items Preview */}
                            <div className="space-y-3 border-t border-slate-100 pt-4">
                                {step.items.map(item => (
                                    <div key={item.id} className="flex items-center gap-3 text-sm">
                                        {item.type === 'percentage' ? (
                                            <div className="flex-1">
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-slate-600">{item.textKey ? t(item.textKey) : item.text}</span>
                                                    <span className="text-xs font-bold text-indigo-600">{item.value || 0}%</span>
                                                </div>
                                                <div className="w-full bg-slate-200 rounded-full h-1.5">
                                                    <div
                                                        className="bg-indigo-500 h-1.5 rounded-full"
                                                        style={{ width: `${item.value || 0}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                {item.checked
                                                    ? <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                                                    : <Circle size={16} className="text-slate-300 shrink-0" />
                                                }
                                                <span className={`truncate flex-1 ${item.checked ? 'text-slate-500 line-through' : 'text-slate-700'}`} >
                                                    {item.textKey ? t(item.textKey) : item.text}
                                                </span>
                                                {item.type === 'select' && item.value && (
                                                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                                                        {item.value}
                                                    </span>
                                                )}
                                            </>
                                        )}
                                        {/* Grade Badge */}
                                        {item.grade && (
                                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider shrink-0
                          ${item.grade === 'Basic'
                                                    ? 'bg-blue-50 text-blue-600 border-blue-100'
                                                    : 'bg-purple-50 text-purple-600 border-purple-100'}
                        `}>
                                                {t(`grades.${item.grade}`)}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 flex items-center text-indigo-600 font-bold text-sm group-hover:translate-x-1 transition-transform">
                                {t('overview.viewDetails')} <ArrowRight size={16} className="ml-1" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Overview;
