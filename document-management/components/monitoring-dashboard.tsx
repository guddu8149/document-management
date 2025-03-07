"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { AlertTriangle, ArrowDown, ArrowUp, Clock, Download, FileText, Trash2, Upload, Users, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for charts
const activityData = [
  { name: "Mon", uploads: 4, downloads: 7, views: 20, deletes: 1 },
  { name: "Tue", uploads: 6, downloads: 9, views: 18, deletes: 2 },
  { name: "Wed", uploads: 8, downloads: 12, views: 22, deletes: 0 },
  { name: "Thu", uploads: 7, downloads: 10, views: 25, deletes: 3 },
  { name: "Fri", uploads: 9, downloads: 14, views: 30, deletes: 1 },
  { name: "Sat", uploads: 3, downloads: 5, views: 10, deletes: 0 },
  { name: "Sun", uploads: 2, downloads: 4, views: 8, deletes: 0 },
]

const storageData = [
  { name: "Jan", used: 20 },
  { name: "Feb", used: 35 },
  { name: "Mar", used: 45 },
  { name: "Apr", used: 60 },
  { name: "May", used: 75 },
  { name: "Jun", used: 90 },
  { name: "Jul", used: 110 },
]

const documentTypeData = [
  { name: "PDF", value: 45 },
  { name: "Word", value: 25 },
  { name: "Excel", value: 20 },
  { name: "PowerPoint", value: 10 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

// Mock system logs
const systemLogs = [
  {
    id: "sys-1",
    level: "info",
    message: "User john@example.com logged in",
    timestamp: "2023-05-15T10:30:00",
  },
  {
    id: "sys-2",
    level: "info",
    message: "Document 'Project Proposal.pdf' uploaded",
    timestamp: "2023-05-15T10:35:00",
  },
  {
    id: "sys-3",
    level: "warning",
    message: "Storage usage approaching 80% of quota",
    timestamp: "2023-05-15T11:20:00",
  },
  {
    id: "sys-4",
    level: "error",
    message: "Failed to process document 'Large File.pdf' - file too large",
    timestamp: "2023-05-15T12:45:00",
  },
  {
    id: "sys-5",
    level: "info",
    message: "User jane@example.com logged in",
    timestamp: "2023-05-15T14:10:00",
  },
]

export function MonitoringDashboard() {
  const [timeRange, setTimeRange] = useState("7d")

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "info":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold">Logs & Monitoring</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 Hours</SelectItem>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
            <SelectItem value="90d">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">254</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
              12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
              8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2 GB</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUp className="mr-1 h-4 w-4 text-amber-500" />
              15% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">320ms</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowDown className="mr-1 h-4 w-4 text-green-500" />
              10% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="activity">
        <TabsList>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
          <TabsTrigger value="system">System Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Document Activity</CardTitle>
              <CardDescription>Document operations over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={activityData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="uploads" stackId="a" fill="#8884d8" name="Uploads" />
                    <Bar dataKey="downloads" stackId="a" fill="#82ca9d" name="Downloads" />
                    <Bar dataKey="views" stackId="a" fill="#ffc658" name="Views" />
                    <Bar dataKey="deletes" stackId="a" fill="#ff8042" name="Deletes" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Activity by Type</CardTitle>
                <CardDescription>Distribution of document operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={documentTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {documentTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest document operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Upload className="h-5 w-5 mr-2 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Project Proposal.pdf</p>
                      <p className="text-xs text-muted-foreground">Uploaded by John Doe</p>
                    </div>
                    <p className="ml-auto text-xs text-muted-foreground">5m ago</p>
                  </div>

                  <div className="flex items-center">
                    <Download className="h-5 w-5 mr-2 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">Financial Report Q2.xlsx</p>
                      <p className="text-xs text-muted-foreground">Downloaded by Jane Smith</p>
                    </div>
                    <p className="ml-auto text-xs text-muted-foreground">15m ago</p>
                  </div>

                  <div className="flex items-center">
                    <Eye className="h-5 w-5 mr-2 text-amber-500" />
                    <div>
                      <p className="text-sm font-medium">Meeting Minutes.docx</p>
                      <p className="text-xs text-muted-foreground">Viewed by Mike Johnson</p>
                    </div>
                    <p className="ml-auto text-xs text-muted-foreground">30m ago</p>
                  </div>

                  <div className="flex items-center">
                    <Trash2 className="h-5 w-5 mr-2 text-red-500" />
                    <div>
                      <p className="text-sm font-medium">Old Contract.pdf</p>
                      <p className="text-xs text-muted-foreground">Deleted by John Doe</p>
                    </div>
                    <p className="ml-auto text-xs text-muted-foreground">1h ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="storage">
          <Card>
            <CardHeader>
              <CardTitle>Storage Usage</CardTitle>
              <CardDescription>Storage consumption over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={storageData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="used"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      name="Storage Used (GB)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>Recent system events and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg border">
                    {getLevelIcon(log.level)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">{log.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{formatDate(log.timestamp)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

