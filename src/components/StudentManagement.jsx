"use client";

import { useState } from "react";
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
import { Search, MoreHorizontal, Eye, Ban, Trash2, Filter } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useFetchStudents } from "@/hooks/useFetchStudents";
import { ConfirmDeleteModal } from "./ui/PromptModal";

// const studentsData = [
//   {
//     id: 1,
//     name: "Alice Johnson",
//     email: "alice.johnson@email.com",
//     enrolledCourses: 5,
//     completedCourses: 3,
//     progress: 75,
//     status: "active",
//     joinDate: "2024-01-15",
//     lastActive: "2024-06-20",
//   },
//   {
//     id: 2,
//     name: "Bob Smith",
//     email: "bob.smith@email.com",
//     enrolledCourses: 3,
//     completedCourses: 1,
//     progress: 45,
//     status: "inactive",
//     joinDate: "2024-02-10",
//     lastActive: "2024-06-19",
//   },
//   {
//     id: 3,
//     name: "Carol Davis",
//     email: "carol.davis@email.com",
//     enrolledCourses: 8,
//     completedCourses: 8,
//     progress: 100,
//     status: "completed",
//     joinDate: "2023-11-20",
//     lastActive: "2024-06-21",
//   },
//   {
//     id: 4,
//     name: "David Wilson",
//     email: "david.wilson@email.com",
//     enrolledCourses: 2,
//     completedCourses: 0,
//     progress: 15,
//     status: "inactive",
//     joinDate: "2024-03-05",
//     lastActive: "2024-06-10",
//   },
//   {
//     id: 5,
//     name: "Eva Brown",
//     email: "eva.brown@email.com",
//     enrolledCourses: 4,
//     completedCourses: 2,
//     progress: 60,
//     status: "active",
//     joinDate: "2024-01-30",
//     lastActive: "2024-06-21",
//   },
// ];

export function StudentManagement() {
  const { data:studentsData, error, isError } = useFetchStudents("adminmanagestudentsapi.php");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState(studentsData);
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);

  // const filteredStudents = students.filter(
  //   (student) =>
  //     student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     student.email.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const handleStatusChange = (studentId, newStatus) => {
    setStudents(
      students.map((student) =>
        student.id === studentId ? { ...student, status: newStatus } : student
      )
    );
    setStatusMenuOpen(false); // Close the status menu after selection
  };

  const handleDeleteStudent = (studentId) => {
    setStudents(students.filter((student) => student.id !== studentId));
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

  if (isError) {
    return <p>{error.message}</p>;
  }

  console.log("Student Data", studentsData.data);

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
          <CardDescription>Total students: {students.length}</CardDescription>
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

          {/* Students Table */}
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
                {studentsData.data?.map((student) => (
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
                          <DropdownMenuItem disabled className="opacity-70">
                            Change Status
                          </DropdownMenuItem>
                         
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(student.id, "inactive")
                            }
                            className="text-red-600"
                          >
                            <span className="pl-6">Set Inactive</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(student.id, "completed")
                            }
                            className="text-blue-600"
                          >
                            <span className="pl-6">Set Completed</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(student.id, "active")
                            }
                            className="text-green-600"
                          >
                            <span className="pl-6">Set Active</span>
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            className="text-red-600 "
                          >
                           
                            <ConfirmDeleteModal  >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                              </ConfirmDeleteModal>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
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
                    <strong>Enrolled Courses:</strong>{" "}
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
