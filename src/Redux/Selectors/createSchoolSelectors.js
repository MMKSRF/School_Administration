    // Selectors for formData fields
export const selectSchoolName = (state) => state.createSchool.formData.schoolName;
export const selectSchoolId = (state) => state.createSchool.formData.schoolId;
export const selectEmail = (state) => state.createSchool.formData.email;
export const selectAdminName = (state) => state.createSchool.formData.adminName;
export const selectAdminEmail = (state) => state.createSchool.formData.adminEmail;
export const selectPassword = (state) => state.createSchool.formData.password;
export const selectConfirmPassword = (state) => state.createSchool.formData.confirmPassword;
export const selectSchoolType = (state) => state.createSchool.formData.schoolType;
export const selectRegion = (state) => state.createSchool.formData.region;
export const selectPhoneNumber = (state) => state.createSchool.formData.phoneNumber;
export const selectSchoolSize = (state) => state.createSchool.formData.schoolSize;
export const selectAcademicLevels = (state) => state.createSchool.formData.academicLevels;


// Selectors for other top-level state properties
export const selectLoading = (state) => state.createSchool.loading;
export const selectSuccess = (state) => state.createSchool.success;
export const selectError = (state) => state.createSchool.error;
export const selectStep = (state) => state.createSchool.step;
export const selectErrors = (state) => state.createSchool.errors;
