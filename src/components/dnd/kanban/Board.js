import Column from './Column';

export default function Board({data}) {
  return (
    <div style={{height: '100%', display: 'flex'}}>
      {data[0].columns.map(column => (
        <Column key={column.columnId} {...column} />
      ))}
    </div>
  );
}
