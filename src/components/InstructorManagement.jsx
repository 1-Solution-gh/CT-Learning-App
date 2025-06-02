"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Check, X, Eye, Ban, ExternalLink } from "lucide-react"
import { useFetchUsers } from "@/hooks/useFetchUsers"

export function InstructorManagement() {
  const [selectedApplication, setSelectedApplication] = useState(null)
  const {data:instructors , error, isError} = useFetchUsers("adminmanageinstructorsapi.php")

  console.log("instructors", instructors)

  const handleAcceptApplication = (applicationId) => {
    // Implementation will need to be updated once backend API is available
  }

  const handleDeclineApplication = (applicationId) => {
    // Implementation will need to be updated once backend API is available
  }

  const handleToggleInstructorStatus = (instructorId) => {
    // Implementation will need to be updated once backend API is available
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Instructor Management</h1>
        <p className="text-muted-foreground">Manage instructor applications and approved instructors</p>
      </div>

      <Tabs defaultValue="applications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="applications">Pending Applications (0)</TabsTrigger>
          <TabsTrigger value="approved">Approved Instructors ({instructors?.data?.length || 0})</TabsTrigger>
        </TabsList>

        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle>Instructor Applications</CardTitle>
              <CardDescription>Review and approve new instructor applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Applicant</TableHead>
                      <TableHead>Expertise</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Applied Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                        No pending applications
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved">
          <Card>
            <CardHeader>
              <CardTitle>Approved Instructors</CardTitle>
              <CardDescription>Manage approved instructors and their courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Instructor</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {instructors?.data?.map((instructor) => (
                      <TableRow key={instructor.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{instructor.name}</div>
                            <div className="text-sm text-muted-foreground">{instructor.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{instructor.role}</Badge>
                        </TableCell>
                        <TableCell>{instructor.created_at}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleInstructorStatus(instructor.id)}
                          >
                            <Ban className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Application Details Modal */}
      {selectedApplication && (
        <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Instructor Application Details</DialogTitle>
              <DialogDescription>Review application from {selectedApplication.name}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Personal Information</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Name:</strong> {selectedApplication.name}
                  </div>
                  <div>
                    <strong>Email:</strong> {selectedApplication.email}
                  </div>
                  <div>
                    <strong>Experience:</strong> N/A
                  </div>
                  <div>
                    <strong>Applied Date:</strong> N/A
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Bio</h4>
                <p className="text-sm text-muted-foreground">N/A</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Expertise</h4>
                <p className="text-sm text-muted-foreground">N/A</p>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => handleDeclineApplication(selectedApplication.id)}
                  className="text-red-600"
                >
                  Decline
                </Button>
                <Button onClick={() => handleAcceptApplication(selectedApplication.id)} className="text-green-600">
                  Accept Application
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
