// BaseNode.js - Compact node with floating configuration panel

import { useState } from 'react';
import { Handle } from 'reactflow';
import {
    FiDownload,
    FiUpload,
    FiCpu,
    FiType,
    FiFilter,
    FiRefreshCw,
    FiGitMerge,
    FiGitBranch,
    FiClock,
    FiSettings,
    FiX
} from 'react-icons/fi';

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

    // State for showing configuration panel
    const [showConfig, setShowConfig] = useState(false);

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

    // Compact node styling
    const compactNodeStyle = {
        width: '140px',  // Fixed width
        height: '50px',  // Fixed height
        background: `linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 100%)`,
        border: `2px solid ${nodeColor}`,
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        cursor: 'pointer',
        ...style
    };

    const headerStyle = {
        background: nodeColor,
        padding: '8px 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',  // Center the icon
        height: '100%',  // Fill the node height
    };

    const titleStyle = {
        fontWeight: '600',
        fontSize: '12px',
        color: '#FFFFFF',
        letterSpacing: '0.2px',
        flex: 1,
    };

    const iconStyle = {
        fontSize: '16px',
        color: '#FFFFFF',
    };

    const settingsIconStyle = {
        fontSize: '14px',
        color: '#FFFFFF',
        opacity: 0.7,
        transition: 'opacity 0.2s',
    };

    // Node-specific panel sizes
    const panelSizes = {
        customInput: { width: '350px', height: '400px' },
        customOutput: { width: '350px', height: '400px' },
        llm: { width: '450px', height: '500px' },
        text: { width: '400px', height: '450px' },
        filter: { width: '380px', height: '480px' },
        transform: { width: '400px', height: '450px' },
        merge: { width: '380px', height: '420px' },
        conditional: { width: '400px', height: '460px' },
        delay: { width: '350px', height: '380px' },
    };

    const panelSize = panelSizes[data?.nodeType] || { width: '400px', height: '450px' };

    // Floating panel styling - positioned as fixed window
    const panelOverlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        zIndex: 999,  // Lower than panel
        display: showConfig ? 'block' : 'none',
    };

    const panelStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 100%)',
        border: `2px solid ${nodeColor}`,
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
        width: panelSize.width,
        maxHeight: panelSize.height,  // Changed from height to maxHeight
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1001,  // Higher than overlay
    };

    const panelHeaderStyle = {
        background: nodeColor,
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        justifyContent: 'space-between',
    };

    const panelTitleStyle = {
        fontWeight: '600',
        fontSize: '16px',
        color: '#FFFFFF',
        letterSpacing: '0.3px',
        flex: 1,
    };

    const closeButtonStyle = {
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '4px',
        color: '#FFFFFF',
        cursor: 'pointer',
        fontSize: '20px',
        padding: '6px 8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
        minWidth: '32px',
        minHeight: '32px',
    };

    const panelContentStyle = {
        padding: '16px',
        overflowY: 'auto',
        flex: 1,
        background: '#1f1f1f',  // Explicit background to prevent overlay showing through
    };

    const fieldContainerStyle = {
        marginBottom: '12px',
    };

    const labelStyle = {
        fontSize: '11px',
        color: '#B0B0B0',
        fontWeight: '500',
        display: 'block',
        marginBottom: '4px',
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
                        rows={field.rows || 3}
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
        <>
            {/* Wrapper for node + label */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Compact Node - Icon Only */}
                <div style={compactNodeStyle} onClick={() => setShowConfig(true)}>
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

                    {/* Icon Only - Centered */}
                    <div style={headerStyle}>
                        <IconComponent style={{ fontSize: '24px', color: '#FFFFFF' }} />
                    </div>
                </div>

                {/* Node Name Label - Below Box */}
                <div style={{
                    marginTop: '6px',
                    fontSize: '11px',
                    fontWeight: '500',
                    color: '#B0B0B0',
                    textAlign: 'center',
                    maxWidth: '140px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}>
                    {title}
                </div>
            </div>

            {/* Floating Configuration Panel */}
            {showConfig && (
                <>
                    {/* Backdrop Overlay */}
                    <div
                        style={panelOverlayStyle}
                        onClick={() => setShowConfig(false)}
                    />

                    {/* Configuration Panel */}
                    <div style={panelStyle}>
                        {/* Panel Header */}
                        <div style={panelHeaderStyle}>
                            <IconComponent style={{ fontSize: '20px', color: '#FFFFFF' }} />
                            <span style={panelTitleStyle}>{title} Configuration</span>
                            <button
                                style={closeButtonStyle}
                                onClick={() => setShowConfig(false)}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                                }}
                            >
                                <FiX />
                            </button>
                        </div>

                        {/* Panel Content */}
                        <div style={panelContentStyle}>
                            {customContent ? (
                                customContent(fieldValues, handleFieldChange)
                            ) : (
                                <div>
                                    {fields.map((field, index) => (
                                        <div key={field.name || index} style={fieldContainerStyle}>
                                            <label style={labelStyle}>
                                                {field.label}:
                                            </label>
                                            {renderField(field)}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Node Info */}
                            <div style={{
                                marginTop: '20px',
                                paddingTop: '16px',
                                borderTop: '1px solid #333',
                                fontSize: '10px',
                                color: '#888',
                            }}>
                                <div><strong>Node ID:</strong> {id}</div>
                                <div><strong>Type:</strong> {data?.nodeType || 'Unknown'}</div>
                                <div><strong>Connections:</strong> {handles.filter(h => h.type === 'target').length} in, {handles.filter(h => h.type === 'source').length} out</div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};
