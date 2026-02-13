// outputNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const config = {
    title: 'Output',
    handles: [
      {
        type: 'target',
        position: Position.Left,
        id: `${id}-value`
      }
    ],
    fields: [
      {
        name: 'outputName',
        label: 'Name',
        type: 'text',
        defaultValue: data?.outputName || id.replace('customOutput-', 'output_')
      },
      {
        name: 'outputType',
        label: 'Type',
        type: 'select',
        defaultValue: data?.outputType || 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'Image', label: 'Image' }
        ]
      }
    ]
  };

  return <BaseNode id={id} data={data} config={config} />;
};
