import { ScheduleComponent, Day, Week, Inject,PopupOpenEventArgs,RecurrenceEditorComponent,PopupCloseEventArgs,
  ResourcesDirective, ResourceDirective, } from '@syncfusion/ej2-react-schedule';
import { DataManager, UrlAdaptor,WebApiAdaptor,Query} from '@syncfusion/ej2-data';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { useRef,useState } from 'react';
import * as React from 'react';

 export const ScheduleView: React.FC = () => {
  const datamanagerClassroom2= new DataManager({ url: 'https://localhost:7262/api/Classroom', // Replace with your API endpoint URL
   adaptor: new WebApiAdaptor(),
  });
  const group = { resources: ['Classrooms'] }
  const classroomData = datamanagerClassroom2 



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
      //console.log(scheduleObj);
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



  const CustomEditorTemplate: React.FC<{
    field: string;
    value: string;
    EnrollmentId:string;
  }> = (props:any) => {
    const [enrollmentId, setEnrollmentId] = useState(props.EnrollmentId || '');
    const [enrollmentName, setEnrollmentName] = useState('');
    const [enrollmentGroups, setEnrollmentGroups] = useState('');
    const [enrollmentStudentsCount, setEnrollmentStudentsCount] = useState(0);
    const [enrollmentCourseName, setEnrollmentCourseName] = useState('');
    const [enrollmentInstructorName, setEnrollmentInstructorName] = useState('');
    const [classroomId, setClassroomId] = useState(props.ClassroomId || '');
    const [classroomSeats,setClassroomSeats] = useState(0);
    if(props.ClassroomId && classroomSeats==0)
    {
      datamanagerClassroom.executeQuery(new Query()).then((response: any) => {
        const allRecords: any[] = response.result;

        // Filter records based on a specific property or path
        const filteredRecords = allRecords.filter((record: any) => {
            // Replace 'path' with the actual property path you want to filter by
            return record.id === props.ClassroomId;
        });
        if(filteredRecords.length>0)
        {
          setClassroomSeats(filteredRecords[0].seats);
        }
      }).catch((error: any) => {
        console.error(error);
      });
    }
  
    const handleEnrollmentDropDownChange = (e: any) => {
      if(e.itemData?.id!=null)
      {
        setEnrollmentId(e.itemData.id);
        setEnrollmentName(e.itemData.name);
        const groupNames: string[] = [];
        let studentsCount = 0;
        e.itemData.groups.forEach((obj:any) => {
          groupNames.push(obj.name);
          studentsCount+=obj.students.length;
        });
        setEnrollmentGroups(groupNames.join(", "));
        setEnrollmentStudentsCount(studentsCount);
        setEnrollmentCourseName(e.itemData.course.name);
        setEnrollmentInstructorName(e.itemData.instructor.lastName +" " + e.itemData.instructor.firstName);
      }
    };
    const handleClassroomDropDownChange = (e: any) => {
      if(e.itemData?.id!=null)
      {
        setClassroomId(e.itemData.id);
        setClassroomSeats(e.itemData.seats);
      }
    };
    return (
      (props !== undefined ? <table className="custom-event-editor" style={{width:'90%'}} ><tbody>
      <tr><td className="e-textlabel">Enrollment</td><td colSpan={4}>
        <DropDownListComponent id="EnrollmentId" placeholder='Choose enrollment' name="EnrollmentId" data-name='EnrollmentId' className="e-field" style={{ width: '100%' }}
          dataSource={datamanagerEnrollment}
          fields={{ text: 'name', value: 'id' }}
          value={enrollmentId || props.EnrollmentId}
          change={handleEnrollmentDropDownChange}
          >
        </DropDownListComponent>
      </td></tr>
      <tr  style={{display:"none"}}><td className="e-textlabel">Subject</td><td colSpan={4}>
        <input disabled id="Subject"  className="e-field e-input" type="text" name="Subject" 
        value={enrollmentName||props.Subject||''}
        />
      </td></tr>
      <tr style={{display:"none"}}><td className="e-textlabel">EnrollmentName</td><td colSpan={4}>
        <input disabled id="EnrollmentName"  className="e-field e-input" type="text" name="EnrollmentName"
        value={enrollmentName ||props.EnrollmentName||''}
        />
      </td></tr>
      
      <tr ><td className="e-textlabel">Groups</td><td colSpan={4}>
        <input disabled id="GroupsName"  className="e-field e-input" type="text" name="GroupsName" 
        value={enrollmentGroups||props.GroupsName ||''}
        />
      </td></tr>
      
      <tr ><td className="e-textlabel">Students Count</td><td colSpan={4}>
        <input disabled id="StudentCount"  className="e-field e-input" type="text" name="StudentCount" 
        value={enrollmentStudentsCount || props.StudentCount||0}
        
        />
      </td></tr>
      <tr ><td className="e-textlabel">Course</td><td colSpan={4}>
        <input disabled id="CourseName"  className="e-field e-input" type="text" name="CourseName"
        value={enrollmentCourseName || props.CourseName ||''}
        />
      </td></tr>
      <tr ><td className="e-textlabel">Instructor</td><td colSpan={4}>
        <input disabled id="InstructorName"  className="e-field e-input" type="text" name="InstructorName"
        value={enrollmentInstructorName || props.InstructorName ||''}
        />
      </td></tr>
      <tr><td className="e-textlabel">Classroom</td><td colSpan={4}>
        <DropDownListComponent id="ClassroomId" placeholder='Choose classroom' data-name='ClassroomId' className="e-field" style={{ width: '100%' }}
          dataSource={datamanagerClassroom}
          fields={{ text: 'name', value: 'id' }}
          value={classroomId || props.ClassroomId}
          change={handleClassroomDropDownChange}
          >
        </DropDownListComponent>
      </td></tr> 
      <tr ><td className="e-textlabel">Seats of classroom</td><td colSpan={4}>
        <input disabled id="SeatCount"  className="e-field e-input" type="number" name="SeatCount" 
        value={classroomSeats || props.SeatCount || 0}
        />
      </td></tr>
      <tr><td className="e-textlabel">From</td><td colSpan={4}>
        <DateTimePickerComponent format='dd/MM/yy hh:mm a' 
        id="StartTime" 
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
      </tbody></table> : <div></div>)
    );
  };

  const editorTemplate = {
    resource: 'customEditorTemplate',
    template: CustomEditorTemplate,
  };

  return (
    <div>
      <h2>Schedule Viewer</h2>
      <ScheduleComponent 
      
        group={group}
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

        } }
        >
        <Inject services={[Day, Week ]} />
        <ResourcesDirective>
        <ResourceDirective field='ClassroomId' title='Classroom' name='Classrooms' allowMultiple={true}
          dataSource={classroomData} textField='name' idField='id' >
        </ResourceDirective>
      </ResourcesDirective>
    </ScheduleComponent>
    </div>
  );
};
