'use client'

import React from 'react'
import Image from 'next/image'
import { DocumentIcon, PlayIcon, MusicalNoteIcon } from '@heroicons/react/24/outline'

interface MessageAttachmentProps {
  fileUrl: string
  fileName: string
  fileType: string
  fileSize?: number
}

export default function MessageAttachment({ 
  fileUrl, 
  fileName, 
  fileType, 
  fileSize 
}: MessageAttachmentProps) {
  const formatFileSize = (bytes?: number): string => {
    if (!bytes || bytes === 0) return ''
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = fileUrl
    link.download = fileName
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Rendu pour les images
  if (fileType.startsWith('image/')) {
    return (
      <div className="mt-2">
        <div className="relative max-w-xs cursor-pointer" onClick={handleDownload}>
          <Image
            src={fileUrl}
            alt={fileName}
            width={300}
            height={200}
            className="rounded-lg object-cover"
            style={{ maxHeight: '200px', width: 'auto' }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 rounded-b-lg">
            <p className="truncate">{fileName}</p>
            {fileSize && <p>{formatFileSize(fileSize)}</p>}
          </div>
        </div>
      </div>
    )
  }

  // Rendu pour les vidéos
  if (fileType.startsWith('video/')) {
    return (
      <div className="mt-2">
        <div className="relative max-w-xs">
          <video
            src={fileUrl}
            controls
            className="rounded-lg max-h-48 w-full"
            preload="metadata"
          >
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>
          <div className="mt-1 text-xs text-gray-500">
            <p className="truncate">{fileName}</p>
            {fileSize && <p>{formatFileSize(fileSize)}</p>}
          </div>
        </div>
      </div>
    )
  }

  // Rendu pour les fichiers audio
  if (fileType.startsWith('audio/')) {
    return (
      <div className="mt-2">
        <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3 max-w-xs">
          <MusicalNoteIcon className="h-8 w-8 text-blue-500 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{fileName}</p>
            {fileSize && <p className="text-xs text-gray-500">{formatFileSize(fileSize)}</p>}
            <audio src={fileUrl} controls className="w-full mt-2" preload="metadata">
              Votre navigateur ne supporte pas la lecture audio.
            </audio>
          </div>
        </div>
      </div>
    )
  }

  // Rendu pour les autres types de fichiers
  const getFileIcon = () => {
    if (fileType === 'application/pdf') {
      return <DocumentIcon className="h-8 w-8 text-red-500" />
    }
    if (fileType.includes('word')) {
      return <DocumentIcon className="h-8 w-8 text-blue-500" />
    }
    return <DocumentIcon className="h-8 w-8 text-gray-500" />
  }

  return (
    <div className="mt-2">
      <div 
        className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3 max-w-xs cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={handleDownload}
      >
        {getFileIcon()}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{fileName}</p>
          {fileSize && <p className="text-xs text-gray-500">{formatFileSize(fileSize)}</p>}
          <p className="text-xs text-blue-600 hover:text-blue-800">Cliquer pour télécharger</p>
        </div>
      </div>
    </div>
  )
}
