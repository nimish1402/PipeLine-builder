from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import defaultdict, deque

app = FastAPI()

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request/response
class Node(BaseModel):
    id: str
    type: str
    data: Dict[str, Any] = {}

class Edge(BaseModel):
    id: str
    source: str
    target: str

class PipelineData(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """
    Check if the pipeline forms a Directed Acyclic Graph (DAG)
    using Kahn's algorithm (topological sort with in-degree counting)
    """
    if not nodes:
        return True  # Empty graph is a DAG
    
    # Build adjacency list and calculate in-degrees
    adjacency = defaultdict(list)
    in_degree = defaultdict(int)
    
    # Initialize all nodes with in-degree 0
    node_ids = {node.id for node in nodes}
    for node_id in node_ids:
        in_degree[node_id] = 0
    
    # Build graph
    for edge in edges:
        adjacency[edge.source].append(edge.target)
        in_degree[edge.target] += 1
    
    # Find all nodes with in-degree 0
    queue = deque([node_id for node_id in node_ids if in_degree[node_id] == 0])
    processed_count = 0
    
    # Process nodes with in-degree 0
    while queue:
        current = queue.popleft()
        processed_count += 1
        
        # Reduce in-degree for neighbors
        for neighbor in adjacency[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # If all nodes were processed, it's a DAG
    # If some nodes remain, there's a cycle
    return processed_count == len(node_ids)

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineData) -> PipelineResponse:
    """
    Parse pipeline and return analysis:
    - Number of nodes
    - Number of edges
    - Whether it forms a DAG
    """
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag_result = is_dag(pipeline.nodes, pipeline.edges)
    
    return PipelineResponse(
        num_nodes=num_nodes,
        num_edges=num_edges,
        is_dag=is_dag_result
    )
