import React from "react";
import { useReactFlow } from "react-flow-renderer";
import { NodeType } from "../../types";
import DynamicLabelInput from "../DynamicLabelInput";

interface NetworkProps {
    nodeId: string;
}

const Network: React.FC<NetworkProps> = (props) => {
    const reactFlowInstance = useReactFlow<NodeType, any>();
    const node = reactFlowInstance.getNode(props.nodeId);

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
                    if (node.data.network) {
                        node.data.network.name = e.target.value;
                    } else {
                        node.data.network = { name: e.target.value };
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
                    if (node.data.network) {
                        node.data.network.driver = e.target.value;
                    } else {
                        node.data.network = { driver: e.target.value };
                    }
                }
                return node;
            });
        });
    };
    const handleOptions = (opts: Map<string, string>) => {
        reactFlowInstance.setNodes((nds) => {
            return nds.map((node) => {
                if (node.id === props.nodeId) {
                    if (node.data.network) {
                        node.data.network.driver_opts = opts;
                    } else {
                        node.data.network = { driver_opts: opts };
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
                    if (node.data.network) {
                        node.data.network.external = e.target.checked;
                    } else {
                        node.data.network = { external: e.target.checked };
                    }
                }
                return node;
            });
        });
    };
    const handleAttachableChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        reactFlowInstance.setNodes((nds) => {
            return nds.map((node) => {
                if (node.id === props.nodeId) {
                    if (node.data.network) {
                        node.data.network.attachable = e.target.checked;
                    } else {
                        node.data.network = { attachable: e.target.checked };
                    }
                }
                return node;
            });
        });
    };
    const handleEnableIPv6Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        reactFlowInstance.setNodes((nds) => {
            return nds.map((node) => {
                if (node.id === props.nodeId) {
                    if (node.data.network) {
                        node.data.network.enable_ipv6 = e.target.checked;
                    } else {
                        node.data.network = { enable_ipv6: e.target.checked };
                    }
                }
                return node;
            });
        });
    };
    const handleInternalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        reactFlowInstance.setNodes((nds) => {
            return nds.map((node) => {
                if (node.id === props.nodeId) {
                    if (node.data.network) {
                        node.data.network.internal = e.target.checked;
                    } else {
                        node.data.network = { internal: e.target.checked };
                    }
                }
                return node;
            });
        });
    };
    const handleLabels = (opts: Map<string, string>) => {
        reactFlowInstance.setNodes((nds) => {
            return nds.map((node) => {
                if (node.id === props.nodeId) {
                    if (node.data.network) {
                        node.data.network.labels = opts;
                    } else {
                        node.data.network = { labels: opts };
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
                <label htmlFor="network_label">Network Label</label>
                <input type="text" value={node.data.label} id="network_label" onChange={handleLabelChange} />
            </div>
            <div>
                <label htmlFor="network_name">Network Name</label>
                <input type="text" value={node.data.network?.name ?? ""} id="network_name" onChange={handleNameChange} />
            </div>
            <div>
                <label htmlFor="network_driver">Driver</label>
                <input
                    type="text"
                    value={node.data.network?.driver ?? ""}
                    id="volume_driver"
                    onChange={handleDriverChange}
                />
            </div>
            <div>
                <label htmlFor="network_driver_opts">Driver Opts</label>
                <DynamicLabelInput data={node.data.network?.driver_opts} handleUpdatedOptions={handleOptions} />
            </div>
            <div>
                <label htmlFor="network_external">External</label>
                <input
                    type="checkbox"
                    name="external"
                    id="network_external"
                    checked={node.data.network?.external ?? false}
                    onChange={handleExternalChange}
                />
            </div>
            <div>
                <label htmlFor="network_attachable">Attachable</label>
                <input
                    type="checkbox"
                    name="attachable"
                    id="network_attachable"
                    checked={node.data.network?.attachable ?? false}
                    onChange={handleAttachableChange}
                />
            </div>
            <div>
                <label htmlFor="network_enable_ipv6">Enable IPv6</label>
                <input
                    type="checkbox"
                    name="enable_ipv6"
                    id="network_enable_ipv6"
                    checked={node.data.network?.enable_ipv6 ?? false}
                    onChange={handleEnableIPv6Change}
                />
            </div>
            <div>
                <label htmlFor="network_internal">Internal</label>
                <input
                    type="checkbox"
                    name="internal"
                    id="network_internal"
                    checked={node.data.network?.internal ?? false}
                    onChange={handleInternalChange}
                />
            </div>
            <div>
                <label htmlFor="network_labels">Labels</label>
                <DynamicLabelInput data={node.data.network?.labels} handleUpdatedOptions={handleLabels} />
            </div>

          {/* TODO: Implement IPAM configuration */}
        </div>
    );
};

export default Network;
