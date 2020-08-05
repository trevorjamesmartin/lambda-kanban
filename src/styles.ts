import styled from "styled-components";

interface DragPreviewContainerProps {
  isHidden?: boolean;
  isPreview?: boolean;
}

export const DragPreviewContainer = styled.div<DragPreviewContainerProps>`
  transform: ${(props) => (props.isPreview ? "rotate(5deg)" : undefined)};
  opacity: ${(props) => (props.isHidden ? 0 : 1)};
`;

export const CustomDragLaterContainer = styled.div`
  height: 100%;
  left: 0;
  pointer-events: none;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
`;

export const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  // background-color: #4f84c4;
  background-color: #121212;
  background-image: url("https://images.pexels.com/photos/355887/pexels-photo-355887.jpeg");
  background-size: cover;
`;

export const ColumnContainer = styled(DragPreviewContainer)`
  display: flex;
  flex-direction: column;
  background-color: #f1f1f1;
  width: 300px;
  min-height: 40px;
  margin-right: 20px;
  border-radius: 3px;
  padding: 8px 8px;
  flex-grow: 0;
`;

export const ColumnTitle = styled.div`
  padding: 16px 16px 12px;
  font-weight: bold;
  background-color: #f1f1f1;
`;

export const CardContainer = styled.div`
  background-color: #fff;
  curser: pointer;
  margin-bottom: 4px;
  padding: 0.5rem 1rem;
  max-width: 300px;
  border-radius: 3px;
  box-shadow: #091e4240 0px 1px 0px 0px;
`;

interface AddItemButtonProps {
  dark?: boolean;
}

export const AddItemButton = styled.button<AddItemButtonProps>`
  background-color: #ffffff3d;
  border-radius: 3px;
  border: none;
  color: ${(props) => (props.dark ? "#000" : "fff")};
  cursor: pointer;
  max-width: 300px;
  padding: 10px 12px;
  text-align: left;
  transition: background 85ms ease-in;
  width: 100%;
  &:hover {
    background-color: #ffffff52;
  }
`;

export const NewItemFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  max-width: 300px;
`;

export const NewItemButton = styled.button`
  background-color: #5aac55;
  border-radius: 3px;
  border: none;
  box-shadow: none;
  color: #fff;
  padding: 6px 12px;
  text-align: center;
`;

export const NewItemInput = styled.input`
  border-radius: 3px;
  border: none;
  box-shadow: #091e4240 0px 1px 0px 0px;
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;
  width: 100%;
`;
