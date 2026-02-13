// inputNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const config = {
    title: 'Input',
    handles: [
      {
        type: 'source',
        position: Position.Right,
        id: `${id}-value`
      }
    ],
    fields: [
      {
        name: 'inputName',
        label: 'Name',
        type: 'text',
        defaultValue: data?.inputName || id.replace('customInput-', 'input_')
      },
      {
        name: 'inputType',
        label: 'Type',
        type: 'select',
        defaultValue: data?.inputType || 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'File' }
        ]
      }
    ]
  };

  return <BaseNode id={id} data={data} config={config} />;
};
