import React, { useState } from 'react';
import { CheckCircle2, Circle, Plus, Trash2, Edit2, X, Save, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const StepCard = ({ step, onToggleItem, onSelectOption, onAddItem, onUpdateItem, onDeleteItem, allSteps }) => {
                                            <button
                                                onClick={() => startEditing(item)}
                                                className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                                                title="Edit"
                                            >
                                                <Edit2 size={14} />
                                            </button>
                                            <button
                                                onClick={() => onDeleteItem(step.id, item.id)}
                                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div >
                                    </>
                                )}
                            </div >
                        )}
                    </div >
                ))}
            </div >

    {/* Add Item Button */ }
{
    isAdding ? (
        <form onSubmit={handleAddItemSubmit} className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-300 border-dashed">
            <div className="flex items-center gap-2 mb-3">
                <input
                    type="text"
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                    placeholder="Enter new item..."
                    className="flex-1 bg-white p-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm text-slate-700 placeholder-slate-400 outline-none"
                    autoFocus
                />
            </div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="itemType"
                            value="checkbox"
                            checked={newItemType === 'checkbox'}
                            onChange={() => setNewItemType('checkbox')}
                            className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-sm text-slate-600">Checkbox</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="itemType"
                            value="percentage"
                            checked={newItemType === 'percentage'}
                            onChange={() => setNewItemType('percentage')}
                            className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-sm text-slate-600">Percentage (%)</span>
                    </label>
                </div>
                <div className="flex gap-2">
                    <button type="button" onClick={() => setIsAdding(false)} className="px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-200 rounded-md transition-colors">
                        Cancel
                    </button>
                    <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors">
                        Add Item
                    </button>
                </div>
            </div>
        </form>
    ) : (
        <button
            onClick={() => setIsAdding(true)}
            className="mt-4 w-full py-2.5 flex items-center justify-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg border border-dashed border-slate-300 hover:border-indigo-300 transition-all"
        >
            <Plus size={16} />
            <span>Add Item</span>
        </button>
    )
}

{/* Conditional Alerts based on Step 1 Selection */ }
{
    step.id === 1 && platform && (
        <div className={`mt-8 p-4 rounded-lg flex items-start gap-3 animate-fade-in border
          ${platform === 'Web Service' ? 'bg-amber-50 text-amber-900 border-amber-200' : 'bg-indigo-50 text-indigo-900 border-indigo-200'}
        `}>
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <div>
                <h4 className="font-bold text-sm mb-1">
                    {platform === 'Web Service' ? 'Web Service Notice' : 'Mobile App Notice'}
                </h4>
                <p className="text-xs opacity-90 leading-relaxed">
                    {platform === 'Web Service'
                        ? '웹에서는 백그라운드 위치 추적이 불가능합니다. PWA 지원 여부와 SEO 전략을 고려하세요.'
                        : '앱 스토어(Apple/Google) 계정 준비와 심사 가이드라인을 미리 확인해야 합니다.'}
                </p>
            </div>
        </div>
    )
}
        </div >
    );
};

export default StepCard;
