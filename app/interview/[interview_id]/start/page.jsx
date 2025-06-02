
// 'use client';

// import React, { useContext, useEffect, useRef, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { useRouter } from 'next/navigation';
// import { supabase } from '@/services/supabaseClient';
// import { InterviewDataContext } from '@/context/InterviewDataContext';
// import {vapi} from '@lib/vapi.sdk'; // Ensure you have the correct import for Vapi
// import { toast } from 'react-toastify';
// import Image from 'next/image';
// import { Loader2Icon, Mic, Phone } from 'lucide-react';
// //import AlertConfirmation from './AlertConfirmation'; // Adjust path if needed
// import Timer from './Timer'; // Make sure you have this component or replace
// //import AlertConfirmation from './components/AlertConfirmation';
// import AlertConfirmation from './_components/AlertConfirmation';
// import axios from 'axios';


// function StartInterview() {
//   const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
//   const vapiRef = useRef(null);
//   const [activeUser, setActiveUser] = useState(false);
//   const [conversation, setConversation] = useState();
//   const {interview_id} = useParams();
//   const router = useRouter()
//   const [loading, setLoading] = useState();

//   useEffect(() => {
//     if (!vapiRef.current) {
//       vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY);
//     }

//     const vapi = vapiRef.current;

//     const handleCall = async () => {
//       setCallStatus(CallStatus.CONNECTING)

//       await vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID, {
//         userId: interviewInfo?.userEmail,
//         userName: interviewInfo?.userName,
//         interviewId: interview_id,
//       });
      
//     const handleDisconnect = () => {
//       setCallStatus(CallStatus.FINISHED);
//     }

//     // vapi.on('call-start', () => {
//     //   console.log('Call has started.');
//     //   toast('Call Connected Successfully');
//     // });

//     // vapi.on('speech-start', () => {
//     //   console.log('Assistant speech has started.');
//     //   setActiveUser(false);
//     // });

//     // vapi.on('speech-end', () => {
//     //   console.log('Assistant speech has ended.');
//     //   setActiveUser(true);
//     // });

//     // vapi.on('call-end', () => {
//     //   console.log('Call has ended.');
//     //   toast('Interview Ended');
//     //   GenerateFeedback();
//     // });

//     // Various assistant messages can come back (like function calls, transcripts, etc)
// // vapi.on("message", (message) => {
// //   console.log(message?.conversation);
// //   setConversation(message?.conversation);
// // });


// useEffect(() => {
//   const handleMessage = (message) => {
//     console.log('message:', message);
//     if (message?.conversation) {
//       const convoString = JSON.stringify(message.conversation);
//       console.log('Conversation string:', convoString);
//       setConversation(convoString);
//     }
//   };

//   vapi.on('message', handleMessage);
//   vapi.on('call-start', () => {
//       console.log('Call has started.');
//       toast('Call Connected Successfully');
//     });

//     vapi.on('speech-start', () => {
//       console.log('Assistant speech has started.');
//       setActiveUser(false);
//     });

//     vapi.on('speech-end', () => {
//       console.log('Assistant speech has ended.');
//       setActiveUser(true);
//     });

//     vapi.on('call-end', () => {
//       console.log('Call has ended.');
//       toast('Interview Ended');
//       GenerateFeedback();
//     });

//   return () => {
//     vapi.off('message', handleMessage);
//     vapi.off('call-start',() => console.log("END"));
//     vapi.off('speech-start',() => console.log("END"));
//     vapi.off('speech-end',() => console.log("END"));
//     vapi.off('speech-end',() => console.log("END"));
//   };
// }, []);

// const GenerateFeedback = async() => {
//     const result = await axios.post('/api/ai-feedback', {
//       conversation: conversation
//     });
//     console.log(result?.data);
//     const Content = result.data.content;
//     const FINAL_CONTENT = Content.replace('```json', '').replace('```',''); // Remove HTML tags
//     console.log(FINAL_CONTENT);

    
//     const { data, error } = await supabase
//       .from('interview-feedback')
//       .insert([
//         { 
//           userName: interviewInfo?.userName,
//           useerEmail: interviewInfo?.userEmail,
//           interview_id: interview_id,
//           feedback:JSON.parse(FINAL_CONTENT),
//           recommended: false
//          },
//       ])
//       .select()
//     console.log(data)
//     router.replace('/interview/'+interview_id+'completed');
// }

//     if (interviewInfo) {
//       startCall();
//     }

//     return () => {
//       vapi.stop();
//     };
//   }, [interviewInfo]);

//   const startCall = () => {
//     const vapi = vapiRef.current;

//     const questionList = interviewInfo?.InterviewData?.questionList
//       ?.map((item) => item?.question)
//       .join(', ');

//     const assistantOptions = {
//       name: 'AI Recruiter',
//       firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.InterviewData?.jobPosition}?`,
//       transcriber: {
//         provider: 'deepgram',
//         model: 'nova-2',
//         language: 'en-US',
//       },
//       voice: {
//         provider: 'playht',
//         voiceId: 'jennifer',
//       },
//       model: {
//         provider: 'openai',
//         model: 'gpt-4',
//         messages: [
//           {
//             role: 'system',
//             content: `
// You are an AI voice assistant conducting interviews.
// Your job is to ask candidates provided interview questions, assess their responses.
// Begin the conversation with a friendly introduction, setting a relaxed yet professional tone.
// "Hey there! Welcome to your ${interviewInfo?.InterviewData?.jobPosition} interview. Let’s get started with a few questions!"
// Ask one question at a time and wait for the candidate’s response before proceeding.
// Questions: ${questionList}
// If the candidate struggles, offer hints or rephrase the question.
// Give brief, encouraging feedback after each answer.
// Wrap up after 5-7 questions with a summary and positive note.
// Be friendly, witty, and focused on React.
// `.trim(),
//           },
//         ],
//       },
//     };

//     vapi.startCall(assistantOptions);
//   };

//   const stopInterview = () => {
//     //vapiRef.current?.stop();
//     vapi.stop();
//     console.log('Interview stopped');
//     setCallEnd(true);
//     GenerateFeedback();
//   };

//  vapi.on('call-start', () => {
//       console.log('Call has started.');
//       toast('Call Connected Successfully');
//     });

//     vapi.on('speech-start', () => {
//       console.log('Assistant speech has started.');
//       setActiveUser(false);
//     });

//     vapi.on('speech-end', () => {
//       console.log('Assistant speech has ended.');
//       setActiveUser(true);
//     });

//     vapi.on('call-end', () => {
//       console.log('Call has ended.');
//       toast('Interview Ended');
//       GenerateFeedback();
//     });

//   return (
//     <div className="p-10 lg:px-48 xl:px-56">
//       <h2 className="font-bold text-xl flex justify-between items-center">
//         AI Interview Session
//         <span className="flex gap-2 items-center">
//           <Timer />
//           00:00:00
//         </span>
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
//         <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
//           <Image
//             src={'/AI.png'}
//             alt="ai"
//             width={200}
//             height={200}
//             className="w-[160px] h-[160px] rounded-full object-full"
//           />
//           <h2>AI Recruiter</h2>
//         </div>
//         <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
//           <h2 className="text-7xl bg-primary text-white p-10 rounded-full">
//             {interviewInfo?.userName[0] ?? "?"}
//           </h2>
//           <h2>{interviewInfo?.userName ?? "No Name"}</h2>
//         </div>
//       </div>

//       {/* 🎤 Status Display */}
//       <div className="text-center mt-6">
//         {activeUser ? (
//           <p className="text-green-600 font-semibold animate-pulse">
//             🎤 Your Turn to Speak...
//           </p>
//         ) : (
//           <p className="text-yellow-600 font-semibold">
//             🤖 Listening to AI...
//           </p>
//         )}
//       </div>

//       <div className="flex justify-center items-center gap-5 mt-7">
//         <Mic className="h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer" />
//         {/*<AlertConfirmation stopInterview={() => stopInterview()}>*/}
//           {
//           !loading ? (
//             <Phone
//               className="h-12 w-12 p-3 bg-red-500 text-white rounded-full cursor-pointer"
//               onClick={() => stopInterview()}
//             />
//           ) : (
//             <Loader2Icon className="animate-spin" />
//           )
//         }

//         {/*</AlertConfirmation>*/}
//       </div>

//       <h2 className="text-lg font-bold text-center mt-5">
//         😏🧠 They’re testing brains. Hope you brought yours and not just vibes today
//       </h2>
//     </div>
//   );
// }

// export default StartInterview;








'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/services/supabaseClient';
import { InterviewDataContext } from '@/context/InterviewDataContext';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { Loader2Icon, Mic, Phone } from 'lucide-react';
import Timer from './Timer';
import { vapi } from '@/lib/vapi.sdk'; // Corrected import path
import axios from 'axios';


function StartInterview() {

  useEffect(() => {
  if (!vapi || !vapi.start) {
    console.error("Vapi not initialized properly.");
  } else {
    console.log("Vapi is ready.");
  }
}, []);

  const call = vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISSTANT_ID);
// { "id": "bd2184a1-bdea-4d4f-9503-b09ca8b185e6", "orgId": "6da6841c-0fca-4604-8941-3d5d65f43a17", "createdAt": "2024-11-13T19:20:24.606Z", "updatedAt": "2024-11-13T19:20:24.606Z", "type": "webCall", ... }


  //const { interviewInfo } = useContext(InterviewDataContext);
  const { interview_id } = useParams();
  const router = useRouter();
  
  const [activeUser, setActiveUser] = useState(false);
  const [conversation, setConversation] = useState('');
  const [loading, setLoading] = useState(false);
  const [callActive, setCallActive] = useState(false);
  const isMounted = useRef(true); // Prevent state updates after unmount

const { interviewInfo: contextInterviewInfo } = useContext(InterviewDataContext);
  const interviewInfo = contextInterviewInfo || {
    userName: 'Yashraj',
    userEmail: 'yashraj@example.com',
    InterviewData: {
      jobPosition: 'Software Engineer',
      questionList: [
        { question: 'Tell me about yourself' },
        { question: 'Why this role?' }
      ]
    }
  };
  
// useEffect(() => {
//   console.log("🧪 useEffect triggered - interviewInfo:", interviewInfo);
//   if (interviewInfo && !callActive) {
//     console.log("✅ Starting call...");
//     startCall();
//   } else if (!interviewInfo) {
//     console.warn("⚠️ interviewInfo not available yet");
//   }
// }, [interviewInfo]);


const hasStartedRef = useRef(false);
useEffect(() => {
  if (interviewInfo && !callActive && !hasStartedRef.current) {
    console.log("✅ Starting call...");
    hasStartedRef.current = true;
    startCall();
  }
}, [interviewInfo, callActive]);



  // Named handlers for proper cleanup
  const handleMessage = (message) => {
    if (message?.conversation) {
      setConversation(JSON.stringify(message.conversation));
    }
  };

  const handleCallStart = () => {
    setCallActive(true);
    toast.success('Call Connected Successfully');
  };

  const handleSpeechStart = () => {
    setActiveUser(false);
  };

  const handleSpeechEnd = () => {
    setActiveUser(true);
  };

  // const handleCallEnd = () => {
  //   if (!isMounted.current) return;
  //   setCallActive(false);
  //   toast.info('Interview Ended');
  //   generateFeedback();
  // };
  const handleCallEnd = () => {
  if (!isMounted.current) return;

  setCallActive(false);
  toast.info('Interview Ended');

  try {
    vapi.stop();  // Stops any ongoing call
    vapi.destroy?.(); // Clean up internal DailyIframe instance if Vapi exposes it
  } catch (error) {
    console.error('Error during Vapi cleanup:', error);
  }

  generateFeedback(); // Proceed to generate feedback and redirect
};


  // Event management with proper cleanup
  useEffect(() => {
    isMounted.current = true;
    
    vapi.on('message', handleMessage);
    vapi.on('call-start', handleCallStart);
    vapi.on('speech-start', handleSpeechStart);
    vapi.on('speech-end', handleSpeechEnd);
    vapi.on('call-end', handleCallEnd);

    return () => {
      isMounted.current = false;
      vapi.off('message', handleMessage);
      vapi.off('call-start', handleCallStart);
      vapi.off('speech-start', handleSpeechStart);
      vapi.off('speech-end', handleSpeechEnd);
      vapi.off('call-end', handleCallEnd);
      vapi.stop();
    };
  }, []);

  useEffect(() => {
    if (interviewInfo && !callActive) {
      startCall();
    }
  }, [interviewInfo]);

  const startCall = () => {
    if (!interviewInfo) return;

    const questionList = interviewInfo.InterviewData?.questionList
      ?.map(item => item.question)
      .join(', ') || '';

    const assistantOptions = {
      name: 'AI Recruiter',
      firstMessage: `Hi ${interviewInfo.userName}, ready for your ${interviewInfo.InterviewData.jobPosition} interview?`,
      transcriber: { provider: 'deepgram', model: 'nova-2' },
      voice: { provider: 'playht', voiceId: 'jennifer' },
      model: {
        provider: 'openai',
        model: 'gpt-4',
        messages: [{
          role: 'system',
          content: `Conduct interview for ${interviewInfo.InterviewData.jobPosition}. Ask: ${questionList}`
        }]
      },
      userId: interviewInfo.userEmail,
      interviewId: interview_id
    };

    vapi.start(assistantOptions).catch(console.error);
  };

  

//   const stopInterview = () => {
//   setLoading(true);
//   try {
//     vapi.stop(); // Not a Promise, no .finally()
//   } catch (err) {
//     console.error('Error stopping the call:', err);
//   } finally {
//     setLoading(false);
//   }
// };
// const stopInterview = () => {
//   setLoading(true);

//   try {
//     vapi.stop(); // Stops the call
//     vapi.destroy?.(); // Clean up (optional)
//   } catch (error) {
//     console.error('Error stopping interview:', error);
//   } finally {
//     setLoading(false);
//   }
// };

useEffect(() => {
  const handleCallEnded = () => {
    console.log("Call ended, navigating to completed page");
    router.push("/completed");

    // Optional: cleanup only *after* navigation
    setTimeout(() => {
      vapi.destroy?.(); // Now it's safe to destroy
    }, 1000);
  };

  vapi.on("call-ended", handleCallEnded);
  return () => {
    vapi.off("call-ended", handleCallEnded);
  };
}, []);


const stopInterview = () => {
  setLoading(true);

  try {
    vapi.stop(); // Gracefully stops the call
    // ❌ DO NOT call vapi.destroy() here
    // Let the 'call-ended' event trigger first
  } catch (error) {
    console.error("Error stopping interview:", error);
  }
};


  const generateFeedback = async () => {
  if (!conversation) return;

  try {
    const { data } = await axios.post('/api/ai-feedback', { conversation });
    // Fix the regex pattern here:
    const cleaned = data.content.replace(/```/g, '');

    
    await supabase.from('interview-feedback').insert([{
      userName: interviewInfo.userName,
      userEmail: interviewInfo.userEmail,
      interview_id,
      feedback: JSON.parse(cleaned),
      recommended: false
    }]);

    router.replace(`/interview/${interview_id}/completed`);
  } catch (error) {
    console.error('Feedback error:', error);
    toast.error('Feedback generation failed');
  }
};


  return (
    <div className="p-10 lg:px-48 xl:px-56">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">AI Interview Session</h1>
        <div className="flex items-center gap-2">
          <Timer initialSeconds={3600} />
          <span className="font-mono">00:00:00</span>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <ParticipantCard 
          image="/AI.png" 
          name="AI Recruiter" 
          alt="AI Assistant"
          width={100} 
          height={100} 
        />
        <ParticipantCard
          initial={interviewInfo?.userName?.[0] || '?'}
          name={interviewInfo?.userName || 'Guest'}
        />
      </div>

      <div className="text-center mb-6">
        <StatusIndicator activeUser={activeUser} />
      </div>

      <div className="flex justify-center gap-4">
        <ControlButton
          icon={Mic}
          aria-label="Microphone"
          className="bg-gray-500 hover:bg-gray-600"
        />
        <CallEndButton 
          loading={loading}
          active={callActive}
          onClick={stopInterview}
        />
      </div>

      <p className="text-center mt-6 text-gray-600 italic">
        😏 Testing your knowledge - bring your A-game!
      </p>
    </div>
  );
}

// Extracted components for better readability
// const ParticipantCard = ({ image, initial, name, alt }) => (
//   <div className="bg-white rounded-lg border p-6 flex flex-col items-center">
//     {image ? (
//       <Image
//         src={image}
//         alt={alt}
//         width={160}
//         height={160}
//         className="rounded-full object-cover"
//       />
//     ) : (
//       <div className="text-7xl bg-primary text-white rounded-full p-8">
//         {initial}
//       </div>
//     )}
//     <h3 className="mt-4 text-lg font-semibold">{name}</h3>
//   </div>
// );

const ParticipantCard = ({ image, initial, name, alt = 'Participant', width = 160, height = 160 }) => (
  <div className="bg-white rounded-lg border p-6 flex flex-col items-center">
    {image ? (
      <Image
        src={image}
        alt={alt}
        width={width}
        height={height}
        className="rounded-full object-cover"
        priority
      />
    ) : (
      <div
        className="text-7xl bg-primary text-white rounded-full flex items-center justify-center"
        style={{ width, height }}
      >
        {initial}
      </div>
    )}
    <h3 className="mt-4 text-lg font-semibold">{name}</h3>
  </div>
);


const StatusIndicator = ({ activeUser }) => (
  <p className={`font-semibold ${activeUser ? 'text-green-600 animate-pulse' : 'text-yellow-600'}`}>
    {activeUser ? '🎤 Your Turn to Speak...' : '🤖 Listening to AI...'}
  </p>
);

const ControlButton = ({ icon: Icon, ...props }) => (
  <button className="p-3 rounded-full transition-colors" {...props}>
    <Icon className="h-8 w-8 text-white" />
  </button>
);

const CallEndButton = ({ loading, active, onClick }) => (
  loading ? (
    <Loader2Icon className="animate-spin h-12 w-12" />
  ) : (
    <ControlButton
      icon={Phone}
      onClick={onClick}
      disabled={!active}
      className={`${active ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-400'}`}
      aria-label="End call"
    />
  )
);





export default StartInterview;

