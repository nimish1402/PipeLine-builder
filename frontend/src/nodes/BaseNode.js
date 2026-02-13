// BaseNode.js
// Reusable base component for creating nodes with minimal code duplication

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import {
    FiDownload,
    FiUpload,
    FiCpu,
    FiType,
    FiFilter,
    FiRefreshCw,
    FiGitMerge,
    FiGitBranch,
    FiClock
} from 'react-icons/fi';

/**
 * BaseNode - A flexible abstraction for creating ReactFlow nodes
 * 
 * @param {Object} props
 * @param {string} props.id - Node ID
 * @param {Object} props.data - Node data
 * @param {Object} props.config - Node configuration
 * @param {string} props.config.title - Node title
 * @param {Array} props.config.handles - Handle configurations
 * @param {Array} props.config.fields - Field configurations
 * @param {Object} props.config.style - Custom style overrides
 * @param {Function} props.config.customContent - Optional custom content renderer
 */
export const BaseNode = ({ id, data, config }) => {
    const {
        title,
        handles = [],
        fields = [],
        style = {},
        customContent
    } = config;

    // Initialize state for all fields
    const [fieldValues, setFieldValues] = useState(() => {
        const initialValues = {};
        fields.forEach(field => {
            initialValues[field.name] = field.defaultValue ?? '';
        });
        return initialValues;
    });

    // State for showing node details
    const [showDetails, setShowDetails] = useState(false);

    // Icon mapping for each node type
    const nodeIcons = {
        customInput: FiDownload,
        customOutput: FiUpload,
        llm: FiCpu,
        text: FiType,
        filter: FiFilter,
        transform: FiRefreshCw,
        merge: FiGitMerge,
        conditional: FiGitBranch,
        delay: FiClock,
    };

    const IconComponent = nodeIcons[data?.nodeType] || FiCpu;

    // Handle field value changes
    const handleFieldChange = (fieldName, value) => {
        setFieldValues(prev => ({
            ...prev,
            [fieldName]: value
        }));
    };

    // Node type color mapping
    const nodeTypeColors = {
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

    const nodeColor = nodeTypeColors[data?.nodeType] || '#7B68EE';

    // Modern node styling - adjusted for better container fit
    const defaultStyle = {
        width: '100%',  // Changed from fixed 180px to fill container
        minWidth: '200px',  // Minimum width for readability
        maxWidth: '280px',  // Maximum width to prevent too wide
        minHeight: 80,
        background: `linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 100%)`,
        border: `2px solid ${nodeColor}`,
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        ...style
    };

    const headerStyle = {
        background: nodeColor,
        padding: '6px 10px',  // Reduced from 10px 12px
        marginBottom: showDetails ? '0' : '8px',  // Reduced from 10px
        borderBottom: `1px solid ${nodeColor}`,
        display: 'flex',
        alignItems: 'center',
        gap: '6px',  // Reduced from 8px
        cursor: 'pointer',
        transition: 'all 0.2s ease',
    };

    const titleStyle = {
        fontWeight: '600',
        fontSize: '12px',  // Reduced from 14px
        color: '#FFFFFF',
        letterSpacing: '0.2px',  // Reduced from 0.3px
        flex: 1,
    };

    const iconStyle = {
        fontSize: '14px',  // Reduced from 16px
        color: '#FFFFFF',
    };

    const contentStyle = {
        padding: '0 10px 10px 10px',  // Reduced from 12px
        display: showDetails ? 'none' : 'block',
    };

    const detailsPanelStyle = {
        padding: '10px',  // Reduced from 12px
        background: '#1a1a1a',
        borderTop: '1px solid #333',
        fontSize: '11px',  // Reduced from 12px
        color: '#B0B0B0',
        maxHeight: '180px',  // Reduced from 200px
        overflowY: 'auto',
        display: showDetails ? 'block' : 'none',
    };

    const fieldContainerStyle = {
        marginBottom: '8px',  // Reduced from 10px
    };

    // Render different field types
    const renderField = (field) => {
        const value = fieldValues[field.name];

        switch (field.type) {
            case 'text':
                return (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        style={{ width: '100%', marginTop: '2px' }}
                    />
                );

            case 'number':
                return (
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        style={{ width: '100%', marginTop: '2px' }}
                        {...(field.min !== undefined && { min: field.min })}
                        {...(field.max !== undefined && { max: field.max })}
                    />
                );

            case 'select':
                return (
                    <select
                        value={value}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        style={{ width: '100%', marginTop: '2px' }}
                    >
                        {field.options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            case 'textarea':
                return (
                    <textarea
                        value={value}
                        onChange={(e) => handleFieldChange(field.name, e.target.value)}
                        style={{ width: '100%', marginTop: '2px', resize: 'vertical' }}
                        rows={field.rows || 2}
                    />
                );

            case 'checkbox':
                return (
                    <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => handleFieldChange(field.name, e.target.checked)}
                        style={{ marginTop: '2px' }}
                    />
                );

            default:
                return null;
        }
    };

    // Enhanced handle styling
    const handleStyle = {
        width: '12px',
        height: '12px',
        background: nodeColor,
        border: '2px solid #1a1a1a',
        transition: 'all 0.2s ease',
    };

    return (
        <div style={defaultStyle} className="node-container">
            {/* Render handles */}
            {handles.map((handle, index) => (
                <Handle
                    key={`${handle.type}-${handle.id || index}`}
                    type={handle.type}
                    position={handle.position}
                    id={handle.id || `${id}-${handle.type}-${index}`}
                    style={{ ...handleStyle, ...handle.style }}
                />
            ))}

            {/* Node header with icon - clickable to toggle details */}
            <div style={headerStyle} onClick={() => setShowDetails(!showDetails)}>
                <IconComponent style={iconStyle} />
                <span style={titleStyle}>{title}</span>
                <span style={{ fontSize: '12px', color: '#FFFFFF' }}>
                    {showDetails ? '▼' : '▶'}
                </span>
            </div>

            {/* Node content - hidden when details shown */}
            <div style={contentStyle}>
                {customContent ? (
                    customContent(fieldValues, handleFieldChange)
                ) : (
                    <div>
                        {fields.map((field, index) => (
                            <div key={field.name || index} style={fieldContainerStyle}>
                                <label>
                                    {field.label}:
                                    {renderField(field)}
                                </label>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Details panel - shown when clicked */}
            <div style={detailsPanelStyle}>
                <div style={{ marginBottom: '8px', fontWeight: '600', color: '#FFFFFF' }}>
                    Node Details
                </div>
                <div style={{ marginBottom: '6px' }}>
                    <strong>ID:</strong> {id}
                </div>
                <div style={{ marginBottom: '6px' }}>
                    <strong>Type:</strong> {data?.nodeType || 'Unknown'}
                </div>
                {fields.length > 0 && (
                    <>
                        <div style={{ marginTop: '10px', marginBottom: '6px', fontWeight: '600', color: '#FFFFFF' }}>
                            Configuration
                        </div>
                        {fields.map((field, index) => (
                            <div key={field.name || index} style={{ marginBottom: '4px' }}>
                                <strong>{field.label}:</strong>{' '}
                                {typeof fieldValues[field.name] === 'boolean'
                                    ? (fieldValues[field.name] ? 'Yes' : 'No')
                                    : (fieldValues[field.name] || 'Not set')}
                            </div>
                        ))}
                    </>
                )}
                {handles.length > 0 && (
                    <>
                        <div style={{ marginTop: '10px', marginBottom: '6px', fontWeight: '600', color: '#FFFFFF' }}>
                            Connections
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                            <strong>Input Handles:</strong> {handles.filter(h => h.type === 'target').length}
                        </div>
                        <div style={{ marginBottom: '4px' }}>
                            <strong>Output Handles:</strong> {handles.filter(h => h.type === 'source').length}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
