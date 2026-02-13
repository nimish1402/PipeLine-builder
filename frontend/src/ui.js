// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { FilterNode } from './nodes/filterNode';
import { TransformNode } from './nodes/transformNode';
import { MergeNode } from './nodes/mergeNode';
import { ConditionalNode } from './nodes/conditionalNode';
import { DelayNode } from './nodes/delayNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  filter: FilterNode,
  transform: TransformNode,
  merge: MergeNode,
  conditional: ConditionalNode,
  delay: DelayNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  }

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Canvas container styling - adjusted for right sidebar and navbar
  const canvasStyle = {
    width: 'calc(100% - 80px)', // Account for 80px sidebar
    height: 'calc(100vh - 60px)', // Account for 60px navbar
    background: 'linear-gradient(135deg, #1a1a1a 0%, #252525 100%)',
  };

  // Custom edge styling
  const defaultEdgeOptions = {
    style: { stroke: '#7B68EE', strokeWidth: 2 },
    type: 'smoothstep',
    animated: true,
  };

  return (
    <>
      <div ref={reactFlowWrapper} style={canvasStyle}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType='smoothstep'
          defaultEdgeOptions={defaultEdgeOptions}
          connectionLineStyle={{ stroke: '#7B68EE', strokeWidth: 2 }}
        >
          <Background
            color="#2a2a2a"
            gap={gridSize}
            style={{ background: '#1a1a1a' }}
            variant="dots"
          />
          <Controls
            style={{
              button: {
                background: '#2a2a2a',
                border: '1px solid #404040',
                color: '#FFFFFF',
              }
            }}
          />
          <MiniMap
            nodeColor={(node) => {
              const colors = {
                customInput: '#3B82F6',
                customOutput: '#10B981',
                llm: '#8B5CF6',
                text: '#F59E0B',
                filter: '#EC4899',
                transform: '#06B6D4',
                merge: '#8B5CF6',
                conditional: '#F97316',
                delay: '#6366F1',
              };
              return colors[node.type] || '#7B68EE';
            }}
            style={{
              background: '#1a1a1a',
              border: '1px solid #404040',
            }}
            maskColor="rgba(26, 26, 26, 0.8)"
          />
        </ReactFlow>
      </div>
    </>
  )
}
