/* eslint-disable no-case-declarations */
import {
  Background,
  BackgroundVariant,
  NodeMouseHandler,
  ReactFlow,
  useReactFlow,
} from "@xyflow/react";
import { Slide, SlideData } from "./components/slide";
import { slides, slidesToElements } from "./slides";
import { KeyboardEventHandler, useCallback, useState } from "react";

const nodeTypes = {
  slide: Slide,
};

const { nodes, edges } = slidesToElements("0", slides);
const initialSlide = "01";
export default function App() {
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const { fitView } = useReactFlow();

  const handleNodeClick: NodeMouseHandler = useCallback(
    (_event, node) => {
      if (node.id !== currentSlide) {
        setCurrentSlide(node.id);
        fitView({ nodes: [{ id: node.id }], duration: 100 });
      }
    },
    [fitView, currentSlide]
  );

  const handleKeyPress = useCallback<KeyboardEventHandler>(
    (event) => {
      console.log("Key pressed", event.key);
      const slide = slides[currentSlide];

      switch (event.key) {
        case "ArrowLeft":
        case "ArrowUp":
        case "ArrowDown":
        case "ArrowRight": {
          const direction = event.key.slice(5).toLowerCase() as keyof SlideData;
          const target = slide[direction];

          // Prevent the arrow keys from scrolling the page when React Flow is
          // only part of a larger application.
          event.preventDefault();

          if (target) {
            setCurrentSlide(target);
            fitView({ nodes: [{ id: target }], duration: 100 });
          }
        }
      }
    },
    [fitView, currentSlide]
  );

  return (
    <ReactFlow
      nodes={nodes}
      nodeTypes={nodeTypes}
      nodesDraggable={false}
      edges={edges}
      fitView
      fitViewOptions={{ nodes: [{ id: initialSlide }], duration: 100 }}
      minZoom={0.1}
      onKeyDown={handleKeyPress}
      onNodeClick={handleNodeClick}
    >
      <Background color="#f2f2f2" variant={BackgroundVariant.Lines} />
    </ReactFlow>
  );
}
