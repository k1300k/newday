import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { CreditCard } from 'lucide-react';

const PaymentNode = ({ data }) => {
    const [provider, setProvider] = useState(data.provider || 'toss');
    const [amount, setAmount] = useState(data.amount || '');

    return (
        <div className="bg-white rounded-xl shadow-lg border-2 border-blue-200 p-6 min-w-[400px] max-w-[600px]">
            {/* Top Handle (input) */}
            <Handle
                type="target"
                position={Position.Top}
                className="w-3 h-3 !bg-blue-600"
            />

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <CreditCard className="text-white" size={20} />
                </div>
                <div>
                    <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                        Payment
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">💳 결제 (Payment)</h3>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                        결제 PG사 선택
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        <label
                            className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all ${provider === 'toss'
                                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                                    : 'border-slate-200 hover:border-blue-300'
                                }`}
                        >
                            <input
                                type="radio"
                                name="provider"
                                value="toss"
                                checked={provider === 'toss'}
                                onChange={(e) => setProvider(e.target.value)}
                                className="hidden"
                            />
                            <span className="font-medium">Toss Payments</span>
                        </label>
                        <label
                            className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all ${provider === 'stripe'
                                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                                    : 'border-slate-200 hover:border-blue-300'
                                }`}
                        >
                            <input
                                type="radio"
                                name="provider"
                                value="stripe"
                                checked={provider === 'stripe'}
                                onChange={(e) => setProvider(e.target.value)}
                                className="hidden"
                            />
                            <span className="font-medium">Stripe</span>
                        </label>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                        구독 상품 금액
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="10000"
                            className="w-full px-3 py-2 pr-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                        <span className="absolute right-3 top-2.5 text-slate-500 font-medium">
                            원
                        </span>
                    </div>
                </div>
            </div>

            {/* Bottom Handle (output) */}
            <Handle
                type="source"
                position={Position.Bottom}
                className="w-3 h-3 !bg-blue-600"
            />
        </div>
    );
};

export default PaymentNode;
