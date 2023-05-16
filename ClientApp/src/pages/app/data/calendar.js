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
    href: '#',
    name: 'Action'
  },
  {
    href: '#',
    name: 'Another action'
  }
]