import React from "react";
import { useReactFlow } from "react-flow-renderer";
import { NodeType } from "../../types";
import DynamicLabelInput from "../DynamicLabelInput";

interface VolumeProps {
    nodeId: string;
}

const Volume: React.FC<VolumeProps> = (props) => {
    const reactFlowInstance = useReactFlow<NodeType, any>();
    const node = reactFlowInstance.getNode(props.nodeId);

    const handleOptions = (opts: Map<string, string>) => {
        reactFlowInstance.setNodes((nds) => {
            return nds.map((node) => {
                if (node.id === props.nodeId) {
                    if (node.data.volume) {
                        node.data.volume.driver_opts = opts;
                    } else {
                        node.data.volume = { driver_opts: opts };
                    }
                }
                return node;
            });
        });
    };

    const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        reactFlowInstance.setNodes((nds) => {
            return nds.map((node) => {
                if (node.id === props.nodeId) {
                    node.data = {
                        ...node.data,
                        label: e.target.value,
                    };
                }
                return node;
            });
        });
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        reactFlowInstance.setNodes((nds) => {
            return nds.map((node) => {
                if (node.id === props.nodeId) {
                    if (node.data.volume) {
                        node.data.volume.name = e.target.value;
                    } else {
                        node.data.volume = { name: e.target.value };
                    }
                }
                return node;
            });
        });
    };

    const handleDriverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        reactFlowInstance.setNodes((nds) => {
            return nds.map((node) => {
                if (node.id === props.nodeId) {
                    if (node.data.volume) {
                        node.data.volume.driver = e.target.value;
                    } else {
                        node.data.volume = { driver: e.target.value };
                    }
                }
                return node;
            });
        });
    };

    const handleExternalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        reactFlowInstance.setNodes((nds) => {
            return nds.map((node) => {
                if (node.id === props.nodeId) {
                    if (node.data.volume) {
                        node.data.volume.external = e.target.checked;
                    } else {
                        node.data.volume = { external: e.target.checked };
                    }
                }
                return node;
            });
        });
    };
    if (!node) return <div></div>;

    return (
        <div>
            <div>
                <label htmlFor="volume_label">Volume Label</label>
                <input type="text" value={node.data.label} id="volume_label" onChange={handleLabelChange} />
            </div>

            <div>
                <label htmlFor="volume_name">Volume Name</label>
                <input type="text" value={node.data.volume?.name ?? ""} id="volume_name" onChange={handleNameChange} />
            </div>

            <div>
                <label htmlFor="volume_driver">Driver</label>
                <input
                    type="text"
                    value={node.data.volume?.driver ?? ""}
                    id="volume_driver"
                    onChange={handleDriverChange}
                />
            </div>

            <div>
                <label htmlFor="volume_external">External</label>
                <input
                    type="checkbox"
                    name="external"
                    id="volume_external"
                    checked={node.data.volume?.external ?? false}
                    onChange={handleExternalChange}
                />
            </div>

            {/* TODO: add external name support */}
            <div>
                <label htmlFor="volume_driver_opts">Driver Opts</label>
                <DynamicLabelInput data={node.data.volume?.driver_opts} handleUpdatedOptions={handleOptions} />
            </div>
        </div>
    );
};

export default Volume;
