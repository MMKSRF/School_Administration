// Select the entire formData object
export const selectFormData = (state) => state.joinSchool.formData;

// Individual field selectors
export const selectFullName = (state) => state.joinSchool.formData.fullName;
export const selectGradeLevel = (state) => state.joinSchool.formData.gradeLevel;
export const selectSection = (state) => state.joinSchool.formData.section;
export const selectStudentId = (state) => state.joinSchool.formData.studentId;
export const selectParentContact = (state) => state.joinSchool.formData.parentContact;
export const selectSubjectsTaught = (state) => state.joinSchool.formData.subjectsTaught;
export const selectPhoneNumber = (state) => state.joinSchool.formData.phoneNumber;
export const selectEmail = (state) => state.joinSchool.formData.email;
export const selectTeacherId = (state) => state.joinSchool.formData.teacherId;
export const selectPassword = (state) => state.joinSchool.formData.password;
export const selectConfirmPassword = (state) => state.joinSchool.formData.confirmPassword;

// Other selectors
export const selectStep = (state) => state.joinSchool.step;
export const selectSelectedSchool = (state) => state.joinSchool.selectedSchool;
export const selectRole = (state) => state.joinSchool.role;
export const selectLoading = (state) => state.joinSchool.loading;
export const selectSuccess = (state) => state.joinSchool.success;