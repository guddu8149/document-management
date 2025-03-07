"use client"

import { useState } from "react"
import { Download, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface DocumentPreviewProps {
  document: any
  open: boolean
  onClose: () => void
}

// Mock comments data
const mockComments = [
  {
    id: "comment-1",
    user: {
      name: "John Doe",
      avatar: "/placeholder-user.jpg",
      initials: "JD",
    },
    content: "This looks great! I've added some notes on page 2.",
    timestamp: "2023-05-15T14:30:00",
  },
  {
    id: "comment-2",
    user: {
      name: "Jane Smith",
      avatar: "/placeholder-user.jpg",
      initials: "JS",
    },
    content: "Can we update the financial projections in section 3?",
    timestamp: "2023-05-15T15:45:00",
  },
  {
    id: "comment-3",
    user: {
      name: "Mike Johnson",
      avatar: "/placeholder-user.jpg",
      initials: "MJ",
    },
    content: "I've approved this document. Ready for the next steps.",
    timestamp: "2023-05-16T09:15:00",
  },
]

export function DocumentPreview({ document, open, onClose }: DocumentPreviewProps) {
  const [activeTab, setActiveTab] = useState("preview")
  const [comments, setComments] = useState(mockComments)
  const [newComment, setNewComment] = useState("")

  const handleDownload = () => {
    // In a real app, you would call an API to download the document
    console.log(`Downloading document with ID: ${document.id}`)
  }

  const handleAddComment = () => {
    if (newComment.trim() === "") return

    const comment = {
      id: `comment-${comments.length + 1}`,
      user: {
        name: "John Doe", // Current user
        avatar: "/placeholder-user.jpg",
        initials: "JD",
      },
      content: newComment,
      timestamp: new Date().toISOString(),
    }

    setComments([...comments, comment])
    setNewComment("")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center">
              {document.name}
              <Button variant="ghost" size="icon" className="ml-2" onClick={handleDownload}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="preview" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="comments">
              Comments
              <Badge variant="secondary" className="ml-2">
                {comments.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="flex-1 flex flex-col">
            <div className="flex-1 border rounded-md bg-muted/30 flex items-center justify-center">
              {/* This would be a document preview in a real app */}
              <div className="text-center p-8">
                <img src="/placeholder.svg?height=300&width=400" alt="Document preview" className="mx-auto mb-4" />
                <p className="text-muted-foreground">Preview for {document.name}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="details" className="flex-1">
            <div className="grid grid-cols-2 gap-4 p-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">File Name</h3>
                <p>{document.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">File Type</h3>
                <p>{document.type}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">File Size</h3>
                <p>{document.size}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Uploaded By</h3>
                <p>{document.uploadedBy}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Upload Date</h3>
                <p>{formatDate(document.uploadedAt)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Tags</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {document.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="comments" className="flex-1 flex flex-col">
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                      <AvatarFallback>{comment.user.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{comment.user.name}</span>
                        <span className="text-xs text-muted-foreground">{formatDate(comment.timestamp)}</span>
                      </div>
                      <p className="text-sm mt-1">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="Current user" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex gap-2">
                  <Input
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleAddComment()
                      }
                    }}
                  />
                  <Button size="icon" onClick={handleAddComment} disabled={newComment.trim() === ""}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

