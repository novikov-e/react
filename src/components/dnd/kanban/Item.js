import {useDrag, useDrop} from 'react-dnd';
import {ItemTypes} from './ItemTypes';
import {memo, useContext, useRef} from 'react';
import {KanbanContext} from './Kanban';

const Item = memo(function Item({columnId, listId, itemId, itemName}) {
  const ref = useRef(null);
  const {moveItemOnItem} = useContext(KanbanContext);

  const [collected, drag, dragPreview] = useDrag(() => ({
    type: ItemTypes.ITEM,
    item: {columnId, listId, itemId},
  }));

  const [collectedProps, drop] = useDrop(() => ({
    accept: ItemTypes.ITEM,
    drop(item, monitor) {},
    hover(item, monitor) {
      if (!ref.current) return;
      if (itemId === item.itemId) return;
      moveItemOnItem(item, {columnId, listId, itemId});
    },
  }));

  let opacity = collected.isDragging ? 0.5 : 1;

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        border: '1px solid black',
        backgroundColor: 'silver',
        height: '50px',
        opacity,
      }}
    >
      {itemName}
    </div>
  );
});

export default Item;
