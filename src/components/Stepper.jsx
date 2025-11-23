import React from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Stepper = ({ steps, currentStep, onStepClick }) => {
    const { t } = useLanguage();

    return (
        <div className="w-full py-8 px-4">
            <div className="flex items-center justify-between max-w-4xl mx-auto relative">
                {/* Connecting Line Background */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10 transform -translate-y-1/2 rounded-full"></div>
                {/* Connecting Line Progress */}
                <div
                    className="absolute top-1/2 left-0 h-0.5 bg-indigo-600 -z-10 transform -translate-y-1/2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                ></div>

                {steps.map((step, index) => {
                    const isActive = step.id === currentStep;
                    const isCompleted = step.isCompleted;
                    const isPast = step.id < currentStep;

                    return (
                        <button
                            key={step.id}
                            onClick={() => onStepClick(step.id)}
                            className={`flex flex-col items-center group focus:outline-none`}
                        >
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 bg-white
                  ${isActive
                                        ? 'border-indigo-600 text-indigo-600 ring-4 ring-indigo-50'
                                        : isCompleted || isPast
                                            ? 'border-indigo-600 bg-indigo-600 text-white'
                                            : 'border-slate-300 text-slate-400 group-hover:border-slate-400'}
                `}
                            >
                                {isCompleted || isPast ? <Check size={14} strokeWidth={3} /> : <span className="text-xs font-bold">{step.id}</span>}
                            </div>
                            <span
                                className={`mt-3 text-xs font-semibold tracking-wide uppercase transition-colors duration-300
                  ${isActive ? 'text-slate-900 font-bold' : 'text-slate-400 font-medium'}
                `}
                            >
                                {step.titleKey ? t(step.titleKey) : step.title}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Stepper;
