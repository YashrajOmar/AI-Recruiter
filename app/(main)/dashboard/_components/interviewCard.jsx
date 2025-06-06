import { Button } from '@/components/ui/button';
import moment from 'moment';
import React from 'react';
import { toast } from 'sonner';

function InterviewCard({ interview, viewDetail=false }) {

  const copyLink=() => {
    const url = process.env.NEXT_PUBLIC_HOST_URL+'/'+interview?.interview_id;
    navigator.clipboard.writeText(url);
    toast('Copied')
  }

  const onSend=()=>{
      window.location.href="mailto:accounts@tubeguruji.com?subject=AI Recruiter Interview Link&body=Hi, I would like to share the interview link with you: "+process.env.NEXT_PUBLIC_HOST_URL+'/'+interview?.interview_id;
  }

  return (
    <div className='p-5 bg-white rounded-lg border'>
        <div className='flex items-center justify-between' >
            <div className='h-[40px] w-[40px] bg-primary rounded-full'> </div>
            <h2 className='text-sm'>{moment(interview?.created_at).format('DD MMM yyy')}</h2>

        </div>
        <h2 className='mt-3 font-bold text-lg'>{interview?.jobPosition}</h2>
        <h2 className='mt-2'>{interview?.duration}
          <span>{interview?.interview-feedback
      }</span>
        </h2>
        {!viewDetail? <div className='flex gap-3 w-full mt-5'>
          <Button variant='outline' className={'w-full'} onClick={copyLink} > <Copy /> Copy Link</Button>
          <Button className={'w-full'} onClick={onSend}> <Send /> Send</Button>
        </div>
        :
        <Button className="mt-5 w-full" variant="outline">View Detail <ArrowRight/></Button>
        }
    </div>
  );
}

export default InterviewCard;