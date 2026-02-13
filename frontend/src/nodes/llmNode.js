// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const config = {
    title: 'LLM',
    handles: [
      {
        type: 'target',
        position: Position.Left,
        id: `${id}-system`,
        style: { top: '33%' }
      },
      {
        type: 'target',
        position: Position.Left,
        id: `${id}-prompt`,
        style: { top: '67%' }
      },
      {
        type: 'source',
        position: Position.Right,
        id: `${id}-response`
      }
    ],
    customContent: () => (
      <div>
        <span>This is a LLM.</span>
      </div>
    )
  };

  return <BaseNode id={id} data={data} config={config} />;
};
