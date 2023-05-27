import { addHours, addDate, subtractDate } from '../components/Calendar/utils';

const start = new Date();
const end = new Date(new Date().setMinutes(start.getMinutes() + 60));
const today = new Date();

export const attendeesData = [
  { id: "1", name: "Chin" },
  { id: "2", name: "Khanh" },
  { id: "3", name: "Linh" },
  { id: "4", name: "Hai" }
];


export const colors = [
  {
    id: "1",
    color: "#ffffff",
    bgColor: "#34C38F",
    dragBgColor: "#34C38F",
    borderColor: "#34C38F"
  },
  {
    id: "2",
    color: "#ffffff",
    bgColor: "#F4696A",
    dragBgColor: "#F4696A",
    borderColor: "#F4696A"
  },
  {
    id: "3",
    color: "#ffffff",
    bgColor: "#00a9ff",
    dragBgColor: "#00a9ff",
    borderColor: "#00a9ff"
  },
  {
    id: "4",
    color: "#ffffff",
    bgColor: "#F2B34C",
    dragBgColor: "#F2B34C",
    borderColor: "#F2B34C"
  },
  {
    id: "5",
    color: "#ffffff",
    bgColor: "#74788D",
    dragBgColor: "#74788D",
    borderColor: "#74788D"
  },
  {
    id: "6",
    color: "#ffffff",
    bgColor: "#343A40",
    dragBgColor: "#343A40",
    borderColor: "#343A40"
  },
  {
    id: "7",
    color: "#000000",
    bgColor: "#FFFFFF",
    dragBgColor: "#FFFFFF",
    borderColor: "#FFFFFF"
  }
];

export const calendars = [
  {
    id: "1",
    name: "BPA Technical"
  },
  {
    id: "2",
    name: "Aqua 2 Cleaning"
  },
  {
    id: "3",
    name: "Aqua 4 Cleaning"
  },
  {
    id: "4",
    name: "Luxury 6 Cleaning"
  },
  {
    id: "5",
    name: "Luxury 6 Management"
  },
  {
    id: "6",
    name: "Aqua 3 Management"
  },
  {
    id: "7",
    name: "Aqua 2 Management"
  }
];

export const initialCalendars = [
  {
    id: '0',
    name: 'Private',
    backgroundColor: '#9e5fff',
    borderColor: '#9e5fff',
    dragBackgroundColor: '#9e5fff',
  },
  {
    id: '1',
    name: 'Company',
    backgroundColor: '#00a9ff',
    borderColor: '#00a9ff',
    dragBackgroundColor: '#00a9ff',
  },
  {
    id: '3',
    name: 'Vacation',
    backgroundColor: '#66cc66',
    borderColor: '#66cc66',
    dragBackgroundColor: '#66cc66',
  },
  {
    id: '4',
    name: 'Meetings',
    backgroundColor: '#ffa500',
    borderColor: '#ffa500',
    dragBackgroundColor: '#ffa500',
  },
  {
    id: '5',
    name: 'Holidays',
    backgroundColor: '#f5f5dc',
    borderColor: '#f5f5dc',
    dragBackgroundColor: '#f5f5dc',
  },
  {
    id: '6',
    name: 'Birthdays',
    backgroundColor: '#ff69b4',
    borderColor: '#ff69b4',
    dragBackgroundColor: '#ff69b4',
  },
  {
    id: '7',
    name: 'Deadlines',
    backgroundColor: '#8b0000',
    borderColor: '#8b0000',
    dragBackgroundColor: '#8b0000',
  },
  {
    id: '8',
    name: 'Appointments',
    backgroundColor: '#00ced1',
    borderColor: '#00ced1',
    dragBackgroundColor: '#00ced1',
  },
  {
    id: '9',
    name: 'Tasks',
    backgroundColor: '#ffd700',
    borderColor: '#ffd700',
    dragBackgroundColor: '#ffd700',
  },
];

export const initialEvents = [
  {
    id: '1',
    calendarId: '0',
    title: 'TOAST UI Calendar Study',
    category: 'time',
    start: start,
    end: end,
  },
  {
    id: '2',
    calendarId: '0',
    title: 'Practice',
    category: 'milestone',
    start: addDate(today, 1),
    end: addDate(today, 1),
    isReadOnly: true,
  },
  {
    id: '3',
    calendarId: '0',
    title: 'FE Workshop',
    category: 'allday',
    start: subtractDate(today, 2),
    end: subtractDate(today, 1),
    isReadOnly: false,
  },
  {
    id: '4',
    calendarId: '0',
    title: 'Report',
    category: 'time',
    start: today,
    end: addHours(today, 1),
  },
  {
    id: '5',
    calendarId: '3',
    title: 'Client Meeting',
    category: 'time',
    start: addHours(today, 3),
    end: addHours(today, 4),
  },
  {
    id: '6',
    calendarId: '4',
    title: 'Team Lunch',
    category: 'time',
    start: addHours(today, 6),
    end: addHours(today, 7),
  },
  {
    id: '7',
    calendarId: '5',
    title: 'Conference Call',
    category: 'time',
    start: addDate(today, 2),
    end: addDate(today, 4),
  },
  {
    id: '8',
    calendarId: '6',
    title: 'Training Session',
    category: 'time',
    start: addDate(today, 4),
    end: addDate(today, 5),
  },
  {
    id: '9',
    calendarId: '7',
    title: 'Vacation',
    category: 'allday',
    start: addDate(today, 7),
    end: addDate(today, 12),
    isReadOnly: true,
  },
  {
    id: '10',
    calendarId: '8',
    title: 'Holiday',
    category: 'allday',
    start: addDate(today, 15),
    end: addDate(today, 15),
    isReadOnly: true,
  },
  {
    id: '11',
    calendarId: '9',
    title: 'Doctor Appointment',
    category: 'time',
    start: addDate(today, 9),
    end: addDate(today, 10),
  },
  {
    id: '12',
    calendarId: '5',
    title: 'Dentist Appointment',
    category: 'time',
    start: addDate(today, 14),
    end: addDate(today, 15),
  },
  {
    id: '13',
    calendarId: '6',
    title: 'Project Deadline',
    category: 'allday',
    start: addDate(today, 5),
    end: addDate(today, 5),
  },
  {
    id: '14',
    calendarId: '7',
    title: 'Team Meeting',
    category: 'time',
    start: addDate(today, 15),
    end: addDate(today, 17),
  },
  {
    id: '15',
    calendarId: '6',
    title: 'Birthday Party',
    category: 'time',
    start: addDate(today, 18),
    end: addDate(today, 20),
  },
  {
    id: '16',
    calendarId: '8',
    title: 'Anniversary Dinner',
    category: 'time',
    start: addDate(today, 19),
    end: addDate(today, 20),
  },
];

export const viewModeOptions = [
  {
    title: 'Monthly',
    value: 'month',
  },
  {
    title: 'Weekly',
    value: 'week',
  },
  {
    title: 'Daily',
    value: 'day',
  },
];

export const schedules = [
  {
    id: 1,
    title: 'Meeting',
    category: 'time',
    dueDateClass: '',
    start: '2023-06-01T10:30:00',
    end: '2023-06-01T12:30:00',
    attendees: [ 'John', 'Jane'],
  },
];

export const viewRangeOptions = [
  {
    title: 'All events',
    value: 'all',
  },
  {
    title: 'Own events',
    value: 'own',
  }
];

export const headers = ['id', 'client', 'title', 'location', 'start', 'end', 'status'];
export const entries = [
  { id: 1, client: 'John Doe', title: 'Some thing', location: 'Google meet', start: today.toString(), end: end.toString(), status: 'Pending' },
  { id: 2, client: 'Jane Doe', title: 'Some thing', location: 'Google meet', start: addHours(today, 1).toString(), end: addHours(today, 1.5).toString(), status: 'Ok' },
  { id: 3, client: 'Bob Smith', title: 'Some thing', location: 'Google meet', start: addHours(today, 2).toString(), end: addHours(today, 3).toString(), status: 'Pending' },
  { id: 4, client: 'Alice Johnson', title: 'Some thing', location: 'Google meet', start: addHours(today, 6).toString(), end: addHours(today, 8).toString(), status: 'Ok' },
  { id: 5, client: 'Charlie Brown', title: 'Some thing', location: 'Google meet', start: addDate(today, 1).toString(), end: addDate(addHours(today, 1), 1).toString(), status: 'Ok' },
  { id: 6, client: 'Sally Brown', title: 'Some thing', location: 'Google meet', start: addDate(today, 2).toString(), end: addDate(addHours(today, 1), 3).toString(), status: 'Ok' },
  { id: 7, client: 'Linus van Pelt', title: 'Some thing', location: 'Google meet', start: addDate(today, 4).toString(), end: addDate(addHours(today, 1), 4).toString(), status: 'Ok' },
  { id: 8, client: 'Lucy van Pelt', title: 'Some thing', location: 'Google meet', start: addDate(today, 5).toString(), end: addDate(addHours(today, 1), 4).toString(), status: 'Pending' },
  { id: 9, client: 'Schroeder', title: 'Some thing', location: 'Google meet', start: addDate(today, 6).toString(), end: addDate(addHours(today, 1), 4).toString(), status: 'Ok' },
];

export const actions = [
  {
    href: '/app/user/update',
    name: 'Update info'
  },
  {
    href: '/app/user/reset-password',
    name: 'Reset password'
  }
]