"use client"

import type React from "react"

import { useState } from "react"
import { Upload, X, File } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface UploadDocumentDialogProps {
  open: boolean
  onClose: () => void
}

export function UploadDocumentDialog({ open, onClose }: UploadDocumentDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [tags, setTags] = useState("")
  const [description, setDescription] = useState("")
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

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

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }

  const handleUpload = () => {
    // In a real app, you would call an API to upload the document
    console.log("Uploading document:", {
      file: selectedFile,
      tags: tags.split(",").map((tag) => tag.trim()),
      description,
    })

    // Reset form and close dialog
    setSelectedFile(null)
    setTags("")
    setDescription("")
    onClose()
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription>Upload a new document to the system.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {!selectedFile ? (
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center ${
                isDragging ? "border-primary bg-primary/10" : "border-muted-foreground/25"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold">Drag and drop your file here</h3>
              <p className="mt-1 text-xs text-muted-foreground">Or click to browse from your computer</p>
              <Input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
              <Button
                variant="outline"
                onClick={() => document.getElementById("file-upload")?.click()}
                className="mt-4"
              >
                Browse Files
              </Button>
            </div>
          ) : (
            <div className="flex items-center p-4 border rounded-lg">
              <File className="h-8 w-8 mr-2 text-primary" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <Button variant="ghost" size="icon" onClick={handleRemoveFile}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="project, report, finance"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description for this document..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleUpload} disabled={!selectedFile}>
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

