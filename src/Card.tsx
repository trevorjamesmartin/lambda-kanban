import React, { useRef } from "react";
import { CardContainer } from "./styles";
import { useDrop } from "react-dnd";
import { CardDragItem } from "./DragItem";
import { useAppState } from "./AppStateContext";
import { useItemDrag } from "./useItemDrag";

interface CardProps {
  text: string;
  id: string;
  index: number;
  columnId: string;
}

export const Card = ({ text, index, id, columnId }: CardProps) => {
  const { dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({ type: "CARD", id, columnId, index, text });
  const [, drop] = useDrop({
    accept: "CARD",
    hover(item: CardDragItem) {
      if (item.id === id) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;
      const sourceColumn = item.columnId;
      const targetColumn = columnId;

      dispatch({
        type: "MOVE_TASK",
        payload: { dragIndex, hoverIndex, sourceColumn, targetColumn }
      });
      item.index = hoverIndex;
      item.columnId = targetColumn;
    }
  });

  drag(drop(ref));

  return <CardContainer ref={ref}>{text}</CardContainer>;
};
