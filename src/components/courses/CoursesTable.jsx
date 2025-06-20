"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit, Trash2, Paperclip } from "lucide-react";

export const CourseTable = ({
  courses,
  activeTab,
  getApprovalStatusBadge,
  getStatusBadge,
  handleViewCourseDetails,
  handleDeleteCourse,
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course</TableHead>
            <TableHead>Instructor</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Approval</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Attachments</TableHead>
            {activeTab === "approved" && <TableHead>Enrollments</TableHead>}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <img
                    src={course.thumbnail || "https://res.cloudinary.com/disgj6wx5/image/upload/v1750262850/nzfaomx0a1hi8hz3gq6m.jpg"}
                    alt={course.title}
                    className="w-12 h-8 object-cover rounded"
                  />
                  <div>
                    <div className="font-medium">{course.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {course.description}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{course.instructor.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{course.category.name}</Badge>
              </TableCell>
              <TableCell>{getStatusBadge(course.status)}</TableCell>
              <TableCell>
                {getApprovalStatusBadge(course.status)}
              </TableCell>
              <TableCell>
                {course.price > 0 ? (
                  <span className="font-medium">${course.price}</span>
                ) : (
                  <span className="text-muted-foreground text-sm">Not set</span>
                )}
              </TableCell>
              <TableCell>
                {course.sections && course.sections[0].lectures.length > 0 ? (
                  <div className="flex items-center gap-1">
                    <Paperclip className="h-3 w-3" />
                    <span className="text-sm">
                      {course.sections[0].lectures.length} files
                    </span>
                  </div>
                ) : (
                  <span className="text-muted-foreground text-sm">None</span>
                )}
              </TableCell>
              {activeTab === "approved" && (
                <TableCell>{course.enrollments?.toLocaleString() || 0}</TableCell>
              )}
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleViewCourseDetails(course.id)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      {course.status === "pending"
                        ? "Review Course"
                        : "View Details"}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Course
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteCourse(course.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
