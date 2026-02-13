// navbar.js - Top Navigation Bar

export const Navbar = () => {
    const navbarStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        background: 'linear-gradient(135deg, rgba(42, 42, 42, 0.98) 0%, rgba(26, 26, 26, 0.98) 100%)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        zIndex: 200,
    };

    const logoStyle = {
        fontSize: '20px',
        fontWeight: '700',
        background: 'linear-gradient(135deg, #7B68EE 0%, #6366F1 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '0.5px',
    };

    const saveButtonStyle = {
        padding: '10px 24px',
        background: 'linear-gradient(135deg, #7B68EE 0%, #6366F1 100%)',
        border: 'none',
        borderRadius: '8px',
        color: '#FFFFFF',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(123, 104, 238, 0.3)',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        letterSpacing: '0.3px',
    };

    const handleMouseEnter = (e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 6px 16px rgba(123, 104, 238, 0.4)';
        e.target.style.background = 'linear-gradient(135deg, #9B88FF 0%, #7B7AFF 100%)';
    };

    const handleMouseLeave = (e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 4px 12px rgba(123, 104, 238, 0.3)';
        e.target.style.background = 'linear-gradient(135deg, #7B68EE 0%, #6366F1 100%)';
    };

    const handleSaveWorkflow = () => {
        console.log('Save Workflow clicked');
        // TODO: Implement save workflow functionality
    };

    return (
        <nav style={navbarStyle}>
            <div style={logoStyle}>Pipeline Builder</div>
            <button
                style={saveButtonStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleSaveWorkflow}
            >
                Save Workflow
            </button>
        </nav>
    );
};
