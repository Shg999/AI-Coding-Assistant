import React from 'react'

export default function Header() {
  return (
    <div className='flex-center mb-12'>
      <div className='flex items-center justify-center mb-4'>
         <h1 className='text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>CodeCraft AI</h1>
      </div>
      <p className='text-gray-300 text-center text-lg max-w-2xl mx-auto'>Your intelligent coding companion. Explain, debug and generate code with AI-powered assistance.</p>
    </div>
  )
}
