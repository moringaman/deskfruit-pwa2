
import { Calendar, Badge } from 'rsuite';

function getTodoList(date:any) {
    const day = date.getDate();
  
    switch (day) {
      case 10:
        return [
          { time: '10:30 am', title: 'Meeting' },
          { time: '12:00 pm', title: 'Lunch' }
        ];
      case 15:
        return [
          { time: '09:30 pm', title: 'Products Introduction Meeting' },
          { time: '12:30 pm', title: 'Client entertaining' },
          { time: '02:00 pm', title: 'Product design discussion' },
          { time: '05:00 pm', title: 'Product test and acceptance' },
          { time: '06:30 pm', title: 'Reporting' },
          { time: '10:00 pm', title: 'Going home to walk the dog' }
        ];
      default:
        return [];
    }
  }
  
const ScheduleCalendar = () => {

   const renderCell = (date:any) => {
        const list = getTodoList(date);
    
        if (list.length) {
          return <Badge className="calendar-todo-item-badge" />;
        }
    
        return null;
      }

    return (
        <>
        <div className="max-w-[50px] max-h-[300px]">

        </div>
        <Calendar compact  renderCell={renderCell}/>
        </>
    )
}

export default ScheduleCalendar