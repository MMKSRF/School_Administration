export const selectFormData = (state) => state.login.formData;

export const selectSchoolId = (state) => state.login.formData.schoolId;
export const selectUserId = (state) => state.login.formData.userId;
export const selectPassword = (state) => state.login.formData.password;

export const selectLoading = (state) => state.login.loading;
export const selectErrors = (state) => state.login.errors;
export const selectShowPassword = (state) => state.login.showPassword;

export const selectNewErrors = (state) => state.login.newErrors;