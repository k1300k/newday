import React, { useEffect, useCallback } from 'react';
import ReactFlow, {
    Background,
    Controls,
    applyNodeChanges,
    applyEdgeChanges,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Plus, GitBranch, X, Trash2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import useFlowStore from '../stores/flowStore';

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

const ServiceFlow = ({ steps, setSteps }) => {
    const { t } = useLanguage();
    const { nodes, edges, setNodes, setEdges, addNode, clearFlow, loadFromStorage } = useFlowStore();
    const [showAddMenu, setShowAddMenu] = React.useState(false);

    // Load from storage on mount
    useEffect(() => {
        loadFromStorage();
    }, [loadFromStorage]);

    const onNodesChange = useCallback(
        (changes) => {
            const updatedNodes = applyNodeChanges(changes, nodes);
            setNodes(updatedNodes);

            // Save to localStorage
            const saved = JSON.parse(localStorage.getItem('vibe-pilot-service-flow') || '{}');
            localStorage.setItem('vibe-pilot-service-flow', JSON.stringify({
                ...saved,
                nodes: updatedNodes
            }));
        },
        [nodes, setNodes]
    );

    const onEdgesChange = useCallback(
        (changes) => {
            const updatedEdges = applyEdgeChanges(changes, edges);
            setEdges(updatedEdges);

            // Save to localStorage
            const saved = JSON.parse(localStorage.getItem('vibe-pilot-service-flow') || '{}');
            localStorage.setItem('vibe-pilot-service-flow', JSON.stringify({
                ...saved,
                edges: updatedEdges
            }));
        },
        [edges, setEdges]
    );

    const handleAddModule = (type, label) => {
        addNode(type, label);
        setShowAddMenu(false);
    };

    const handleClearFlow = () => {
        if (confirm('모든 플로우를 삭제하시겠습니까?')) {
            clearFlow();
        }
    };

    // Load from checklist (Phase 5)
    const loadFromChecklist = () => {
        if (!steps || steps.length < 5) {
            alert('체크리스트 데이터가 없습니다.');
            return;
        }

        const phase5 = steps.find(step => step.id === 5);
        if (!phase5) {
            alert('Phase 5 (Service Flow) 데이터를 찾을 수 없습니다.');
            return;
        }

        const newNodes = [];
        const newEdges = [];
        let yPos = 50;

        phase5.items.forEach((item, index) => {
            let nodeType = 'start';

            // Map checklist items to node types
            if (item.id === 's1') nodeType = 'start';
            else if (item.id === 's2') nodeType = 'auth';
            else if (item.id === 's3') nodeType = 'vibeCode';
            else if (item.id === 's4') nodeType = 'payment';
            else if (item.id === 's5') nodeType = 'conditional';
            else if (item.id === 's6') nodeType = 'end';

            const nodeId = `${nodeType}-${item.id}`;
            newNodes.push({
                id: nodeId,
                type: nodeType,
                position: { x: 50, y: yPos },
                data: { label: t(`items.${item.id}`), checked: item.checked || false },
            });

            // Connect to previous node
            if (index > 0) {
                const prevNodeId = newNodes[index - 1].id;
                newEdges.push({
                    id: `e${index}`,
                    source: prevNodeId,
                    target: nodeId,
                    type: 'straight',
                    animated: true,
                });
            }

            yPos += 200;
        });

        setNodes(newNodes);
        setEdges(newEdges);

        // Save to localStorage
        localStorage.setItem('vibe-pilot-service-flow', JSON.stringify({ nodes: newNodes, edges: newEdges }));
        alert('체크리스트에서 불러왔습니다!');
    };

    // Send to checklist (Phase 5)
    const sendToChecklist = () => {
        if (!steps || steps.length < 5 || !setSteps) {
            alert('체크리스트를 업데이트할 수 없습니다.');
            return;
        }

        const updatedSteps = steps.map(step => {
            if (step.id === 5) {
                const updatedItems = step.items.map(item => {
                    // Find corresponding node
                    const node = nodes.find(n => n.id.includes(item.id));
                    if (node) {
                        return { ...item, checked: true }; // Mark as checked if node exists
                    }
                    return item;
                });
                return { ...step, items: updatedItems };
            }
            return step;
        });

        setSteps(updatedSteps);
        alert('체크리스트로 전달했습니다!');
    };

    const moduleOptions = [
        { type: 'start', label: '시작 (Start)', icon: '🚀', color: 'indigo', desc: '플로우의 시작점' },
        { type: 'auth', label: '인증 (Auth)', icon: '🔒', color: 'emerald', desc: '사용자 인증 설정' },
        { type: 'vibeCode', label: '핵심 로직 (Vibe Code)', icon: '✨', color: 'purple', desc: 'AI 코드 생성' },
        { type: 'payment', label: '결제 (Payment)', icon: '💳', color: 'blue', desc: '결제 기능 추가' },
        { type: 'end', label: '완료 (End)', icon: '🟢', color: 'green', desc: '플로우 종료점' },
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
                            단계별로 서비스 플로우를 구성하세요 ({nodes.length}개 모듈)
                        </p>
                    </div>
                    <div className="flex items-center gap-2 relative">
                        <button
                            onClick={loadFromChecklist}
                            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                        >
                            📥 체크리스트 불러오기
                        </button>
                        <button
                            onClick={sendToChecklist}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                            📤 체크리스트로 전달
                        </button>
                        {nodes.length > 0 && (
                            <button
                                onClick={handleClearFlow}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                            >
                                <Trash2 size={18} />
                                전체 삭제
                            </button>
                        )}
                        <button
                            onClick={() => setShowAddMenu(!showAddMenu)}
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                        >
                            <Plus size={20} />
                            모듈 추가
                        </button>

                        {/* Add Menu Dropdown */}
                        {showAddMenu && (
                            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 p-2 z-50">
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
                                <div className="space-y-1">
                                    {moduleOptions.map((module) => (
                                        <button
                                            key={module.type}
                                            onClick={() => handleAddModule(module.type, module.label)}
                                            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors text-left border border-transparent hover:border-slate-200"
                                        >
                                            <span className="text-2xl">{module.icon}</span>
                                            <div className="flex-1">
                                                <div className="font-medium text-slate-900">
                                                    {module.label}
                                                </div>
                                                <div className="text-xs text-slate-500">
                                                    {module.desc}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
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
