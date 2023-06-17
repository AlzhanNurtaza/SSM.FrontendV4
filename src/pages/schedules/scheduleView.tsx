import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import { DataManager, UrlAdaptor, Query , ODataV4Adaptor} from '@syncfusion/ej2-data';

 export const ScheduleView: React.FC = () => {

  return (
    <div>
      <h2>Schedule Viewer</h2>
      <ScheduleComponent 
        height='550px' selectedDate={new Date()}
        eventSettings={ { 
        dataSource : new DataManager({
            url: 'https://localhost:7262/api/Schedule',
            adaptor: new UrlAdaptor(),
            crossDomain: true
        }),
        //dataQuery : new Query().from("Schedule"),

        } }>
        <Inject services={[Day, Week, WorkWeek, Month   ]} />
    </ScheduleComponent>
    </div>
  );
};
