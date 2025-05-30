
// 'use client';

// import React, { useContext, useEffect, useRef, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { useRouter } from 'next/navigation';
// import { supabase } from '@/services/supabaseClient';
// import { InterviewDataContext } from '@/context/InterviewDataContext';
// import { Vapi } from '@vapi-ai/web';
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
import AlertConfirmation from './_components/AlertConfirmation';
import axios from 'axios';

function StartInterview() {
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const vapiRef = useRef(null);
  const [activeUser, setActiveUser] = useState(false);
  const [conversation, setConversation] = useState();
  const { interview_id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const startCall = () => {
    const vapi = vapiRef.current;
    if (!vapi || !interviewInfo) return;

    const questionList = interviewInfo?.InterviewData?.questionList
      ?.map((item) => item?.question)
      .join(', ');

    const assistantOptions = {
      name: 'AI Recruiter',
      firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.InterviewData?.jobPosition}?`,
      transcriber: {
        provider: 'deepgram',
        model: 'nova-2',
        language: 'en-US',
      },
      voice: {
        provider: 'playht',
        voiceId: 'jennifer',
      },
      model: {
        provider: 'openai',
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `
You are an AI voice assistant conducting interviews.
Begin with a friendly intro for ${interviewInfo?.InterviewData?.jobPosition}.
Ask one question at a time from: ${questionList}
Wait for answers, give hints if stuck, summarize at the end.
Be witty and React-focused.
          `.trim(),
          },
        ],
      },
    };

    vapi.startCall(assistantOptions);
  };

  const stopInterview = () => {
    vapiRef.current?.stop();
    console.log('Interview stopped');
    GenerateFeedback();
  };

  const GenerateFeedback = async () => {
    try {
      const result = await axios.post('/api/ai-feedback', {
        conversation: conversation,
      });
      const content = result.data.content;
      const FINAL_CONTENT = content.replace('```json', '').replace('```', '');

      const { data, error } = await supabase
        .from('interview-feedback')
        .insert([
          {
            userName: interviewInfo?.userName,
            useerEmail: interviewInfo?.userEmail,
            interview_id: interview_id,
            feedback: JSON.parse(FINAL_CONTENT),
            recommended: false,
          },
        ])
        .select();

      console.log(data);
      router.replace(`/interview/${interview_id}/completed`);
    } catch (error) {
      console.error('Feedback generation error:', error);
      toast.error('Failed to generate feedback.');
    }
  };

  useEffect(() => {
  if (!vapiRef.current) {
    Vapi.apiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY;
    vapiRef.current = Vapi;
  }

  const vapiInstance = vapiRef.current;

  const handleMessage = (message) => {
    if (message?.conversation) {
      const convoString = JSON.stringify(message.conversation);
      setConversation(convoString);
    }
  };

  vapiInstance.on('message', handleMessage);

  vapiInstance.on('call-start', () => {
    toast('Call Connected Successfully');
    console.log('Call has started.');
  });

  vapiInstance.on('speech-start', () => {
    setActiveUser(false);
    console.log('Assistant speech has started.');
  });

  vapiInstance.on('speech-end', () => {
    setActiveUser(true);
    console.log('Assistant speech has ended.');
  });

  vapiInstance.on('call-end', () => {
    toast('Interview Ended');
    console.log('Call has ended.');
    GenerateFeedback();
  });

  if (interviewInfo) {
    startCall();
  }

  return () => {
    vapiInstance.stop();
    vapiInstance.off('message', handleMessage);
    vapiInstance.removeAllListeners();
  };
}, [interviewInfo]);



  return (
    <div className="p-10 lg:px-48 xl:px-56">
      <h2 className="font-bold text-xl flex justify-between items-center">
        AI Interview Session
        <span className="flex gap-2 items-center">
          <Timer />
          00:00:00
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <Image
            src="/AI.png"
            alt="ai"
            width={200}
            height={200}
            className="w-[160px] h-[160px] rounded-full object-full"
          />
          <h2>AI Recruiter</h2>
        </div>
        <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center">
          <h2 className="text-7xl bg-primary text-white p-10 rounded-full">
            {interviewInfo?.userName[0] ?? "?"}
          </h2>
          <h2>{interviewInfo?.userName ?? "No Name"}</h2>
        </div>
      </div>

      {/* 🎤 Status Display */}
      <div className="text-center mt-6">
        {activeUser ? (
          <p className="text-green-600 font-semibold animate-pulse">
            🎤 Your Turn to Speak...
          </p>
        ) : (
          <p className="text-yellow-600 font-semibold">🤖 Listening to AI...</p>
        )}
      </div>

      <div className="flex justify-center items-center gap-5 mt-7">
        <Mic className="h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer" />
        {
          !loading ? (
            <Phone
              className="h-12 w-12 p-3 bg-red-500 text-white rounded-full cursor-pointer"
              onClick={stopInterview}
            />
          ) : (
            <Loader2Icon className="animate-spin" />
          )
        }
      </div>

      <h2 className="text-lg font-bold text-center mt-5">
        😏🧠 They’re testing brains. Hope you brought yours and not just vibes today
      </h2>
    </div>
  );
}

export default StartInterview;
