import { NodeType, Service as ServiceType } from "../../types";
import { Node, useReactFlow } from "react-flow-renderer";
import React, { useState } from "react";
import NestedForm from "../NestedForm";

interface ServiceProps {
    nodeId: string;
}

const Service: React.FC<ServiceProps> = (props) => {
    const reactFlowInstance = useReactFlow<NodeType, any>();
    const node = reactFlowInstance.getNode(props.nodeId);
    if (!node) {
        return <div></div>;
    }

    const {nodeType, ...nodeData} = node.data;
    return (
        <div>
            <NestedForm data={nodeData} handleStateChange={(new_state) => {
                reactFlowInstance.setNodes((nds) => {
                    return nds.map((node) => {
                        if(node.id === props.nodeId){
                            node.data = {...new_state, nodeType};
                        }
                        return node;
                    })
                })
            }} />
        </div>
    );
};

export default Service;
