
import { createContext } from 'react';


export const InterviewDataContext = createContext();


// import React, { createContext, useState } from 'react';

// export const InterviewDataContext = createContext();

// export const InterviewDataProvider = ({ children }) => {
//   const [interviewInfo, setInterviewInfo] = useState(null);

//   return (
//     <InterviewDataContext.Provider value={{ interviewInfo, setInterviewInfo }}>
//       {children}
//     </InterviewDataContext.Provider>
//   );
// };
