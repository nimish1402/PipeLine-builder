// draggableNode.js

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

export const DraggableNode = ({ type, label, iconOnly = false }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  // Node type color mapping
  const nodeColors = {
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

  const nodeColor = nodeColors[type] || '#7B68EE';
  const IconComponent = nodeIcons[type] || FiCpu;

  // Icon-only button style (for sidebar)
  const iconButtonStyle = {
    cursor: 'grab',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
    background: `linear-gradient(135deg, ${nodeColor}22 0%, ${nodeColor}11 100%)`,
    border: `1.5px solid ${nodeColor}`,
    color: '#FFFFFF',
    fontSize: '24px',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    userSelect: 'none',
    position: 'relative',
  };

  // Regular button style (for horizontal toolbar)
  const buttonStyle = {
    cursor: 'grab',
    minWidth: '90px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '20px',
    background: `linear-gradient(135deg, ${nodeColor}22 0%, ${nodeColor}11 100%)`,
    border: `1.5px solid ${nodeColor}`,
    color: '#FFFFFF',
    fontSize: '13px',
    fontWeight: '500',
    padding: '0 16px',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    userSelect: 'none',
  };

  const tooltipStyle = {
    position: 'absolute',
    right: '60px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: '#2a2a2a',
    color: '#FFFFFF',
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
    border: `1px solid ${nodeColor}`,
    opacity: 0,
    pointerEvents: 'none',
    transition: 'opacity 0.2s ease',
    zIndex: 1000,
  };

  const handleMouseEnter = (e) => {
    if (iconOnly) {
      e.currentTarget.style.transform = 'scale(1.1)';
      e.currentTarget.style.boxShadow = `0 4px 16px ${nodeColor}66`;
      e.currentTarget.style.background = `linear-gradient(135deg, ${nodeColor}33 0%, ${nodeColor}22 100%)`;
      // Show tooltip
      const tooltip = e.currentTarget.querySelector('.tooltip');
      if (tooltip) tooltip.style.opacity = '1';
    } else {
      e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
      e.currentTarget.style.boxShadow = `0 4px 12px ${nodeColor}44`;
      e.currentTarget.style.background = `linear-gradient(135deg, ${nodeColor}33 0%, ${nodeColor}22 100%)`;
    }
  };

  const handleMouseLeave = (e) => {
    if (iconOnly) {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
      e.currentTarget.style.background = `linear-gradient(135deg, ${nodeColor}22 0%, ${nodeColor}11 100%)`;
      // Hide tooltip
      const tooltip = e.currentTarget.querySelector('.tooltip');
      if (tooltip) tooltip.style.opacity = '0';
    } else {
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
      e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
      e.currentTarget.style.background = `linear-gradient(135deg, ${nodeColor}22 0%, ${nodeColor}11 100%)`;
    }
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={iconOnly ? iconButtonStyle : buttonStyle}
      draggable
    >
      {iconOnly ? (
        <>
          <IconComponent />
          <div className="tooltip" style={tooltipStyle}>{label}</div>
        </>
      ) : (
        <span>{label}</span>
      )}
    </div>
  );
};