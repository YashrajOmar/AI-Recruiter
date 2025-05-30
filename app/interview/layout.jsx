"use client"

import React, { useState } from "react"
import InterviewHeader from "./_components/interviewHeader"
import { InterviewDataContext } from "@/context/InterviewDataContext"

function InterviewLayout({ children }) {
    const [InterviewInfo, setInterviewInfo]=useState();
    return (
    <InterviewDataContext.Provider value={{ InterviewInfo, setInterviewInfo }}>
        <div className="bg-secondary">
           <InterviewHeader />
           {children}
        </div>
    </InterviewDataContext.Provider>
    )
}

export default InterviewLayout