import { useReactFlow } from "react-flow-renderer";
import Network from "./Properties/Network";
import Service from "./Properties/Service";
import Volume from "./Properties/Volume";

interface PropertiesProps extends React.HTMLAttributes<HTMLDivElement> {
   nodeId: string; 
}

const Properties: React.FC<PropertiesProps> = (props) => {
    const reactFlowInstance = useReactFlow();
    const node = reactFlowInstance.getNode(props.nodeId);

    const {nodeId, ...propertiesStyles} = props; 
    return (
        <div {...propertiesStyles}>
            Properties
            {node && node.data.nodeType === "service" && <Service nodeId={node.id} />}
            {node && node.data.nodeType === "volume" && <Volume nodeId={node.id} />}
            {node && node.data.nodeType === "network" && <Network nodeId={node.id} />}
        </div>
    );
};

export default Properties;
