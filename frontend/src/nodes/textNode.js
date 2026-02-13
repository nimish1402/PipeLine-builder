// textNode.js - Text Node using BaseNode with variable detection

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const config = {
    title: 'Text',
    handles: [
      {
        type: 'source',
        position: Position.Right,
        id: `${id}-output`
      }
    ],
    fields: [
      {
        name: 'text',
        label: 'Text',
        type: 'textarea',
        rows: 4,
        defaultValue: data?.text || '{{input}}'
      }
    ]
  };

  return <BaseNode id={id} data={data} config={config} />;
};
