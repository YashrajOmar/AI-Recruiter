// import { Button } from '@/components/ui/button'
// import React from 'react'
// import CandidateFeedbackDialog from './CandidateFeedbackDialog'
// import moment from 'moment'

// function CandidateList({CandidateList}) {
//   return (
//     <div className=''>
        
//         {CandidateList.map((candidate,index)=>{
            
//             <div key={index} className='p-5 flex gap-3 items-center bg-white rounded-lg justify-between'>
//                 <h2 className='font-bold my-5'>Candidates({candidate?.length})</h2>
//                 <div className='flex items-center gap-5'>
//                 <h2 className='bg-primary p-3 px-4.5 text-white font-bold rounded-full'>{candidate.userName[0]}</h2>
//                 <div>
//                     <h2 className='font-bold'>{candidate?.userName}</h2>
//                     <h2 className='text-sm text-gray-500'>Completed On: {moment(candidate?.created_at).format('MMM DD,YYYY')}</h2>
//                 </div>
//                 </div>
//                 <div className='flex gap-3 items-center'>
//                 <h2 className='text-green-600'>6/10</h2>
//                 <CandidateFeedbackDialog candidate={candidate}/>
//                 </div>
//             </div>
//         })}

//     </div>
//   )
// }

// export default CandidateList
import React from 'react';
import moment from 'moment';
import CandidateFeedbackDialog from './CandidateFeedbackDialog';

function CandidateList({ CandidateList = [] }) {
  if (!CandidateList?.length) return <div className="p-4 text-gray-500">No feedback available yet</div>;

  // Calculate average rating
  const calculateAverage = (ratings) => {
    if (!ratings) return 0;
    const values = Object.values(ratings);
    return (values.reduce((sum, val) => sum + val, 0) / values.length).toFixed(1);
  };

  // Get recommendation color
  const getRecommendationColor = (msg) => {
    if (!msg) return 'gray';
    return msg.toLowerCase().includes('recommend') || 
           msg.toLowerCase().includes('hire') ? 'green' : 'red';
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">Candidate Feedback ({CandidateList.length})</h2>
      
      {CandidateList.map((candidate, index) => {
        const averageRating = calculateAverage(candidate?.feedback?.rating);
        const recommendationColor = getRecommendationColor(candidate?.feedback?.recommendationMsg);

        return (
          <div key={index} className="p-6 bg-white rounded-lg shadow">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Candidate Info */}
              <div className="flex items-center gap-4">
                <div className="bg-primary text-white font-bold rounded-full w-10 h-10 flex items-center justify-center">
                  {candidate?.userName?.[0]?.toUpperCase() || '?'}
                </div>
                <div>
                  <h3 className="font-bold">{candidate.userName}</h3>
                  <p className="text-sm text-gray-500">
                    Submitted: {moment(candidate.created_at).format('MMM D, YYYY')}
                  </p>
                </div>
              </div>

              {/* Average Rating */}
              <div className="text-center">
                <p className="text-sm text-gray-500">Overall</p>
                <p className={`text-xl font-bold ${
                  averageRating >= 7 ? 'text-green-600' : 
                  averageRating >= 5 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {averageRating}/10
                </p>
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {candidate?.feedback?.rating && Object.entries(candidate.feedback.rating).map(([category, score]) => (
                <div key={category} className="border p-3 rounded">
                  <p className="text-sm text-gray-500 capitalize">{category}</p>
                  <p className="font-bold">{score}/10</p>
                </div>
              ))}
            </div>

            {/* Recommendation */}
            {candidate?.feedback?.recommendationMsg && (
              <div className={`mt-4 p-3 rounded ${
                recommendationColor === 'green' ? 'bg-green-50 text-green-800' :
                recommendationColor === 'red' ? 'bg-red-50 text-red-800' : 'bg-gray-50'
              }`}>
                <p className="font-medium">Recommendation:</p>
                <p>{candidate.feedback.recommendationMsg}</p>
              </div>
            )}

            {/* Feedback Dialog */}
            <div className="mt-4 flex justify-end">
              <CandidateFeedbackDialog candidate={candidate} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CandidateList;