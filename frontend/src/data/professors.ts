import { Professor } from '../types';

export const professors: Professor[] = [
  // 2nd Year Professors
  {
    id: 'dagmawit-mohammed',
    name: 'W/t Dagmawit Mohammed',
    course: 'Advanced Database',
    office: 'Eshetu Chole 122',
    year: 2
  },
  {
    id: 'andargachew-asfaw',
    name: 'Ato Andargachew Asfaw',
    course: 'Data Structure and Algorithm',
    office: 'Eshetu Chole 319',
    year: 2
  },
  {
    id: 'adey-edessa',
    name: 'W/ro Adey Edessa',
    course: 'Intro to Storage and Retrieval',
    office: 'Eshetu Chole 113',
    year: 2
  },
  {
    id: 'lemlem-hagos',
    name: 'W/o Lemlem Hagos',
    course: 'OOP',
    office: 'Eshetu Chole 116',
    year: 2
  },
  {
    id: 'birkset',
    name: 'W/ro Birkset',
    course: 'Statistics',
    office: 'Office TBD',
    year: 2
  },
  {
    id: 'fikadu-dereje',
    name: 'Ato Fikadu Dereje',
    course: 'Economics',
    office: 'Office TBD',
    year: 2
  },
  // 3rd Year Professors
  {
    id: 'ecommerce-instructors',
    name: 'E-Commerce Instructors',
    course: 'E-Commerce',
    office: 'Various',
    year: 3,
    instructors: ['Dr Ermias Abebe', 'Falema Garedow']
  },
  {
    id: 'aip-instructors',
    name: 'Advanced Internet Programming Instructors',
    course: 'Advanced Internet Programming',
    office: 'Various',
    year: 3,
    instructors: ['Selam Desta', 'Yesuf Mohamed']
  },
  {
    id: 'workshet-lamenew',
    name: 'Dr Workshet Lamenew',
    course: 'Systems & Network Administration',
    office: 'Faculty Office',
    year: 3
  },
  {
    id: 'eyasu-takele',
    name: 'Eyasu Takele',
    course: 'Mobile Computing',
    office: 'Faculty Office',
    year: 3
  },
  {
    id: 'lemma-lessa',
    name: 'Dr Lemma Lessa',
    course: 'Information System Security',
    office: 'Faculty Office',
    year: 3
  },
  {
    id: 'meseret-hailu',
    name: 'W/o Meseret Hailu',
    course: 'OOSAD',
    office: 'Faculty Office',
    year: 3
  }
];