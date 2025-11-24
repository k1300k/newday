import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Sparkles, Wand2 } from 'lucide-react';

const VibeCodeNode = ({ data }) => {
    const [prompt, setPrompt] = useState(data.prompt || '');

    return (
        <div className="bg-white rounded-xl shadow-lg border-2 border-purple-200 p-6 min-w-[400px] max-w-[600px]">
            {/* Top Handle (input) */}
            <Handle
                type="target"
                position={Position.Top}
                className="w-3 h-3 !bg-purple-600"
            />

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <Sparkles className="text-white" size={20} />
                </div>
                <div>
                    <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                        Vibe Coding
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">✨ 핵심 로직 (AI)</h3>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
                <p className="text-sm text-slate-600">
                    자연어로 원하는 기능을 설명하세요
                </p>

                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="예: 로그인한 유저가 구매하기 버튼을 누르면 10% 할인 쿠폰을 적용한 가격으로 결제창을 띄워줘"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none resize-none font-mono text-sm"
                    rows={6}
                />

                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all shadow-sm">
                    <Wand2 size={16} />
                    코드 생성하기
                </button>

                {data.generatedCode && (
                    <div className="mt-4 p-3 bg-slate-900 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-emerald-400">
                                ✓ Generated Code
                            </span>
                            <button className="text-xs text-slate-400 hover:text-white">
                                Copy
                            </button>
                        </div>
                        <pre className="text-xs text-slate-300 overflow-x-auto">
                            <code>{data.generatedCode}</code>
                        </pre>
                    </div>
                )}
            </div>

            {/* Bottom Handle (output) */}
            <Handle
                type="source"
                position={Position.Bottom}
                className="w-3 h-3 !bg-purple-600"
            />
        </div>
    );
};

export default VibeCodeNode;
