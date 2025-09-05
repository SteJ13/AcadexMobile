// Student Profile Data
export const STUDENT_PROFILE_DATA = {
    name: 'Abiyu Meshak A',
    class: 'XII A',
    gender: 'Male',
    bloodGroup: 'B+',
    fatherName: 'Arul Francis',
    motherName: 'Salethmary',
    mobile: '9159622785',
    address: '3/21, Mariyamman Koil St, Duttnagar, Villupuram, Tamil Nadu - 605 402. India.',
    profileImage: 'https://via.placeholder.com/120x120/87CEEB/FFFFFF?text=AM'
};

// Student Dashboard Data
export const STUDENT_DASHBOARD_DATA = {
    attendance: {
        totalDays: 50,
        present: 40,
        absent: 10,
        percentage: 80
    },
    fees: {
        total: 42000,
        paid: 32000,
        due: 18000,
        percentage: 76
    },
    subjectAttendance: {
        subjects: ['Tamil', 'English', 'Maths', 'Science', 'EVS'],
        colors: ['#FF69B4', '#FFA500', '#FFD700', '#87CEEB', '#9370DB'],
        term1: [10, 15, 25, 35, 10],
        term2: [15, 25, 35, 45, 40],
        term3: [25, 35, 45, 55, 50]
    }
};

// Chart Configuration
export const CHART_CONFIG = {
    attendance: {
        colors: ['#FFD700', '#32CD32', '#FF4500'],
        labels: ['Total Days 50%', 'Present 40%', 'Absent 10%']
    },
    fees: {
        colors: ['#FF4500', '#32CD32', '#4169E1'],
        labels: ['Due', 'Paid', 'Total']
    }
};
