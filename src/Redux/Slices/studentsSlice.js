// src/Redux/Slices/studentsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data
const mockStudents = [
  {
    id: 's1',
    name: 'Emma Johnson',
    grade: 9,
    email: 'emma@school.edu',
    classes: ['c1']
  },
  {
    id: 's2',
    name: 'Noah Williams',
    grade: 9,
    email: 'noah@school.edu',
    classes: ['c1']
  },
  {
    id: 's3',
    name: 'Olivia Brown',
    grade: 10,
    email: 'olivia@school.edu',
    classes: ['c2']
  }
];

const mockStudentRequests = [
  {
    id: 'sr1',
    type: 'transfer',
    subject: 'Class Transfer Request',
    description: 'I want to transfer to Math 102',
    status: 'pending',
    studentId: 's1'
  }
];

const mockAttendance = [
  {
    id: 'a1',
    studentId: 's1',
    date: '2023-10-01',
    status: 'present'
  },
  {
    id: 'a2',
    studentId: 's1',
    date: '2023-10-02',
    status: 'absent',
    notes: 'Sick leave'
  }
];

// Async Thunks with mock data
export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async () => {
    return mockStudents;
  }
);

export const enrollStudent = createAsyncThunk(
  'students/enrollStudent',
  async (studentData) => {
    return {
      id: `s${mockStudents.length + 1}`,
      ...studentData,
      classes: []
    };
  }
);

export const deleteStudent = createAsyncThunk(
  'students/deleteStudent',
  async (studentId) => {
    return studentId;
  }
);

export const fetchStudentRequests = createAsyncThunk(
  'students/fetchStudentRequests',
  async () => {
    return mockStudentRequests;
  }
);

export const respondToRequest = createAsyncThunk(
  'students/respondToRequest',
  async ({ id, response }) => {
    return {
      ...mockStudentRequests.find(r => r.id === id),
      status: 'completed',
      response
    };
  }
);

export const fetchClasses = createAsyncThunk(
  'students/fetchClasses',
  async () => {
    return [
      { id: 'c1', name: 'Math 101' },
      { id: 'c2', name: 'Science A' }
    ];
  }
);

export const assignStudentToClass = createAsyncThunk(
  'students/assignStudentToClass',
  async ({ classId, studentIds }) => {
    return {
      classId,
      updatedStudents: mockStudents.map(s => 
        studentIds.includes(s.id) 
          ? { ...s, classes: [...(s.classes || []), classId] } 
          : s
      )
    };
  }
);

export const fetchAttendance = createAsyncThunk(
  'students/fetchAttendance',
  async () => {
    return mockAttendance;
  }
);

export const updateAttendance = createAsyncThunk(
  'students/updateAttendance',
  async ({ recordId, status, notes }) => {
    return {
      ...mockAttendance.find(a => a.id === recordId),
      status,
      notes
    };
  }
);

const studentsSlice = createSlice({
  name: 'students',
  initialState: {
    students: [],
    requests: [],
    classes: [],
    attendance: [],
    status: 'idle',
    error: null
  },
  reducers: {},



  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Failed to fetch students';
      })
      .addCase(enrollStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(s => s.id !== action.payload);
      })
      .addCase(fetchStudentRequests.fulfilled, (state, action) => {
        state.requests = action.payload;
      })
      .addCase(respondToRequest.fulfilled, (state, action) => {
        const index = state.requests.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.requests[index] = action.payload;
        }
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.classes = action.payload;
      })
      .addCase(assignStudentToClass.fulfilled, (state, action) => {
        action.payload.updatedStudents.forEach(updatedStudent => {
          const index = state.students.findIndex(s => s.id === updatedStudent.id);
          if (index !== -1) {
            state.students[index] = updatedStudent;
          }
        });
      })
      .addCase(fetchAttendance.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAttendance.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.attendance = action.payload;
      })
      .addCase(fetchAttendance.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Failed to fetch attendance';
      })
      .addCase(updateAttendance.fulfilled, (state, action) => {
        const index = state.attendance.findIndex(a => a.id === action.payload.id);
        if (index !== -1) {
          state.attendance[index] = action.payload;
        }
      });
  }



});

export default studentsSlice.reducer;




// // src/Redux/Slices/studentsSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Async Thunks
// export const fetchStudents = createAsyncThunk(
//   'students/fetchStudents',
//   async () => {
//     const response = await fetch('/api/students');
//     return await response.json();
//   }
// );

// export const enrollStudent = createAsyncThunk(
//   'students/enrollStudent',
//   async (studentData) => {
//     const response = await fetch('/api/students', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(studentData),
//     });
//     return await response.json();
//   }
// );

// export const deleteStudent = createAsyncThunk(
//   'students/deleteStudent',
//   async (studentId) => {
//     await fetch(`/api/students/${studentId}`, {
//       method: 'DELETE',
//     });
//     return studentId;
//   }
// );

// export const fetchStudentRequests = createAsyncThunk(
//   'students/fetchStudentRequests',
//   async () => {
//     const response = await fetch('/api/student-requests');
//     return await response.json();
//   }
// );

// export const respondToRequest = createAsyncThunk(
//   'students/respondToRequest',
//   async ({ id, response }) => {
//     const res = await fetch(`/api/student-requests/${id}/respond`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ response }),
//     });
//     return await res.json();
//   }
// );

// export const fetchClasses = createAsyncThunk(
//   'students/fetchClasses',
//   async () => {
//     const response = await fetch('/api/classes');
//     return await response.json();
//   }
// );

// export const assignStudentToClass = createAsyncThunk(
//   'students/assignStudentToClass',
//   async ({ classId, studentIds }) => {
//     const response = await fetch(`/api/classes/${classId}/students`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ studentIds }),
//     });
//     return await response.json();
//   }
// );

// export const fetchAttendance = createAsyncThunk(
//   'students/fetchAttendance',
//   async (dateRange) => {
//     const response = await fetch(`/api/attendance?start=${dateRange.start}&end=${dateRange.end}`);
//     return await response.json();
//   }
// );

// export const updateAttendance = createAsyncThunk(
//   'students/updateAttendance',
//   async ({ recordId, status, notes }) => {
//     const response = await fetch(`/api/attendance/${recordId}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ status, notes }),
//     });
//     return await response.json();
//   }
// );

// const studentsSlice = createSlice({
//   name: 'students',
//   initialState: {
//     students: [],
//     requests: [],
//     classes: [],
//     attendance: [],
//     status: 'idle',
//     error: null
//   },
//   reducers: {
//     // Sync reducers if needed
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchStudents.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchStudents.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.students = action.payload;
//       })
//       .addCase(fetchStudents.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(enrollStudent.fulfilled, (state, action) => {
//         state.students.push(action.payload);
//       })
//       .addCase(deleteStudent.fulfilled, (state, action) => {
//         state.students = state.students.filter(s => s.id !== action.payload);
//       })
//       .addCase(fetchStudentRequests.fulfilled, (state, action) => {
//         state.requests = action.payload;
//       })
//       .addCase(respondToRequest.fulfilled, (state, action) => {
//         const index = state.requests.findIndex(r => r.id === action.payload.id);
//         if (index !== -1) {
//           state.requests[index] = action.payload;
//         }
//       })
//       .addCase(fetchClasses.fulfilled, (state, action) => {
//         state.classes = action.payload;
//       })
//       .addCase(assignStudentToClass.fulfilled, (state, action) => {
//         // Update students' class assignments
//         action.payload.updatedStudents.forEach(updatedStudent => {
//           const index = state.students.findIndex(s => s.id === updatedStudent.id);
//           if (index !== -1) {
//             state.students[index] = updatedStudent;
//           }
//         });
//         // Update class student list
//         const classIndex = state.classes.findIndex(c => c.id === action.payload.classId);
//         if (classIndex !== -1) {
//           state.classes[classIndex].students = action.payload.updatedClass.students;
//         }
//       })
//       .addCase(fetchAttendance.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchAttendance.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.attendance = action.payload;
//       })
//       .addCase(fetchAttendance.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(updateAttendance.fulfilled, (state, action) => {
//         const index = state.attendance.findIndex(a => a.id === action.payload.id);
//         if (index !== -1) {
//           state.attendance[index] = action.payload;
//         }
//       });
//   }
// });

// export default studentsSlice.reducer;