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
import { Check, X, Eye, Ban, ExternalLink, CheckCircle, MoreHorizontal, Trash2, Trash2Icon } from "lucide-react"
import { useFetchUsers } from "@/hooks/useFetchUsers"
import CustomAlertDialog from "../ui/CustomAlertDialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import ApplicationDialog from "../manage-instructors/ViewApplication"
import ViewInstructor from "../manage-instructors/ViewInstructor"
import { useHandleInstructorApplication } from "@/hooks/useAdminActions"

export function InstructorManagement() {
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [selectedInstructor, setSelectedInstructor] = useState(null)

  const {data:instructors , error, isError, isLoading} = useFetchUsers("instructor-applications")
  const { mutate, isPending } = useHandleInstructorApplication();

  console.log("instructor", instructors)


  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (isError) {
    return <div className="text-red-500">Error: {error}</div>
  }



  const pendingData = instructors?.filter((instructor) => instructor.status === "pending")
  const approvedData = instructors?.filter((instructor) => instructor.status === "approved")

  // console.log("approvedData)", approvedData)


  // const handleDeclineApplication = (applicationId) => {
  //   // Implementation will need to be updated once backend API is available
  // }

  // const handleToggleInstructorStatus = (instructorId) => {
  //   // Implementation will need to be updated once backend API is available
  // }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Instructor Management</h1>
        <p className="text-muted-foreground">Manage instructor applications and approved instructors</p>
      </div>

      <Tabs defaultValue="applications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="applications">Pending Applications ({pendingData?.length || 0})</TabsTrigger>
          <TabsTrigger value="approved">Approved Instructors ({approvedData?.length || 0})</TabsTrigger>
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
                      <TableHead>Experience( year )</TableHead>
                      <TableHead>Applied Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingData?.length ? (
                      pendingData.map((instructor) => (
                        <TableRow key={instructor.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium" title={instructor.full_name}>
                                {instructor.full_name.length > 20 
                                  ? `${instructor.full_name.substring(0, 20)}...` 
                                  : instructor.full_name}
                              </div>
                              <div className="text-sm text-muted-foreground" title={instructor.email}>
                                {instructor.email.length > 25 
                                  ? `${instructor.email.substring(0, 25)}...` 
                                  : instructor.email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-muted-foreground" title={instructor.professional_title}>
                              {instructor.professional_title?.length > 30 
                                ? `${instructor.professional_title.substring(0, 30)}...` 
                                : instructor.professional_title}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-muted-foreground">{instructor.years_experience}</div>
                          </TableCell>
                          <TableCell>{instructor.applied_at}</TableCell>
                          <TableCell className="text-right">
                          

                          <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {/* View Profile */}
                            <Dialog>
                              <DialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => {
                                    e.preventDefault();
                                    setSelectedApplication(instructor);
                                  }}
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Apllication
                                </DropdownMenuItem>
                              </DialogTrigger>
                            </Dialog>

                            

                          

                           

                            {/* Set Active */}
                       

                            {/* Delete Student */}
                            <CustomAlertDialog
                              trigger={
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                  className="text-amber-600 hover:text-amber-700 hover:bg-red-50"
                                >
                                  <X className="mr-2 h-4 w-4" />
                                Reject 
                                </DropdownMenuItem>
                              }
                              title="Reject Application"
                              description="This action cannot be undone. This will permanently delete the instructor record and all associated data."
                              confirmText="Reject Application"
                              cancelText="Cancel"
                              variant="destructive"
                              icon={< X className="h-5 w-5 text-red-600" />}
                              // onConfirm={() => handleDeleteStudent(student.id)}
                            />
                            <CustomAlertDialog
                              trigger={
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2Icon className="mr-2 h-4 w-4" />
                                  Delete Student
                                </DropdownMenuItem>
                              }
                              title="Delete Student"
                              description="This action cannot be undone. This will permanently delete the student record and all associated data."
                              confirmText="Delete Student"
                              cancelText="Cancel"
                              variant="destructive"
                              icon={<Trash2 className="h-5 w-5 text-red-600" />}
                              // onConfirm={() => handleDeleteStudent(student.id)}
                            />
                          </DropdownMenuContent>
                        </DropdownMenu>
                            {/* <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeclineApplication(instructor.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAcceptApplication(instructor.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            </div> */}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground">
                          No pending applications
                        </TableCell>
                      </TableRow>
                    )}
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
                      <TableHead>Profile</TableHead>
                      <TableHead>Instructor</TableHead>
                      <TableHead>Course Title</TableHead>
                      <TableHead>Experience( year )</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvedData?.map((instructor) => (
                      <TableRow key={instructor.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <img 
                              src={instructor.profile_image }
                              alt={`${instructor.full_name}'s profile`}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium" title={instructor.full_name}>
                              {instructor.full_name.length > 20 
                                ? `${instructor.full_name.substring(0, 20)}...` 
                                : instructor.full_name}
                            </div>
                            <div className="text-sm text-muted-foreground" title={instructor.email}>
                              {instructor.email.length > 25 
                                ? `${instructor.email.substring(0, 25)}...` 
                                : instructor.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground" title={instructor.professional_title}>
                            {instructor.professional_title?.length > 30 
                              ? `${instructor.professional_title.substring(0, 30)}...` 
                              : instructor.professional_title}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground">{instructor.years_experience}</div>
                        </TableCell>
                        <TableCell>{instructor.applied_at}</TableCell>
                        <TableCell className="text-right">


                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {/* View Profile */}
                            <Dialog>
                              <DialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => {
                                    e.preventDefault();
                                    setSelectedInstructor(instructor);
                                  }}
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Profile
                                </DropdownMenuItem>
                              </DialogTrigger>
                            </Dialog>

                            

                          

                           

                            {/* Set Active */}
                       

                            {/* Delete Student */}
                            <CustomAlertDialog
                              trigger={
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2Icon className="mr-2 h-4 w-4" />
                                  Delete Intructor
                                </DropdownMenuItem>
                              }
                              title="Deleted Instructor"
                              description="This action cannot be undone. This will permanently delete the instructor record and all associated data."
                              confirmText="Delete Student"
                              cancelText="Cancel"
                              variant="destructive"
                              icon={<Trash2 className="h-5 w-5 text-red-600" />}
                              // onConfirm={() => handleDeleteStudent(student.id)}
                            />
                          </DropdownMenuContent>
                        </DropdownMenu>
                        {/* <CustomAlertDialog
                              trigger={
                                <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleInstructorStatus(instructor.id)}
                          >
                            <Ban className="h-4 w-4" />
                          </Button>
                              }
                              title="Mark as Completed"
                              description="Are you sure you want to mark this student as completed? This indicates they have finished their course successfully."
                              confirmText="Mark Completed"
                              cancelText="Cancel"
                              variant="success"
                              icon={
                                <CheckCircle className="h-5 w-5 text-blue-600" />
                              }
                            onConfirm={() => handleToggleInstructorStatus(instructor.id)}
                            /> */}
                         
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
        <ApplicationDialog
        selectedApplication={selectedApplication}
        setSelectedApplication={setSelectedApplication}
      
        isActionLoading={isPending}
      />
      )}


      {selectedInstructor && (
        <ViewInstructor selectedInstructor={selectedInstructor} setSelectedInstructor={ setSelectedInstructor} />
      )}
    </div>
  )
}
