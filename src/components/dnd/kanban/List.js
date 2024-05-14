import Item from './Item';
import {useDrag, useDrop} from 'react-dnd';
import {ItemTypes} from './ItemTypes';
import {memo, useContext, useRef} from 'react';
import {KanbanContext} from './Kanban';

const List = memo(function List({columnId, listId, listName, items}) {
  const ref = useRef(null);
  const {moveItemOnList, moveListOnList} = useContext(KanbanContext);

  const [collected, drag, dragPreview] = useDrag(() => ({
    type: ItemTypes.LIST,
    item: {columnId, listId},
  }));

  const [collectedProps, drop] = useDrop(() => ({
    accept: [ItemTypes.ITEM, ItemTypes.LIST],
    drop(item, monitor) {},
    hover(item, monitor) {
      if (!ref.current) return;
      if (item.listId === listId) return;
      const isOver = monitor.isOver({shallow: true});
      if (isOver) {
        switch (monitor.getItemType()) {
          case ItemTypes.ITEM:
            moveItemOnList(item, {columnId, listId});
            break;
          case ItemTypes.LIST:
            moveListOnList(item, {columnId, listId});
            break;
          default:
        }
      }
    },
  }));

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '314px',
        backgroundColor: 'gray',
        padding: '5px',
        border: '2px solid black',
        borderRadius: '5px',
      }}
    >
      {listName}
      {items.map(item => (
        <Item key={item.itemId} {...item} columnId={columnId} listId={listId} />
      ))}
    </div>
  );
});

export default List;
