"use client"

import { useState } from "react"
import { FileText, Upload, Download, Trash2, Eye, MessageSquare, Search, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

// Mock activity logs data
const mockActivityLogs = [
  {
    id: "log-1",
    user: {
      name: "John Doe",
      avatar: "/placeholder-user.jpg",
      initials: "JD",
    },
    action: "upload",
    documentName: "Project Proposal.pdf",
    timestamp: "2023-05-15T10:30:00",
  },
  {
    id: "log-2",
    user: {
      name: "Jane Smith",
      avatar: "/placeholder-user.jpg",
      initials: "JS",
    },
    action: "download",
    documentName: "Financial Report Q2.xlsx",
    timestamp: "2023-05-14T14:45:00",
  },
  {
    id: "log-3",
    user: {
      name: "Mike Johnson",
      avatar: "/placeholder-user.jpg",
      initials: "MJ",
    },
    action: "comment",
    documentName: "Meeting Minutes.docx",
    timestamp: "2023-05-13T09:15:00",
  },
  {
    id: "log-4",
    user: {
      name: "Sarah Williams",
      avatar: "/placeholder-user.jpg",
      initials: "SW",
    },
    action: "view",
    documentName: "Product Roadmap.pptx",
    timestamp: "2023-05-12T16:20:00",
  },
  {
    id: "log-5",
    user: {
      name: "John Doe",
      avatar: "/placeholder-user.jpg",
      initials: "JD",
    },
    action: "delete",
    documentName: "Old Contract.pdf",
    timestamp: "2023-05-11T11:10:00",
  },
]

export function ActivityLogs() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activityType, setActivityType] = useState("all")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [logs, setLogs] = useState(mockActivityLogs)

  const filteredLogs = logs.filter((log) => {
    // Filter by search query
    const matchesSearch =
      log.documentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.name.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by activity type
    const matchesType = activityType === "all" || log.action === activityType

    // Filter by date
    const matchesDate = !date || new Date(log.timestamp).toDateString() === date.toDateString()

    return matchesSearch && matchesType && matchesDate
  })

  const getActionIcon = (action: string) => {
    switch (action) {
      case "upload":
        return <Upload className="h-4 w-4 text-green-500" />
      case "download":
        return <Download className="h-4 w-4 text-blue-500" />
      case "delete":
        return <Trash2 className="h-4 w-4 text-red-500" />
      case "view":
        return <Eye className="h-4 w-4 text-amber-500" />
      case "comment":
        return <MessageSquare className="h-4 w-4 text-purple-500" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getActionText = (action: string) => {
    switch (action) {
      case "upload":
        return "uploaded"
      case "download":
        return "downloaded"
      case "delete":
        return "deleted"
      case "view":
        return "viewed"
      case "comment":
        return "commented on"
      default:
        return action
    }
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Activity Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center mb-4 gap-2">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search activities..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={activityType} onValueChange={setActivityType}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Activities</SelectItem>
              <SelectItem value="upload">Upload</SelectItem>
              <SelectItem value="download">Download</SelectItem>
              <SelectItem value="delete">Delete</SelectItem>
              <SelectItem value="view">View</SelectItem>
              <SelectItem value="comment">Comment</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <Calendar className="mr-2 h-4 w-4" />
                {date ? date.toLocaleDateString() : "Filter by date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>

          {(date || activityType !== "all" || searchQuery) && (
            <Button
              variant="ghost"
              onClick={() => {
                setDate(undefined)
                setActivityType("all")
                setSearchQuery("")
              }}
              className="w-full md:w-auto"
            >
              Clear Filters
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No activity logs found</div>
          ) : (
            filteredLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg border">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={log.user.avatar} alt={log.user.name} />
                  <AvatarFallback>{log.user.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{log.user.name}</span>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      {getActionIcon(log.action)}
                      <span>{getActionText(log.action)}</span>
                    </div>
                    <span className="font-medium">{log.documentName}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{formatDate(log.timestamp)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}

