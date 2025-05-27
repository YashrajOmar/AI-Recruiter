import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { InterviewType } from '@/services/Constants'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'


function FormContainer({onHandleInputChange,GoToNext}) {
    const [interviewType,setInterviewType]=useState([]);
    useEffect(()=>{
        if(interviewType)
            {
                onHandleInputChange('type',interviewType)
            }
    },[interviewType])

    const AddInterviewType=(type)=>{
        const data=interviewType.includes(type);
        if(!data)
        {
            setInterviewType(prev=>[...prev,type])
        }else{
            const result=interviewType.filter(item=>item!=type);
            setInterviewType(result);
        }
    }
  return (
    <div className='p-5 bg-white'>
        <div>
            <h2 className='text-sm'>Job Position</h2>
            <Input placeholder="e.g. Full Stack Developer" className='mt-2' onChange={(event)=>onHandleInputChange('jobPosition',event.target.value)}/>
        </div>
        <div className='mt-5'>
            <h2 className='text-sm'>Job Description</h2>
            <Textarea placeholder="Enter job details" className='mt-2 h-[200px]' onChange={(event)=>onHandleInputChange('jobDescription',event.target.value)}/>
        </div>
        <div className='mt-5'>
            <h2 className='text-sm'>Interview Duration</h2>
            <Select onValueChange={(value)=>onHandleInputChange('duration',value)}>
  <SelectTrigger className="w-full mt-2">
    <SelectValue placeholder="Select Duration" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="5">5 min</SelectItem>
    <SelectItem value="15">15 min</SelectItem>
    <SelectItem value="30">30 min</SelectItem>
    <SelectItem value="45">45 min</SelectItem>
    <SelectItem value="60">60 min</SelectItem>
  </SelectContent>
</Select>

        </div>
        <div className='mt-5'>
            <h2 className='text-sm font-medium'>Interview Type</h2>
            <div className='flex gap-3 flex-wrap mt-2 bg-white'>
                {InterviewType.map((type,index)=>{
                    const Icon = type.icon;
                    return(
                    <div key={index} className={`flex items-center cursor-pointer gap-2 p-1 px-2 bg-blue-50 border-2 rounded-2xl hover:bg-blue-200 ${interviewType.includes(type.title)&&'bg-blue-400 text-primary'}`} onClick={()=>AddInterviewType(type.title)}>
                        
                        <Icon className='h-4 w-4' />

                        <h2>{type.title}</h2>
                    </div>
                )})}
            </div>
        </div><div className='mt-7 flex justify-end' >
        <Button onClick={()=>GoToNext()}>Generate Question<ArrowRight/></Button>
    </div>
    </div>
  )
}

export default FormContainer