import React from 'react';
import { Handle, Position } from 'reactflow';
import { Play } from 'lucide-react';

const StartNode = ({ data }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg border-2 border-indigo-200 p-6 min-w-[400px] max-w-[600px]">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <Play className="text-white" size={20} />
                </div>
                <div>
                    <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                        Step 1
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">시작 (Start)</h3>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                        서비스명
                    </label>
                    <input
                        type="text"
                        placeholder="예: My Awesome Service"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        defaultValue={data.serviceName || ''}
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                        랜딩 페이지 URL
                    </label>
                    <input
                        type="text"
                        placeholder="예: https://myservice.com"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        defaultValue={data.landingUrl || ''}
                    />
                </div>
            </div>

            {/* Bottom Handle (output) */}
            <Handle
                type="source"
                position={Position.Bottom}
                className="w-3 h-3 !bg-indigo-600"
            />
        </div>
    );
};

export default StartNode;
