import React, { useState } from 'react';
import { CheckCircle2, Circle, Plus, Trash2, Edit2, X, Save, AlertCircle, ChevronDown, ChevronUp, FileText, Bot, Github, Link as LinkIcon, BookOpen } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const StepCard = ({ step, onToggleItem, onSelectOption, onAddItem, onUpdateItem, onDeleteItem }) => {
    const { t } = useLanguage();
    const [isAdding, setIsAdding] = useState(false);
    const [newItemText, setNewItemText] = useState('');
    const [newItemType, setNewItemType] = useState('checkbox');
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [expandedItemId, setExpandedItemId] = useState(null);

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

    const toggleExpand = (itemId) => {
        setExpandedItemId(expandedItemId === itemId ? null : itemId);
    };

    const handleDeliverableChange = (itemId, field, value) => {
        const item = step.items.find(i => i.id === itemId);
        const currentDeliverables = item.deliverables || { meetingNotes: '', prompts: '', githubLinks: [] };

        onUpdateItem(step.id, itemId, {
            deliverables: {
                ...currentDeliverables,
                [field]: value
            }
        });
    };

    const addGithubLink = (itemId, url, desc) => {
        if (!url) return;
        const item = step.items.find(i => i.id === itemId);
        const currentDeliverables = item.deliverables || { meetingNotes: '', prompts: '', githubLinks: [] };
        const currentLinks = currentDeliverables.githubLinks || [];

        onUpdateItem(step.id, itemId, {
            deliverables: {
                ...currentDeliverables,
                githubLinks: [...currentLinks, { url, desc }]
            }
        });
    };

    const removeGithubLink = (itemId, index) => {
        const item = step.items.find(i => i.id === itemId);
        const currentDeliverables = item.deliverables || { meetingNotes: '', prompts: '', githubLinks: [] };
        const currentLinks = currentDeliverables.githubLinks || [];

        onUpdateItem(step.id, itemId, {
            deliverables: {
                ...currentDeliverables,
                githubLinks: currentLinks.filter((_, i) => i !== index)
            }
        });
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
                    <div key={item.id} className="group bg-white rounded-lg border border-slate-200 transition-all hover:border-indigo-300 hover:shadow-sm overflow-hidden">
                        {/* Item Header */}
                        <div className={`p-4 flex items-start gap-3 ${item.checked ? 'bg-slate-50' : ''}`}>
                            {item.type !== 'percentage' && (
                                <button
                                    onClick={() => onToggleItem(step.id, item.id)}
                                    className="mt-0.5 shrink-0 transition-transform active:scale-90"
                                >
                                    {item.checked
                                        ? <CheckCircle2 className="text-emerald-500" size={22} />
                                        : <Circle className="text-slate-300 group-hover:text-indigo-500 transition-colors" size={22} />
                                    }
                                </button>
                            )}

                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        {editingId === item.id ? (
                                            <div className="flex items-center gap-2 mb-2">
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
                                            <div className="flex items-center gap-2 flex-wrap mb-1">
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
                                        )}

                                        {/* Type Specific Controls */}
                                        {item.type === 'select' && !editingId && (
                                            <div className="flex flex-wrap gap-2 mt-2">
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
                                        )}

                                        {item.type === 'percentage' && (
                                            <div className="mt-2">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-xs text-slate-500 font-medium">{t('checklist.percentage')}</span>
                                                    <span className="text-xs font-bold text-indigo-600">{item.value || 0}%</span>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={item.value || 0}
                                                    onChange={(e) => handleProgressChange(item.id, e.target.value)}
                                                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-1 ml-2">
                                        {item.refLink && (
                                            <a
                                                href={item.refLink.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
                                                title={t('checklist.reference') || "Reference / Example"}
                                            >
                                                <BookOpen size={14} />
                                            </a>
                                        )}
                                        {editingId !== item.id && (
                                            <>
                                                <button
                                                    onClick={() => startEditing(item)}
                                                    className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                                                    title={t('checklist.edit')}
                                                >
                                                    <Edit2 size={14} />
                                                </button>
                                                <button
                                                    onClick={() => onDeleteItem(step.id, item.id)}
                                                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                                                    title={t('checklist.delete')}
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </>
                                        )}
                                        <button
                                            onClick={() => toggleExpand(item.id)}
                                            className={`p-1.5 rounded-md transition-colors flex items-center gap-1
                                                ${expandedItemId === item.id ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'}
                                            `}
                                            title="Deliverables"
                                        >
                                            {(item.deliverables?.meetingNotes || item.deliverables?.prompts || item.deliverables?.githubLinks?.length > 0) && (
                                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                                            )}
                                            {expandedItemId === item.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Deliverables Section (Expanded) */}
                        {expandedItemId === item.id && (
                            <div className="border-t border-slate-100 bg-slate-50/50 p-4 space-y-4 animate-fade-in">
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t('deliverables.title')}</h4>

                                {/* Meeting Notes */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                                        <FileText size={14} className="text-indigo-500" />
                                        {t('deliverables.meetingNotes')}
                                    </label>
                                    <textarea
                                        value={item.deliverables?.meetingNotes || ''}
                                        onChange={(e) => handleDeliverableChange(item.id, 'meetingNotes', e.target.value)}
                                        placeholder={t('deliverables.placeholderNotes')}
                                        className="w-full p-3 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none h-24 bg-white"
                                    />
                                </div>

                                {/* Prompts */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                                        <Bot size={14} className="text-purple-500" />
                                        {t('deliverables.prompts')}
                                    </label>
                                    <textarea
                                        value={item.deliverables?.prompts || ''}
                                        onChange={(e) => handleDeliverableChange(item.id, 'prompts', e.target.value)}
                                        placeholder={t('deliverables.placeholderPrompts')}
                                        className="w-full p-3 text-sm font-mono border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none h-24 bg-slate-900 text-slate-200"
                                    />
                                </div>

                                {/* GitHub Links */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                                        <Github size={14} className="text-slate-800" />
                                        {t('deliverables.githubLinks')}
                                    </label>

                                    {/* Link List */}
                                    <div className="space-y-2 mb-3">
                                        {(item.deliverables?.githubLinks || []).map((link, idx) => (
                                            <div key={idx} className="flex items-center gap-2 bg-white p-2 rounded border border-slate-200 text-sm">
                                                <LinkIcon size={14} className="text-slate-400 shrink-0" />
                                                <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex-1 text-indigo-600 hover:underline truncate">
                                                    {link.desc || link.url}
                                                </a>
                                                <button onClick={() => removeGithubLink(item.id, idx)} className="text-slate-400 hover:text-rose-500 p-1">
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ))}
                                        {(!item.deliverables?.githubLinks || item.deliverables.githubLinks.length === 0) && (
                                            <p className="text-xs text-slate-400 italic">{t('deliverables.noLinks')}</p>
                                        )}
                                    </div>

                                    {/* Add Link Form */}
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            const url = e.target.url.value;
                                            const desc = e.target.desc.value;
                                            if (url) {
                                                addGithubLink(item.id, url, desc);
                                                e.target.reset();
                                            }
                                        }}
                                        className="flex gap-2"
                                    >
                                        <input name="url" type="url" placeholder={t('deliverables.linkUrl')} className="flex-1 px-2 py-1.5 text-sm border border-slate-200 rounded focus:ring-2 focus:ring-indigo-500 outline-none" required />
                                        <input name="desc" type="text" placeholder={t('deliverables.linkDesc')} className="flex-1 px-2 py-1.5 text-sm border border-slate-200 rounded focus:ring-2 focus:ring-indigo-500 outline-none" />
                                        <button type="submit" className="px-3 py-1.5 bg-slate-800 text-white text-xs font-bold rounded hover:bg-slate-700 transition-colors">
                                            {t('deliverables.addLink')}
                                        </button>
                                    </form>
                                </div>
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
                            placeholder={t('checklist.placeholder')}
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
                                <span className="text-sm text-slate-600">{t('checklist.checkbox')}</span>
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
                                <span className="text-sm text-slate-600">{t('checklist.percentage')}</span>
                            </label>
                        </div>
                        <div className="flex gap-2">
                            <button type="button" onClick={() => setIsAdding(false)} className="px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-200 rounded-md transition-colors">
                                {t('checklist.cancel')}
                            </button>
                            <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors">
                                {t('checklist.addItem')}
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
                    <span>{t('checklist.addItem')}</span>
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
