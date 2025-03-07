"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { DocumentList } from "@/components/document-list"
import { DocumentPreview } from "@/components/document-preview"
import { ActivityLogs } from "@/components/activity-logs"
import { MonitoringDashboard } from "@/components/monitoring-dashboard"
import { UploadDocumentDialog } from "@/components/upload-document-dialog"

export default function Dashboard() {
  const [activeView, setActiveView] = useState<string>("documents")
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [showPreviewDialog, setShowPreviewDialog] = useState(false)

  const handleViewChange = (view: string) => {
    setActiveView(view)
    setSelectedDocument(null)
  }

  const handleDocumentSelect = (document: any) => {
    setSelectedDocument(document)
  }

  const handlePreviewDocument = (document: any) => {
    setSelectedDocument(document)
    setShowPreviewDialog(true)
  }

  const handleDeleteDocument = (documentId: string) => {
    // In a real app, you would call an API to delete the document
    console.log(`Deleting document with ID: ${documentId}`)
    // Then refresh the document list
    setSelectedDocument(null)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeView={activeView} onViewChange={handleViewChange} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4">
          {activeView === "documents" && (
            <DocumentList
              onSelect={handleDocumentSelect}
              onPreview={handlePreviewDocument}
              onDelete={handleDeleteDocument}
              onUpload={() => setShowUploadDialog(true)}
            />
          )}

          {activeView === "activity" && <ActivityLogs />}

          {activeView === "monitoring" && <MonitoringDashboard />}
        </main>
      </div>

      {showUploadDialog && <UploadDocumentDialog open={showUploadDialog} onClose={() => setShowUploadDialog(false)} />}

      {showPreviewDialog && selectedDocument && (
        <DocumentPreview
          document={selectedDocument}
          open={showPreviewDialog}
          onClose={() => setShowPreviewDialog(false)}
        />
      )}
    </div>
  )
}

