// transformNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
    const config = {
        title: 'Transform',
        handles: [
            {
                type: 'target',
                position: Position.Left,
                id: `${id}-input`
            },
            {
                type: 'source',
                position: Position.Right,
                id: `${id}-output`
            }
        ],
        fields: [
            {
                name: 'operation',
                label: 'Operation',
                type: 'select',
                defaultValue: 'uppercase',
                options: [
                    { value: 'uppercase', label: 'Uppercase' },
                    { value: 'lowercase', label: 'Lowercase' },
                    { value: 'reverse', label: 'Reverse' },
                    { value: 'trim', label: 'Trim' }
                ]
            },
            {
                name: 'customRegex',
                label: 'Custom Regex',
                type: 'text',
                defaultValue: ''
            }
        ],
        style: {
            height: 110
        }
    };

    return <BaseNode id={id} data={data} config={config} />;
};
