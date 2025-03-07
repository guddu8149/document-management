"use client"

import { useState } from "react"
import { FileText, Download, Trash2, Eye, Upload, Search, Filter, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock document data
const mockDocuments = [
  {
    id: "doc-1",
    name: "Project Proposal.pdf",
    type: "PDF",
    size: "2.4 MB",
    uploadedBy: "John Doe",
    uploadedAt: "2023-05-15T10:30:00",
    tags: ["proposal", "project"],
  },
  {
    id: "doc-2",
    name: "Financial Report Q2.xlsx",
    type: "Excel",
    size: "1.8 MB",
    uploadedBy: "Jane Smith",
    uploadedAt: "2023-05-14T14:45:00",
    tags: ["financial", "report"],
  },
  {
    id: "doc-3",
    name: "Meeting Minutes.docx",
    type: "Word",
    size: "0.5 MB",
    uploadedBy: "Mike Johnson",
    uploadedAt: "2023-05-13T09:15:00",
    tags: ["meeting", "minutes"],
  },
  {
    id: "doc-4",
    name: "Product Roadmap.pptx",
    type: "PowerPoint",
    size: "3.2 MB",
    uploadedBy: "Sarah Williams",
    uploadedAt: "2023-05-12T16:20:00",
    tags: ["product", "roadmap"],
  },
  {
    id: "doc-5",
    name: "User Research.pdf",
    type: "PDF",
    size: "4.7 MB",
    uploadedBy: "John Doe",
    uploadedAt: "2023-05-11T11:10:00",
    tags: ["research", "user"],
  },
]

interface DocumentListProps {
  onSelect: (document: any) => void
  onPreview: (document: any) => void
  onDelete: (documentId: string) => void
  onUpload: () => void
}

export function DocumentList({ onSelect, onPreview, onDelete, onUpload }: DocumentListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [documents, setDocuments] = useState(mockDocuments)

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleDownload = (documentId: string) => {
    // In a real app, you would call an API to download the document
    console.log(`Downloading document with ID: ${documentId}`)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Documents</CardTitle>
        <Button onClick={onUpload}>
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4 gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search documents..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No documents found
                  </TableCell>
                </TableRow>
              ) : (
                filteredDocuments.map((doc) => (
                  <TableRow key={doc.id} className="cursor-pointer hover:bg-muted/50" onClick={() => onSelect(doc)}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                        {doc.name}
                      </div>
                    </TableCell>
                    <TableCell>{doc.type}</TableCell>
                    <TableCell>{doc.size}</TableCell>
                    <TableCell>{formatDate(doc.uploadedAt)}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {doc.tags.map((tag, index) => (
                          <Badge key={index} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" onClick={() => onPreview(doc)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDownload(doc.id)}>
                          <Download className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onDelete(doc.id)}>
                              <Trash2 className="mr-2 h-4 w-4 text-destructive" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

