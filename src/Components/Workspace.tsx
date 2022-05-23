import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
    addEdge,
    Connection,
    Controls,
    MiniMap,
    OnConnect,
    ReactFlowInstance,
    ReactFlowProvider,
    useEdgesState,
    useNodesState,
    Node,
} from "react-flow-renderer";
import { Sidebar } from "./Sidebar";
import WorkspaceStyles from "../styles/workspace.module.scss";
import Properties from "./Properties";
import { Network, Service, Volume } from "../types";
import { v4 as uuidv4 } from "uuid";

interface NodeType {
    nodeType: string;
    label: string;
    service?: Service;
    network?: Network;
    volume?: Volume;
}

const Workspace = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState<NodeType>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
    const reactFlowWrapperRef = useRef<HTMLDivElement>(null);
    const [activeNodeId, setActiveNodeId] = useState<string>("");

    const onInit = useCallback((reactFlowInstance: ReactFlowInstance) => {
        setReactFlowInstance(reactFlowInstance);
        console.log("React Flow institated", reactFlowInstance);
    }, []);

    const onConnect: OnConnect | undefined = useCallback(
        (connection: Connection) => setEdges((edgs) => addEdge(connection, edgs)),
        []
    );

    const onDrop: React.DragEventHandler<HTMLDivElement> | undefined = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();

            if (!reactFlowWrapperRef || !reactFlowWrapperRef.current || !reactFlowInstance) {
                return;
            }

            const reactFlowBounds = reactFlowWrapperRef.current.getBoundingClientRect();
            const nodeType = event.dataTransfer.getData("application/reactflow");
            if (typeof nodeType === "undefined" || !nodeType) {
                return;
            }

            // TODO: update the drop location logic
            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });

            let nodeId = uuidv4();
            const newNode: Node<NodeType> = {
                id: nodeId,
                position,
                data: {
                    nodeType,
                    label: `${nodeType} ${nodeId}`,
                },
            };

            if (nodeType === "service") {
                newNode.data.service = {
                    container_name: "",
                    expose: [],
                    build: "",
                    image: "",
                    depends_on: [],
                    networks: [],
                    volumes: new Map()
                };
            }
            setNodes((nds) => nds.concat(newNode));
            setActiveNodeId(newNode.id);
        },
        [reactFlowInstance]
    );

    const onDragOver: React.DragEventHandler<HTMLDivElement> | undefined = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = "move";
        },
        []
    );

    const onNodeClick = (event: React.MouseEvent<Element, MouseEvent>, node: any) => {};

    const generateCompose = () => {
        let dockerCompose: {
            services: Service[];
            volumes: Volume[];
            networks: Network[];
        } = { services: [], volumes: [], networks: [] };

        console.log(nodes);
        nodes.forEach((node) => {
            if (node.data.nodeType === "service") {
                if (node.data.service) {
                    dockerCompose.services.push({ [node.data.label]: node.data.service });
                } else {
                    dockerCompose.services.push({
                        [node.data.label]: {},
                    });
                }
            }
            if (node.data.nodeType === "volume") {
                if (node.data.volume) {
                    dockerCompose.volumes.push({ [node.data.label]: node.data.volume });
                } else {
                    dockerCompose.volumes.push({
                        [node.data.label]: {},
                    });
                }
            }
            if (node.data.nodeType === "network") {
                if (node.data.network) {
                    dockerCompose.networks.push({ [node.data.label]: node.data.network });
                } else {
                    dockerCompose.networks.push({
                        [node.data.label]: {},
                    });
                }
            }
        });

        console.log(dockerCompose);
    };
    return (
        <div className={WorkspaceStyles.container}>
            <button onClick={generateCompose}>Generate</button>
            <ReactFlowProvider>
                <Sidebar className={WorkspaceStyles.sidebar} />
                <div ref={reactFlowWrapperRef} className={WorkspaceStyles.workspace}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onInit={onInit}
                        onConnect={onConnect}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onNodeClick={(event, node: Node<NodeType>) => setActiveNodeId(node.id)}
                        onNodeDragStop={(event, node: Node<NodeType>) => setActiveNodeId(node.id)}
                    >
                        <MiniMap />
                        <Controls />
                    </ReactFlow>
                </div>
                <Properties className={WorkspaceStyles.properties} nodeId={activeNodeId} />
            </ReactFlowProvider>
        </div>
    );
};

export default Workspace;
