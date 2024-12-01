export const enrollUser = (userData, programId) => {
  // Get existing enrollments or initialize empty object
  const enrollments = JSON.parse(localStorage.getItem('enrollments') || '{}');
  
  // Add new enrollment
  enrollments[programId] = {
    ...userData,
    enrolledAt: new Date().toISOString(),
    programId
  };
  
  // Save to localStorage
  localStorage.setItem('enrollments', JSON.stringify(enrollments));
};

export const checkEnrollment = (programId) => {
  const enrollments = JSON.parse(localStorage.getItem('enrollments') || '{}');
  return !!enrollments[programId];
};

export const getUserEnrollments = () => {
  return JSON.parse(localStorage.getItem('enrollments') || '{}');
}; 