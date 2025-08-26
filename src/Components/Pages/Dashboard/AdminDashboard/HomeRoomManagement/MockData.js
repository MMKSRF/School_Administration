export const classes = [
    { id: 'c1', name: 'Grade 10 A', teacher: null },
    { id: 'c2', name: 'Grade 10 B', teacher: 't1' },
    { id: 'c3', name: 'Grade 9 A', teacher: 't3' },
    { id: 'c4', name: 'Grade 9 B', teacher: null },
    { id: 'c5', name: 'Grade 11 Science', teacher: 't2' },
    { id: 'c6', name: 'Grade 11 Arts', teacher: null },
];

 export const teachers = [
    { id: 't1', name: 'Sarah Johnson', subject: 'Mathematics', assignedClass: 'c2' },
    { id: 't2', name: 'Michael Chen', subject: 'Computer Science', assignedClass: 'c5' },
    { id: 't3', name: 'Jennifer Williams', subject: 'English Literature', assignedClass: 'c3' },
    { id: 't4', name: 'Robert Garcia', subject: 'History', assignedClass: null },
];

export const students = [
    { id: 's1', name: 'Emma Johnson', grade: '10', class: 'c2', status: 'Active' },
    { id: 's2', name: 'Noah Williams', grade: '10', class: 'c2', status: 'Suspended' },
    { id: 's3', name: 'Olivia Brown', grade: '9', class: 'c3', status: 'Active' },
    { id: 's4', name: 'Liam Davis', grade: '11', class: 'c5', status: 'Expelled' },
    { id: 's5', name: 'Ava Miller', grade: '11', class: 'c5', status: 'Active' },
    { id: 's6', name: 'James Wilson', grade: '9', class: 'c3', status: 'Active' },
];

export const promotionRequests = [
    { id: 'pr1', class: 'c2', teacher: 't1', students: ['s1', 's2'], status: 'Pending', date: '2023-10-15' },
    { id: 'pr2', class: 'c3', teacher: 't3', students: ['s3', 's6'], status: 'Approved', date: '2023-10-10' },
    { id: 'pr3', class: 'c5', teacher: 't2', students: ['s4', 's5'], status: 'Pending', date: '2023-10-12' },
];