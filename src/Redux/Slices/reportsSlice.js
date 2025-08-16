
// src/Redux/Slices/reportsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data
const mockAttendanceSummary = {
  daily: [
    { date: '2023-10-01', present: 92, absent: 5, late: 3 },
    { date: '2023-10-02', present: 94, absent: 3, late: 3 },
    { date: '2023-10-03', present: 89, absent: 8, late: 3 },
    { date: '2023-10-04', present: 91, absent: 6, late: 3 },
    { date: '2023-10-05', present: 95, absent: 2, late: 3 }
  ],
  monthly: [
    { month: 'Sep 2023', present: 90, absent: 7, late: 3 },
    { month: 'Oct 2023', present: 92, absent: 5, late: 3 }
  ]
};

const mockPerformanceSummary = {
  overall: 87,
  bySubject: [
    { subject: 'Mathematics', average: 89 },
    { subject: 'Science', average: 92 },
    { subject: 'English', average: 85 },
    { subject: 'History', average: 82 }
  ],
  trends: [
    { month: 'Jul', average: 84 },
    { month: 'Aug', average: 86 },
    { month: 'Sep', average: 87 },
    { month: 'Oct', average: 89 }
  ]
};

// Async Thunks with mock data
export const fetchAttendanceSummary = createAsyncThunk(
  'reports/attendance',
  async () => {
    return mockAttendanceSummary;
  }
);

export const fetchPerformanceSummary = createAsyncThunk(
  'reports/performance',
  async () => {
    return mockPerformanceSummary;
  }
);

const reportsSlice = createSlice({
  name: 'reports',
  initialState: {
    attendanceSummary: null,
    performanceSummary: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendanceSummary.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAttendanceSummary.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.attendanceSummary = action.payload;
      })
      .addCase(fetchAttendanceSummary.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Failed to fetch attendance summary';
      })
      .addCase(fetchPerformanceSummary.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPerformanceSummary.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.performanceSummary = action.payload;
      })
      .addCase(fetchPerformanceSummary.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Failed to fetch performance summary';
      });
  }
});

export default reportsSlice.reducer;

// // src/Redux/Slices/reportsSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Async Thunks
// export const fetchAttendanceSummary = createAsyncThunk(
//   'reports/attendance',
//   async (filters) => {
//     const query = new URLSearchParams(filters).toString();
//     const response = await fetch(`/api/reports/attendance?${query}`);
//     return await response.json();
//   }
// );

// export const fetchPerformanceSummary = createAsyncThunk(
//   'reports/performance',
//   async (filters) => {
//     const query = new URLSearchParams(filters).toString();
//     const response = await fetch(`/api/reports/performance?${query}`);
//     return await response.json();
//   }
// );

// const reportsSlice = createSlice({
//   name: 'reports',
//   initialState: {
//     attendanceSummary: null,
//     performanceSummary: null,
//     status: 'idle',
//     error: null
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAttendanceSummary.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchAttendanceSummary.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.attendanceSummary = action.payload;
//       })
//       .addCase(fetchAttendanceSummary.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(fetchPerformanceSummary.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchPerformanceSummary.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.performanceSummary = action.payload;
//       })
//       .addCase(fetchPerformanceSummary.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   }
// });

// export default reportsSlice.reducer;