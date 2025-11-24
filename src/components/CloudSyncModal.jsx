import React, { useState } from 'react';
import { X, Cloud, Download, Upload, Copy, Check, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const CloudSyncModal = ({ isOpen, onClose, onCloudSave, onCloudLoad }) => {
    const { t } = useLanguage();
    const [projectId, setProjectId] = useState('');
    const [loading, setLoading] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const [error, setError] = useState('');
    const [shareLink, setShareLink] = useState('');

    if (!isOpen) return null;

    const handleGenerateId = () => {
        const timestamp = Date.now().toString(36);
        const randomStr = Math.random().toString(36).substring(2, 7);
        const newId = `project-${timestamp}-${randomStr}`;
        setProjectId(newId);
    };

    const handleSave = async () => {
        if (!projectId.trim()) {
            setError(t('header.projectIdPlaceholder'));
            return;
        }

        setLoading(true);
        setError('');

        try {
            await onCloudSave(projectId);
            const link = `${window.location.origin}?projectId=${projectId}`;
            setShareLink(link);
            alert(t('header.cloudSaveSuccess'));
        } catch (err) {
            setError(err.message || 'Failed to save to cloud');
        } finally {
            setLoading(false);
        }
    };

    const handleLoad = async () => {
        if (!projectId.trim()) {
            setError(t('header.projectIdPlaceholder'));
            return;
        }

        if (!confirm(t('header.importConfirm'))) return;

        setLoading(true);
        setError('');

        try {
            await onCloudLoad(projectId);
            alert(t('header.cloudLoadSuccess'));
            window.location.reload();
        } catch (err) {
            setError(err.message || 'Failed to load from cloud');
        } finally {
            setLoading(false);
        }
    };

    const handleCopyLink = () => {
        if (shareLink) {
            navigator.clipboard.writeText(shareLink);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Cloud className="text-indigo-600" size={24} />
                        <h2 className="text-xl font-bold text-slate-900">Cloud Sync</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="space-y-4">
                    {/* Project ID Input */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                            {t('header.projectId')}
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={projectId}
                                onChange={(e) => setProjectId(e.target.value)}
                                placeholder={t('header.projectIdPlaceholder')}
                                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                            />
                            <button
                                onClick={handleGenerateId}
                                className="px-3 py-2 bg-slate-600 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
                            >
                                {t('header.generateId')}
                            </button>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                            Create a unique ID for your project or enter an existing one
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-lg">
                            <AlertCircle className="text-rose-600" size={16} />
                            <p className="text-sm text-rose-700">{error}</p>
                        </div>
                    )}

                    {/* Share Link */}
                    {shareLink && (
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">
                                {t('header.shareLink')}
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={shareLink}
                                    readOnly
                                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-sm"
                                />
                                <button
                                    onClick={handleCopyLink}
                                    className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center gap-1"
                                >
                                    {copySuccess ? <Check size={16} /> : <Copy size={16} />}
                                </button>
                            </div>
                            <p className="text-xs text-emerald-600 mt-1">
                                Share this link to load the project on another browser
                            </p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-4">
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Upload size={16} />
                            <span>{loading ? 'Saving...' : t('header.cloudSave')}</span>
                        </button>
                        <button
                            onClick={handleLoad}
                            disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Download size={16} />
                            <span>{loading ? 'Loading...' : t('header.cloudLoad')}</span>
                        </button>
                    </div>

                    {/* Info */}
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-xs text-blue-800">
                            <strong>Note:</strong> Cloud Sync requires Firebase configuration.
                            If not configured, use Export/Import buttons instead.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CloudSyncModal;
