type NodeType = {
    id: string;
    node_data: {
        title: string;
        node_type: string;
        children?: NodeType[];
        concept?: string;
        description?: string;
    };
};

export const processJson = (json: NodeType): { initialNodes: any[]; initialEdges: any[] } => {
    const initialNodes: { id: string; data: { label: string }; position: {x: number, y: number}}[] = [];
    const initialEdges: { id: string; source: string; target: string }[] = [];

    const traverse = (node: NodeType, parentId?: string) => {
        // Add the node
        initialNodes.push({ id: node.id, data: { label: node.node_data.title }, position: {x: 0, y: 0} });

        // Add an edge if there is a parent ID
        if (parentId) {
            initialEdges.push({ id: `e${parentId}-${node.id}`, source: parentId, target: node.id });
        }

        // Recursively process children if any
        if (node.node_data.children) {
            node.node_data.children.forEach((child) => traverse(child, node.id));
        }
    };

    traverse(json);

    return { initialNodes, initialEdges };
};