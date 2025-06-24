export const selectSetFormData = (state) => state.forgotPassword.formData;


export const selectSchoolId = (state) => state.forgotPassword.formData.schoolId;
export const selectRole = (state) => state.forgotPassword.formData.role;
export const selectContact = (state) => state.forgotPassword.formData.contact;
export const selectResetCode = (state) => state.forgotPassword.formData.resetCode;
export const selectConfirmPassword = (state) => state.forgotPassword.formData.confirmPassword;
export const selectNewPassword = (state) => state.forgotPassword.formData.newPassword;


export const selectLoading = (state) => state.forgotPassword.loading;
export const selectErrors = (state)=> state.forgotPassword.errors;
export const selectStep = (state) => state.forgotPassword.step;
export const selectCountdown = (state) => state.forgotPassword.countdown;
