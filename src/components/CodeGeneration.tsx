'use client';

import React, { useState } from 'react'
import { HistoryItem } from '../types';
import { languages, samplePrompts } from '../data/examples';
import { FaCopy, FaCheck } from 'react-icons/fa';

interface CodeGenerationProps {
  addToHistory: (
    type: HistoryItem["type"],
    input: string,
    output: string
  ) => void;
}

function CodeGeneration({ addToHistory }: CodeGenerationProps) {
  const [description, setDescription] = useState<string>("")
  const [language, setLanguage] = useState<string>("JavaScript")
  const [generatedCode, setGeneratedCode] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)

  const handleGenerate = async () => {
    if (!description.trim()) return;

    setLoading(true)
    setGeneratedCode("")
    setCopied(false)

    try {
      const response = await fetch('/api/generate', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, language })
      })

      const data = await response.json()

      if (response.ok) {
        const codeText = data?.data?.generatedCode || "No code generated"
        setGeneratedCode(codeText)
        addToHistory("generate", `${language}\n\n${description}`, codeText)
      } else {
        setGeneratedCode(`Error: ${data.error}`)
      }
    } catch {
      setGeneratedCode("Failed to generate code. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const insertSamplePrompt = (prompt: string) => {
    setDescription(prompt)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 className="text-2xl font-bold text-white">Generate Code</h2>

      {/* Language */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Programming Language
        </label>
        <select
          className="w-full px-4 py-3 bg-gray-900/70 border border-gray-600 rounded-xl text-gray-100"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {languages.map((lang) => (
            <option key={lang} value={lang} className="bg-gray-800">
              {lang}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Describe what you want to code
        </label>
        <textarea
          rows={5}
          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl resize-none font-mono text-sm text-gray-100"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the code you want to generate..."
        />
      </div>

      {/* Quick Prompts */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Quick Prompts
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {samplePrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => insertSamplePrompt(prompt)}
              className="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl text-gray-200 border border-gray-700 hover:border-purple-500 transition"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={loading || !description.trim()}
        className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold flex justify-center items-center space-x-2 disabled:opacity-50"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Generating Code...</span>
          </>
        ) : (
          <span>Generate Code</span>
        )}
      </button>

      {/* Generated Code Output */}
      {generatedCode && (
        <div className="mt-6 animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-semibold text-white">
              Generated Code
            </h3>

            <button
              onClick={handleCopy}
              className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 text-gray-200 transition"
            >
              {copied ? <FaCheck className="text-green-400" /> : <FaCopy />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>

          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 overflow-x-auto">
            <pre className="text-gray-100 whitespace-pre-wrap text-sm leading-relaxed font-mono">
              {generatedCode}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}

export default CodeGeneration;
