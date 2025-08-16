// src/Redux/Slices/teachersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data
const mockTeachers = [
  {
    id: 't1',
    name: 'Mr. Johnson',
    subjects: ['Mathematics', 'Physics'],
    email: 'johnson@school.edu',
    classes: ['c1']
  },
  {
    id: 't2',
    name: 'Ms. Davis',
    subjects: ['Science', 'Biology'],
    email: 'davis@school.edu',
    classes: ['c2']
  }
];

const mockTeacherRequests = [
  {
    id: 'tr1',
    type: 'resource',
    subject: 'Request for Lab Equipment',
    description: 'Need 5 new microscopes',
    status: 'pending',
    teacherId: 't2'
  }
];

const mockPeriods = [
  { id: 'p1', name: 'Period 1', startTime: '8:00 AM', endTime: '8:45 AM' },
  { id: 'p2', name: 'Period 2', startTime: '9:00 AM', endTime: '9:45 AM' }
];

const mockSchedules = [
  {
    id: 'sch1',
    classId: 'c1',
    teacherId: 't1',
    dayOfWeek: 'Monday',
    periodId: 'p1',
    room: '203'
  }
];

// Async Thunks with mock data
export const fetchTeachers = createAsyncThunk(
  'teachers/fetchTeachers',
  async () => {
    return mockTeachers;
  }
);

export const addTeacher = createAsyncThunk(
  'teachers/addTeacher',
  async (teacherData) => {
    return {
      id: `t${mockTeachers.length + 1}`,
      ...teacherData,
      classes: []
    };
  }
);

export const deleteTeacher = createAsyncThunk(
  'teachers/deleteTeacher',
  async (teacherId) => {
    return teacherId;
  }
);

export const fetchTeacherRequests = createAsyncThunk(
  'teachers/fetchTeacherRequests',
  async () => {
    return mockTeacherRequests;
  }
);

export const respondToRequest = createAsyncThunk(
  'teachers/respondToRequest',
  async ({ id, response }) => {
    return {
      ...mockTeacherRequests.find(r => r.id === id),
      status: 'completed',
      response
    };
  }
);

export const fetchClasses = createAsyncThunk(
  'teachers/fetchClasses',
  async () => {
    return [
      { id: 'c1', name: 'Math 101' },
      { id: 'c2', name: 'Science A' }
    ];
  }
);

export const createSchedule = createAsyncThunk(
  'teachers/createSchedule',
  async (scheduleData) => {
    return {
      id: `sch${mockSchedules.length + 1}`,
      ...scheduleData
    };
  }
);

export const fetchPeriods = createAsyncThunk(
  'teachers/fetchPeriods',
  async () => {
    return mockPeriods;
  }
);

export const addPeriod = createAsyncThunk(
  'teachers/addPeriod',
  async (periodData) => {
    return {
      id: `p${mockPeriods.length + 1}`,
      ...periodData
    };
  }
);

export const updatePeriod = createAsyncThunk(
  'teachers/updatePeriod',
  async ({ id, ...periodData }) => {
    return {
      id,
      ...mockPeriods.find(p => p.id === id),
      ...periodData
    };
  }
);

export const deletePeriod = createAsyncThunk(
  'teachers/deletePeriod',
  async (periodId) => {
    return periodId;
  }
);

const teachersSlice = createSlice({
  name: 'teachers',
  initialState: {
    teachers: [],
    requests: [],
    classes: [],
    periods: [],
    schedules: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.teachers = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Failed to fetch teachers';
      })
      .addCase(addTeacher.fulfilled, (state, action) => {
        state.teachers.push(action.payload);
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.teachers = state.teachers.filter(t => t.id !== action.payload);
      })
      .addCase(fetchTeacherRequests.fulfilled, (state, action) => {
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
      .addCase(createSchedule.fulfilled, (state, action) => {
        state.schedules.push(action.payload);
      })
      .addCase(fetchPeriods.fulfilled, (state, action) => {
        state.periods = action.payload;
      })
      .addCase(addPeriod.fulfilled, (state, action) => {
        state.periods.push(action.payload);
      })
      .addCase(updatePeriod.fulfilled, (state, action) => {
        const index = state.periods.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.periods[index] = action.payload;
        }
      })
      .addCase(deletePeriod.fulfilled, (state, action) => {
        state.periods = state.periods.filter(p => p.id !== action.payload);
      });
  }
});

export default teachersSlice.reducer;

// // src/Redux/Slices/teachersSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Async Thunks
// export const fetchTeachers = createAsyncThunk(
//   'teachers/fetchTeachers',
//   async () => {
//     // API call to fetch teachers
//     const response = await fetch('/api/teachers');
//     return await response.json();
//   }
// );

// export const addTeacher = createAsyncThunk(
//   'teachers/addTeacher',
//   async (teacherData) => {
//     const response = await fetch('/api/teachers', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(teacherData),
//     });
//     return await response.json();
//   }
// );

// export const deleteTeacher = createAsyncThunk(
//   'teachers/deleteTeacher',
//   async (teacherId) => {
//     await fetch(`/api/teachers/${teacherId}`, {
//       method: 'DELETE',
//     });
//     return teacherId;
//   }
// );

// export const fetchTeacherRequests = createAsyncThunk(
//   'teachers/fetchTeacherRequests',
//   async () => {
//     const response = await fetch('/api/teacher-requests');
//     return await response.json();
//   }
// );

// export const respondToRequest = createAsyncThunk(
//   'teachers/respondToRequest',
//   async ({ id, response }) => {
//     const res = await fetch(`/api/teacher-requests/${id}/respond`, {
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
//   'teachers/fetchClasses',
//   async () => {
//     const response = await fetch('/api/classes');
//     return await response.json();
//   }
// );

// export const createSchedule = createAsyncThunk(
//   'teachers/createSchedule',
//   async (scheduleData) => {
//     const response = await fetch('/api/schedules', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(scheduleData),
//     });
//     return await response.json();
//   }
// );

// export const fetchPeriods = createAsyncThunk(
//   'teachers/fetchPeriods',
//   async () => {
//     const response = await fetch('/api/periods');
//     return await response.json();
//   }
// );

// export const addPeriod = createAsyncThunk(
//   'teachers/addPeriod',
//   async (periodData) => {
//     const response = await fetch('/api/periods', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(periodData),
//     });
//     return await response.json();
//   }
// );

// export const updatePeriod = createAsyncThunk(
//   'teachers/updatePeriod',
//   async ({ id, ...periodData }) => {
//     const response = await fetch(`/api/periods/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(periodData),
//     });
//     return await response.json();
//   }
// );

// export const deletePeriod = createAsyncThunk(
//   'teachers/deletePeriod',
//   async (periodId) => {
//     await fetch(`/api/periods/${periodId}`, {
//       method: 'DELETE',
//     });
//     return periodId;
//   }
// );

// const teachersSlice = createSlice({
//   name: 'teachers',
//   initialState: {
//     teachers: [],
//     requests: [],
//     classes: [],
//     periods: [],
//     schedules: [],
//     status: 'idle',
//     error: null
//   },
//   reducers: {
//     // Sync reducers if needed
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchTeachers.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchTeachers.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.teachers = action.payload;
//       })
//       .addCase(fetchTeachers.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(addTeacher.fulfilled, (state, action) => {
//         state.teachers.push(action.payload);
//       })
//       .addCase(deleteTeacher.fulfilled, (state, action) => {
//         state.teachers = state.teachers.filter(t => t.id !== action.payload);
//       })
//       .addCase(fetchTeacherRequests.fulfilled, (state, action) => {
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
//       .addCase(createSchedule.fulfilled, (state, action) => {
//         state.schedules.push(action.payload);
//       })
//       .addCase(fetchPeriods.fulfilled, (state, action) => {
//         state.periods = action.payload;
//       })
//       .addCase(addPeriod.fulfilled, (state, action) => {
//         state.periods.push(action.payload);
//       })
//       .addCase(updatePeriod.fulfilled, (state, action) => {
//         const index = state.periods.findIndex(p => p.id === action.payload.id);
//         if (index !== -1) {
//           state.periods[index] = action.payload;
//         }
//       })
//       .addCase(deletePeriod.fulfilled, (state, action) => {
//         state.periods = state.periods.filter(p => p.id !== action.payload);
//       });
//   }
// });

// export default teachersSlice.reducer;