// conditionalNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ConditionalNode = ({ id, data }) => {
    const config = {
        title: 'Conditional',
        handles: [
            {
                type: 'target',
                position: Position.Left,
                id: `${id}-input`
            },
            {
                type: 'source',
                position: Position.Right,
                id: `${id}-true`,
                style: { top: '35%' }
            },
            {
                type: 'source',
                position: Position.Right,
                id: `${id}-false`,
                style: { top: '65%' }
            }
        ],
        fields: [
            {
                name: 'conditionType',
                label: 'Condition',
                type: 'select',
                defaultValue: 'equals',
                options: [
                    { value: 'equals', label: 'Equals' },
                    { value: 'notEquals', label: 'Not Equals' },
                    { value: 'greaterThan', label: 'Greater Than' },
                    { value: 'lessThan', label: 'Less Than' }
                ]
            },
            {
                name: 'comparisonValue',
                label: 'Value',
                type: 'text',
                defaultValue: ''
            },
            {
                name: 'operator',
                label: 'Operator',
                type: 'select',
                defaultValue: 'and',
                options: [
                    { value: 'and', label: 'AND' },
                    { value: 'or', label: 'OR' }
                ]
            }
        ],
        style: {
            height: 140
        }
    };

    return <BaseNode id={id} data={data} config={config} />;
};
