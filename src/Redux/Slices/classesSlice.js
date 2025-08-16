// src/Redux/Slices/classesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data
const mockClasses = [
  {
    id: 'c1',
    name: 'Math 101',
    subject: 'Mathematics',
    grade: 9,
    room: 'Room 203',
    capacity: 30,
    schedule: 'Mon/Wed/Fri 10:00-11:30',
    description: 'Introduction to Algebra',
    teacherId: 't1',
    teacher: 'Mr. Johnson',
    students: ['s1', 's2', 's3'],
    avgPerformance: 87
  },
  {
    id: 'c2',
    name: 'Science A',
    subject: 'Science',
    grade: 10,
    room: 'Lab B',
    capacity: 25,
    schedule: 'Tue/Thu 9:00-10:30',
    description: 'Biology Fundamentals',
    teacherId: 't2',
    teacher: 'Ms. Davis',
    students: ['s4', 's5', 's6'],
    avgPerformance: 92
  }
];

const mockTeachers = [
  {
    id: 't1',
    name: 'Mr. Johnson',
    subjects: ['Mathematics', 'Physics'],
    email: 'johnson@school.edu'
  },
  {
    id: 't2',
    name: 'Ms. Davis',
    subjects: ['Science', 'Biology'],
    email: 'davis@school.edu'
  }
];

const mockReport = {
  attendance: {
    present: 85,
    absent: 8,
    late: 7,
    excused: 2
  },
  performance: {
    average: 87,
    distribution: [
      { grade: 'A', count: 12, percent: 30 },
      { grade: 'B', count: 18, percent: 45 },
      { grade: 'C', count: 6, percent: 15 },
      { grade: 'D', count: 3, percent: 7.5 },
      { grade: 'F', count: 1, percent: 2.5 }
    ]
  },
  topStudents: [
    { name: 'Emma Johnson', grade: 98 },
    { name: 'Noah Williams', grade: 96 },
    { name: 'Olivia Brown', grade: 94 }
  ],
  strugglingStudents: [
    { name: 'Liam Davis', grade: 62 },
    { name: 'Ava Miller', grade: 58 }
  ]
};

// Async Thunks with mock data
export const fetchClasses = createAsyncThunk(
  'classes/fetchClasses',
  async () => {
    return mockClasses;
  }
);

export const createClass = createAsyncThunk(
  'classes/createClass',
  async (classData) => {
    return {
      id: `c${mockClasses.length + 1}`,
      ...classData,
      teacher: mockTeachers.find(t => t.id === classData.teacherId)?.name || 'Not assigned',
      students: [],
      avgPerformance: 0
    };
  }
);

export const deleteClass = createAsyncThunk(
  'classes/deleteClass',
  async (classId) => {
    return classId;
  }
);

export const fetchTeachers = createAsyncThunk(
  'classes/fetchTeachers',
  async () => {
    return mockTeachers;
  }
);

export const assignTeacherToClass = createAsyncThunk(
  'classes/assignTeacherToClass',
  async ({ classId, teacherId }) => {
    const teacher = mockTeachers.find(t => t.id === teacherId);
    return {
      classId,
      teacherId,
      teacherName: teacher?.name || 'Not assigned'
    };
  }
);

export const fetchClassReport = createAsyncThunk(
  'classes/fetchClassReport',
  async ({ classId }) => {
    return mockReport;
  }
);

const classesSlice = createSlice({
  name: 'classes',
  initialState: {
    classes: [],
    teachers: [],
    report: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.classes = action.payload;
      })
      .addCase(fetchClasses.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Failed to fetch classes';
      })
      .addCase(createClass.fulfilled, (state, action) => {
        state.classes.push(action.payload);
      })
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.classes = state.classes.filter(c => c.id !== action.payload);
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.teachers = action.payload;
      })
      .addCase(assignTeacherToClass.fulfilled, (state, action) => {
        const classIndex = state.classes.findIndex(c => c.id === action.payload.classId);
        if (classIndex !== -1) {
          state.classes[classIndex].teacherId = action.payload.teacherId;
          state.classes[classIndex].teacher = action.payload.teacherName;
        }
      })
      .addCase(fetchClassReport.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClassReport.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.report = action.payload;
      })
      .addCase(fetchClassReport.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Failed to fetch report';
      });
  }
});

export default classesSlice.reducer;


// // src/Redux/Slices/classesSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Async Thunks
// export const fetchClasses = createAsyncThunk(
//   'classes/fetchClasses',
//   async () => {
//     const response = await fetch('/api/classes');
//     return await response.json();
//   }
// );

// export const createClass = createAsyncThunk(
//   'classes/createClass',
//   async (classData) => {
//     const response = await fetch('/api/classes', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(classData),
//     });
//     return await response.json();
//   }
// );

// export const deleteClass = createAsyncThunk(
//   'classes/deleteClass',
//   async (classId) => {
//     await fetch(`/api/classes/${classId}`, {
//       method: 'DELETE',
//     });
//     return classId;
//   }
// );

// export const fetchTeachers = createAsyncThunk(
//   'classes/fetchTeachers',
//   async () => {
//     const response = await fetch('/api/teachers');
//     return await response.json();
//   }
// );

// export const assignTeacherToClass = createAsyncThunk(
//   'classes/assignTeacherToClass',
//   async ({ classId, teacherId }) => {
//     const response = await fetch(`/api/classes/${classId}/teacher`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ teacherId }),
//     });
//     return await response.json();
//   }
// );

// export const fetchClassReport = createAsyncThunk(
//   'classes/fetchClassReport',
//   async ({ classId, range }) => {
//     const response = await fetch(`/api/classes/${classId}/report?range=${range}`);
//     return await response.json();
//   }
// );

// const classesSlice = createSlice({
//   name: 'classes',
//   initialState: {
//     classes: [],
//     teachers: [],
//     report: null,
//     status: 'idle',
//     error: null
//   },
//   reducers: {
//     // Sync reducers if needed
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchClasses.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchClasses.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.classes = action.payload;
//       })
//       .addCase(fetchClasses.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(createClass.fulfilled, (state, action) => {
//         state.classes.push(action.payload);
//       })
//       .addCase(deleteClass.fulfilled, (state, action) => {
//         state.classes = state.classes.filter(c => c.id !== action.payload);
//       })
//       .addCase(fetchTeachers.fulfilled, (state, action) => {
//         state.teachers = action.payload;
//       })
//       .addCase(assignTeacherToClass.fulfilled, (state, action) => {
//         const classIndex = state.classes.findIndex(c => c.id === action.payload.classId);
//         if (classIndex !== -1) {
//           state.classes[classIndex].teacherId = action.payload.teacherId;
//           state.classes[classIndex].teacher = action.payload.teacherName;
//         }
//       })
//       .addCase(fetchClassReport.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchClassReport.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.report = action.payload;
//       })
//       .addCase(fetchClassReport.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   }
// });

// export default classesSlice.reducer;