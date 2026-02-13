// submit.js

export const SubmitButton = () => {
    const buttonStyle = {
        position: 'fixed',
        bottom: '32px',
        left: '50%',  // Center horizontally
        transform: 'translateX(-50%)',  // Offset by half width
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
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            Submit Pipeline
        </button>
    );
};
