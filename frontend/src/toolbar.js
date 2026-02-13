// toolbar.js - Floating Right Sidebar with Icon-Only Nodes

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    const sidebarStyle = {
        position: 'fixed',
        right: '20px',  // Float with margin from edge
        top: '80px',  // Below navbar with margin
        width: '80px',
        background: 'linear-gradient(180deg, rgba(42, 42, 42, 0.95) 0%, rgba(26, 26, 26, 0.95) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',  // Rounded corners for floating effect
        padding: '20px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',  // Stronger shadow for floating
        zIndex: 100,
        maxHeight: 'calc(100vh - 120px)',  // Prevent overflow with margin
        overflowY: 'auto',
    };

    return (
        <div style={sidebarStyle}>
            <DraggableNode type='customInput' label='Input' iconOnly={true} />
            <DraggableNode type='customOutput' label='Output' iconOnly={true} />
            <DraggableNode type='llm' label='LLM' iconOnly={true} />
            <DraggableNode type='text' label='Text' iconOnly={true} />
            <DraggableNode type='filter' label='Filter' iconOnly={true} />
            <DraggableNode type='transform' label='Transform' iconOnly={true} />
            <DraggableNode type='merge' label='Merge' iconOnly={true} />
            <DraggableNode type='conditional' label='Conditional' iconOnly={true} />
            <DraggableNode type='delay' label='Delay' iconOnly={true} />
        </div>
    );
};
