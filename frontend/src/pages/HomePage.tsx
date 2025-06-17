import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen } from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="mb-16">
        <img 
          src="/image.png" 
          alt="SIS Logo" 
          className="w-16 h-16 object-contain mx-auto mb-8"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        
        <h1 className="text-h1 text-neutral-900 dark:text-white font-sans mb-4">
          Rate My IS Professors
        </h1>
        
        <p className="text-body text-neutral-600 dark:text-neutral-400 font-body max-w-lg mx-auto">
          Help fellow students by sharing your experience with Information Science professors and courses.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-h2 text-neutral-900 dark:text-white font-sans mb-8">
          Which year are you in?
        </h2>
        
        <div className="space-y-4 max-w-md mx-auto">
          <button
            onClick={() => navigate('/year/2')}
            className="w-full flex items-center gap-4 p-6 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 transition-colors text-left"
          >
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <div className="text-h3 text-neutral-900 dark:text-white font-sans">
                2nd Year
              </div>
              <div className="text-body text-neutral-600 dark:text-neutral-400 font-body">
                Rate your core IS professors
              </div>
            </div>
          </button>
          
          <button
            onClick={() => navigate('/year/3')}
            className="w-full flex items-center gap-4 p-6 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-accent-500 dark:hover:border-accent-500 transition-colors text-left"
          >
            <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-accent-600" />
            </div>
            <div>
              <div className="text-h3 text-neutral-900 dark:text-white font-sans">
                3rd Year
              </div>
              <div className="text-body text-neutral-600 dark:text-neutral-400 font-body">
                Rate your advanced course instructors
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div>
          <h3 className="text-h3 text-neutral-900 dark:text-white font-sans mb-2">
            Student-Led
          </h3>
          <p className="text-body text-neutral-600 dark:text-neutral-400 font-body">
            Built by IS students, for IS students
          </p>
        </div>

        <div>
          <h3 className="text-h3 text-neutral-900 dark:text-white font-sans mb-2">
            Comprehensive
          </h3>
          <p className="text-body text-neutral-600 dark:text-neutral-400 font-body">
            Rate multiple aspects of each course
          </p>
        </div>

        <div>
          <h3 className="text-h3 text-neutral-900 dark:text-white font-sans mb-2">
            Helpful
          </h3>
          <p className="text-body text-neutral-600 dark:text-neutral-400 font-body">
            Make informed decisions about courses
          </p>
        </div>
      </div>
    </div>
  );
};