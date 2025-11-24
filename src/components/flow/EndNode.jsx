import React from 'react';
import { Handle, Position } from 'reactflow';
import { CheckCircle } from 'lucide-react';

const EndNode = ({ data }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg border-2 border-green-200 p-6 min-w-[400px] max-w-[600px]">
            {/* Top Handle (input) */}
            <Handle
                type="target"
                position={Position.Top}
                className="w-3 h-3 !bg-green-600"
            />

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <CheckCircle className="text-white" size={20} />
                </div>
                <div>
                    <div className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                        Complete
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">🟢 완료 (End)</h3>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                        최종 성공 페이지 URL
                    </label>
                    <input
                        type="text"
                        placeholder="예: /success"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                        defaultValue={data.successUrl || ''}
                    />
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800 font-medium">
                        ✓ 플로우가 여기서 완료됩니다
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                        사용자가 최종 목적지에 도달했습니다
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EndNode;
