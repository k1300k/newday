import React, { useState, useCallback } from 'react';
import ReactFlow, {
    Background,
    Controls,
    applyNodeChanges,
    applyEdgeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Plus, GitBranch, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Import custom nodes
import StartNode from './flow/StartNode';
import AuthNode from './flow/AuthNode';
import VibeCodeNode from './flow/VibeCodeNode';
import PaymentNode from './flow/PaymentNode';
import EndNode from './flow/EndNode';

// Define node types
const nodeTypes = {
    start: StartNode,
    auth: AuthNode,
    vibeCode: VibeCodeNode,
    payment: PaymentNode,
    end: EndNode,
};

// Initial empty state
const initialNodes = [];
const initialEdges = [];

const ServiceFlow = () => {
    const { t } = useLanguage();
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [showAddMenu, setShowAddMenu] = useState(false);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        []
    );

    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );

    // Add new module
    const addModule = (type, label) => {
        const newId = `${type}-${Date.now()}`;
        const yPosition = nodes.length * 200 + 50; // Vertical spacing

        const newNode = {
            id: newId,
            type: type,
            position: { x: 50, y: yPosition }, // Centered horizontally
            data: {
                label: label,
            },
        };

        setNodes((nds) => [...nds, newNode]);

        // Auto-connect to previous node
        if (nodes.length > 0) {
            const lastNode = nodes[nodes.length - 1];
            const newEdge = {
                id: `e${lastNode.id}-${newId}`,
                source: lastNode.id,
                target: newId,
                type: 'straight',
                animated: true,
            };
            setEdges((eds) => [...eds, newEdge]);
        }

        setShowAddMenu(false);
    };

    const moduleOptions = [
        { type: 'start', label: '시작 (Start)', icon: '🚀', color: 'indigo' },
        { type: 'auth', label: '인증 (Auth)', icon: '🔒', color: 'emerald' },
        { type: 'vibeCode', label: '핵심 로직 (Vibe Code)', icon: '✨', color: 'purple' },
        { type: 'payment', label: '결제 (Payment)', icon: '💳', color: 'blue' },
        { type: 'end', label: '완료 (End)', icon: '🟢', color: 'green' },
    ];

    return (
        <div className="h-full flex flex-col bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 p-6 relative z-10">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            {t('nav.serviceFlow')}
                        </h1>
                        <p className="text-slate-600 mt-1">
                            단계별로 서비스 플로우를 구성하세요
                        </p>
                    </div>
                    <div className="relative">
                        <button
                            onClick={() => setShowAddMenu(!showAddMenu)}
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                        >
                            <Plus size={20} />
                            모듈 추가
                        </button>

                        {/* Add Menu Dropdown */}
                        {showAddMenu && (
                            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 p-2 z-50">
                                <div className="flex items-center justify-between p-2 border-b border-slate-100 mb-2">
                                    <span className="text-sm font-semibold text-slate-700">
                                        모듈 선택
                                    </span>
                                    <button
                                        onClick={() => setShowAddMenu(false)}
                                        className="text-slate-400 hover:text-slate-600"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                                {moduleOptions.map((module) => (
                                    <button
                                        key={module.type}
                                        onClick={() => addModule(module.type, module.label)}
                                        className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-${module.color}-50 transition-colors text-left border border-transparent hover:border-${module.color}-200`}
                                    >
                                        <span className="text-2xl">{module.icon}</span>
                                        <div>
                                            <div className="font-medium text-slate-900">
                                                {module.label}
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                {module.type === 'start' && '플로우의 시작점'}
                                                {module.type === 'auth' && '사용자 인증 설정'}
                                                {module.type === 'vibeCode' && 'AI 코드 생성'}
                                                {module.type === 'payment' && '결제 기능 추가'}
                                                {module.type === 'end' && '플로우 종료점'}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Flow Canvas */}
            <div className="flex-1 relative">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    nodeTypes={nodeTypes}
                    fitView
                    nodesDraggable={false}
                    panOnScroll={true}
                    zoomOnScroll={false}
                    minZoom={0.5}
                    maxZoom={1.5}
                >
                    <Background color="#e2e8f0" gap={16} />
                    <Controls />
                </ReactFlow>

                {/* Empty State */}
                {nodes.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <GitBranch size={40} className="text-slate-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-700 mb-2">
                                플로우가 비어있습니다
                            </h3>
                            <p className="text-slate-500 max-w-md">
                                우측 상단의 "모듈 추가" 버튼을 눌러 시작하세요
                            </p>
                            <p className="text-sm text-slate-400 mt-2">
                                시작 → 인증 → 핵심 로직 → 결제 → 완료 순서로 추가해보세요
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServiceFlow;
