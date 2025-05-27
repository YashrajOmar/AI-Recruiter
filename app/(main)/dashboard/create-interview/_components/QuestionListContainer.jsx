import React from 'react'

function QuestionListContainer({questionList}) {
  return (
    <div>
        <h2 className='font-bold text-lg'>Generated Interview Questions</h2>
            <div className='p-5 border border-gray-300 rounded-xl'>
                {questionList.map((item,index)=>(
                    <div key={index} className='p-3 border border-gray-100 rounded-xl'>
                        <h2 className='font-medium'>{item.question}</h2>
                        <h2 className='text-blue-400'>Type: {item?.type}</h2>
                    </div>
                ))}
                
                </div>
    </div>
  )
}

export default QuestionListContainer