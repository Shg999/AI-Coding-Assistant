import React from 'react'
import { HistoryItem } from '../types'

interface HistoryItemProps {
  history: HistoryItem[]
}
export default function HistoryPanel({ history }: HistoryItemProps) {
  const formatContent = (content: string, maxLength: number = 100): string => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + "...";
  }

  const getTypeConfig = (type: HistoryItem["type"]) => {
    switch (type) {
      case "explain":
        return {
          color: "from-purple-500 to-pink-500",
          icon: "",
          bg: "bg-purple-500/10"
        };
      case "debug":
        return {
          color: "from-red-500 to-orange-500",
          icon: "",
          bg: "bg-red-500/10"
        };
      case "generate":
        return {
          color: "from-green-500 to-blue-500",
          icon: "",
          bg: "bg-green-500/10"
        };
      default:
        return {
          color: "from-gray-500 to-gray-600",
          icon: "",
          bg: "bg-gray-500/10"
        };
    }
  }
  return (
    <div className='bg-gray-900 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden'>
     <div className='p-6 border-b border-gray-700/50'>
     <div className='flex items-center justify-between'>
      <h2 className='text-xl font-bold text-white'>Recent Activity</h2>
       </div>
      <p className='text-gray-400 text-sm mt-1'>Your recent AI interactions</p>   
     </div>
     <div className='p-4 max-h-96 overflow-y-auto '>
      {history.length === 0 ? (
        <div className='text-center py-8'>
          <p className='text-gray-500 text-sm'>No activity yet</p>
          <p className='text-gray-600 text-xs mt-1'>
            Your interactions will appear here
          </p>
        </div>
      ) : (
        <div className='space-y-3'>
          {history.map((item) => {
            const config = getTypeConfig(item.type)
            return(
              <div key={item.id} className={`p-4 rounded-xl border border-gray-700/50 hover:border-gray-600
              transition-all duration-300 group ${config.bg} backdrop-blur-sm`}>
                <div className='flex items-start justify-between mb-3'>
                  <div className='flex items-center space-x-2'>
                    <span className='text-sm font-medium text-white capitalize'>{item.type}</span>
                  </div>
                  <span className='text-xs text-gray-500 group-hover:text-gray-400'>{item.timestamp}</span>
                </div>
                <div className='space-y-2'>
                  <div>
                    <p className='text-xs font-medium text-gray-400 mb-1'>Input</p>
                    <p className='text-sm text-gray-200 whitespace-pre-wrap leading-relaxed '>{formatContent(item.input, 60)}</p>
                  </div>
                  <div>
                    <p className='text-xs font-medium text-gray-400 mb-1'>Output</p>
                    <p className='text-sm text-gray-200 whitespace-pre-wrap leading-relaxed'>{formatContent(item.output, 80)}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
     </div>
    </div>
  )
}
