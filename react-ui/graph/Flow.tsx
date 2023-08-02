import React, { useCallback, useRef } from 'react';
import { test_node } from './conversations/test.js'
import { processJson } from './Node';

import ReactFlow, {
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';

// const initialNodes = exploration_chat.map((message, index) => {
//   return {
//     id: index.toString(),
//     data : { label: message.content },
//     position : { x: 0 + index % 2 * 210, y: index * 200}
//   } 
// })

// console.log(initialNodes)

// const initialNodes = [
//     { id: '1', data: { label: '1' } , position: { x: 250, y: 5 }},
//     { id: '2', data: { label: '2' } , position: { x: 250, y: 5 }},
// ];

// const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

let {initialEdges, initialNodes} = processJson(test_node)
function Flow() {
    console.log(initialNodes)
    // console.log(initialEdges)
    
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    return (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          // onConnect={onConnect}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      );
      
}

export default Flow;