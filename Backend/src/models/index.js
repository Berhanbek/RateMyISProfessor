import Professor from './professorModel.js';
import Rating from './ratingModel.js';

Professor.hasMany(Rating, { foreignKey: 'professorId' });
Rating.belongsTo(Professor, { foreignKey: 'professorId' });

export { Professor, Rating };