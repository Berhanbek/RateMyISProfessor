import 'dotenv/config';
import Professor from './models/professorModel.js';
import sequelize from './config/db.js';

const professors = [
  {
    id: 'dagmawit-mohammed',
    name: 'W/t Dagmawit Mohammed',
    course: 'Advanced Database',
    office: 'Eshetu Chole 122',
    year: 2,
    rating: 0,
    totalReviews: 0,
    instructors: ['W/t Dagmawit Mohammed']
  },
  {
    id: 'andargachew-asfaw',
    name: 'Ato Andargachew Asfaw',
    course: 'Data Structure and Algorithm',
    office: 'Eshetu Chole 319',
    year: 2,
    rating: 0,
    totalReviews: 0,
    instructors: ['Ato Andargachew Asfaw']
  },
  {
    id: 'adey-edessa',
    name: 'W/ro Adey Edessa',
    course: 'Intro to Storage & Retrieval',
    office: 'Eshetu Chole 113',
    year: 2,
    rating: 0,
    totalReviews: 0,
    instructors: ['W/ro Adey Edessa']
  },
  {
    id: 'lemlem-hagos',
    name: 'W/o Lemlem Hagos',
    course: 'Object Oriented Programming',
    office: 'Eshetu Chole 116',
    year: 2,
    rating: 0,
    totalReviews: 0,
    instructors: ['W/o Lemlem Hagos']
  },
  {
    id: 'birkset',
    name: 'W/ro Birkset',
    course: 'Statistics',
    office: 'Office TBD',
    year: 2,
    rating: 0,
    totalReviews: 0,
    instructors: ['W/ro Birkset']
  },
  {
    id: 'fikadu-dereje',
    name: 'Ato Fikadu Dereje',
    course: 'Economics',
    office: 'Office TBD',
    year: 2,
    rating: 0,
    totalReviews: 0,
    instructors: ['Ato Fikadu Dereje']
  },
  // 3rd Year Professors
  {
    id: 'ecommerce',
    name: 'Dr. Ermias Abebe',
    course: 'E-Commerce',
    office: 'Multiple Offices',
    year: 3,
    rating: 0,
    totalReviews: 0,
    instructors: ['Dr. Ermias Abebe', 'Falema Garedow']
  },
  {
    id: 'advanced-internet-programming',
    name: 'Selam Desta',
    course: 'Advanced Internet Programming',
    office: 'Multiple Offices',
    year: 3,
    rating: 0,
    totalReviews: 0,
    instructors: ['Selam Desta', 'Yesuf Mohamed']
  },
  {
    id: 'admin-systems-networks',
    name: 'Dr. Workshet Lamenew',
    course: 'Admin of Systems & Networks',
    office: 'Faculty Office',
    year: 3,
    rating: 0,
    totalReviews: 0,
    instructors: ['Dr. Workshet Lamenew']
  },
  {
    id: 'mobile-computing',
    name: 'Eyasu Takele',
    course: 'Mobile Computing',
    office: 'Faculty Office',
    year: 3,
    rating: 0,
    totalReviews: 0,
    instructors: ['Eyasu Takele']
  },
  {
    id: 'info-system-security',
    name: 'Dr. Lemma Lessa',
    course: 'Info System Security',
    office: 'Faculty Office',
    year: 3,
    rating: 0,
    totalReviews: 0,
    instructors: ['Dr. Lemma Lessa']
  },
  {
    id: 'oosad',
    name: 'W/o Meseret Hailu',
    course: 'OOSAD',
    office: 'Faculty Office',
    year: 3,
    rating: 0,
    totalReviews: 0,
    instructors: ['W/o Meseret Hailu']
  }
];

const seedProfessors = async () => {
  await sequelize.sync({ force: true }); // WARNING: This will clear existing data!
  await Professor.bulkCreate(professors);
  console.log('✅ Database seeded successfully!');
  console.log(`${professors.length} professors added`);
  process.exit(0);
};

seedProfessors();
