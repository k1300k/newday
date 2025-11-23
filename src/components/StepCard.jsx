import React, { useState } from 'react';
import { CheckCircle2, Circle, Plus, Trash2, Edit2, X, Save, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const StepCard = ({ step, onToggleItem, onSelectOption, onAddItem, onUpdateItem, onDeleteItem }) => {
    const { t } = useLanguage();
    const [isAdding, setIsAdding] = useState(false);
    const [newItemText, setNewItemText] = useState('');
    const [newItemType, setNewItemType] = useState('checkbox');
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState('');

    const handleAddItemSubmit = (e) => {
        e.preventDefault();
        if (newItemText.trim()) {
            onAddItem(step.id, newItemText, newItemType);
            setNewItemText('');
            setIsAdding(false);
            setNewItemType('checkbox');
        }
    };

    const startEditing = (item) => {
        setEditingId(item.id);
        setEditValue(item.textKey ? t(item.textKey) : item.text);
    };

    const saveEditing = (itemId) => {
        if (editValue.trim()) {
            onUpdateItem(step.id, itemId, { text: editValue, textKey: null }); // Clear textKey if edited
            setEditingId(null);
        }
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditValue('');
    };

    const handleProgressChange = (itemId, value) => {
        onUpdateItem(step.id, itemId, { value: parseInt(value, 10) });
    };

    // Determine platform for alerts (only for step 1)
    const platformItem = step.id === 1 ? step.items.find(i => i.id === 'p1') : null;
    const platform = platformItem?.value;

    return (
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    {step.titleKey ? t(step.titleKey) : step.title}
                </h2>
                <p className="text-slate-500 leading-relaxed">
                    {step.descKey ? t(step.descKey) : step.description}
                </p>
            </div>

            <div className="space-y-4">
                {step.items.map((item) => (
                    <div key={item.id} className="group">
                        {item.type === 'percentage' ? (
                            <div className="bg-white rounded-lg border border-slate-200 p-4 hover:border-indigo-300 transition-all shadow-sm">
                                <div className="flex justify-between items-center mb-2">
                                    {editingId === item.id ? (
                                        <div className="flex-1 flex items-center gap-2 mr-4">
                                            <input
                                                type="text"
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                className="flex-1 px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                                                autoFocus
                                            />
                                            <button onClick={() => saveEditing(item.id)} className="text-emerald-600 hover:bg-emerald-50 p-1 rounded"><Save size={14} /></button>
                                            <button onClick={cancelEditing} className="text-slate-400 hover:bg-slate-100 p-1 rounded"><X size={14} /></button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-slate-700">
                                                {item.textKey ? t(item.textKey) : item.text}
                                            </span>
                                            {item.grade && (
                                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider
                                                    ${item.grade === 'Basic' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-purple-50 text-purple-600 border-purple-100'}
                                                `}>
                                                    {t(`grades.${item.grade}`)}
                                                </span>
                                            )}
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 ml-2">
                                                <button onClick={() => startEditing(item)} className="p-1 text-slate-400 hover:text-indigo-600 rounded"><Edit2 size={12} /></button>
                                                <button onClick={() => onDeleteItem(step.id, item.id)} className="p-1 text-slate-400 hover:text-rose-600 rounded"><Trash2 size={12} /></button>
                                            </div>
                                        </div>
                                    )}
                                    <span className="text-sm font-bold text-indigo-600">{item.value || 0}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={item.value || 0}
                                    onChange={(e) => handleProgressChange(item.id, e.target.value)}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                />
                            </div>
                        ) : (
                            <div className={`flex items-center p-3.5 rounded-lg border transition-all duration-200 group
                                ${item.checked ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm'}
                            `}>
                                <button
                                    onClick={() => onToggleItem(step.id, item.id)}
                                    className="shrink-0 mr-3 transition-transform active:scale-90"
                                >
                                    {item.checked
                                        ? <CheckCircle2 className="text-emerald-500" size={22} />
                                        : <Circle className="text-slate-300 group-hover:text-indigo-500 transition-colors" size={22} />
                                    }
                                </button>

                                <div className="flex-1 min-w-0">
                                    {editingId === item.id ? (
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                className="flex-1 px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                                                autoFocus
                                            />
                                            <button onClick={() => saveEditing(item.id)} className="text-emerald-600 hover:bg-emerald-50 p-1 rounded"><Save size={14} /></button>
                                            <button onClick={cancelEditing} className="text-slate-400 hover:bg-slate-100 p-1 rounded"><X size={14} /></button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className={`font-medium transition-colors ${item.checked ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                                                    {item.textKey ? t(item.textKey) : item.text}
                                                </span>
                                                {item.grade && (
                                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider
                                                        ${item.grade === 'Basic' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-purple-50 text-purple-600 border-purple-100'}
                                                    `}>
                                                        {t(`grades.${item.grade}`)}
                                                    </span>
                                                )}
                                            </div>

                                            {item.type === 'select' && (
                                                <div className="mt-2">
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.options.map((option) => (
                                                            <button
                                                                key={option}
                                                                onClick={() => onSelectOption(step.id, item.id, option)}
                                                                className={`px-3 py-1 text-xs font-medium rounded-full border transition-all
                                                                    ${item.value === option
                                                                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                                                                        : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'}
                                                                `}
                                                            >
                                                                {option}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {editingId !== item.id && (
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 ml-2">
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
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Add Item Button */}
            {isAdding ? (
                <form onSubmit={handleAddItemSubmit} className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-300 border-dashed">
                    <div className="flex items-center gap-2 mb-3">
                        <input
                            type="text"
                            value={newItemText}
                            onChange={(e) => setNewItemText(e.target.value)}
                            placeholder={t('addItem.placeholder') || "Enter new item..."}
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
                                <span className="text-sm text-slate-600">{t('addItem.checkbox') || "Checkbox"}</span>
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
                                <span className="text-sm text-slate-600">{t('addItem.percentage') || "Percentage (%)"}</span>
                            </label>
                        </div>
                        <div className="flex gap-2">
                            <button type="button" onClick={() => setIsAdding(false)} className="px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-200 rounded-md transition-colors">
                                {t('common.cancel') || "Cancel"}
                            </button>
                            <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors">
                                {t('addItem.add') || "Add Item"}
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
                    <span>{t('addItem.button') || "Add Item"}</span>
                </button>
            )}

            {/* Conditional Alerts based on Step 1 Selection */}
            {step.id === 1 && platform && (
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
            )}
        </div>
    );
};

export default StepCard;
