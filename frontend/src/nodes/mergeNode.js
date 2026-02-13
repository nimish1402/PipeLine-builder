// mergeNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const MergeNode = ({ id, data }) => {
    const config = {
        title: 'Merge',
        handles: [
            {
                type: 'target',
                position: Position.Left,
                id: `${id}-input1`,
                style: { top: '25%' }
            },
            {
                type: 'target',
                position: Position.Left,
                id: `${id}-input2`,
                style: { top: '50%' }
            },
            {
                type: 'target',
                position: Position.Left,
                id: `${id}-input3`,
                style: { top: '75%' }
            },
            {
                type: 'source',
                position: Position.Right,
                id: `${id}-output`
            }
        ],
        fields: [
            {
                name: 'strategy',
                label: 'Strategy',
                type: 'select',
                defaultValue: 'concatenate',
                options: [
                    { value: 'concatenate', label: 'Concatenate' },
                    { value: 'interleave', label: 'Interleave' },
                    { value: 'custom', label: 'Custom' }
                ]
            },
            {
                name: 'delimiter',
                label: 'Delimiter',
                type: 'text',
                defaultValue: ', '
            }
        ],
        style: {
            height: 110
        }
    };

    return <BaseNode id={id} data={data} config={config} />;
};
