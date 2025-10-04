'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function ImageTester() {
  const [testUrl, setTestUrl] = useState('')
  const [imageStatus, setImageStatus] = useState<'loading' | 'success' | 'error' | 'idle'>('idle')

  const testImage = () => {
    if (!testUrl) return
    setImageStatus('loading')
  }

  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div className="fixed bottom-4 left-4 bg-white border border-gray-300 p-4 rounded-lg shadow-lg max-w-sm z-50">
      <h3 className="font-semibold mb-2">Test Image URL</h3>
      <input
        type="text"
        placeholder="Coller URL Cloudinary..."
        value={testUrl}
        onChange={(e) => setTestUrl(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-2 text-xs"
      />
      <button
        onClick={testImage}
        className="w-full bg-blue-500 text-white p-1 rounded text-sm mb-2"
      >
        Tester Image
      </button>
      
      {testUrl && imageStatus === 'loading' && (
        <div className="relative w-16 h-16 mx-auto">
          <Image
            src={testUrl}
            alt="Test"
            fill
            className="rounded-full object-cover"
            onLoad={() => {
              setImageStatus('success')
              console.log('✅ Image test chargée avec succès:', testUrl)
            }}
            onError={(e) => {
              setImageStatus('error')
              console.log('❌ Erreur chargement image test:', testUrl)
            }}
          />
        </div>
      )}
      
      <div className="text-xs">
        Status: <span className={`font-semibold ${
          imageStatus === 'success' ? 'text-green-600' : 
          imageStatus === 'error' ? 'text-red-600' : 
          imageStatus === 'loading' ? 'text-blue-600' : 'text-gray-600'
        }`}>
          {imageStatus}
        </span>
      </div>
    </div>
  )
}
