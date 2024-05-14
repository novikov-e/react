import {dateFormatter, timeFormatter} from '../utils/formatters';
import {tableData} from '../storage/tableData';

export default function Tables(props) {
  return (
    <div className="flex-row center height-100">
      <div className="mt-10">
        <table style={{width: '500px', borderBottom: '1px solid gray'}}>
          <thead>
            <tr>
              <td className="border-none p-0">
                <table>
                  <thead>
                    <tr>
                      <td
                        className="inner-td"
                        style={{
                          minWidth: '150px',
                          textAlign: 'center',
                          fontWeight: 'bold',
                        }}
                      >
                        Наименование
                      </td>
                      <td
                        className="inner-td"
                        style={{
                          minWidth: '50px',
                          textAlign: 'center',
                          fontWeight: 'bold',
                        }}
                      >
                        Цена
                      </td>
                      <td
                        className="inner-td"
                        style={{
                          minWidth: '120px',
                          textAlign: 'center',
                          fontWeight: 'bold',
                        }}
                      >
                        Дата
                      </td>
                      <td
                        className="inner-td"
                        style={{
                          width: '100%',
                          textAlign: 'center',
                          fontWeight: 'bold',
                        }}
                      >
                        Время
                      </td>
                    </tr>
                  </thead>
                </table>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-none p-0">
                <div className="table-body-scroll" style={{overflow: 'auto', height: '300px'}}>
                  <table className="body-table" style={{border: 'none', padding: 0}}>
                    <tbody>
                      {tableData.map(item => (
                        <tr key={item.id}>
                          <td className="inner-td" style={{minWidth: '150px', textAlign: 'center'}}>
                            {item.name}
                          </td>
                          <td className="inner-td" style={{minWidth: '50px', textAlign: 'center'}}>
                            {item.price}
                          </td>
                          <td className="inner-td" style={{minWidth: '120px', textAlign: 'center'}}>
                            {dateFormatter(new Date(item.date))}
                          </td>
                          <td className="inner-td" style={{width: '100%', textAlign: 'center'}}>
                            {timeFormatter(new Date(item.date))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
