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
    useEffect(() => {
  if (user && interview_id) {
    GetInterviewDetail();
  }
}, [user, interview_id]);

    const GetInterviewDetail=async()=>{
        const result=await supabase.from('Interviews')
                .select('jobPosition, duration,jobDecscription,type,questionList,interview_id,created_at,interview-feedback(userEmail,userName,feedback,created_at)')
               .eq('userEmail', user?.email)
                .order('id', { ascending: false })
                console.log(result);
                setInterviewDetail(result?.data[0])
                console.log(InterviewDetail)
    }
  return (
    <div className='mt-5'><h2 className='font-bold text-2xl'>InterviewDetail</h2>
    <InterviewDetailContainer interviewDetail={InterviewDetail}/>
    {/* <CandidateList CandidateList={InterviewDetail?.['interview-feedback']}/> */}
    </div>
  )
}

export default InterviewDetail