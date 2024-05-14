import React, {createContext, useState} from 'react';
import Board from './Board';

export const KanbanContext = createContext({
  moveItemOnItem: (sourceItem, destinationItem) => {},
  moveItemOnList: (sourceItem, destinationList) => {},
  moveListOnList: (sourceList, destinationList) => {},
  moveListOnColumn: (sourceList, destinationColumn) => {},
  moveColumnOnColumn: (sourceColumn, destinationColumn) => {},
});

export default function Kanban(props) {
  const [data, setData] = useState([
    {
      boardId: 'B1',
      boardName: 'Board name',
      columns: [
        {
          columnId: 'C1',
          columnName: 'First column',
          lists: [
            {
              listId: 'L1',
              listName: 'First list',
              items: [
                {itemId: 'I1', itemName: 'First item'},
                {itemId: 'I2', itemName: 'Second item'},
                {itemId: 'I3', itemName: 'Third item'},
              ],
            },
            {
              listId: 'L2',
              listName: 'Second list',
              items: [
                {itemId: 'I4', itemName: 'Fourth item'},
                {itemId: 'I5', itemName: 'Fifth item'},
                {itemId: 'I6', itemName: 'Sixth item'},
              ],
            },
          ],
        },
        {
          columnId: 'C2',
          columnName: 'Second column',
          lists: [
            {
              listId: 'L3',
              listName: 'Third list',
              items: [
                {itemId: 'I7', itemName: 'Seventh item'},
                {itemId: 'I8', itemName: 'Eight item'},
                {itemId: 'I9', itemName: 'Ninth item'},
              ],
            },
            {
              listId: 'L4',
              listName: 'Fourth list',
              items: [
                {itemId: 'I10', itemName: 'Tenth item'},
                {itemId: 'I11', itemName: 'Eleventh item'},
                {itemId: 'I12', itemName: 'Twelfth item'},
              ],
            },
          ],
        },
      ],
    },
  ]);

  const moveItemOnItem = (sourceItem, destinationItem) => {
    setData(prev => {
      const newData = [...prev];
      let srcColumnIndex;
      let srcListIndex;
      let srcItemIndex;
      let destColumnIndex;
      let destListIndex;
      let destItemIndex;

      source: for (let sourceColumnIndex = 0; sourceColumnIndex < newData[0].columns.length; sourceColumnIndex++) {
        for (
          let sourceListIndex = 0;
          sourceListIndex < newData[0].columns[sourceColumnIndex].lists.length;
          sourceListIndex++
        ) {
          for (
            let sourceItemIndex = 0;
            sourceItemIndex < newData[0].columns[sourceColumnIndex].lists[sourceListIndex].items.length;
            sourceItemIndex++
          ) {
            if (
              newData[0].columns[sourceColumnIndex].lists[sourceListIndex].items[sourceItemIndex].itemId ===
              sourceItem.itemId
            ) {
              srcColumnIndex = sourceColumnIndex;
              srcListIndex = sourceListIndex;
              srcItemIndex = sourceItemIndex;
              break source;
            }
          }
        }
      }

      if (srcColumnIndex !== undefined) {
        destination: for (
          let destinationColumnIndex = 0;
          destinationColumnIndex < newData[0].columns.length;
          destinationColumnIndex++
        ) {
          for (
            let destinationListIndex = 0;
            destinationListIndex < newData[0].columns[destinationColumnIndex].lists.length;
            destinationListIndex++
          ) {
            for (
              let destinationItemIndex = 0;
              destinationItemIndex <
              newData[0].columns[destinationColumnIndex].lists[destinationListIndex].items.length;
              destinationItemIndex++
            ) {
              if (
                newData[0].columns[destinationColumnIndex].lists[destinationListIndex].items[destinationItemIndex]
                  .itemId === destinationItem.itemId
              ) {
                destColumnIndex = destinationColumnIndex;
                destListIndex = destinationListIndex;
                destItemIndex = destinationItemIndex;
                break destination;
              }
            }
          }
        }

        if (destColumnIndex !== undefined) {
          let item = newData[0].columns[srcColumnIndex].lists[srcListIndex].items.splice(srcItemIndex, 1);
          newData[0].columns[destColumnIndex].lists[destListIndex].items.splice(destItemIndex, 0, {...item[0]});
          return newData;
        }
      }
      return prev;
    });
  };

  const moveItemOnList = (sourceItem, destinationList) => {
    setData(prev => {
      const newData = [...prev];
      let srcColumnIndex;
      let srcListIndex;
      let srcItemIndex;
      let destColumnIndex;
      let destListIndex;

      source: for (let sourceColumnIndex = 0; sourceColumnIndex < newData[0].columns.length; sourceColumnIndex++) {
        for (
          let sourceListIndex = 0;
          sourceListIndex < newData[0].columns[sourceColumnIndex].lists.length;
          sourceListIndex++
        ) {
          for (
            let sourceItemIndex = 0;
            sourceItemIndex < newData[0].columns[sourceColumnIndex].lists[sourceListIndex].items.length;
            sourceItemIndex++
          ) {
            if (
              newData[0].columns[sourceColumnIndex].lists[sourceListIndex].items[sourceItemIndex].itemId ===
              sourceItem.itemId
            ) {
              srcColumnIndex = sourceColumnIndex;
              srcListIndex = sourceListIndex;
              srcItemIndex = sourceItemIndex;
              break source;
            }
          }
        }
      }

      if (srcColumnIndex !== undefined) {
        destination: for (
          let destinationColumnIndex = 0;
          destinationColumnIndex < newData[0].columns.length;
          destinationColumnIndex++
        ) {
          for (
            let destinationListIndex = 0;
            destinationListIndex < newData[0].columns[destinationColumnIndex].lists.length;
            destinationListIndex++
          ) {
            if (
              newData[0].columns[destinationColumnIndex].lists[destinationListIndex].listId === destinationList.listId
            ) {
              destColumnIndex = destinationColumnIndex;
              destListIndex = destinationListIndex;
              break destination;
            }
          }
        }

        if (destColumnIndex !== undefined) {
          let item = newData[0].columns[srcColumnIndex].lists[srcListIndex].items.splice(srcItemIndex, 1);
          newData[0].columns[destColumnIndex].lists[destListIndex].items.push(item[0]);
          return newData;
        }
      }
      return prev;
    });
  };

  const moveListOnList = (sourceList, destinationList) => {
    setData(prev => {
      const newData = [...prev];
      let srcColumnIndex;
      let srcListIndex;
      let destColumnIndex;
      let destListIndex;

      source: for (let sourceColumnIndex = 0; sourceColumnIndex < newData[0].columns.length; sourceColumnIndex++) {
        for (
          let sourceListIndex = 0;
          sourceListIndex < newData[0].columns[sourceColumnIndex].lists.length;
          sourceListIndex++
        ) {
          if (newData[0].columns[sourceColumnIndex].lists[sourceListIndex].listId === sourceList.listId) {
            srcColumnIndex = sourceColumnIndex;
            srcListIndex = sourceListIndex;
            break source;
          }
        }
      }

      if (srcColumnIndex !== undefined) {
        destination: for (
          let destinationColumnIndex = 0;
          destinationColumnIndex < newData[0].columns.length;
          destinationColumnIndex++
        ) {
          for (
            let destinationListIndex = 0;
            destinationListIndex < newData[0].columns[destinationColumnIndex].lists.length;
            destinationListIndex++
          ) {
            if (
              newData[0].columns[destinationColumnIndex].lists[destinationListIndex].listId === destinationList.listId
            ) {
              destColumnIndex = destinationColumnIndex;
              destListIndex = destinationListIndex;
              break destination;
            }
          }
        }

        if (destColumnIndex !== undefined) {
          let list = newData[0].columns[srcColumnIndex].lists.splice(srcListIndex, 1);
          newData[0].columns[destColumnIndex].lists.splice(destListIndex, 0, {...list[0]});
          return newData;
        }
      }
      return prev;
    });
  };

  const moveListOnColumn = (sourceList, destinationColumn) => {
    setData(prev => {
      const newData = [...prev];
      let srcColumnIndex;
      let srcListIndex;
      let destColumnIndex;

      source: for (let sourceColumnIndex = 0; sourceColumnIndex < newData[0].columns.length; sourceColumnIndex++) {
        for (
          let sourceListIndex = 0;
          sourceListIndex < newData[0].columns[sourceColumnIndex].lists.length;
          sourceListIndex++
        ) {
          if (newData[0].columns[sourceColumnIndex].lists[sourceListIndex].listId === sourceList.listId) {
            srcColumnIndex = sourceColumnIndex;
            srcListIndex = sourceListIndex;
            break source;
          }
        }
      }

      if (srcColumnIndex !== undefined) {
        for (
          let destinationColumnIndex = 0;
          destinationColumnIndex < newData[0].columns.length;
          destinationColumnIndex++
        ) {
          if (newData[0].columns[destinationColumnIndex].columnId === destinationColumn.columnId) {
            destColumnIndex = destinationColumnIndex;
            break;
          }
        }

        if (destColumnIndex !== undefined) {
          let list = newData[0].columns[srcColumnIndex].lists.splice(srcListIndex, 1);
          newData[0].columns[destColumnIndex].lists.push(list[0]);
          return newData;
        }
      }
      return prev;
    });
  };

  const moveColumnOnColumn = (sourceColumn, destinationColumn) => {
    setData(prev => {
      const newData = [...prev];
      let srcColumnIndex;
      let destColumnIndex;

      for (let sourceColumnIndex = 0; sourceColumnIndex < newData[0].columns.length; sourceColumnIndex++) {
        if (newData[0].columns[sourceColumnIndex].columnId === sourceColumn.columnId) {
          srcColumnIndex = sourceColumnIndex;
          break;
        }
      }

      if (srcColumnIndex !== undefined) {
        for (
          let destinationColumnIndex = 0;
          destinationColumnIndex < newData[0].columns.length;
          destinationColumnIndex++
        ) {
          if (newData[0].columns[destinationColumnIndex].columnId === destinationColumn.columnId) {
            destColumnIndex = destinationColumnIndex;
            break;
          }
        }

        if (destColumnIndex !== undefined) {
          let column = newData[0].columns.splice(srcColumnIndex, 1);
          newData[0].columns.splice(destColumnIndex, 0, {...column[0]});
          return newData;
        }
      }
      return prev;
    });
  };

  return (
    <KanbanContext.Provider
      value={{moveItemOnItem, moveItemOnList, moveListOnList, moveListOnColumn, moveColumnOnColumn}}
    >
      <Board data={data} />
    </KanbanContext.Provider>
  );
}
