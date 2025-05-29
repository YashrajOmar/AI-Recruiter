"use client"
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { supabase } from '@/services/supabaseClient';
import { Inter } from 'next/font/google';

function LatestInterviewsList() {
  const [interviewList,setInterviewList]=useState([]);
  const {user}=useUser();

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);


  const GetInterviewList= async()=>{
    let { data: Interviews, error } = await supabase
      .from('Interviews')
      .select('*')
      .eq('userEmail', user?.email);

    console.log(Interviews);
    setInterviewList(Interviews);
  }

    return (
    
    <div className='my-5'><h2 className='font-bold text-2xl'>
        Previously Created Interviews
        {interviewList?.length==0&&
        <div className='p-5 flex flex-col gap-3 items-center mt-5 bg-white rounded-lg'>
            <Camera className='h-10 w-10 text-primary'/>
            <h2>You don't have any interview created!</h2>
            <Button>+ Create New Interview</Button>

            </div>}
            {interviewList&&
               <div>
                {interviewList.map((interview, index) => (
                    <InterviewCard interview={interview} key={index} />
                ))}
               </div>
            }
        </h2></div>
  )
}

export default LatestInterviewsList