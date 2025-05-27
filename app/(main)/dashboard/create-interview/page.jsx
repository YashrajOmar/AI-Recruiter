"use client";
import { Progress } from '@/components/ui/progress';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import FormContainer from './_components/FormContainer';
import { ArrowLeft } from 'lucide-react';
import QuestionList from './_components/QuestionList';
import { toast } from 'sonner';
import InterviewLink from './_components/InterviewLink';

function CreateInterview() {
    const router=useRouter();
    const [step,setStep]=useState(1);
    const [formData,setFormData]=useState();
    const [interviewid,setinterviewid]=useState();
    const onHandleInputChange=(field,value)=>{
        setFormData(prev=>({
            ...prev,
            [field]:value
        }))
        console.log(formData);
    }
    const OnGoToNext=()=>{
        if(!formData?.jobPosition||!formData?.jobDescription||!formData?.duration||!formData?.type){
            toast('Please enter all details')
            return;
        }
        setStep(step+1);
    }
    const onCreateLink=(interview_id)=>{
        setinterviewid(interview_id);
        setStep(step+1);
    }

  return (
    <div className='mt-10 px-10 md:px-24 lg:px-44 al:px-56'>
        <div className='flex gap-5'>
            <ArrowLeft onClick={()=>router.back()} className='cursor-pointer'/>
            <h2 className='font-bold text-2xl'>Create New Interview</h2>
           
        </div>
         <Progress value={step*33.33} className='my-5'/>
         {step==1?<FormContainer onHandleInputChange={onHandleInputChange} GoToNext={OnGoToNext} />
         :step==2?<QuestionList formData={formData} onCreateLink={onCreateLink}/>:
         step==3?<InterviewLink interview_id={interviewid} formData={formData}/>:null}
    </div>
  )
}

export default CreateInterview