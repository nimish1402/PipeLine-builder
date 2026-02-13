// filterNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
    const config = {
        title: 'Filter',
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
                name: 'filterType',
                label: 'Filter Type',
                type: 'select',
                defaultValue: 'contains',
                options: [
                    { value: 'contains', label: 'Contains' },
                    { value: 'equals', label: 'Equals' },
                    { value: 'startsWith', label: 'Starts With' },
                    { value: 'endsWith', label: 'Ends With' }
                ]
            },
            {
                name: 'condition',
                label: 'Condition',
                type: 'select',
                defaultValue: 'include',
                options: [
                    { value: 'include', label: 'Include' },
                    { value: 'exclude', label: 'Exclude' }
                ]
            },
            {
                name: 'threshold',
                label: 'Threshold',
                type: 'number',
                defaultValue: 0,
                min: 0
            }
        ],
        style: {
            height: 140
        }
    };

    return <BaseNode id={id} data={data} config={config} />;
};
