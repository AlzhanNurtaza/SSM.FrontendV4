import { ScheduleComponent, Day, Week, Inject,PopupOpenEventArgs,RecurrenceEditorComponent,PopupCloseEventArgs } from '@syncfusion/ej2-react-schedule';
import { DataManager, UrlAdaptor,WebApiAdaptor} from '@syncfusion/ej2-data';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { useRef } from 'react';
import * as React from 'react';

 export const ScheduleView: React.FC = () => {

  const datamanagerClassroom = new DataManager({ url: 'https://localhost:7262/api/Classroom', // Replace with your API endpoint URL
   adaptor: new WebApiAdaptor(),
  });
  const datamanagerEnrollment = new DataManager({ url: 'https://localhost:7262/api/Enrollment', // Replace with your API endpoint URL
   adaptor: new WebApiAdaptor(),
  });

  const scheduleObj = useRef<ScheduleComponent>(null);
  const recurrObject = useRef<RecurrenceEditorComponent>(null);
  const onPopupOpen = (args: PopupOpenEventArgs): void => {
    if (args.type === 'Editor') {
      //console.log(recurrObject.current);
      if(scheduleObj.current!=null && recurrObject.current!=null)
      {
        //(scheduleObj.current.eventWindow as any).recurrenceEditor = recurrObject.current;
      }
      
      
    }
  }
  const onPopupClose=(args: PopupCloseEventArgs)=> {
    if (args.type === 'Editor' && args.data) {
        args.data.RecurrenceRule = recurrObject.current?.value;
    }
}


  const editorTemplate = (props: object): JSX.Element => {
    return (props !== undefined ? <table className="custom-event-editor" style={{width:'90%'}} ><tbody>
      <tr><td className="e-textlabel">Subject</td><td colSpan={4}>
        <input id="Subject"  className="e-field e-input" type="text" name="Subject" defaultValue={(props as any).Subject}
        />
      </td></tr>
      <tr><td className="e-textlabel">Enrollment</td><td colSpan={4}>
        <DropDownListComponent id="EnrollmentId" placeholder='Choose enrollment' name="EnrollmentId" data-name='EnrollmentId' className="e-field" style={{ width: '100%' }}
          dataSource={datamanagerEnrollment}
          fields={{ text: 'name', value: 'id' }}
          value={(props as any).EnrollmentId}
          >
        </DropDownListComponent>
      </td></tr>
      <tr><td className="e-textlabel">Classroom</td><td colSpan={4}>
        <DropDownListComponent id="ClassroomId" placeholder='Choose classroom' data-name='ClassroomId' className="e-field" style={{ width: '100%' }}
          dataSource={datamanagerClassroom}
          fields={{ text: 'name', value: 'id' }}
           value={(props as any).ClassroomId}
          >
        </DropDownListComponent>
      </td></tr>
      <tr><td className="e-textlabel">From</td><td colSpan={4}>
        <DateTimePickerComponent format='dd/MM/yy hh:mm a' id="StartTime" 
        data-name="StartTime" value={new Date((props as any).startTime || (props as any).StartTime)} className="e-field"></DateTimePickerComponent>
      </td></tr>
      <tr><td className="e-textlabel">To</td><td colSpan={4}>
        <DateTimePickerComponent format='dd/MM/yy hh:mm a' id="EndTime" 
        data-name="EndTime" value={new Date((props as any).endTime || (props as any).EndTime)} 
        className="e-field"></DateTimePickerComponent>
      </td></tr>
      <tr>
            <td className="e-textlabel">Recurrence</td>
            <td colSpan={4}>
            <RecurrenceEditorComponent ref={recurrObject} 
            data-name="RecurrenceRule" className="e-field" disabled 
            id="RecurrenceEditor">
              
            </RecurrenceEditorComponent>
            </td>
          </tr>
      </tbody></table> : <div></div>);
  };
  return (
    <div>
      <h2>Schedule Viewer</h2>
      <ScheduleComponent 
        ref={scheduleObj}
        editorTemplate={editorTemplate}
        popupOpen={onPopupOpen}
        popupClose={onPopupClose}
        
        height='550px' selectedDate={new Date()}
        eventSettings={ { 
        dataSource : new DataManager({
            url: 'https://localhost:7262/api/Schedule',
            adaptor: new UrlAdaptor(),
            crossDomain: true
        }),

        } }>
        <Inject services={[Day, Week ]} />
    </ScheduleComponent>
    </div>
  );
};
