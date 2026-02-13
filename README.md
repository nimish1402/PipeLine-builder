# Pipeline Builder

A modern, visual workflow builder with drag-and-drop nodes, real-time validation, and backend integration. Built with React Flow and FastAPI.

![Pipeline Builder](https://img.shields.io/badge/React-18.x-blue) ![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green) ![License](https://img.shields.io/badge/license-MIT-blue)

## 🌟 Features

### Visual Pipeline Builder
- **Drag-and-Drop Interface** - Intuitive node placement from sidebar
- **Compact Node Design** - Icon-only nodes (140×50px) with labels below
- **Real-time Connections** - Smooth animated edges with arrow markers
- **Multiple Node Types** - Input, Output, LLM, Text, Filter, Transform, Merge, Conditional, Delay

### Interactive Configuration
- **Click-to-Configure** - Floating panels open on node click
- **Node-Specific Panels** - Custom sizes and fields for each node type
- **Auto-sizing Panels** - Panels adapt to content (max 600px height)
- **Scrollable Content** - Smooth scrolling for large configurations

### Backend Integration
- **DAG Validation** - Kahn's algorithm detects cycles in pipelines
- **Real-time Analysis** - Instant feedback on node/edge counts
- **Type-Safe API** - Pydantic models ensure data integrity
- **CORS Enabled** - Seamless frontend-backend communication

### Modern UI/UX
- **n8n-Inspired Design** - Dark theme with vibrant node colors
- **Smooth Animations** - Hover effects and transitions
- **Responsive Layout** - Top navbar, floating sidebar, centered submit button
- **User-Friendly Alerts** - Formatted results with emojis and clear messaging

---

## 🏗️ Architecture

```
pipeline-builder/
├── frontend/               # React + React Flow
│   ├── src/
│   │   ├── nodes/         # Node components
│   │   │   ├── BaseNode.js        # Compact node with floating panel
│   │   │   ├── inputNode.js       # Input node
│   │   │   ├── outputNode.js      # Output node
│   │   │   ├── llmNode.js         # LLM node
│   │   │   ├── textNode.js        # Text node
│   │   │   ├── filterNode.js      # Filter node
│   │   │   ├── transformNode.js   # Transform node
│   │   │   ├── mergeNode.js       # Merge node
│   │   │   ├── conditionalNode.js # Conditional node
│   │   │   └── delayNode.js       # Delay node
│   │   ├── ui.js          # Main React Flow canvas
│   │   ├── toolbar.js     # Node sidebar
│   │   ├── submit.js      # Submit button with API integration
│   │   ├── navbar.js      # Top navigation bar
│   │   ├── store.js       # Zustand state management
│   │   └── App.js         # Main app component
│   └── package.json
│
└── backend/               # FastAPI
    ├── main.py           # API endpoints + DAG validation
    └── requirements.txt
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 16+ and npm
- **Python** 3.8+
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nimish1402/PipeLine-builder.git
   cd PipeLine-builder
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   pip install -r requirements.txt
   ```

### Running the Application

#### Start Backend (Terminal 1)
```bash
cd backend
uvicorn main:app --reload
```
Backend runs on: `http://localhost:8000`

#### Start Frontend (Terminal 2)
```bash
cd frontend
npm start
```
Frontend runs on: `http://localhost:3000`

---

## 📖 Usage

### Creating a Pipeline

1. **Add Nodes**
   - Drag nodes from the right sidebar onto the canvas
   - Each node appears as a compact icon with a label below

2. **Connect Nodes**
   - Click and drag from a node's output handle (right side)
   - Connect to another node's input handle (left side)
   - Edges are animated with arrow markers

3. **Configure Nodes**
   - Click any node to open its configuration panel
   - Panel appears centered with node-specific fields
   - Click X button or outside panel to close

4. **Submit Pipeline**
   - Click "Submit Pipeline" button at bottom center
   - Backend validates the pipeline structure
   - Alert displays results:
     - Number of nodes
     - Number of edges
     - Whether it forms a valid DAG

### Example Pipeline

```
Input → LLM → Filter → Transform → Output
```

**Expected Result:**
```
Pipeline Analysis Results
━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Number of Nodes: 5
🔗 Number of Edges: 4
✅ Valid DAG: ✅ Yes

Your pipeline is valid and can be executed!
```

---

## 🎨 Node Types

| Icon | Type | Description | Configuration |
|------|------|-------------|---------------|
| 📥 | Input | Data input source | Name, Type |
| 📤 | Output | Data output destination | Name, Type |
| 🤖 | LLM | Language model processing | Model, Temperature, Max Tokens |
| 📝 | Text | Static text or templates | Text content |
| 🔍 | Filter | Filter data by conditions | Filter Type, Condition, Threshold |
| 🔄 | Transform | Transform data | Operation, Custom Regex |
| 🔀 | Merge | Merge multiple inputs | Strategy, Delimiter |
| 🔀 | Conditional | Conditional branching | Condition, Value, Operator |
| ⏱️ | Delay | Add time delay | Duration |

---

## 🔧 API Reference

### POST `/pipelines/parse`

Validates pipeline structure and returns analysis.

**Request Body:**
```json
{
  "nodes": [
    {
      "id": "customInput-1",
      "type": "customInput",
      "data": {}
    }
  ],
  "edges": [
    {
      "id": "edge-1",
      "source": "customInput-1",
      "target": "llm-1"
    }
  ]
}
```

**Response:**
```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true
}
```

---

## 🧪 DAG Validation

The backend uses **Kahn's Algorithm** (topological sort) to detect cycles:

1. Calculate in-degree for each node
2. Start with nodes having in-degree 0
3. Process nodes and reduce neighbor in-degrees
4. If all nodes processed → Valid DAG ✅
5. If nodes remain → Cycle detected ❌

**Valid DAG Example:**
```
A → B → C
```

**Invalid (Cycle) Example:**
```
A → B → C
↑       ↓
└───────┘
```

---

## 🎯 Key Features Explained

### Compact Node Design
- **Size:** 140px × 50px (uniform across all types)
- **Display:** Icon only inside box
- **Label:** Node name below box
- **Clickable:** Entire node opens configuration panel

### Floating Configuration Panels
- **Position:** Centered on screen
- **Size:** Node-specific (350px-450px width, 380px-500px max height)
- **Content:** Auto-sizing based on fields
- **Close:** X button or click outside

### Backend Integration
- **CORS:** Enabled for localhost:3000
- **Type Safety:** Pydantic models
- **Validation:** Real-time DAG checking
- **Error Handling:** Graceful error messages

---

## 🛠️ Tech Stack

### Frontend
- **React** 18.x - UI framework
- **React Flow** - Node-based interface
- **Zustand** - State management
- **React Icons** - Icon library

### Backend
- **FastAPI** - Modern Python API framework
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

---

## 📁 Project Structure

```
frontend/src/
├── nodes/          # All node components
├── ui.js          # React Flow canvas
├── toolbar.js     # Draggable node sidebar
├── submit.js      # Submit button + API call
├── navbar.js      # Top navigation
├── store.js       # Zustand store
└── App.js         # Main component

backend/
└── main.py        # FastAPI app + DAG validation
```

---

## 🚧 Future Enhancements

- [ ] Loading state during API calls
- [ ] Replace alert with custom modal
- [ ] Show which nodes form cycles
- [ ] Highlight problematic connections
- [ ] Save/load pipelines
- [ ] Execute valid pipelines
- [ ] Undo/redo functionality
- [ ] Export pipeline as JSON
- [ ] Import pipeline from JSON
- [ ] Keyboard shortcuts

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 👤 Author

**Nimish**
- GitHub: [@nimish1402](https://github.com/nimish1402)
- Repository: [PipeLine-builder](https://github.com/nimish1402/PipeLine-builder)

---

## 🙏 Acknowledgments

- Inspired by [n8n](https://n8n.io/) workflow automation
- Built with [React Flow](https://reactflow.dev/)
- Powered by [FastAPI](https://fastapi.tiangolo.com/)

---

## 📸 Screenshots

### Main Interface
Compact nodes with icon-only display and floating sidebar.

### Configuration Panel
Click any node to open its configuration panel with custom fields.

### Pipeline Validation
Submit button triggers backend validation and displays results.

---

## 🐛 Known Issues

- Browser-based testing currently unavailable due to environment configuration
- Manual testing recommended for full verification

---

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Made with ❤️ using React Flow and FastAPI**
