import { type Node } from "@xyflow/react";
import {
  SlideData,
  SLIDE_WIDTH,
  SLIDE_HEIGHT,
  SLIDE_PADDING,
} from "./components/slide";

const slide01 = {
  id: "01",
  data: {
    right: "02",
    source: `
# Slide 1
 
- This is the first slide
- It has a right arrow to go to the next slide
`,
  },
};

const slide02 = {
  id: "02",
  data: {
    left: "01",
    up: "03",
    right: "04",
    source: `
# Slide 2
 
- This is the second slide
- It has a left arrow to go back to the first slide
- It has an up arrow to go to the third slide
- It has a right arrow to go to the fourth slide
`,
  },
};

const slide03 = {
  id: "03",
  data: {
    down: "02",
    source: `
# Slide 3
 
- This is the third slide
- It has a down arrow to go back to the second slide
`,
  },
};

const slide04 = {
  id: "04",
  data: {
    left: "02",
    source: `
# Slide 4
 
- This is the fourth slide
- It has a left arrow to go back to the second slide
`,
  },
};

export const slides = [slide01, slide02, slide03, slide04].reduce(
  (slides, { id, data }) => ({ ...slides, [id]: data }),
  {}
) satisfies Record<string, SlideData>;

export const slidesToElements = (
  initial: string,
  slides: Record<string, SlideData>
) => {
  const start = Object.keys(slides)[0];
  const stack = [{ id: start, position: { x: 0, y: 0 } }];
  const visited = new Set();
  const nodes = [];
  const edges = [];

  while (stack.length) {
    const { id, position } = stack.pop()!;
    const slide = slides[id];
    const node = {
      id,
      type: "slide",
      position,
      data: slide,
      draggable: false,
    } satisfies Node<SlideData>;

    if (slide.left && !visited.has(slide.left)) {
      const nextPosition = {
        x: position.x - (SLIDE_WIDTH + SLIDE_PADDING),
        y: position.y,
      };

      stack.push({ id: slide.left, position: nextPosition });
      edges.push({
        id: `${id}->${slide.left}`,
        source: id,
        target: slide.left,
      });
    }

    if (slide.up && !visited.has(slide.up)) {
      const nextPosition = {
        x: position.x,
        y: position.y - (SLIDE_HEIGHT + SLIDE_PADDING),
      };

      stack.push({ id: slide.up, position: nextPosition });
      edges.push({ id: `${id}->${slide.up}`, source: id, target: slide.up });
    }

    if (slide.down && !visited.has(slide.down)) {
      const nextPosition = {
        x: position.x,
        y: position.y + (SLIDE_HEIGHT + SLIDE_PADDING),
      };

      stack.push({ id: slide.down, position: nextPosition });
      edges.push({
        id: `${id}->${slide.down}`,
        source: id,
        target: slide.down,
      });
    }

    if (slide.right && !visited.has(slide.right)) {
      const nextPosition = {
        x: position.x + (SLIDE_WIDTH + SLIDE_PADDING),
        y: position.y,
      };

      stack.push({ id: slide.right, position: nextPosition });
      edges.push({
        id: `${id}->${slide.down}`,
        source: id,
        target: slide.down,
      });
    }

    nodes.push(node);
    visited.add(id);
  }

  return { start, nodes, edges };
};
