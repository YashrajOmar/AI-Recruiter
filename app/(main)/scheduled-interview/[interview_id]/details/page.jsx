"use client"
import { useUser } from '@/app/provider';
import { supabase } from '@/services/supabaseClient';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import InterviewDetailContainer from './_components/InterviewDetailContainer';
import CandidateList from './_components/CandidateList';

function InterviewDetail() {
    const {interview_id}=useParams();
    const {user}=useUser();
    const [InterviewDetail,setInterviewDetail]=useState();
    useEffect(()=>{
        user&&GetInterviewDetail();
    })
    const GetInterviewDetail=async()=>{
        const result=await supabase.from('Interviews')
                .select('jobPosition, duration,jobDecscription,type,questionList,interview_id,created_at,interview-feedback(userEmail,userName,feedback,created_at)')
               
               .eq('interview_id',interview_id)
                
                setInterviewDetail(result?.data[0])
    }
  return (
    <div className='mt-5'><h2 className='font-bold text-2xl'>InterviewDetail</h2>
    <InterviewDetailContainer InterviewDetail={InterviewDetail}/>
    <CandidateList detail={InterviewDetail?.['interview-feedback']}/>
    </div>
  )
}

export default InterviewDetail