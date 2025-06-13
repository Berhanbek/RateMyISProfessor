import { Professor, RatingCriteria } from '../types';

export const secondYearProfessors: Professor[] = [
  {
    id: 'dagmawit-mohammed',
    name: 'W/t Dagmawit Mohammed',
    course: 'Advanced Database',
    office: 'Eshetu Chole 122'
  },
  {
    id: 'andargachew-asfaw',
    name: 'Ato Andargachew Asfaw',
    course: 'Data Structure and Algorithm',
    office: 'Eshetu Chole 319'
  },
  {
    id: 'adey-edessa',
    name: 'W/ro Adey Edessa',
    course: 'Intro to Storage and Retrieval',
    office: 'Eshetu Chole 113'
  },
  {
    id: 'lemlem-hagos',
    name: 'W/o Lemlem Hagos',
    course: 'OOP',
    office: 'Eshetu Chole 116'
  },
  {
    id: 'birkset',
    name: 'W/ro Birkset',
    course: 'Statistics',
    office: 'Office TBD'
  },
  {
    id: 'fikadu-dereje',
    name: 'Ato Fikadu Dereje',
    course: 'Economics',
    office: 'Office TBD'
  }
];

export const thirdYearProfessors: Professor[] = [
  {
    id: 'ecommerce',
    name: 'E-Commerce',
    course: 'E-Commerce',
    office: 'Multiple Offices',
    instructors: ['Dr Ermias Abebe', 'Falema Garedow']
  },
  {
    id: 'advanced-internet',
    name: 'Advanced Internet Programming',
    course: 'Advanced Internet Programming',
    office: 'Multiple Offices',
    instructors: ['Selam Desta', 'Yesuf Mohamed']
  },
  {
    id: 'workshet-lamenew',
    name: 'Dr Workshet Lamenew',
    course: 'Administration of Systems & Networks',
    office: 'Faculty Office'
  },
  {
    id: 'eyasu-takele',
    name: 'Eyasu Takele',
    course: 'Mobile Computing',
    office: 'Faculty Office'
  },
  {
    id: 'lemma-lessa',
    name: 'Dr Lemma Lessa',
    course: 'Information System Security',
    office: 'Faculty Office'
  },
  {
    id: 'meseret-hailu',
    name: 'W/o Meseret Hailu',
    course: 'OOSAD',
    office: 'Faculty Office'
  }
];

export const ratingCriteria: RatingCriteria[] = [
  {
    label: 'Overall Experience',
    key: 'overallExperience',
    description: 'How satisfied are you with this instructor overall?',
    icon: '⭐'
  },
  {
    label: 'Course Load',
    key: 'courseLoad',
    description: 'How manageable is the workload for this course?',
    icon: '📚'
  },
  {
    label: 'Exam Fairness',
    key: 'examFairness',
    description: 'How fair and reasonable are the exams?',
    icon: '📝'
  },
  {
    label: 'Course Content',
    key: 'courseContent',
    description: 'How relevant and engaging is the course content?',
    icon: '📘'
  }
];