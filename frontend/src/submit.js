// submit.js - Submit button with backend integration

import { useStore } from './store';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
        try {
            // Prepare pipeline data
            const pipelineData = {
                nodes: nodes.map(node => ({
                    id: node.id,
                    type: node.type,
                    data: node.data || {}
                })),
                edges: edges.map(edge => ({
                    id: edge.id,
                    source: edge.source,
                    target: edge.target
                }))
            };

            // Send to backend
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pipelineData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            // Display results in alert
            const dagStatus = result.is_dag ? '✅ Yes' : '❌ No';
            const alertMessage = `
Pipeline Analysis Results
━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Number of Nodes: ${result.num_nodes}
🔗 Number of Edges: ${result.num_edges}
${result.is_dag ? '✅' : '⚠️'} Valid DAG: ${dagStatus}

${result.is_dag
                    ? 'Your pipeline is valid and can be executed!'
                    : 'Warning: Your pipeline contains cycles and cannot be executed as a DAG.'}
            `.trim();

            alert(alertMessage);

        } catch (error) {
            console.error('Error submitting pipeline:', error);
            alert(`❌ Error submitting pipeline:\n\n${error.message}\n\nPlease ensure the backend server is running on http://localhost:8000`);
        }
    };

    const buttonStyle = {
        position: 'fixed',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '14px 32px',
        background: 'linear-gradient(135deg, #7B68EE 0%, #6366F1 100%)',
        border: 'none',
        borderRadius: '24px',
        color: '#FFFFFF',
        fontSize: '15px',
        fontWeight: '600',
        cursor: 'pointer',
        boxShadow: '0 8px 24px rgba(123, 104, 238, 0.4)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 1000,
        letterSpacing: '0.5px',
    };

    const handleMouseEnter = (e) => {
        e.target.style.transform = 'translateX(-50%) translateY(-4px) scale(1.05)';
        e.target.style.boxShadow = '0 12px 32px rgba(123, 104, 238, 0.5)';
        e.target.style.background = 'linear-gradient(135deg, #9B88FF 0%, #7B7AFF 100%)';
    };

    const handleMouseLeave = (e) => {
        e.target.style.transform = 'translateX(-50%) translateY(0) scale(1)';
        e.target.style.boxShadow = '0 8px 24px rgba(123, 104, 238, 0.4)';
        e.target.style.background = 'linear-gradient(135deg, #7B68EE 0%, #6366F1 100%)';
    };

    const handleMouseDown = (e) => {
        e.target.style.transform = 'translateX(-50%) translateY(-2px) scale(1.02)';
    };

    const handleMouseUp = (e) => {
        e.target.style.transform = 'translateX(-50%) translateY(-4px) scale(1.05)';
    };

    return (
        <button
            type="submit"
            style={buttonStyle}
            onClick={handleSubmit}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            Submit Pipeline
        </button>
    );
};
