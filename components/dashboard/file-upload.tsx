"use client"

import React, { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, X, CheckCircle } from "lucide-react"
import { toast } from "sonner"

interface UploadedFile {
  name: string
  size: number
  type: string
  lastModified: number
  file: File
}

interface FileUploadProps {
  onFilesUpload: (files: UploadedFile[]) => void
  onFileRemove: (fileName: string) => void
  uploadedFiles: UploadedFile[]
}

export function FileUpload({ onFilesUpload, onFileRemove, uploadedFiles }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files) as unknown as File[]
      handleFiles(files)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files) as unknown as File[]
      handleFiles(files)
    }
  }

  const handleFiles = (files: File[]) => {
    // Validate file types
    const validFiles = files.filter(file => {
      const validTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
        'image/jpeg',
        'image/png'
      ]
      
      return validTypes.includes(file.type)
    })
    
    if (validFiles.length !== files.length) {
      toast.error("بعض الملفات غير مدعومة. يرجى رفع ملفات PDF, Excel, Word, أو الصور فقط.")
    }
    
    if (validFiles.length > 0) {
      // Convert files to our format
      const fileObjects = validFiles.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        file: file
      }))
      
      onFilesUpload(fileObjects)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card 
        className={`border-2 border-dashed ${
          isDragging ? 'border-[#B48500] bg-[#B48500]/5' : 'border-[#8B6914]'
        } rounded-lg transition-colors`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CardContent className="p-8 text-center">
          <Upload className="w-12 h-12 mx-auto text-[#8B6914] mb-4" />
          <h3 className="text-lg font-medium text-[#B48500] mb-2">
            اسحب وأفلت الملفات هنا
          </h3>
          <p className="text-sm text-[#8B6914] mb-4">
            أو انقر على الزر أدناه لاختيار الملفات
          </p>
          
          <Button
            onClick={triggerFileInput}
            className="bg-[#B48500] text-black hover:bg-[#8B6914]"
          >
            <Upload className="w-4 h-4 mr-2" />
            اختيار الملفات
          </Button>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.xlsx,.xls,.docx,.doc,.jpg,.jpeg,.png"
            onChange={handleFileInput}
            className="hidden"
          />
          
          <p className="text-xs text-[#8B6914] mt-4">
            يدعم ملفات PDF, Excel, Word, وصور JPG/PNG
          </p>
        </CardContent>
      </Card>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <Card className="bg-black border-[#B48500]">
          <CardHeader>
            <CardTitle className="text-[#B48500]">الملفات المرفوعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {uploadedFiles.map((file, index) => (
                <div 
                  key={`${file.name}-${index}`} 
                  className="flex items-center justify-between p-3 bg-[#B48500]/5 rounded border border-[#B48500]/20"
                >
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-[#B48500] mr-3" />
                    <div>
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-xs text-[#8B6914]">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <Button
                      onClick={() => onFileRemove(file.name)}
                      variant="ghost"
                      size="sm"
                      className="text-[#B48500] hover:bg-[#B48500] hover:text-black"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-sm text-[#8B6914]">
              <p>{uploadedFiles.length} ملف مرفوع</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}