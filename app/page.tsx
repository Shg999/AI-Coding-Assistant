'use client';
import CodeDebugging from "@/src/components/CodeDebugging";
import CodeExplanation from "@/src/components/CodeExplanation";
import CodeGeneration from "@/src/components/CodeGeneration";
import FeatureGrid from "@/src/components/FeatureGrid";
import Header from "@/src/components/Header";
import HistoryPanel from "@/src/components/HistoryPanel";
import Tabs from '@/src/data/Tabs'
import { HistoryItem, Tab } from "@/src/types";
import { useState, useEffect } from "react";

const HISTORY_STORAGE_KEY = "ai_recent_history";
export default function Home() {
  const [active, setActive] = useState<Tab["id"]>("explain")
  const [history, setHistory] = useState<HistoryItem[]>([])

useEffect(() => {
   const stored = localStorage.getItem(HISTORY_STORAGE_KEY)
   if(stored) {
      setHistory(JSON.parse(stored))
   }
}, [])

useEffect(() => {
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history))
},[history])

  const addToHistory = (
    type: HistoryItem["type"],
    input: string,
    output: string
  ) => {
    const newItem: HistoryItem = {
      id: Date.now(),
      type,
      timestamp: new Date().toLocaleString(),
      input,
      output
    }
    setHistory((prev) => [newItem, ...prev].slice(0, 10))
  }
  return (
    <div className="bg-black min-h-screen">
      <main className="relative z-10 container mx-auto px-4 py-8">
        <Header />
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto mt-8">
          {/* Main Content */}
          <div className="w-full lg:w-2/3">
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-700/50 bg-gray-900/50 p-2 gap-2">
                {Tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button key={tab.id} onClick={() => setActive(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                      ${active === tab.id
                          ? `bg-linear-to-r ${tab.gradient} text-white shadow-lg`
                          : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                        }`}
                    >
                      <Icon className="text-xl mr-1" />
                      {tab.label}
                    </button>
                  )
                })}
              </div>
              {/* tab content */}
              <div className="p-6">
                {active === "explain" && (
                  <CodeExplanation addToHistory={addToHistory} />
                )}

                {active === "debug" && (
                  <CodeDebugging addToHistory={addToHistory} />
                )}

                {active === "generate" && (
                  <CodeGeneration addToHistory={addToHistory} />
                )}
              </div>
            </div>
          </div>
          {/* Sidebar */}
          <div className="w-full lg:w-1/3">
            <HistoryPanel history={history} />
          </div>
        </div>
        <FeatureGrid />
      </main>

      <footer className="relative z-10 text-center py-8 text-gray-400">
        <p>Powered by Google Gemini AI * Built with Next.js & TypeScript</p>
      </footer>
    </div>
  )
}