import { Button } from '@/components/ui/button';
import axios, { Axios } from 'axios';
import { Loader2, Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import QuestionListContainer from './QuestionListContainer';
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/provider';
import { v4 as uuidv4 } from 'uuid';

function QuestionList({formData}) {

    const [loading,setLoading]=useState(true);
    const [questionList,setQuestionList]=useState(false);
    const {user}=useUser();
    const [saveLoading,setSaveLoading]=useState(false);
    useEffect(()=>{
        if(formData){
            GenerateQuestionList();
        }
    },[formData])
    const GenerateQuestionList=async()=>{
        setLoading(true);
        try{
        const result= await axios.post('/api/ai-model',{
            ...formData
        })
        console.log(result.data.content);

        let Content=result.data.content;
        Content = Content.substring(Content.indexOf('{'));
        const FINAL_CONTENT=Content.replace(/```json\s*/g, '')  // removes ```json
  .replace(/```/g, '').trim();;        // removes ```
        setQuestionList(JSON.parse(FINAL_CONTENT)?.interviewQuestions);
        setLoading(false);
    }
    catch(e){
        toast('Server Error');
        console.log(e);
        setLoading(false);
    }
    }
    const onFinish=async()=>{
        setSaveLoading(true);
        const interview_id=uuidv4();
        const { data, error } = await supabase
  .from('Interviews')
  .insert([
    { 
        ...formData,
        questionList:questionList,
        userEmail:user?.email,
        interview_id:interview_id
     },
  ])
  .select()
  setSaveLoading(false)
  console.log(data);
    }
  return (
    <div >
        {loading&&<div className='p-5 bg-blue-50 rounded-xl border border-gray-100 flex gap-5 items-center'>
            <Loader2Icon className='animate-spin'/>
            
            <div>
                <h2>Generating Questions</h2>
                <p>Our AI is crafting personalized questions</p>
            </div>
            </div>}
            {questionList?.length>0&&
            <div>
                <div>
                    <QuestionListContainer questionList={questionList}/>
                </div>
                <div className='flex justify-end mt-10'>
                    {saveLoading&&<Loader2 className='animate-spin'/>}
                    <Button onClick={()=>onFinish()} disabled={saveLoading}>Finish</Button>
                </div>
                </div>}
                
                
    </div>
    
  )
}

export default QuestionList