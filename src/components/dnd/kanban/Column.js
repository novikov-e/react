import List from './List';
import {memo, useContext, useRef} from 'react';
import {KanbanContext} from './Kanban';
import {useDrag, useDrop} from 'react-dnd';
import {ItemTypes} from './ItemTypes';

const Column = memo(function Column({columnId, columnName, lists}) {
  const ref = useRef(null);
  const {moveListOnColumn, moveColumnOnColumn} = useContext(KanbanContext);

  const [collected, drag, dragPreview] = useDrag(() => ({
    type: ItemTypes.COLUMN,
    item: {columnId},
  }));

  const [collectedProps, drop] = useDrop(() => ({
    accept: [ItemTypes.LIST, ItemTypes.COLUMN],
    drop(item, monitor) {},
    hover(item, monitor) {
      if (item.columnId === columnId) return;
      const isOver = monitor.isOver({shallow: true});
      if (isOver) {
        switch (monitor.getItemType()) {
          case ItemTypes.LIST:
            moveListOnColumn(item, {columnId});
            break;
          case ItemTypes.COLUMN:
            moveColumnOnColumn(item, {columnId});
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
        width: '320px',
        height: '100%',
        borderRight: '2px solid black',
        padding: '5px',
        gap: '2px',
      }}
    >
      {columnName}
      {lists.map(list => (
        <List key={list.listId} {...list} columnId={columnId} />
      ))}
    </div>
  );
});

export default Column;
