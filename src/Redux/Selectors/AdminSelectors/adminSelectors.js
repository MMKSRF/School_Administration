// Get all announcements
export const selectAnnouncements = (state) => state.admin.announcements;

// Get dismissed announcement IDs
export const selectDismissedAnnouncements = (state) => state.admin.dismissedAnnouncements;
export const selectRecentActivity = (state) => state.admin.recentActivity;

export const miniReport = (state) => state.admin.miniReport;