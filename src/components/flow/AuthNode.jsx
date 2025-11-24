import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Shield } from 'lucide-react';

const AuthNode = ({ data }) => {
    const [providers, setProviders] = useState({
        google: data.google || false,
        kakao: data.kakao || false,
        email: data.email || false,
    });

    return (
        <div className="bg-white rounded-xl shadow-lg border-2 border-emerald-200 p-6 min-w-[400px] max-w-[600px]">
            {/* Top Handle (input) */}
            <Handle
                type="target"
                position={Position.Top}
                className="w-3 h-3 !bg-emerald-600"
            />

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                    <Shield className="text-white" size={20} />
                </div>
                <div>
                    <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">
                        Authentication
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">🔒 인증 (Auth)</h3>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
                <p className="text-sm text-slate-600">인증 방식을 선택하세요</p>

                {/* Google */}
                <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                    <input
                        type="checkbox"
                        checked={providers.google}
                        onChange={(e) => setProviders({ ...providers, google: e.target.checked })}
                        className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                    <span className="font-medium text-slate-700">Google 로그인</span>
                </label>

                {/* Kakao */}
                <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                    <input
                        type="checkbox"
                        checked={providers.kakao}
                        onChange={(e) => setProviders({ ...providers, kakao: e.target.checked })}
                        className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                    <span className="font-medium text-slate-700">Kakao 로그인</span>
                </label>

                {/* Email */}
                <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                    <input
                        type="checkbox"
                        checked={providers.email}
                        onChange={(e) => setProviders({ ...providers, email: e.target.checked })}
                        className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                    <span className="font-medium text-slate-700">이메일 인증</span>
                </label>
            </div>

            {/* Bottom Handle (output) */}
            <Handle
                type="source"
                position={Position.Bottom}
                className="w-3 h-3 !bg-emerald-600"
            />
        </div>
    );
};

export default AuthNode;
