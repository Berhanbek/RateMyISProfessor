export const validateRating = (ratingData) => {
    const errors = [];
    
    if (!ratingData.professorId) {
      errors.push('Professor ID is required');
    }
    
    if (!ratingData.ratings) {
      errors.push('Ratings object is required');
      return errors;
    }
    
    const ratingFields = [
      'overallExperience',
      'courseLoad',
      'examFairness',
      'courseContent'
    ];
    
    for (const field of ratingFields) {
      const value = ratingData.ratings[field];
      if (value === undefined || value === null) {
        errors.push(`${field} is required`);
      } else if (typeof value !== 'number' || value < 1 || value > 5) {
        errors.push(`${field} must be a number between 1 and 5`);
      }
    }
    
    return errors;
  };