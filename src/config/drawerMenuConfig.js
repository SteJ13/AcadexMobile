// Role-based drawer menu configuration
import HomeScreen from '@screens/Home/HomeScreen';
import StudentProfile from '@screens/Student/StudentProfile';
import StudentDashboard from '@screens/Student/StudentDashboard';
import FeesScreen from '@screens/Student/FeesScreen';
import AttendanceScreen from '@screens/Student/AttendanceScreen';
import HomeworkScreen from '@screens/Student/Homework';
import TimeTableScreen from '@screens/Student/TimeTable';
import ExamTimeTableScreen from '@screens/Student/ExamTimeTable';
import NotificationsScreen from '../notifications/NotificationsScreen';
import SettingsScreen from '@screens/Settings/SettingsScreen';
import StaffFeesScreen from '@screens/Staff/StaffFeesScreen';
import StaffAttendanceScreen from '@screens/Staff/StaffAttendanceScreen';

export const ROLES = {
  STUDENT: 4,
  STAFF: 3,
  ADMIN: 2,
  PRINCIPAL: 1,
};

const studentMenuItems = [
  { id: 'home', title: 'navigation.home', screen: 'Home', component: HomeScreen },
  { id: 'profile', title: 'student.profile', screen: 'Profile', component: StudentProfile },
  { id: 'dashboard', title: 'student.dashboard', screen: 'Dashboard', component: StudentDashboard },
  { id: 'fees', title: 'student.fees', screen: 'Fees', component: FeesScreen },
  { id: 'attendance', title: 'student.attendance', screen: 'Attendance', component: AttendanceScreen },
  { id: 'homework', title: 'student.homework', screen: 'Homework', component: HomeworkScreen },
  { id: 'timetable', title: 'student.timetable', screen: 'TimeTable', component: TimeTableScreen },
  { id: 'examTimetable', title: 'student.examTimetable', screen: 'ExamTimeTable', component: ExamTimeTableScreen },
  { id: 'notifications', title: 'navigation.notifications', screen: 'Notifications', component: NotificationsScreen },
  { id: 'settings', title: 'navigation.settings', screen: 'Settings', component: SettingsScreen },
];

const staffMenuItems = [
  { id: 'home', title: 'navigation.home', screen: 'Home', component: HomeScreen },
  { id: 'dashboard', title: 'staff.dashboard', screen: 'Dashboard', component: StudentDashboard },
  { id: 'students', title: 'staff.students', screen: 'Students', component: StudentProfile }, // Placeholder
  { id: 'fees', title: 'staff.fees', screen: 'StaffFees', component: StaffFeesScreen },
  { id: 'attendance', title: 'staff.attendance', screen: 'StaffAttendance', component: StaffAttendanceScreen },
  { id: 'notifications', title: 'navigation.notifications', screen: 'Notifications', component: NotificationsScreen },
  { id: 'settings', title: 'navigation.settings', screen: 'Settings', component: SettingsScreen },
];

const adminMenuItems = [
  { id: 'home', title: 'navigation.home', screen: 'Home', component: HomeScreen },
  { id: 'dashboard', title: 'admin.dashboard', screen: 'Dashboard', component: StudentDashboard },
  { id: 'students', title: 'admin.students', screen: 'Students', component: StudentProfile }, // Placeholder
  { id: 'staff', title: 'admin.staff', screen: 'Staff', component: StudentProfile }, // Placeholder
  { id: 'fees', title: 'admin.fees', screen: 'AdminFees', component: StaffFeesScreen }, // Using staff fees for now
  { id: 'reports', title: 'admin.reports', screen: 'Reports', component: StudentDashboard }, // Placeholder
  { id: 'notifications', title: 'navigation.notifications', screen: 'Notifications', component: NotificationsScreen },
  { id: 'settings', title: 'navigation.settings', screen: 'Settings', component: SettingsScreen },
];

export const getMenuItemsByRole = (roleId) => {
  switch (roleId) {
    case ROLES.STUDENT:
      return studentMenuItems;
    case ROLES.STAFF:
      return staffMenuItems;
    case ROLES.ADMIN:
    case ROLES.PRINCIPAL:
      return adminMenuItems;
    default:
      return studentMenuItems; // Default to student menu
  }
};

export const getRoleName = (roleId) => {
  switch (roleId) {
    case ROLES.STUDENT:
      return 'Student';
    case ROLES.STAFF:
      return 'Staff';
    case ROLES.ADMIN:
      return 'Admin';
    case ROLES.PRINCIPAL:
      return 'Principal';
    default:
      return 'Unknown Role';
  }
};