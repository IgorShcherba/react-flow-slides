import { useReactFlow, type Node, type NodeProps } from "@xyflow/react";
import { useCallback } from "react";
import { Remark } from "react-remark";

export const SLIDE_WIDTH = 1920;
export const SLIDE_HEIGHT = 1080;
export const SLIDE_PADDING = 100;

export type SlideNode = Node<SlideData, "slide">;

export type SlideData = {
  source: string;
  left?: string;
  right?: string;
  up?: string;
  down?: string;
};

const style = {
  width: `${SLIDE_WIDTH}px`,
  height: `${SLIDE_HEIGHT}px`,
} satisfies React.CSSProperties;

export function Slide({ data }: NodeProps<SlideNode>) {
  const { fitView } = useReactFlow();
  const moveToNextSlide = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      console.log("Moving to slide", id);
      fitView({ nodes: [{ id }], duration: 500 });
    },
    [fitView]
  );
  return (
    <article
      className="relative  bg-red-100 shadow-2xl font-bold text-5xl p-4 no-drag "
      style={style}
    >
      <Remark>{data.source}</Remark>

      <footer className="h-20 nopan absolute bottom-0 right-0">
        {data.left ? (
          <button
            className="cursor-pointer p-3 border rounded-l border-black"
            onClick={(e) => moveToNextSlide(e, data.left!)}
          >
            ←
          </button>
        ) : null}
        {data.right ? (
          <button
            className="cursor-pointer p-3 border rounded-l border-black"
            onClick={(e) => moveToNextSlide(e, data.right!)}
          >
            →
          </button>
        ) : null}
        {data.up ? (
          <button
            className="cursor-pointer p-3 border rounded-l border-black"
            onClick={(e) => moveToNextSlide(e, data.up!)}
          >
            ↑
          </button>
        ) : null}
        {data.down ? (
          <button
            className="cursor-pointer p-3 border rounded-l border-black"
            onClick={(e) => moveToNextSlide(e, data.down!)}
          >
            ↓
          </button>
        ) : null}
      </footer>
    </article>
  );
}
