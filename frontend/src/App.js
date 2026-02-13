import { Navbar } from './navbar';
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  const appStyle = {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
    width: '100vw',
    background: 'linear-gradient(135deg, #1a1a1a 0%, #252525 100%)',
    overflow: 'hidden',
    paddingTop: '60px',  // Space for navbar
  };

  return (
    <>
      <Navbar />
      <div style={appStyle}>
        <PipelineUI />
        <PipelineToolbar />
        <SubmitButton />
      </div>
    </>
  );
}

export default App;
