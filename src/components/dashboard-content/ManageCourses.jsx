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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Grid,
  List,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { CourseTable } from "@/components/courses/CoursesTable";
import { CourseDetailsDialog } from "@/components/courses/CourseDetailsDialog";
import { AddCourseDialog } from "@/components/courses/AddCourseDialog";
import { useFetchCourses } from "@/hooks/useCourseAction";

function CourseManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isAddCourseDialogOpen, setIsAddCourseDialogOpen] = useState(false);

  const { data: courses = [], isLoading, error } = useFetchCourses();

  const getFilteredCourses = (status) => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = course.status === status;

      return matchesSearch && matchesStatus;
    });
  };

  const handleDeleteCourse = (courseId) => {
    // Implement delete functionality
    console.log("Delete course:", courseId);
  };

  const handleApproveCourseWithPrice = (courseId, price) => {
    // Implement approve functionality
    console.log("Approve course:", courseId, price);
  };

  const handleRejectCourseWithReason = (courseId, reason) => {
    // Implement reject functionality 
    console.log("Reject course:", courseId, reason);
  };

  const handleViewCourseDetails = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    if (course) {
      setSelectedCourse(course);
      setIsDetailsDialogOpen(true);
    }
  };

  const handleAddCourse = (courseData) => {
    // Implement add course functionality
    console.log("Add course:", courseData);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Published</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "rejected":
        return <Badge variant="outline">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getApprovalStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const renderTabContent = (status, title, icon, description) => {
    const filteredCourses = getFilteredCourses(status);

    return (
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                {icon}
                {title}
              </CardTitle>
              <CardDescription>
                {description} ({filteredCourses.length} courses)
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading courses...</div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">Error loading courses</div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No {status} courses found
            </div>
          ) : viewMode === "grid" ? (
            <CourseGrid courses={filteredCourses} />
          ) : (
            <CourseTable
              courses={filteredCourses}
              activeTab={activeTab}
              getApprovalStatusBadge={getApprovalStatusBadge}
              getStatusBadge={getStatusBadge}
              handleViewCourseDetails={handleViewCourseDetails}
              handleDeleteCourse={handleDeleteCourse}
            />
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Course Management</h1>
        <p className="text-muted-foreground">
          Review and approve courses submitted by instructors
        </p>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search courses, instructors, or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* add course */}
        <div className="flex gap-2">
          <Button onClick={() => setIsAddCourseDialogOpen(true)}>
            Add New Course
          </Button>
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-r-none h-full"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              disabled={true}
              title="under development"
              className="rounded-l-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs for different approval statuses */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Pending Review ({getFilteredCourses("pending").length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Approved ({getFilteredCourses("approved").length})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="flex items-center gap-2">
            <XCircle className="w-4 h-4" />
            Rejected ({getFilteredCourses("rejected").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {renderTabContent(
            "pending",
            "Pending Review",
            <Clock className="w-5 h-5 text-yellow-600" />,
            "Courses awaiting admin review and pricing"
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {renderTabContent(
            "approved", 
            "Approved Courses",
            <CheckCircle className="w-5 h-5 text-green-600" />,
            "Published and live courses"
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {renderTabContent(
            "rejected",
            "Rejected Courses", 
            <XCircle className="w-5 h-5 text-red-600" />,
            "Courses that need revision"
          )}
        </TabsContent>
      </Tabs>

      {/* Course Details Dialog */}
      {selectedCourse && (
        <CourseDetailsDialog
          isOpen={isDetailsDialogOpen}
          onClose={() => setIsDetailsDialogOpen(false)}
          course={selectedCourse}
          onApproveCourse={handleApproveCourseWithPrice}
          onRejectCourse={handleRejectCourseWithReason}
        />
      )}

      {/* Add Course Dialog */}
      <AddCourseDialog
        isOpen={isAddCourseDialogOpen}
        onClose={() => setIsAddCourseDialogOpen(false)}
        onAddCourse={handleAddCourse}
      />
    </div>
  );
}

export default CourseManagement;
