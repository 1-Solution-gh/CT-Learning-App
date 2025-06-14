"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  MoreHorizontal,
  Eye,
  Ban,
  Trash2,
  Filter,
  Users,
  Trash2Icon,
  CheckCircle,
  Circle,
  Settings,
  UserCheck,
  Loader2,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useFetchStudents } from "@/hooks/useFetchStudents";

import CustomAlertDialog from "../ui/CustomAlertDialog";


export function StudentManagement() {
  const {
    data: studentsData,
    error,
    isError,
    isLoading
  } = useFetchStudents("adminmanagestudentsapi.php");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);

  // Update students state when studentsData changes
  useEffect(() => {
    if (studentsData?.data) {
      setStudents(studentsData.data);
    }
  }, [studentsData]);

  console.log("studentsData", studentsData);

  const handleStatusChange = (studentId, newStatus) => {
    setStudents(
      students.map((student) =>
        student.id === studentId ? { ...student, status: newStatus } : student
      )
    );
    setStatusMenuOpen(false);
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      // Make API call to delete student
      const response = await fetch(`/api/students/${studentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete student");
      }

      // Update local state only after successful API call
      setStudents(students.filter((student) => student.id !== studentId));
    } catch (error) {
      console.error("Error deleting student:", error);
      // Handle error (show error message to user)
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "inactive":
        return <Badge variant="destructive">Inactive</Badge>;
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 bg-red-50 p-4 rounded-md">
          <h3 className="font-semibold mb-2">Error</h3>
          {error.message}
        </div>
      </div>
    );
  }

  // Check if data is empty or undefined
  const hasStudents = studentsData?.data && studentsData.data.length > 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Student Management</h1>
        <p className="text-muted-foreground">
          Manage and monitor all students on the platform
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Students Overview</CardTitle>
          <CardDescription>
            Total students: {studentsData?.data?.length || 0}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search students by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Conditional rendering: Show empty state or students table */}
          {!hasStudents ? (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                No Students Found
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                There are currently no students enrolled in the platform.
              </p>
              <Button variant="outline">Add New Student</Button>
            </div>
          ) : (
            /* Students Table */
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Courses</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentsData.data.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {student.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>Enrolled: {student.enrolledCourses}</div>
                          <div className="text-muted-foreground">
                            Completed: {student.completedCourses}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Progress value={student.progress} className="w-20" />
                          <span className="text-xs text-muted-foreground">
                            {student.progress}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(student.status)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {student.lastActive}
                      </TableCell>
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
                                    setSelectedStudent(student);
                                  }}
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Profile
                                </DropdownMenuItem>
                              </DialogTrigger>
                            </Dialog>

                            

                            {/* Set Inactive */}
                            <CustomAlertDialog
                              trigger={
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                  className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                                >
                                  <span className="flex items-center ">
                                    <Circle className="mr-2 h-4 w-4" />
                                    Set Inactive
                                  </span>
                                </DropdownMenuItem>
                              }
                              title="Set Student Inactive"
                              description="Are you sure you want to set this student as inactive? They will no longer have access to their courses until reactivated."
                              confirmText="Set Inactive"
                              cancelText="Cancel"
                              variant="warning"
                              icon={
                                <Circle className="h-5 w-5 text-orange-600" />
                              }
                              onConfirm={() =>
                                handleStatusChange(student.id, "inactive")
                              }
                            />

                            {/* Set Completed */}
                            <CustomAlertDialog
                              trigger={
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                >
                                  <span className="flex items-center ">
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Set Completed
                                  </span>
                                </DropdownMenuItem>
                              }
                              title="Mark as Completed"
                              description="Are you sure you want to mark this student as completed? This indicates they have finished their course successfully."
                              confirmText="Mark Completed"
                              cancelText="Cancel"
                              variant="success"
                              icon={
                                <CheckCircle className="h-5 w-5 text-blue-600" />
                              }
                              onConfirm={() =>
                                handleStatusChange(student.id, "completed")
                              }
                            />

                            {/* Set Active */}
                            <CustomAlertDialog
                              trigger={
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                >
                                  <span className="flex items-center ">
                                    <UserCheck className="mr-2 h-4 w-4" />
                                    Set Active
                                  </span>
                                </DropdownMenuItem>
                              }
                              title="Activate Student"
                              description="Are you sure you want to activate this student? They will regain full access to their courses and dashboard."
                              confirmText="Activate Student"
                              cancelText="Cancel"
                              variant="success"
                              icon={
                                <UserCheck className="h-5 w-5 text-green-600" />
                              }
                              onConfirm={() =>
                                handleStatusChange(student.id, "active")
                              }
                            />

                            {/* Delete Student */}
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
                              onConfirm={() => handleDeleteStudent(student.id)}
                            />
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Student Profile Modal */}
      {selectedStudent && (
        <Dialog
          open={!!selectedStudent}
          onOpenChange={() => setSelectedStudent(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Student Profile</DialogTitle>
              <DialogDescription>
                Detailed information about {selectedStudent.name}
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Personal Information</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Name:</strong> {selectedStudent.name}
                  </div>
                  <div>
                    <strong>Email:</strong> {selectedStudent.email}
                  </div>
                  <div>
                    <strong>Join Date:</strong> {selectedStudent.joinDate}
                  </div>
                  <div>
                    <strong>Status:</strong>{" "}
                    {getStatusBadge(selectedStudent.status)}
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Learning Progress</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Enrolled Courses:</strong>
                    {selectedStudent.enrolledCourses}
                  </div>
                  <div>
                    <strong>Completed Courses:</strong>{" "}
                    {selectedStudent.completedCourses}
                  </div>
                  <div>
                    <strong>Overall Progress:</strong>{" "}
                    {selectedStudent.progress}%
                  </div>
                  <div>
                    <strong>Last Active:</strong> {selectedStudent.lastActive}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
