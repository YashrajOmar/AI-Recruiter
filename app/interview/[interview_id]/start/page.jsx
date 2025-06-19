







// 'use client';
// import React, { useContext, useEffect, useRef, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { supabase } from '@/services/supabaseClient';
// import { InterviewDataContext } from '@/context/InterviewDataContext';
// import { toast } from 'react-toastify';
// import Image from 'next/image';
// import { Loader2Icon, Mic, Phone } from 'lucide-react';
// import Timer from './Timer';
//  // Corrected import path
// import axios from 'axios';
// import Vapi from '@vapi-ai/web';


// function StartInterview() {
//      const { interview_id } = useParams();
//   const router = useRouter();
  
//   const [activeUser, setActiveUser] = useState(false);
//   const [conversation, setConversation] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [callActive, setCallActive] = useState(false);
//   const isMounted = useRef(true);
//   const [interviewInfo, setInterviewInfo] = useState(null);
//   const [dataLoading, setDataLoading] = useState(true);
//   const hasStartedRef = useRef(false); 
  
// const vapi =new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);




//   // Fetch interview data from Supabase
//   useEffect(() => {
//     const fetchInterviewData = async () => {
//       try {
//         const { data: { user } } = await supabase.auth.getUser();
//         if (!user) {
//           setDataLoading(false);
//           router.replace('/login');
//           return;
//         }
        
//         const { data, error } = await supabase
//           .from('Interviews')
//           .select(`
//             jobPosition,
//             questionList
//           `)
//           .eq('interview_id', interview_id)
//           .single();

//         if (error) throw error;

//         if (data) {
//           setInterviewInfo({
//             userName: user.user_metadata?.full_name || "User",
//             userEmail: user.email,
//             InterviewData: {
//               jobPosition: data.jobPosition,
//               questionList: data.questionList
//             }
//           });
//         }
//       } catch (error) {
//         console.error("Fetch error:", error);
//         toast.error('Failed to load interview data');
//       } finally {
//         setDataLoading(false);
//       }
//     };

//     fetchInterviewData();
//   }, [interview_id]);
//   console.log(interviewInfo)
//   useEffect(() => {
//   if (interviewInfo && !hasStartedRef.current) {
//     hasStartedRef.current = true;
//     startCall();
//   }
// }, [interviewInfo]);


//  const startCall = async () => {
//   if (!interviewInfo) return;

//   try {
//     setLoading(true);
    
//     const { userName, userEmail, InterviewData } = interviewInfo;
//     const jobPosition = InterviewData?.jobPosition || "the position";

//     // Format questions safely
//     const questions = InterviewData?.questionList
//       ?.map((q, i) => `${i + 1}. ${q.question}`)
//       .join('\n') || "No questions available";


    
//     await vapi.start({
      
//       model: {
//     provider: "openai",
//     model: "gpt-3.5-turbo",
//     messages: [
//       {
//         role: "system",
//         content: `You are an AI voice assistant conducting interviews.
// Your job is to ask candidates provided interview questions, assess their responses.

// Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
// "Hey there! Welcome to your ${jobPosition} interview. Let’s get started with a few questions!"

// Ask one question at a time and wait for the candidate’s response before proceeding. Keep the questions clear and concise. Below are the questions to ask one by one:
// Questions: ${questions}

// If the candidate gets stuck, offer hints or rephrase the question without giving away the answer. Example:
// "Need a hint? Think about how React tracks component updates!"

// Provide brief, encouraging feedback after each answer. Example:
// "That’s a solid start!"
// "Hmm, not quite! Want to try again?"

// Keep the conversation natural and engaging—use casual phrases like "Alright, next up…" or "Let’s tackle a tricky one!"

// At the end of the session, wrap up the interview warmly summarizing their performance. Example:
// "That was great! You handled some tough questions well. Keep sharpening your skills!"

// End with a warm note:
// "Thanks once again and hope to see you crushing projects soon!"

// Key Guidelines:
// ✅ Be friendly, engaging, and witty ✅ Guide the process along, like a real conversation ✅ Adapt based on the candidate’s confidence level ✅ Ensure the interview remains focused on React`,
//       },
//      ],
//    },
//    voice: {
//     provider: "11labs",
//     voiceId: "burt",
//   },
//    firstMessage: `Hi ${userName}! Ready for your ${jobPosition} interview? Let's begin.`,
//     });


//     setCallActive(true);
//   } catch (err) {
//     console.error("Call start failed:", err);
//     toast.error("Failed to start interview");
//   } finally {
//     setLoading(false);
//   }
// };




// //   useEffect(() => {
// //   if (!vapi || !vapi.start) {
// //     console.error("Vapi not initialized properly.");
// //   } else {
// //     console.log("Vapi is ready.");
// //   }
// // }, []);

//   //const call = vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISSTANT_ID);
// // { "id": "bd2184a1-bdea-4d4f-9503-b09ca8b185e6", "orgId": "6da6841c-0fca-4604-8941-3d5d65f43a17", "createdAt": "2024-11-13T19:20:24.606Z", "updatedAt": "2024-11-13T19:20:24.606Z", "type": "webCall", ... }



//   //const { interviewInfo } = useContext(InterviewDataContext);

  
  


  
// // // useEffect(() => {
// // //   console.log("🧪 useEffect triggered - interviewInfo:", interviewInfo);
// // //   if (interviewInfo && !callActive) {
// // //     console.log("✅ Starting call...");
// // //     startCall();
// // //   } else if (!interviewInfo) {
// // //     console.warn("⚠️ interviewInfo not available yet");
// // //   }
// // // }, [interviewInfo]);


// // const hasStartedRef = useRef(false);
// // useEffect(() => {
// //   if (interviewInfo && !callActive && !hasStartedRef.current) {
// //     console.log("✅ Starting call...");
// //     hasStartedRef.current = true;
// //     startCall();
// //   }
// // }, [interviewInfo]);


// // useEffect(() => {
// //   if (interviewInfo && !callActive && !hasStartedRef.current) {
// //     console.log("✅ Starting call...");
// //     hasStartedRef.current = true;
// //     startCall();
// //   }
// // }, [interviewInfo, callActive]);



// //   // Named handlers for proper cleanup
// //   const handleMessage = (message) => {
// //     if (message?.conversation) {
// //       setConversation(JSON.stringify(message.conversation));
// //     }
// //   };

// //   const handleCallStart = () => {
// //     setCallActive(true);
// //     toast.success('Call Connected Successfully');
// //   };

// //   const handleSpeechStart = () => {
// //     setActiveUser(false);
// //   };

// //   const handleSpeechEnd = () => {
// //     setActiveUser(true);
// //   };

// //   // const handleCallEnd = () => {
// //   //   if (!isMounted.current) return;
// //   //   setCallActive(false);
// //   //   toast.info('Interview Ended');
// //   //   generateFeedback();
// //   // };
// //   const handleCallEnd = () => {
// //   if (!isMounted.current) return;

// //   setCallActive(false);
// //   toast.info('Interview Ended');

// //   try {
// //     vapi.stop();  // Stops any ongoing call
// //     vapi.destroy?.(); // Clean up internal DailyIframe instance if Vapi exposes it
// //   } catch (error) {
// //     console.error('Error during Vapi cleanup:', error);
// //   }

// //   generateFeedback(); // Proceed to generate feedback and redirect
// // };


// //   // Event management with proper cleanup
// //   useEffect(() => {
// //     isMounted.current = true;
    
// //     vapi.on('message', handleMessage);
// //     vapi.on('call-start', handleCallStart);
// //     vapi.on('speech-start', handleSpeechStart);
// //     vapi.on('speech-end', handleSpeechEnd);
// //     vapi.on('call-end', handleCallEnd);

// //     return () => {
// //       isMounted.current = false;
// //       vapi.off('message', handleMessage);
// //       vapi.off('call-start', handleCallStart);
// //       vapi.off('speech-start', handleSpeechStart);
// //       vapi.off('speech-end', handleSpeechEnd);
// //       vapi.off('call-end', handleCallEnd);
// //       vapi.stop();
// //     };
// //   }, []);

  
  

// // //   const stopInterview = () => {
// // //   setLoading(true);
// // //   try {
// // //     vapi.stop(); // Not a Promise, no .finally()
// // //   } catch (err) {
// // //     console.error('Error stopping the call:', err);
// // //   } finally {
// // //     setLoading(false);
// // //   }
// // // };
// // // const stopInterview = () => {
// // //   setLoading(true);

// // //   try {
// // //     vapi.stop(); // Stops the call
// // //     vapi.destroy?.(); // Clean up (optional)
// // //   } catch (error) {
// // //     console.error('Error stopping interview:', error);
// // //   } finally {
// // //     setLoading(false);
// // //   }
// // // };

// // useEffect(() => {
// //   const handleCallEnded = () => {
// //     console.log("Call ended, navigating to completed page");
// //     router.push("/completed");

// //     // Optional: cleanup only *after* navigation
// //     setTimeout(() => {
// //       vapi.destroy?.(); // Now it's safe to destroy
// //     }, 1000);
// //   };

// //   vapi.on("call-ended", handleCallEnded);
// //   return () => {
// //     vapi.off("call-ended", handleCallEnded);
// //   };
// // }, []);


// // const stopInterview = () => {
// //   setLoading(true);

// //   try {
// //     vapi.stop(); // Gracefully stops the call
// //     // ❌ DO NOT call vapi.destroy() here
// //     // Let the 'call-ended' event trigger first
// //   } catch (error) {
// //     console.error("Error stopping interview:", error);
// //   }
// // };


// //   const generateFeedback = async () => {
// //   if (!conversation) return;

//   try {
//     const { data } = await axios.post('/api/ai-feedback', { conversation });
//     // Fix the regex pattern here:
//     const cleaned = data.content.replace(/```/g, '');
//     console.log(data);
  

    
// //     await supabase.from('interview-feedback').insert([{
// //       userName: interviewInfo.userName,
// //       userEmail: interviewInfo.userEmail,
// //       interview_id,
// //       feedback: JSON.parse(cleaned),
// //       recommended: false
// //     }]);

// //     router.replace(`/interview/${interview_id}/completed`);
// //   } catch (error) {
// //     console.error('Feedback error:', error);
// //     toast.error('Feedback generation failed');
// //   }
// // };


// //   return (
// //     <div className="p-10 lg:px-48 xl:px-56">
// //       <header className="flex justify-between items-center mb-8">
// //         <h1 className="text-2xl font-bold">AI Interview Session</h1>
// //         <div className="flex items-center gap-2">
// //           <Timer initialSeconds={3600} />
// //           <span className="font-mono">00:00:00</span>
// //         </div>
// //       </header>

// //       <div className="grid md:grid-cols-2 gap-6 mb-8">
// //         <ParticipantCard 
// //           image="/AI.png" 
// //           name="AI Recruiter" 
// //           alt="AI Assistant"
// //           width={100} 
// //           height={100} 
// //         />
// //         <ParticipantCard
// //           initial={interviewInfo?.userName?.[0] || '?'}
// //           name={interviewInfo?.userName || 'Guest'}
// //         />
// //       </div>

// //       <div className="text-center mb-6">
// //         <StatusIndicator activeUser={activeUser} />
// //       </div>

//       <div className="flex justify-center gap-4">
//         <ControlButton
//           icon={Mic}
//           aria-label="Microphone"
//           className="bg-gray-500 hover:bg-gray-600"
//         />
//         <CallEndButton 
//           loading={loading}
//           active={callActive}
//           //onClick={stopInterview}
//         />
//       </div>

// //       <p className="text-center mt-6 text-gray-600 italic">
// //         😏 Testing your knowledge - bring your A-game!
// //       </p>
// //     </div>
// //   );
// // }

// // // Extracted components for better readability
// // // const ParticipantCard = ({ image, initial, name, alt }) => (
// // //   <div className="bg-white rounded-lg border p-6 flex flex-col items-center">
// // //     {image ? (
// // //       <Image
// // //         src={image}
// // //         alt={alt}
// // //         width={160}
// // //         height={160}
// // //         className="rounded-full object-cover"
// // //       />
// // //     ) : (
// // //       <div className="text-7xl bg-primary text-white rounded-full p-8">
// // //         {initial}
// // //       </div>
// // //     )}
// // //     <h3 className="mt-4 text-lg font-semibold">{name}</h3>
// // //   </div>
// // // );

// // const ParticipantCard = ({ image, initial, name, alt = 'Participant', width = 160, height = 160 }) => (
// //   <div className="bg-white rounded-lg border p-6 flex flex-col items-center">
// //     {image ? (
// //       <Image
// //         src={image}
// //         alt={alt}
// //         width={width}
// //         height={height}
// //         className="rounded-full object-cover"
// //         priority
// //       />
// //     ) : (
// //       <div
// //         className="text-7xl bg-primary text-white rounded-full flex items-center justify-center"
// //         style={{ width, height }}
// //       >
// //         {initial}
// //       </div>
// //     )}
// //     <h3 className="mt-4 text-lg font-semibold">{name}</h3>
// //   </div>
// // );


// // const StatusIndicator = ({ activeUser }) => (
// //   <p className={`font-semibold ${activeUser ? 'text-green-600 animate-pulse' : 'text-yellow-600'}`}>
// //     {activeUser ? '🎤 Your Turn to Speak...' : '🤖 Listening to AI...'}
// //   </p>
// // );

// // const ControlButton = ({ icon: Icon, ...props }) => (
// //   <button className="p-3 rounded-full transition-colors" {...props}>
// //     <Icon className="h-8 w-8 text-white" />
// //   </button>
// // );

// // // const CallEndButton = ({ loading, active, onClick }) => (
// // //   loading ? (
// // //     <Loader2Icon className="animate-spin h-12 w-12" />
// // //   ) : (
// // //     <ControlButton
// // //       icon={Phone}
// // //       onClick={onClick}
// // //       disabled={!active}
// // //       className={`${active ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-400'}`}
// // //       aria-label="End call"
// // //     />
// // //   )
// // // );

// // const CallEndButton = ({ loading, active }) => {
// //   const router = useRouter();
// //   const params = useParams(); // returns an object of dynamic segments
// //   const interview_id = params?.interview_id;

// //   const handleClick = () => {
// //     if (!active || !interview_id) return;

// //     // Navigate to the completed page
// //     router.push(`/interview/${interview_id}/completed`);
// //   };

// //   return loading ? (
// //     <Loader2Icon className="animate-spin h-12 w-12" />
// //   ) : (
// //     <ControlButton
// //       icon={Phone}
// //       onClick={handleClick}
// //       disabled={!active}
// //       className={`${active ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-400'}`}
// //       aria-label="End call"
// //     />
// //   );
// // };

// // export default StartInterview;











// 'use client';
// import React, { useContext, useEffect, useRef, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { supabase } from '@/services/supabaseClient';
// import { InterviewDataContext } from '@/context/InterviewDataContext';
// import { toast } from 'react-toastify';
// import Image from 'next/image';
// import { Loader2Icon, Mic, Phone } from 'lucide-react';
// import Timer from './Timer';
//  // Corrected import path
// import axios from 'axios';
// import Vapi from '@vapi-ai/web';


// function StartInterview() {
//      const { interview_id } = useParams();
//   const router = useRouter();
  
//   const [activeUser, setActiveUser] = useState(false);
//   const [conversation, setConversation] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [callActive, setCallActive] = useState(false);
//   const isMounted = useRef(true);
//   const [interviewInfo, setInterviewInfo] = useState(null);
//   const [dataLoading, setDataLoading] = useState(true);
//   const hasStartedRef = useRef(false); 
  
// const vapi =new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);




//   // Fetch interview data from Supabase
//   useEffect(() => {
//     const fetchInterviewData = async () => {
//       try {
//         const { data: { user } } = await supabase.auth.getUser();
//         if (!user) {
//           setDataLoading(false);
//           router.replace('/login');
//           return;
//         }
        
//         const { data, error } = await supabase
//           .from('Interviews')
//           .select(`
//             jobPosition,
//             questionList
//           `)
//           .eq('interview_id', interview_id)
//           .single();

//         if (error) throw error;

//         if (data) {
//           setInterviewInfo({
//             userName: user.user_metadata?.full_name || "User",
//             userEmail: user.email,
//             InterviewData: {
//               jobPosition: data.jobPosition,
//               questionList: data.questionList
//             }
//           });
//         }
//       } catch (error) {
//         console.error("Fetch error:", error);
//         toast.error('Failed to load interview data');
//       } finally {
//         setDataLoading(false);
//       }
//     };

//     fetchInterviewData();
//   }, [interview_id]);
//   console.log(interviewInfo)
//   useEffect(() => {
//   if (interviewInfo && !hasStartedRef.current) {
//     hasStartedRef.current = true;
//     startCall();
//   }
// }, [interviewInfo]);


//  const startCall = async () => {
//   if (!interviewInfo) return;

//   try {
//     setLoading(true);
    
//     const { userName, userEmail, InterviewData } = interviewInfo;
//     const jobPosition = InterviewData?.jobPosition || "the position";

//     // Format questions safely
//     const questions = InterviewData?.questionList
//       ?.map((q, i) => `${i + 1}. ${q.question}`)
//       .join('\n') || "No questions available";


    
//     await vapi.start({
      
//       model: {
//     provider: "openai",
//     model: "gpt-3.5-turbo",
//     messages: [
//       {
//         role: "system",
//         content: `You are an AI voice assistant conducting interviews.
// Your job is to ask candidates provided interview questions, assess their responses.

// Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
// "Hey there! Welcome to your ${jobPosition} interview. Let’s get started with a few questions!"

// Ask one question at a time and wait for the candidate’s response before proceeding. Keep the questions clear and concise. Below are the questions to ask one by one:
// Questions: ${questions}

// If the candidate gets stuck, offer hints or rephrase the question without giving away the answer. Example:
// "Need a hint? Think about how React tracks component updates!"

// Provide brief, encouraging feedback after each answer. Example:
// "That’s a solid start!"
// "Hmm, not quite! Want to try again?"

// Keep the conversation natural and engaging—use casual phrases like "Alright, next up…" or "Let’s tackle a tricky one!"

// At the end of the session, wrap up the interview warmly summarizing their performance. Example:
// "That was great! You handled some tough questions well. Keep sharpening your skills!"

// End with a warm note:
// "Thanks once again and hope to see you crushing projects soon!"

// Key Guidelines:
// ✅ Be friendly, engaging, and witty ✅ Guide the process along, like a real conversation ✅ Adapt based on the candidate’s confidence level ✅ Ensure the interview remains focused on React`,
//       },
//      ],
//    },
//    voice: {
//     provider: "11labs",
//     voiceId: "burt",
//   },
//    firstMessage: `Hi ${userName}! Ready for your ${jobPosition} interview? Let's begin.`,
//     });


//     setCallActive(true);
//   } catch (err) {
//     console.error("Call start failed:", err);
//     toast.error("Failed to start interview");
//   } finally {
//     setLoading(false);
//   }
// };
// //   useEffect(() => {
// //   if (!vapi || !vapi.start) {
// //     console.error("Vapi not initialized properly.");
// //   } else {
// //     console.log("Vapi is ready.");
// //   }
// // }, []);

//   //const call = vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISSTANT_ID);
// // { "id": "bd2184a1-bdea-4d4f-9503-b09ca8b185e6", "orgId": "6da6841c-0fca-4604-8941-3d5d65f43a17", "createdAt": "2024-11-13T19:20:24.606Z", "updatedAt": "2024-11-13T19:20:24.606Z", "type": "webCall", ... }



//   //const { interviewInfo } = useContext(InterviewDataContext);

  
  


  
// // // useEffect(() => {
// // //   console.log("🧪 useEffect triggered - interviewInfo:", interviewInfo);
// // //   if (interviewInfo && !callActive) {
// // //     console.log("✅ Starting call...");
// // //     startCall();
// // //   } else if (!interviewInfo) {
// // //     console.warn("⚠️ interviewInfo not available yet");
// // //   }
// // // }, [interviewInfo]);


// // const hasStartedRef = useRef(false);
// // useEffect(() => {
// //   if (interviewInfo && !callActive && !hasStartedRef.current) {
// //     console.log("✅ Starting call...");
// //     hasStartedRef.current = true;
// //     startCall();
// //   }
// // }, [interviewInfo]);


// // useEffect(() => {
// //   if (interviewInfo && !callActive && !hasStartedRef.current) {
// //     console.log("✅ Starting call...");
// //     hasStartedRef.current = true;
// //     startCall();
// //   }
// // }, [interviewInfo, callActive]);



// //   // Named handlers for proper cleanup
// //   const handleMessage = (message) => {
// //     if (message?.conversation) {
// //       setConversation(JSON.stringify(message.conversation));
// //     }
// //   };

// //   const handleCallStart = () => {
// //     setCallActive(true);
// //     toast.success('Call Connected Successfully');
// //   };

// //   const handleSpeechStart = () => {
// //     setActiveUser(false);
// //   };

// //   const handleSpeechEnd = () => {
// //     setActiveUser(true);
// //   };

// //   // const handleCallEnd = () => {
// //   //   if (!isMounted.current) return;
// //   //   setCallActive(false);
// //   //   toast.info('Interview Ended');
// //   //   generateFeedback();
// //   // };
// //   const handleCallEnd = () => {
// //   if (!isMounted.current) return;

// //   setCallActive(false);
// //   toast.info('Interview Ended');

// //   try {
// //     vapi.stop();  // Stops any ongoing call
// //     vapi.destroy?.(); // Clean up internal DailyIframe instance if Vapi exposes it
// //   } catch (error) {
// //     console.error('Error during Vapi cleanup:', error);
// //   }

// //   generateFeedback(); // Proceed to generate feedback and redirect
// // };


// //   // Event management with proper cleanup
// //   useEffect(() => {
// //     isMounted.current = true;
    
// //     vapi.on('message', handleMessage);
// //     vapi.on('call-start', handleCallStart);
// //     vapi.on('speech-start', handleSpeechStart);
// //     vapi.on('speech-end', handleSpeechEnd);
// //     vapi.on('call-end', handleCallEnd);

// //     return () => {
// //       isMounted.current = false;
// //       vapi.off('message', handleMessage);
// //       vapi.off('call-start', handleCallStart);
// //       vapi.off('speech-start', handleSpeechStart);
// //       vapi.off('speech-end', handleSpeechEnd);
// //       vapi.off('call-end', handleCallEnd);
// //       vapi.stop();
// //     };
// //   }, []);

  
  

// // //   const stopInterview = () => {
// // //   setLoading(true);
// // //   try {
// // //     vapi.stop(); // Not a Promise, no .finally()
// // //   } catch (err) {
// // //     console.error('Error stopping the call:', err);
// // //   } finally {
// // //     setLoading(false);
// // //   }
// // // };
// // // const stopInterview = () => {
// // //   setLoading(true);

// // //   try {
// // //     vapi.stop(); // Stops the call
// // //     vapi.destroy?.(); // Clean up (optional)
// // //   } catch (error) {
// // //     console.error('Error stopping interview:', error);
// // //   } finally {
// // //     setLoading(false);
// // //   }
// // // };

// // useEffect(() => {
// //   const handleCallEnded = () => {
// //     console.log("Call ended, navigating to completed page");
// //     router.push("/completed");

// //     // Optional: cleanup only *after* navigation
// //     setTimeout(() => {
// //       vapi.destroy?.(); // Now it's safe to destroy
// //     }, 1000);
// //   };

// //   vapi.on("call-ended", handleCallEnded);
// //   return () => {
// //     vapi.off("call-ended", handleCallEnded);
// //   };
// // }, []);


// // const stopInterview = () => {
// //   setLoading(true);

// //   try {
// //     vapi.stop(); // Gracefully stops the call
// //     // ❌ DO NOT call vapi.destroy() here
// //     // Let the 'call-ended' event trigger first
// //   } catch (error) {
// //     console.error("Error stopping interview:", error);
// //   }
// // };


// //   const generateFeedback = async () => {
// //   if (!conversation) return;

//   try {
//     const { data } = await axios.post('/api/ai-feedback', { conversation });
//     // Fix the regex pattern here:
//     const cleaned = data.content.replace(/```/g, '');
//     console.log(data);

    
// //     await supabase.from('interview-feedback').insert([{
// //       userName: interviewInfo.userName,
// //       userEmail: interviewInfo.userEmail,
// //       interview_id,
// //       feedback: JSON.parse(cleaned),
// //       recommended: false
// //     }]);

// //     router.replace(`/interview/${interview_id}/completed`);
// //   } catch (error) {
// //     console.error('Feedback error:', error);
// //     toast.error('Feedback generation failed');
// //   }
// // };


// //   return (
// //     <div className="p-10 lg:px-48 xl:px-56">
// //       <header className="flex justify-between items-center mb-8">
// //         <h1 className="text-2xl font-bold">AI Interview Session</h1>
// //         <div className="flex items-center gap-2">
// //           <Timer initialSeconds={3600} />
// //           <span className="font-mono">00:00:00</span>
// //         </div>
// //       </header>

// //       <div className="grid md:grid-cols-2 gap-6 mb-8">
// //         <ParticipantCard 
// //           image="/AI.png" 
// //           name="AI Recruiter" 
// //           alt="AI Assistant"
// //           width={100} 
// //           height={100} 
// //         />
// //         <ParticipantCard
// //           initial={interviewInfo?.userName?.[0] || '?'}
// //           name={interviewInfo?.userName || 'Guest'}
// //         />
// //       </div>

// //       <div className="text-center mb-6">
// //         <StatusIndicator activeUser={activeUser} />
// //       </div>

//       <div className="flex justify-center gap-4">
//         <ControlButton
//           icon={Mic}
//           aria-label="Microphone"
//           className="bg-gray-500 hover:bg-gray-600"
//         />
//         <CallEndButton 
//           loading={loading}
//           active={callActive}
//           //onClick={stopInterview}
//         />
//       </div>

// //       <p className="text-center mt-6 text-gray-600 italic">
// //         😏 Testing your knowledge - bring your A-game!
// //       </p>
// //     </div>
// //   );
// // }

// // // Extracted components for better readability
// // // const ParticipantCard = ({ image, initial, name, alt }) => (
// // //   <div className="bg-white rounded-lg border p-6 flex flex-col items-center">
// // //     {image ? (
// // //       <Image
// // //         src={image}
// // //         alt={alt}
// // //         width={160}
// // //         height={160}
// // //         className="rounded-full object-cover"
// // //       />
// // //     ) : (
// // //       <div className="text-7xl bg-primary text-white rounded-full p-8">
// // //         {initial}
// // //       </div>
// // //     )}
// // //     <h3 className="mt-4 text-lg font-semibold">{name}</h3>
// // //   </div>
// // // );

// // const ParticipantCard = ({ image, initial, name, alt = 'Participant', width = 160, height = 160 }) => (
// //   <div className="bg-white rounded-lg border p-6 flex flex-col items-center">
// //     {image ? (
// //       <Image
// //         src={image}
// //         alt={alt}
// //         width={width}
// //         height={height}
// //         className="rounded-full object-cover"
// //         priority
// //       />
// //     ) : (
// //       <div
// //         className="text-7xl bg-primary text-white rounded-full flex items-center justify-center"
// //         style={{ width, height }}
// //       >
// //         {initial}
// //       </div>
// //     )}
// //     <h3 className="mt-4 text-lg font-semibold">{name}</h3>
// //   </div>
// // );


// // const StatusIndicator = ({ activeUser }) => (
// //   <p className={`font-semibold ${activeUser ? 'text-green-600 animate-pulse' : 'text-yellow-600'}`}>
// //     {activeUser ? '🎤 Your Turn to Speak...' : '🤖 Listening to AI...'}
// //   </p>
// // );

// // const ControlButton = ({ icon: Icon, ...props }) => (
// //   <button className="p-3 rounded-full transition-colors" {...props}>
// //     <Icon className="h-8 w-8 text-white" />
// //   </button>
// // );

// // // const CallEndButton = ({ loading, active, onClick }) => (
// // //   loading ? (
// // //     <Loader2Icon className="animate-spin h-12 w-12" />
// // //   ) : (
// // //     <ControlButton
// // //       icon={Phone}
// // //       onClick={onClick}
// // //       disabled={!active}
// // //       className={`${active ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-400'}`}
// // //       aria-label="End call"
// // //     />
// // //   )
// // // );

// // const CallEndButton = ({ loading, active }) => {
// //   const router = useRouter();
// //   const params = useParams(); // returns an object of dynamic segments
// //   const interview_id = params?.interview_id;

// //   const handleClick = () => {
// //     if (!active || !interview_id) return;

// //     // Navigate to the completed page
// //     router.push(`/interview/${interview_id}/completed`);
// //   };

// //   return loading ? (
// //     <Loader2Icon className="animate-spin h-12 w-12" />
// //   ) : (
// //     <ControlButton
// //       icon={Phone}
// //       onClick={handleClick}
// //       disabled={!active}
// //       className={`${active ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-400'}`}
// //       aria-label="End call"
// //     />
// //   );
// // };

// // export default StartInterview;

// export default StartInterview;


















// 'use client';
// import React, { useContext, useEffect, useRef, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { supabase } from '@/services/supabaseClient';
// import { InterviewDataContext } from '@/context/InterviewDataContext';
// import { toast } from 'react-toastify';
// import Image from 'next/image';
// import { Loader2Icon, Mic, Phone } from 'lucide-react';
// import Timer from './Timer';
//  // Corrected import path
// import axios from 'axios';
// import Vapi from '@vapi-ai/web';
// import { vapi } from '@/lib/vapi.sdk';


// function StartInterview() {
//      const { interview_id } = useParams();
//   const router = useRouter();
  
//   const [activeUser, setActiveUser] = useState(false);
//   const [conversation, setConversation] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [callActive, setCallActive] = useState(false);
//   const isMounted = useRef(true);
//   const [interviewInfo, setInterviewInfo] = useState(null);
//   const [dataLoading, setDataLoading] = useState(true);
//   const hasStartedRef = useRef(false); 
  
// const vapi =new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);




//   // Fetch interview data from Supabase
//   useEffect(() => {
//     const fetchInterviewData = async () => {
//       try {
//         const { data: { user } } = await supabase.auth.getUser();
//         if (!user) {
//           setDataLoading(false);
//           router.replace('/login');
//           return;
//         }
        
//         const { data, error } = await supabase
//           .from('Interviews')
//           .select(`
//             jobPosition,
//             questionList
//           `)
//           .eq('interview_id', interview_id)
//           .single();

//         if (error) throw error;

//         if (data) {
//           setInterviewInfo({
//             userName: user.user_metadata?.full_name || "User",
//             userEmail: user.email,
//             InterviewData: {
//               jobPosition: data.jobPosition,
//               questionList: data.questionList
//             }
//           });
//         }
//       } catch (error) {
//         console.error("Fetch error:", error);
//         toast.error('Failed to load interview data');
//       } finally {
//         setDataLoading(false);
//       }
//     };

//     fetchInterviewData();
//   }, [interview_id]);
//   console.log(interviewInfo)
//   useEffect(() => {
//   if (interviewInfo && !hasStartedRef.current) {
//     hasStartedRef.current = true;
//     startCall();
//   }
// }, [interviewInfo]);


//  const startCall = async () => {
//   if (!interviewInfo) return;

//   try {
//     setLoading(true);
    
//     const { userName, userEmail, InterviewData } = interviewInfo;
//     const jobPosition = InterviewData?.jobPosition || "the position";

//     // Format questions safely
//     const questions = InterviewData?.questionList
//       ?.map((q, i) => `${i + 1}. ${q.question}`)
//       .join('\n') || "No questions available";


    
//     await vapi.start({
      
//       model: {
//     provider: "openai",
//     model: "gpt-3.5-turbo",
//     messages: [
//       {
//         role: "system",
//         content: `You are an AI voice assistant conducting interviews.
// Your job is to ask candidates provided interview questions, assess their responses.

// Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
// "Hey there! Welcome to your ${jobPosition} interview. Let’s get started with a few questions!"

// Ask one question at a time and wait for the candidate’s response before proceeding. Keep the questions clear and concise. Below are the questions to ask one by one:
// Questions: ${questions}

// If the candidate gets stuck, offer hints or rephrase the question without giving away the answer. Example:
// "Need a hint? Think about how React tracks component updates!"

// Provide brief, encouraging feedback after each answer. Example:
// "That’s a solid start!"
// "Hmm, not quite! Want to try again?"

// Keep the conversation natural and engaging—use casual phrases like "Alright, next up…" or "Let’s tackle a tricky one!"

// At the end of the session, wrap up the interview warmly summarizing their performance. Example:
// "That was great! You handled some tough questions well. Keep sharpening your skills!"

// End with a warm note:
// "Thanks once again and hope to see you crushing projects soon!"

// Key Guidelines:
// ✅ Be friendly, engaging, and witty ✅ Guide the process along, like a real conversation ✅ Adapt based on the candidate’s confidence level ✅ Ensure the interview remains focused on React`,
//       },
//      ],
//    },
//    voice: {
//     provider: "11labs",
//     voiceId: "burt",
//   },
//    firstMessage: `Hi ${userName}! Ready for your ${jobPosition} interview? Let's begin.`,
//     });


//     setCallActive(true);
//   } catch (err) {
//     console.error("Call start failed:", err);
//     toast.error("Failed to start interview");
//   } finally {
//     setLoading(false);
//   }
// };
// //   useEffect(() => {
// //   if (!vapi || !vapi.start) {
// //     console.error("Vapi not initialized properly.");
// //   } else {
// //     console.log("Vapi is ready.");
// //   }
// // }, []);

//   //const call = vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISSTANT_ID);
// // { "id": "bd2184a1-bdea-4d4f-9503-b09ca8b185e6", "orgId": "6da6841c-0fca-4604-8941-3d5d65f43a17", "createdAt": "2024-11-13T19:20:24.606Z", "updatedAt": "2024-11-13T19:20:24.606Z", "type": "webCall", ... }



//   //const { interviewInfo } = useContext(InterviewDataContext);

  
  


  
// // useEffect(() => {
// //   console.log("🧪 useEffect triggered - interviewInfo:", interviewInfo);
// //   if (interviewInfo && !callActive) {
// //     console.log("✅ Starting call...");
// //     startCall();
// //   } else if (!interviewInfo) {
// //     console.warn("⚠️ interviewInfo not available yet");
// //   }
// // }, [interviewInfo]);



// useEffect(() => {
//   if (interviewInfo && !callActive && !hasStartedRef.current) {
//     console.log("✅ Starting call...");
//     hasStartedRef.current = true;
//     startCall();
//   }
// }, [interviewInfo]);


// useEffect(() => {
//   if (interviewInfo && !callActive && !hasStartedRef.current) {
//     console.log("✅ Starting call...");
//     hasStartedRef.current = true;
//     startCall();
//   }
// }, [interviewInfo, callActive]);



//   // Named handlers for proper cleanup
//   const handleMessage = (message) => {
//     if (message?.conversation) {
//       setConversation(JSON.stringify(message.conversation));
//     }
//   };

//   const handleCallStart = () => {
//     setCallActive(true);
//     toast.success('Call Connected Successfully');
//   };

//   const handleSpeechStart = () => {
//     setActiveUser(false);
//   };

//   const handleSpeechEnd = () => {
//     setActiveUser(true);
//   };

//   // const handleCallEnd = () => {
//   //   if (!isMounted.current) return;
//   //   setCallActive(false);
//   //   toast.info('Interview Ended');
//   //   generateFeedback();
//   // };
//   const handleCallEnd = () => {
//   if (!isMounted.current) return;

//   setCallActive(false);
//   toast.info('Interview Ended');

//   try {
//     vapi.stop();  // Stops any ongoing call
//     vapi.destroy?.(); // Clean up internal DailyIframe instance if Vapi exposes it
//   } catch (error) {
//     console.error('Error during Vapi cleanup:', error);
//   }

//   generateFeedback(); // Proceed to generate feedback and redirect
// };


//   // Event management with proper cleanup
//   useEffect(() => {
//     isMounted.current = true;
    
//     vapi.on('message', handleMessage);
//     vapi.on('call-start', handleCallStart);
//     vapi.on('speech-start', handleSpeechStart);
//     vapi.on('speech-end', handleSpeechEnd);
//     vapi.on('call-end', handleCallEnd);

//     return () => {
//       isMounted.current = false;
//       vapi.off('message', handleMessage);
//       vapi.off('call-start', handleCallStart);
//       vapi.off('speech-start', handleSpeechStart);
//       vapi.off('speech-end', handleSpeechEnd);
//       vapi.off('call-end', handleCallEnd);
//       vapi.stop();
//     };
//   }, []);

  
  

// //   const stopInterview = () => {
// //   setLoading(true);
// //   try {
// //     vapi.stop(); // Not a Promise, no .finally()
// //     console.log("Call stopped successfully");
// //   } catch (err) {
// //     console.error('Error stopping the call:', err);
// //   } finally {
// //     setLoading(false);
// //   }
// // };


// // const stopInterview = () => {
// //   setLoading(true);

// //   try {
// //     vapi.stop(); // Stops the call
// //     vapi.destroy?.(); // Clean up (optional)
// //   } catch (error) {
// //     console.error('Error stopping interview:', error);
// //   } finally {
// //     setLoading(false);
// //   }
// // };

// useEffect(() => {
//   const handleCallEnded = () => {
//     console.log("Call ended, navigating to completed page");
//     router.push("/completed");

//     // Optional: cleanup only *after* navigation
//     setTimeout(() => {
//       vapi.destroy?.(); // Now it's safe to destroy
//     }, 1000);
//   };

//   vapi.on("call-ended", handleCallEnded);
//   return () => {
//     vapi.off("call-ended", handleCallEnded);
//   };
// }, []);




// const stopInterview = () => {
//   setLoading(true);

//   try {
//     vapi.stop(); // Gracefully stops the call
//     // ❌ DO NOT call vapi.destroy() here
//     // Let the 'call-ended' event trigger first
//   } catch (error) {
//     console.error("Error stopping interview:", error);
//   }
// };


//   const generateFeedback = async () => {
//   if (!conversation) return;

//   try {
//     const { data } = await axios.post('/api/ai-feedback', { conversation });
    
//     const cleaned = data.content.replace(/```/g, '');
//     console.log(data);

    
//     await supabase.from('interview-feedback').insert([{
//       userName: interviewInfo.userName,
//       userEmail: interviewInfo.userEmail,
//       interview_id,
//       feedback: JSON.parse(cleaned),
//       recommended: false
//     }]);

//     router.replace(`/interview/${interview_id}/completed`);
//   } catch (error) {
//     console.error('Feedback error:', error);
//     toast.error('Feedback generation failed');
//   }
// };


//   return (
//     <div className="p-10 lg:px-48 xl:px-56">
//       <header className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold">AI Interview Session</h1>
//         <div className="flex items-center gap-2">
//           <Timer initialSeconds={3600} />
//           <span className="font-mono">00:00:00</span>
//         </div>
//       </header>

//       <div className="grid md:grid-cols-2 gap-6 mb-8">
//         <ParticipantCard 
//           image="/AI.png" 
//           name="AI Recruiter" 
//           alt="AI Assistant"
//           width={100} 
//           height={100} 
//         />
//         <ParticipantCard
//           initial={interviewInfo?.userName?.[0] || '?'}
//           name={interviewInfo?.userName || 'Guest'}
//         />
//       </div>

//       <div className="text-center mb-6">
//         <StatusIndicator activeUser={activeUser} />
//       </div>

//       <div className="flex justify-center gap-4">
//         <ControlButton
//           icon={Mic}
//           aria-label="Microphone"
//           className="bg-gray-500 hover:bg-gray-600"
//         />
//         <CallEndButton 
//           loading={loading}
//           active={callActive}
//           onClick={stopInterview}
//         />
//       </div>

//       <p className="text-center mt-6 text-gray-600 italic">
//         😏 Testing your knowledge - bring your A-game!
//       </p>
//     </div>
//   );
// }

// // Extracted components for better readability
// // const ParticipantCard = ({ image, initial, name, alt }) => (
// //   <div className="bg-white rounded-lg border p-6 flex flex-col items-center">
// //     {image ? (
// //       <Image
// //         src={image}
// //         alt={alt}
// //         width={160}
// //         height={160}
// //         className="rounded-full object-cover"
// //       />
// //     ) : (
// //       <div className="text-7xl bg-primary text-white rounded-full p-8">
// //         {initial}
// //       </div>
// //     )}
// //     <h3 className="mt-4 text-lg font-semibold">{name}</h3>
// //   </div>
// // );

// const ParticipantCard = ({ image, initial, name, alt = 'Participant', width = 160, height = 160 }) => (
//   <div className="bg-white rounded-lg border p-6 flex flex-col items-center">
//     {image ? (
//       <Image
//         src={image}
//         alt={alt}
//         width={width}
//         height={height}
//         className="rounded-full object-cover"
//         priority
//       />
//     ) : (
//       <div
//         className="text-7xl bg-primary text-white rounded-full flex items-center justify-center"
//         style={{ width, height }}
//       >
//         {initial}
//       </div>
//     )}
//     <h3 className="mt-4 text-lg font-semibold">{name}</h3>
//   </div>
// );


// const StatusIndicator = ({ activeUser }) => (
//   <p className={`font-semibold ${activeUser ? 'text-green-600 animate-pulse' : 'text-yellow-600'}`}>
//     {activeUser ? '🎤 Your Turn to Speak...' : '🤖 Listening to AI...'}
//   </p>
// );

// const ControlButton = ({ icon: Icon, ...props }) => (
//   <button className="p-3 rounded-full transition-colors" {...props}>
//     <Icon className="h-8 w-8 text-white" />
//   </button>
// );

// // const CallEndButton = ({ loading, active, onClick }) => (
// //   loading ? (
// //     <Loader2Icon className="animate-spin h-12 w-12" />
// //   ) : (
// //     <ControlButton
// //       icon={Phone}
// //       onClick={onClick}
// //       disabled={!active}
// //       className={`${active ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-400'}`}
// //       aria-label="End call"
// //     />
// //   )
// // );

// const CallEndButton = ({ loading, active }) => {
//   const router = useRouter();
//   const params = useParams(); // returns an object of dynamic segments
//   const interview_id = params?.interview_id;

//   const handleClick = () => {
  
//     if (!active || !interview_id) return;
//     // Stop the interview call
    

//     // Navigate to the completed page
//     router.push(`/interview/${interview_id}/completed`);
//   };

//   return loading ? (
//     <Loader2Icon className="animate-spin h-12 w-12" />
//   ) : (
//     <ControlButton
//       icon={Phone}
//       onClick={handleClick}
//       disabled={!active}
//       className={`${active ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-400'}`}
//       aria-label="End call"
//     />
//   );
// };

// export default StartInterview;







'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/services/supabaseClient';
import { toast } from 'react-toastify';
import { Loader2Icon, Mic, Phone } from 'lucide-react';
import Timer from './Timer';
import axios from 'axios';
import Vapi from '@vapi-ai/web';
import Image from 'next/image';

function StartInterview() {
  const { interview_id } = useParams();
  const router = useRouter();
  
  const [activeUser, setActiveUser] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [callActive, setCallActive] = useState(false);
  const [interviewInfo, setInterviewInfo] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  
  const vapi = useRef(new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || ''));

  // Fetch interview data
  useEffect(() => {
    const fetchInterviewData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.replace('/login');
          return;
        }
        
        const { data, error } = await supabase
          .from('Interviews')
          .select('jobPosition, questionList')
          .eq('interview_id', interview_id)
          .single();

        if (error) throw error;

        if (data) {
          setInterviewInfo({
            userName: user.user_metadata?.full_name || "User",
            userEmail: user.email,
            InterviewData: {
              jobPosition: data.jobPosition,
              questionList: data.questionList
            }
          });
        }
        console.log(user.user_metadata?.full_name);
        console.log(user.email);
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error('Failed to load interview data');
      } finally {
        setDataLoading(false);
      }
    };

    fetchInterviewData();
  }, [interview_id]);

  // Handle conversation updates
  
  const handleMessage = (message) => {
  if (message?.conversation) {
    console.log('Conversation update:', message.conversation);
    // Create a new array reference to ensure state updates
    setConversation(prev => [...prev, ...message.conversation]);
    
    // Also store in a ref for immediate access
    conversationRef.current = [...conversationRef.current, ...message.conversation];
  }
};
const conversationRef = useRef([]);


  useEffect(() => {
  const currentVapi = vapi.current;
  
  // Define call-start handler separately so we can reference it
  const handleCallStart = () => {
    setCallActive(true);
    toast.success('Call Connected');
  };

  const handleError = (error) => {
  console.error('Vapi error:', error);
  toast.error(`Error: ${error.message}`);
  setCallActive(false);
};

  // Add event listeners
  currentVapi.on('message', handleMessage);
  currentVapi.on('call-start', handleCallStart);
  currentVapi.on('call-end', handleCallEnd);
  currentVapi.on('error', handleError);

  return () => {
    // Cleanup event listeners properly
    currentVapi.off('message', handleMessage);
    currentVapi.off('call-start', handleCallStart);
    currentVapi.off('call-end', handleCallEnd);
    currentVapi.off('error', handleError);
    currentVapi.stop();
  };
}, []);

  // Start call when interview info is loaded
  useEffect(() => {
    if (interviewInfo && !callActive) {
      startCall();
    }
  }, [interviewInfo]);

  const startCall = async () => {
    try {
      setLoading(true);
      const { userName, InterviewData } = interviewInfo;
      
      await vapi.current.start({
        model: {
          provider: "openai",
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are conducting an interview for ${InterviewData.jobPosition}.`
            }
          ],
        },
        voice: {
          provider: "11labs",
          voiceId: "burt",
        },
        firstMessage: `Hi ${userName}! Ready for your interview? Let's begin.`,
      });
    } catch (err) {
      console.error("Call start failed:", err);
      toast.error("Failed to start interview");
    } finally {
      setLoading(false);
    }
  };
// const handleCallEnd = async () => {
//   setCallActive(false);
//   try {
//     const feedback = await generateFeedback();
//     console.log('Feedback process completed:', feedback);
//     router.push(`/interview/${interview_id}/completed`);
//   } catch (error) {
//     console.error('Final error during call end:', error);
//     toast.error('Interview ended, but there was an issue saving feedback');
//     router.push(`/interview/${interview_id}/completed`);
//   }
// };

// 5. Update handleCallEnd to ensure proper sequencing



const handleCallEnd = async () => {
  try {
    setCallActive(false);
    
    // Small delay to ensure all messages are processed
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const feedback = await generateFeedback();
    console.log('Feedback completed:', feedback);
    
    router.push(`/interview/${interview_id}/completed`);
  } catch (error) {
    console.error('Call end error:', error);
    router.push(`/interview/${interview_id}/completed`);
  }
};
  const stopInterview = () => {
    setLoading(true);
    vapi.current.stop();
  };

// 3. Update generateFeedback to use the ref as fallback
// const generateFeedback = async () => {
//   try {
//     // Use state if available, otherwise fallback to ref
//     const finalConversation = conversation.length > 0 ? conversation : conversationRef.current;
    
//     if (!finalConversation || finalConversation.length === 0) {
//       throw new Error('No conversation available for feedback');
//     }

//     console.log('Generating feedback from:', finalConversation);
    
//     const  {data}  = await axios.post('/api/ai-feedback', {
//       conversation: finalConversation,
      
      
//     }
//   );
//   console.log(data);

//     // 4. Update Supabase insert to handle all cases
//     const { error } = await supabase
//       .from('interview-feedback')
//       .insert({
//         interview_id,
//         feedback: data.feedback || 'No feedback generated',
        
//         recommended: data.recommended || false,
        
//         created_at: new Date().toISOString()
//       });

//     if (error) throw error;

//     return data;

//   } catch (error) {
//     console.error('Feedback error:', error);
//     // Return minimal feedback structure
//     return {
//       feedback: "Interview completed. Feedback generation failed",
//       recommended: false,
//       score: null
//     };
//   }
// };


const generateFeedback = async () => {
  try {
    const finalConversation = conversation.length > 0 ? conversation : conversationRef.current;

    if (!finalConversation || finalConversation.length === 0) {
      throw new Error('No conversation available for feedback');
    }

    // Get authenticated user again
    const { data: { user } } = await supabase.auth.getUser();
    const fullName = user?.user_metadata?.full_name || "User";
    const email = user?.email;


    console.log('Generating feedback from:', finalConversation);

    const { data } = await axios.post('/api/ai-feedback', {
      conversation: finalConversation,
    });

    console.log('Raw feedback from API:', data);
    console.log(interviewInfo);
    console.log(user.user_metadata?.full_name);
        console.log(user.email);

    // Step 1: Clean code block and parse JSON
    const cleanedContent = data.content
      ?.replace(/```json\s*|\s*```/g, '')
      .trim();

    let feedbackObj;
    try {
      feedbackObj = JSON.parse(cleanedContent).feedback;
    } catch (parseError) {
      throw new Error('Failed to parse feedback JSON: ' + parseError.message);
    }

    const {
      rating,
      summary,
      Recommendation,         // Some responses use capital 'R'
      recommendation,
      RecommendationMsg,
      recommendationMsg
    } = feedbackObj;

    // Prefer lowercase keys, fallback to uppercase
    const summaryFinal = Array.isArray(summary) ? summary.join(' ') : summary || '';
    const recommendationFinal = recommendation || Recommendation || '';
    const recommendationMsgFinal = recommendationMsg || RecommendationMsg || '';
    const isRecommended = recommendationFinal.toLowerCase().includes('yes') ;//|| recommendationFinal.toLowerCase().includes('recommended');

    // Step 2: Store structured JSON in feedback column
    const feedbackToStore = {
      summary: summaryFinal,
      rating,
      recommendationMsg: recommendationMsgFinal
    };

    const { error } = await supabase
      .from('interview-feedback')
      .insert({
        interview_id,
        userName: fullName,
        userEmail: email,
        feedback: feedbackToStore,
        recommended: isRecommended,
        created_at: new Date().toISOString()
      });

    if (error) throw error;

    return feedbackToStore;

  } catch (error) {
    console.error('Feedback error:', error);
    return {
      feedback: "Interview completed. Feedback generation failed",
      recommended: false,
      score: null
    };
  }
};




  if (dataLoading) {
    return <div className="flex justify-center items-center h-screen">
      <Loader2Icon className="animate-spin h-12 w-12" />
    </div>;
  }

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

// Component Definitions
const ParticipantCard = ({ image, initial, name, alt = 'Participant', width = 160, height = 160 }) => (
  <div className="bg-white rounded-lg border p-6 flex flex-col items-center">
    {image ? (
      <div className="relative" style={{ width, height }}>
        <Image
          src={image}
          alt={alt}
          fill
          className="rounded-full object-cover"
          priority
        />
      </div>
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

// 

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

const CallEndButton = ({ loading, active, onClick }) => {
  return loading ? (
    <Loader2Icon className="animate-spin h-12 w-12" />
  ) : (
    <ControlButton
      icon={Phone}
      onClick={onClick}
      disabled={!active}
      className={`${active ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-400'}`}
      aria-label="End call"
    />
  );
};

export default StartInterview;