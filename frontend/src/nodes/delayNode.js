// delayNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const DelayNode = ({ id, data }) => {
    const config = {
        title: 'Delay',
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
                name: 'delayAmount',
                label: 'Delay',
                type: 'number',
                defaultValue: 1000,
                min: 0
            },
            {
                name: 'unit',
                label: 'Unit',
                type: 'select',
                defaultValue: 'ms',
                options: [
                    { value: 'ms', label: 'Milliseconds' },
                    { value: 'seconds', label: 'Seconds' },
                    { value: 'minutes', label: 'Minutes' }
                ]
            },
            {
                name: 'enabled',
                label: 'Enabled',
                type: 'checkbox',
                defaultValue: true
            }
        ],
        style: {
            height: 140
        }
    };

    return <BaseNode id={id} data={data} config={config} />;
};
