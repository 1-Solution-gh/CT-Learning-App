"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Trash2, Paperclip } from "lucide-react"

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
            {/* {activeTab === "approved" && <TableHead>Rating</TableHead>} */}
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
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-12 h-8 object-cover rounded"
                  />
                  <div>
                    <div className="font-medium">{course.title}</div>
                    <div className="text-sm text-muted-foreground">{course.duration}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{course.instructor}</TableCell>
              <TableCell>
                <Badge variant="outline">{course.category}</Badge>
              </TableCell>
              <TableCell>{getStatusBadge(course.status)}</TableCell>
              <TableCell>{getApprovalStatusBadge(course.approvalStatus)}</TableCell>
              <TableCell>
                {course.price > 0 ? (
                  <span className="font-medium">${course.price}</span>
                ) : (
                  <span className="text-muted-foreground text-sm">Not set</span>
                )}
              </TableCell>
              <TableCell>
                {course.attachments && course.attachments.length > 0 ? (
                  <div className="flex items-center gap-1">
                    <Paperclip className="h-3 w-3" />
                    <span className="text-sm">{course.attachments.length} files</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground text-sm">None</span>
                )}
              </TableCell>
              {/* {activeTab === "approved" && (
                <TableCell>
                  {course.rating > 0 ? (
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1">{course.rating}</span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-sm">No ratings</span>
                  )}
                </TableCell>
              )} */}
              {activeTab === "approved" && <TableCell>{course.enrollments.toLocaleString()}</TableCell>}
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleViewCourseDetails(course.id)}>
                      <Eye className="mr-2 h-4 w-4" />
                      {course.approvalStatus === "pending" ? "Review Course" : "View Details"}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Course
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDeleteCourse(course.id)} className="text-red-600">
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
  )
}
