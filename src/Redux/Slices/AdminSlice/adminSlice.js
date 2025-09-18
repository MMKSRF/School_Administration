import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    announcements: [
        {
            id: 1,
            title: 'System Maintenance',
            content: 'The school portal will be down for maintenance this Saturday from 9 AM to 12 PM.',
            priority: 'medium',
            pinned: true,
            author: 'IT Department',
            date: '2023-10-20'
        },
        {
            id: 2,
            title: 'Parent-Teacher Meetings',
            content: 'Quarterly parent-teacher meetings are scheduled for next week. Please book your slots.',
            priority: 'high',
            pinned: false,
            author: 'Principal Office',
            date: '2023-10-18'
        }
    ],
    dismissedAnnouncements: [],

    recentActivity:[
        {
            type: 'enrollment',
            title: 'New Student Enrollment',
            description: 'Emily Parker enrolled in Web Development 101',
            time: '2 minutes ago',
            action: 'View'
        },
        {
            type: 'approval',
            title: 'Course Approved',
            description: 'Advanced React course approved by admin',
            time: '15 minutes ago',
            action: 'Edit'
        },
        {
            type: 'conflict',
            title: 'Room Conflict',
            description: 'Physics Lab scheduled simultaneously in Room 205',
            time: '25 minutes ago',
            action: 'Resolve'
        },
        {
            type: 'teacher',
            title: 'New Instructor',
            description: 'Dr. Sarah Johnson joined Mathematics department',
            time: '1 hour ago'
        },
        {
            type: 'enrollment',
            title: 'Late Registration',
            description: 'Michael Brown enrolled after deadline (approved)',
            time: '1 hour ago',
            action: 'Review'
        },
        {
            type: 'approval',
            title: 'Transcript Verified',
            description: 'Jessica Wilson\'s transfer credits approved',
            time: '2 hours ago'
        },
        {
            type: 'conflict',
            title: 'Faculty Overload',
            description: 'Prof. Anderson assigned to 6 courses (max is 5)',
            time: '3 hours ago',
            action: 'Adjust'
        },
        {
            type: 'teacher',
            title: 'Teaching Award',
            description: 'Prof. Rodriguez received Excellence in Teaching award',
            time: '5 hours ago',
            action: 'Congratulate'
        },
        {
            type: 'update',
            title: 'System Maintenance',
            description: 'Scheduled maintenance completed successfully',
            time: 'Yesterday'
        },
        {
            type: 'enrollment',
            title: 'Waitlist Promotion',
            description: '3 students moved from waitlist to enrolled status',
            time: 'Yesterday',
            action: 'View List'
        },
        {
            type: 'approval',
            title: 'Curriculum Change',
            description: 'New Data Science track approved',
            time: '2 days ago'
        },
        {
            type: 'conflict',
            title: 'Final Exam Conflict',
            description: 'CS101 and MATH201 exams scheduled at same time',
            time: '2 days ago',
            action: 'Reschedule'
        },
        {
            type: 'teacher',
            title: 'Sabbatical Request',
            description: 'Prof. Lee requested sabbatical for Spring 2024',
            time: '3 days ago',
            action: 'Review'
        },
        {
            type: 'enrollment',
            title: 'International Student',
            description: 'New enrollment from overseas (visa processing)',
            time: '3 days ago',
            action: 'Documents'
        },
        {
            type: 'approval',
            title: 'Research Grant',
            description: 'NSF grant proposal approved for $250,000',
            time: '4 days ago',
            action: 'Details'
        },
        {
            type: 'conflict',
            title: 'TA Assignment',
            description: 'No TA assigned for CHEM101 lab sections',
            time: '1 week ago',
            action: 'Assign'
        },
        {
            type: 'teacher',
            title: 'Retirement Announcement',
            description: 'Prof. Thompson retiring after 35 years',
            time: '1 week ago'
        },
        {
            type: 'update',
            title: 'Gradebook Update',
            description: 'New gradebook features deployed',
            time: '1 week ago',
            action: 'Explore'
        },
        {
            type: 'enrollment',
            title: 'Honors Program',
            description: '12 new students admitted to Honors track',
            time: '2 weeks ago'
        },
        {
            type: 'approval',
            title: 'New Degree Program',
            description: 'Board approved new AI Engineering major',
            time: '3 weeks ago',
            action: 'Curriculum'
        }],

    miniReport:{
        students:2,
        studentChange:-1,
        teachers:5,
        teacherChange:1,
        classes:23,
        classChange:-1,
        attendance:10,
        attendanceChange:1
    }


}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {

        setDismissedAnnouncements(state, action) {
            state.dismissedAnnouncements.push(action.payload)

        },
        setAnnouncements(state, action) {
            state.announcements.push(action.payload)
        },




    }
})



export const {setAnnouncements,setDismissedAnnouncements} = adminSlice.actions;

export default adminSlice.reducer;