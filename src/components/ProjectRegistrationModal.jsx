import React, { useState, useEffect } from 'react';
import { X, Save, Calendar, FileText, Type } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ProjectRegistrationModal = ({ isOpen, onClose, projectInfo, onSave }) => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        startDate: '',
        status: 'planning'
    });

    useEffect(() => {
        if (isOpen && projectInfo) {
            setFormData({
                name: projectInfo.name || '',
                description: projectInfo.description || '',
                startDate: projectInfo.startDate || new Date().toISOString().split('T')[0],
                status: projectInfo.status || 'planning'
            });
        }
    }, [isOpen, projectInfo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            status: formData.status === 'planning' ? 'active' : formData.status
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-200">
                <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200 bg-slate-50">
                    <h2 className="text-lg font-bold text-slate-900">
                        {projectInfo?.status === 'active' ? t('project.settings') : t('project.register')}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                            <Type size={16} className="text-indigo-500" />
                            {t('project.name')}
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder={t('project.placeholderName')}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                            <FileText size={16} className="text-indigo-500" />
                            {t('project.description')}
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder={t('project.placeholderDesc')}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all h-32 resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                            <Calendar size={16} className="text-indigo-500" />
                            {t('project.startDate')}
                        </label>
                        <input
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        />
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
                        >
                            {t('checklist.cancel')}
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                        >
                            <Save size={18} />
                            {t('project.save')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectRegistrationModal;
