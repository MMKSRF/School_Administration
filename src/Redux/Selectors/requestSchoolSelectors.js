// Base Selector
export const selectFormData = (state) => state.requestSchool.formData;

// Step 1: Recheck Fields
export const selectSearchSchool = (state) => state.requestSchool.formData.searchSchool;
export const selectSearchRegion = (state) => state.requestSchool.formData.searchRegion;

// Step 2: Requester Info
export const selectFullName = (state) => state.requestSchool.formData.fullName;
export const selectRequesterRole = (state) => state.requestSchool.formData.requesterRole;
export const selectPhoneNumber = (state) => state.requestSchool.formData.phoneNumber;
export const selectEmail = (state) => state.requestSchool.formData.email;

// Step 3: School Info
export const selectSchoolName = (state) => state.requestSchool.formData.schoolName;
export const selectSchoolType = (state) => state.requestSchool.formData.schoolType;
export const selectGradeRange = (state) => state.requestSchool.formData.gradeRange;
export const selectRegion = (state) => state.requestSchool.formData.region;
export const selectSubCity = (state) => state.requestSchool.formData.subCity;
export const selectWoreda = (state) => state.requestSchool.formData.woreda;
export const selectSchoolEmail = (state) => state.requestSchool.formData.schoolEmail;
export const selectSchoolPhone = (state) => state.requestSchool.formData.schoolPhone;
export const selectSchoolWebsite = (state) => state.requestSchool.formData.schoolWebsite;
export const selectNotes = (state) => state.requestSchool.formData.notes;

// Step 4: Upload
export const selectDocument = (state) => state.requestSchool.formData.document;

// Other Selectors
export const selectStep = (state) => state.requestSchool.step;
export const selectSearchResults = (state) => state.requestSchool.searchResults;
export const selectSchoolFound = (state) => state.requestSchool.schoolFound;
export const selectLoading = (state) => state.requestSchool.loading;
export const selectSuccess = (state) => state.requestSchool.success;