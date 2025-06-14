import db from './db.js'; // ✅ use default import


const seedProfessors = async () => {
  await db.read();

  const ratings = db.data.ratings || [];

  const professors = [
    // 2nd Year
    {
      id: 'dagmawit-mohammed',
      name: 'W/t Dagmawit Mohammed',
      course: 'Advanced Database',
      office: 'Eshetu Chole 122',
      year: '2nd'
    },
    {
      id: 'andargachew-asfaw',
      name: 'Ato Andargachew Asfaw',
      course: 'Data Structure and Algorithm',
      office: 'Eshetu Chole 319',
      year: '2nd'
    },
    {
      id: 'adey-edessa',
      name: 'W/ro Adey Edessa',
      course: 'Intro to Storage & Retrieval',
      office: 'Eshetu Chole 113',
      year: '2nd'
    },
    {
      id: 'lemlem-hagos',
      name: 'W/o Lemlem Hagos',
      course: 'Object Oriented Programming',
      office: 'Eshetu Chole 116',
      year: '2nd'
    },
    {
      id: 'birkset',
      name: 'W/ro Birkset',
      course: 'Statistics',
      office: 'Office TBD',
      year: '2nd'
    },
    {
      id: 'fikadu-dereje',
      name: 'Ato Fikadu Dereje',
      course: 'Economics',
      office: 'Office TBD',
      year: '2nd'
    },

    // 3rd Year
    {
      id: 'ecommerce',
      name: 'E-Commerce',
      course: 'E-Commerce',
      instructors: ['Dr Ermias Abebe', 'Falema Garedow'],
      office: 'Multiple Offices',
      year: '3rd'
    },
    {
      id: 'advanced-internet-programming',
      name: 'Advanced Internet Programming',
      course: 'Advanced Internet Programming',
      instructors: ['Selam Desta', 'Yesuf Mohamed'],
      office: 'Multiple Offices',
      year: '3rd'
    },
    {
      id: 'admin-systems-networks',
      name: 'Admin of Systems & Networks',
      course: 'Admin of Systems & Networks',
      instructors: ['Dr Workshet Lamenew'],
      office: 'Faculty Office',
      year: '3rd'
    },
    {
      id: 'mobile-computing',
      name: 'Mobile Computing',
      course: 'Mobile Computing',
      instructors: ['Eyasu Takele'],
      office: 'Faculty Office',
      year: '3rd'
    },
    {
      id: 'info-system-security',
      name: 'Info System Security',
      course: 'Info System Security',
      instructors: ['Dr Lemma Lessa'],
      office: 'Faculty Office',
      year: '3rd'
    },
    {
      id: 'oosad',
      name: 'OOSAD',
      course: 'OOSAD',
      instructors: ['W/o Meseret Hailu'],
      office: 'Faculty Office',
      year: '3rd'
    }
  ];

  // Only seed if no professors exist
  if (!db.data.professors || db.data.professors.length === 0) {
    db.data.professors = professors;
    db.data.ratings = ratings;
    await db.write();
    console.log('✅ Database seeded successfully!');
    console.log(`${professors.length} professors added`);
    console.log(`${ratings.length} ratings preserved`);
  } else {
    console.log('ℹ️ Seeding skipped — professors already exist.');
  }
};

export default seedProfessors;
