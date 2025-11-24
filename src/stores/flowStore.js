import { create } from 'zustand';

const defaultNodes = [
    {
        id: 'start-default',
        type: 'start',
        position: { x: 50, y: 50 },
        data: { label: '시작 (Start)', serviceName: '', landingUrl: '' },
    },
    {
        id: 'auth-default',
        type: 'auth',
        position: { x: 50, y: 250 },
        data: { label: '🔒 인증 (Auth)', google: false, kakao: false, email: false },
    },
    {
        id: 'vibeCode-default',
        type: 'vibeCode',
        position: { x: 50, y: 450 },
        data: { label: '✨ 핵심 로직 (Vibe Code)', prompt: '' },
    },
    {
        id: 'payment-default',
        type: 'payment',
        position: { x: 50, y: 650 },
        data: { label: '💳 결제 (Payment)', provider: 'toss', amount: '' },
    },
    {
        id: 'end-default',
        type: 'end',
        position: { x: 50, y: 850 },
        data: { label: '🟢 완료 (End)', successUrl: '' },
    },
];

const defaultEdges = [
    { id: 'e1', source: 'start-default', target: 'auth-default', type: 'straight', animated: true },
    { id: 'e2', source: 'auth-default', target: 'vibeCode-default', type: 'straight', animated: true },
    { id: 'e3', source: 'vibeCode-default', target: 'payment-default', type: 'straight', animated: true },
    { id: 'e4', source: 'payment-default', target: 'end-default', type: 'straight', animated: true },
];

const useFlowStore = create((set, get) => ({
    // Flow state
    nodes: defaultNodes,
    edges: defaultEdges,

    // Actions
    setNodes: (nodes) => set({ nodes }),
    setEdges: (edges) => set({ edges }),

    // Add node
    addNode: (type, label) => {
        const { nodes, edges } = get();
        const newId = `${type}-${Date.now()}`;
        const yPosition = nodes.length * 200 + 50;

        const newNode = {
            id: newId,
            type: type,
            position: { x: 50, y: yPosition },
            data: { label },
        };

        const updatedNodes = [...nodes, newNode];
        set({ nodes: updatedNodes });

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
            set({ edges: [...edges, newEdge] });
        }

        // Save to localStorage
        saveToLocalStorage({ nodes: updatedNodes, edges: get().edges });
    },

    // Remove node
    removeNode: (nodeId) => {
        const { nodes, edges } = get();
        const updatedNodes = nodes.filter((node) => node.id !== nodeId);
        const updatedEdges = edges.filter(
            (edge) => edge.source !== nodeId && edge.target !== nodeId
        );

        set({ nodes: updatedNodes, edges: updatedEdges });
        saveToLocalStorage({ nodes: updatedNodes, edges: updatedEdges });
    },

    // Update node data
    updateNodeData: (nodeId, data) => {
        const { nodes } = get();
        const updatedNodes = nodes.map((node) =>
            node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
        );

        set({ nodes: updatedNodes });
        saveToLocalStorage({ nodes: updatedNodes, edges: get().edges });
    },

    // Clear all
    clearFlow: () => {
        set({ nodes: [], edges: [] });
        localStorage.removeItem('vibe-pilot-service-flow');
    },

    // Load from localStorage
    loadFromStorage: () => {
        const saved = localStorage.getItem('vibe-pilot-service-flow');
        if (saved) {
            try {
                const { nodes, edges } = JSON.parse(saved);
                set({ nodes: nodes || defaultNodes, edges: edges || defaultEdges });
            } catch (error) {
                console.error('Failed to load flow from storage:', error);
                set({ nodes: defaultNodes, edges: defaultEdges });
            }
        } else {
            // If no saved data, use defaults
            set({ nodes: defaultNodes, edges: defaultEdges });
        }
    },
}));

// Helper function to save to localStorage
const saveToLocalStorage = (data) => {
    try {
        localStorage.setItem('vibe-pilot-service-flow', JSON.stringify(data));
    } catch (error) {
        console.error('Failed to save flow to storage:', error);
    }
};

export default useFlowStore;
