'use client';

import React, { useEffect, useState, useCallback, useContext, use } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Clock, Info, Loader2Icon, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { supabase } from '@/services/supabaseClient';
// import { toast } from 'your-toast-library'; // Uncomment if using toast notifications

// Dynamically import Particles with SSR disabled
const Particles = dynamic(() => import('react-tsparticles'), { ssr: false });
import { loadFull } from 'tsparticles';
import { Inter } from 'next/font/google';

const Interview = () => {
  const { interview_id } = useParams();
  const [interviewData, setInterviewData] = useState();
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [interviewInfo, setInterviewInfo] = useContext(InterviewDataContext);
  const router=useRouter();
  const [userEmail, setUserEmail] = useState();

  useEffect(() => {
    if (interview_id) GetInterviewDetails();
    // eslint-disable-next-line
  }, [interview_id]);

  const GetInterviewDetails = async () => {
    setLoading(true);
    try {
      let { data, error } = await supabase
        .from('Interviews')
        .select('jobPosition,jobDescription,duration,type')
        .eq('interview_id', interview_id);

      if (error || !data || data.length === 0) {
        setLoading(false);
        // toast('Incorrect Interview Link');
        return;
      }
      setInterviewData(data[0]);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      // toast('Incorrect Interview Link');
    }
  };

  const onJoinInterview = async() => {
    setLoading(true);
      let { data: Interviews, error } = await supabase
        .from('Interviews')
        .select('*')
        .eq('interview_id', interview_id)

        console.log(Interviews[0]);
        setInterviewInfo({
          userName:userName,
          userEmail:userEmail,
          interviewData:Interview[0]
        });
        router.push('/interview/' + interview_id + '/start');
        setLoading(false);
  }

  // Properly memoized particlesInit for react-tsparticles
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesOptions = {
    fullScreen: { enable: true, zIndex: 0 },
    background: { color: { value: "#e7e7da" } },
    particles: {
      number: { value: 80 },
      shape: { type: "star" },
      size: {
        value: 4,
        random: true,
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: "none",
        outModes: { default: "bounce" },
      },
      opacity: {
        value: 0.7,
      },
    },
  };

  return (
    <div className="relative px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 mt-7 min-h-screen">
      {/* Particles background */}
      <Particles id="tsparticles" init={particlesInit} options={particlesOptions} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-3xl mx-auto
        border rounded-lg bg-white p-6 sm:p-8 lg:p-10 shadow-lg mb-20">
        
        <Image
          src="/logo.png"
          alt="Company Logo"
          width={140}
          height={70}
          priority
          style={{ width: 140, height: 'auto' }} // Maintain aspect ratio
        />

        <h2 className="mt-3 text-gray-800 text-center">AI-Powered Interview Platform</h2>
        
        <Image
          src="/Interview_02.jpg"
          alt="Interview Illustration"
          width={500}
          height={500}
          style={{ width: '100%', height: 'auto', maxWidth: 500 }}
          className="w-full max-w-md my-6"
          priority
        />

        <h2 className="font-bold text-xl text-center">{interviewData?.jobPosition}</h2>
        <h2 className="flex gap-2 items-center text-gray-500 mt-3">
          <Clock className="h-4 w-4" /> {interviewData?.duration} minutes
        </h2>

        <div className="w-full mt-4">
          <h2 className="font-semibold">Enter your full name</h2>
          <input
            placeholder="Ragini Kant"
            onChange={(event) => setUserName(event.target.value)}
            className="border rounded-lg p-2 mt-2 w-full"
            value={userName}
          />
        </div>

        <div className="w-full mt-4">
          <h2 className="font-semibold">Enter your Email</h2>
          <input
            placeholder="ragini.kant@gmail.com"
            onChange={(event) => setUserEmail(event.target.value)}
            className="border rounded-lg p-2 mt-2 w-full"
            value={userName}
          />
        </div>

        <div className="p-3 bg-blue-100 flex gap-4 rounded-lg mt-4 w-full">
          <Info className="text-primary mt-1" />
          <div>
            <h2 className="font-bold">Before you begin</h2>
            <ul className="list-disc list-inside">
              <li className="text-sm text-primary">Test your camera and microphone</li>
              <li className="text-sm text-primary">Ensure you have a stable internet connection</li>
              <li className="text-sm text-primary">Find a quiet place to take the interview</li>
              <li className="text-sm text-primary">Be yourself and answer the questions honestly</li>
            </ul>
          </div>
        </div>

        <Button className="mt-5 w-full font-bold"
          disabled={loading || !userName}
          onClick={()=>onJoinInterview()}
        >
          <Video />{loading&&<Loader2Icon/>} Join Interview
        </Button>
      </div>
    </div>
  );
};

export default Interview;
