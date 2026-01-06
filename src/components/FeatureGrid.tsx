import React from 'react'
import Features from '../data/Features'

export default function FeatureGrid() {
  return (
    <div className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto'>
      {Features.map((feature, index) => {
        const Icon=feature.icon
        return(
          <div key={index} className='bg-gray-800/40 backdrop-blur-lg rounded-xl p-6 border bg-gray-800 hover:border-purple-500/50 transition-all duration-300 group '>
          <div className='w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 flex rounded-lg items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300'>
            <Icon className='text-2xl text-white' />
          </div>
          <h3 className='text-xl font-semibold text-white mb-2'>{feature.title}</h3>
          <p className='text-gray-300'>{feature.description}</p>
        </div>
        )
      })}
    </div>
  )
}
