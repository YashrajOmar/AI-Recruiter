// import { Calendar, Clock } from 'lucide-react'
// import moment from 'moment'
// import React from 'react'

// function InterviewDetailContainer({interviewDetail}) {
//   return (
//     <div className='p-5 rounded-l mt-5 lg:pr-52'>
//         <h2>{interviewDetail?.jobPosition}</h2>
//         <div className='mt-4 items-center justify-between'>
//             <div className='mt-4'>
//                 <h2 className='text-gray-500 text-sm'>Duration</h2>
//                 <h2 className='flex text-sm font-bold items-center gap-2'><Clock className='h-4 w-4'/>{interviewDetail?.duration}</h2>
//             </div>
//             <div className='mt-4'>
//                 <h2 className='text-gray-500 text-sm'>Created On</h2>
//                 <h2 className='flex text-sm font-bold items-center gap-2'><Calendar className='h-4 w-4'/>{moment(interviewDetail?.created_at).format('MMM DD, YYYY')}</h2>
//             </div>
//             {interviewDetail?.type&&<div className='mt-4'>
//                 <h2 className='text-gray-500 text-sm'>Type</h2>
//                 <h2 className='flex text-sm font-bold items-center gap-2'><Clock className='h-4 w-4'/>{JSON.parse(interviewDetail?.type)[0]}</h2>
//             </div>}
//         </div>
//         <div className="mt-5">
//         <h2 className='font-bold'>Job Description</h2>
//         <p className='text-sm leading-6'>{interviewDetail?.jobDescription}</p>
//         </div>
//         <div className="mt-5">
//         <h2 className='font-bold'>Interview Questions</h2>
//         <div className='grid grid-cols-2 gap-3'>{interviewDetail?.questionList.map((item,index)=>(
//             <h2 className='text-xs mt-3'>{index+1}.{item?.question}</h2>
//         ))}</div>
//         </div>

//     </div>
//   )
// }

// export default InterviewDetailContainer




import { Calendar, Clock } from 'lucide-react'
import moment from 'moment'
import React from 'react'

function InterviewDetailContainer({ interviewDetail }) {
  if (!interviewDetail) return <div>Loading interview details...</div>;

  return (
    <div className='p-5 rounded-l mt-5 lg:pr-52'>
      <h2 className='text-xl font-semibold'>{interviewDetail.jobPosition}</h2>
      
      <div className='mt-4 flex flex-wrap gap-4 items-center justify-between'>
        <div className='mt-4'>
          <h2 className='text-gray-500 text-sm'>Duration</h2>
          <h2 className='flex text-sm font-bold items-center gap-2'>
            <Clock className='h-4 w-4'/>{interviewDetail.duration}
          </h2>
        </div>
        
        <div className='mt-4'>
          <h2 className='text-gray-500 text-sm'>Created On</h2>
          <h2 className='flex text-sm font-bold items-center gap-2'>
            <Calendar className='h-4 w-4'/>
            {moment(interviewDetail.created_at).format('MMM DD, YYYY')}
          </h2>
        </div>
        
        {interviewDetail.type && (
          <div className='mt-4'>
            <h2 className='text-gray-500 text-sm'>Type</h2>
            <h2 className='flex text-sm font-bold items-center gap-2'>
              <Clock className='h-4 w-4'/>
              {(() => {
                try {
                  return JSON.parse(interviewDetail.type || '[]')[0];
                } catch {
                  return 'N/A';
                }
              })()}
            </h2>
          </div>
        )}
      </div>
      
      <div className="mt-5">
        <h2 className='font-bold'>Job Description</h2>
        <p className='text-sm leading-6'>{interviewDetail.jobDescription || 'No description provided'}</p>
      </div>
      
      {interviewDetail.questionList?.length > 0 && (
        <div className="mt-5">
          <h2 className='font-bold'>Interview Questions</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            {interviewDetail.questionList.map((item, index) => (
              <div key={`question-${index}`} className='text-xs mt-3'>
                {index+1}. {item.question}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default InterviewDetailContainer