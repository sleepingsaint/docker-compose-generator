export const Sidebar: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = "move";
  }

  return (
    <div {...props}>
      <div onDragStart={(event) => onDragStart(event, "service")} draggable>Service</div>
      <div onDragStart={(event) => onDragStart(event, "volume")} draggable>Volume</div>
      <div onDragStart={(event) => onDragStart(event, "network")} draggable>Network</div>
    </div>
  )
}
