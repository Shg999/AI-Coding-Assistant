'use client';
import React, { useState } from 'react'
import { HistoryItem } from '../types';
import { sampleCode } from '../data/examples';

interface CodeExplanationProps {
  addToHistory: (
    type: HistoryItem["type"],
    input: string,
    output: string
  ) => void;
}
function CodeExplanation({addToHistory}: CodeExplanationProps) {
  const [code, setCode] = useState<string>("")
  const [explanation, setExplanation] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const handleExplain = async() => {
     if(!code.trim()) return;
     setLoading(true)
     try {
      const response = await fetch('/api/explain', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({code})
      })
      const data = await response.json();
      if(response.ok){
        const explanationText =data.data?.explanation || "No explanation generated"
        setExplanation(explanationText)
        addToHistory("explain", code, explanationText)
      } else{
        setExplanation(`Error: ${data.error}`)
      }
     } catch {
         setExplanation("Failed to fetch explanation. Please try again")
     }
     finally{
      setLoading(false)
     }
  }

  const insertSample = () => {
    setCode(sampleCode)
  }
  return (
   <div className='space-y-6'>
    <div className='flex items-center justify-between'>
    <h2 className='text-2xl font-bold text-white'>Explain Code</h2>
    <button onClick={insertSample} className='px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200
     rounded-lg transition-colors duration-200 text-sm'>Try Sample</button>
    </div>
    <div className='space-y-4'>
      <div>
        <label htmlFor="code" className='block text-sm font-medium text-gray-300 mb-2'>Paste your code</label>
          <div className='relative'>
            <textarea id="code" rows={12} className='w-full px-4 py-3 bg-gray-900 border-gray-500 resize-none font-mono text-sm backdrop-blur-sm
            transition-all duration-200 text-gray-100' value={code} onChange={(e)=> setCode(e.target.value)}
              placeholder='Paste your code here to get a detailed explanation'/>
              <div className='absolute top-3 right-3 text-xs text-gray-500'>{code.length} chars</div>
          </div>
      </div>
      <button onClick={handleExplain} disabled={loading || !code.trim()}
      className='w-full px-6 py-4 bg-gradient-to-r rounded-2xl from-purple-600 to-pink-600 disabled:cursor-not-allowed
      flex items-center justify-center space-x-2 shadow-lg'>
        {loading ? (
          <>
          <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
          <span>Analyzing Code...</span>
          </>
        ) : (
          <>
          <span></span>
          <span>Explain Code</span>
          </>
        )}
      </button>
    </div>
    {explanation && (
      <div className='mt-6 animate-fade-in'>
        <div className='flex items-center space-x-2 mb-4'>
          <div className='w-2 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded mr-2'>
            <h3 className='text-xl font-semibold text-white ml-4'>Explanation</h3>
          </div>
          <div className='bg-gray-900 backdrop-blur-xl border mt-20  border-gray-700 rounded'>
            <div className='prose prose-invert max-w-none'>
              <pre className='text-gray-100 whitespace-pre-wrap leading-relaxed text-sm'>{explanation}</pre>
            </div>
          </div>
        </div>
      </div>
    )}
   </div>
  )
}

export default CodeExplanation