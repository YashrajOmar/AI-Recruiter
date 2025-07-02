import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, Copy, Send } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';
import { toast } from 'sonner';

function InterviewCard({ interview, viewDetail=false }) {

  const copyLink=() => {
    const url = process.env.NEXT_PUBLIC_HOST_URL+'/'+interview?.interview_id;
    navigator.clipboard.writeText(url);
    toast('Copied')
  }

  const onSend = () => {
    const url = process.env.NEXT_PUBLIC_HOST_URL+'/'+interview?.interview_id;
    const message = `Hi, I would like to share the interview link with you:`;
  if (navigator.share) {
    navigator.share({
      title: 'AI Recruiter Interview Link',
      text: message,
      url: url,
    }).catch((error) => console.log('Error sharing:', error));
  } else {
    alert('Sharing not supported on this browser');
  }
};


  return (
    <div className='p-5 bg-white rounded-lg border shadow-sm hover:shadow-md transition'>
        <div className='flex items-center justify-between' >
            <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <Briefcase size={18} />
            </div>
            <h2 className='text-sm'>{moment(interview?.created_at).format('DD MMM YYYY')}</h2>

        </div>
        <h2 className='mt-3 font-bold text-lg'>{interview?.jobPosition}</h2>
        <h2 className='mt-2 flex justify-between text-gray-500'>{interview?.duration} minutes
          <span className='text-green-700'>{interview['interview-feedback']?.length} Candidates</span>
        </h2>
        {!viewDetail? <div className='flex gap-3 w-[45%] mt-5'>
          <Button variant='outline' className={'w-full'} onClick={copyLink} > <Copy /> Copy Link</Button>
          <Button className={'w-full'} onClick={onSend}> <Send /> Send</Button>
        </div>
        :
        <Link href={'/scheduled-interview/'+interview?.interview_id+"/details"}>
        <Button className="mt-5 w-full" variant="outline">View Detail <ArrowRight/></Button></Link>
        }
    </div>
  );
}

export default InterviewCard;