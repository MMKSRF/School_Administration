
// src/Redux/Slices/requestsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data
const mockRequests = [
  {
    id: 'r1',
    type: 'leave',
    subject: 'Leave Request - Medical',
    description: 'I need 3 days off for medical reasons',
    status: 'pending',
    priority: 'high',
    requesterName: 'John Smith',
    requesterType: 'teacher',
    requesterEmail: 'john@school.edu',
    createdAt: '2023-10-01T08:30:00Z',
    attachments: [
      { name: 'medical_certificate.pdf', url: '#', id: 'a1' }
    ]
  },
  {
    id: 'r2',
    type: 'resource',
    subject: 'Request for Science Lab Equipment',
    description: 'Need 5 new microscopes for biology classes',
    status: 'approved',
    priority: 'medium',
    requesterName: 'Sarah Johnson',
    requesterType: 'teacher',
    requesterEmail: 'sarah@school.edu',
    createdAt: '2023-10-03T10:15:00Z',
    response: 'Approved. Equipment will arrive next week.',
    handler: 'Admin User',
    updatedAt: '2023-10-04T09:20:00Z'
  }
];

// Async Thunks with mock data
export const fetchAllRequests = createAsyncThunk(
  'requests/fetchAll',
  async () => {
    return mockRequests;
  }
);

export const fetchRequestDetails = createAsyncThunk(
  'requests/fetchDetails',
  async (requestId) => {
    return mockRequests.find(r => r.id === requestId) || null;
  }
);

export const updateRequestStatus = createAsyncThunk(
  'requests/updateStatus',
  async ({ id, status, response }) => {
    const request = mockRequests.find(r => r.id === id);
    if (!request) return null;
    
    return {
      ...request,
      status,
      response,
      handler: 'Admin User',
      updatedAt: new Date().toISOString()
    };
  }
);

const requestsSlice = createSlice({
  name: 'requests',
  initialState: {
    requests: [],
    request: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRequests.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllRequests.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.requests = action.payload;
      })
      .addCase(fetchAllRequests.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Failed to fetch requests';
      })
      .addCase(fetchRequestDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRequestDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.request = action.payload;
      })
      .addCase(fetchRequestDetails.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Failed to fetch request details';
      })
      .addCase(updateRequestStatus.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.requests.findIndex(r => r.id === action.payload.id);
          if (index !== -1) {
            state.requests[index] = action.payload;
          }
          if (state.request && state.request.id === action.payload.id) {
            state.request = action.payload;
          }
        }
      });
  }
});

export default requestsSlice.reducer;
// // src/Redux/Slices/requestsSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// // Async Thunks
// export const fetchAllRequests = createAsyncThunk(
//   'requests/fetchAll',
//   async () => {
//     const response = await fetch('/api/requests');
//     return await response.json();
//   }
// );

// export const fetchRequestDetails = createAsyncThunk(
//   'requests/fetchDetails',
//   async (requestId) => {
//     const response = await fetch(`/api/requests/${requestId}`);
//     return await response.json();
//   }
// );

// export const updateRequestStatus = createAsyncThunk(
//   'requests/updateStatus',
//   async ({ id, status, response }) => {
//     const res = await fetch(`/api/requests/${id}/status`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ status, response }),
//     });
//     return await res.json();
//   }
// );

// const requestsSlice = createSlice({
//   name: 'requests',
//   initialState: {
//     requests: [],
//     request: null,
//     status: 'idle',
//     error: null
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllRequests.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchAllRequests.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.requests = action.payload;
//       })
//       .addCase(fetchAllRequests.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(fetchRequestDetails.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchRequestDetails.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.request = action.payload;
//       })
//       .addCase(fetchRequestDetails.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(updateRequestStatus.fulfilled, (state, action) => {
//         const index = state.requests.findIndex(r => r.id === action.payload.id);
//         if (index !== -1) {
//           state.requests[index] = action.payload;
//         }
//         if (state.request && state.request.id === action.payload.id) {
//           state.request = action.payload;
//         }
//       });
//   }
// });

// export default requestsSlice.reducer;