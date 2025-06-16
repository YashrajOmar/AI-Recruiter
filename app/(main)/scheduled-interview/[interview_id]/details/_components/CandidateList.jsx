import { Button } from '@/components/ui/button'
import React from 'react'
import CandidateFeedbackDialog from './CandidateFeedbackDialog'

function CandidateList({CandidateList}) {
  return (
    <div className=''>
        <h2 className='font-bold my-5'>Candidates({candidate?.length})</h2>
        {CandidateList.map((candidate,index)=>{
            <div key={index} className='p-5 flex gap-3 items-center bg-white rounded-lg justify-between'>
                <div className='flex items-center gap-5'>
                <h2 className='bg-primary p-3 px-4.5 text-white font-bold rounded-full'>{candidate.userName[0]}</h2>
                <div>
                    <h2 className='font-bold'>{candidate?.userName}</h2>
                    <h2 className='text-sm text-gray-500'>Completed On: {moment(candidate?.created_at).format('MMM DD,YYYY')}</h2>
                </div>
                </div>
                <div className='flex gap-3 items-center'>
                <h2 className='text-green-600'>6/10</h2>
                <CandidateFeedbackDialog candidate={candidate}/>
                </div>
            </div>
        })}

    </div>
  )
}

export default CandidateList