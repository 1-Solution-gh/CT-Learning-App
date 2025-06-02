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

const coursesData = [
  {
    id: 1,
    title: "Complete React Development Course",
    instructor: "John Davis",
    instructorId: "inst_001",
    category: "Programming",
    enrollments: 1250,
    price: 89.99,
    status: "published",
    approvalStatus: "approved",
    rating: 4.8,
    duration: "40 hours",
    createdDate: "2024-01-15",
    submittedDate: "2024-01-10",
    reviewedDate: "2024-01-12",
    reviewedBy: "Admin User",
    adminNotes: "Great course content, approved for publication",
    thumbnail: "/placeholder.svg?height=200&width=300",
    description:
      "Comprehensive React course covering hooks, state management, and modern development practices.",
    attachments: [
      {
        id: "att_1",
        name: "Course Syllabus.pdf",
        type: "application/pdf",
        size: "1.2 MB",
        url: "#",
      },
      {
        id: "att_2",
        name: "Introduction.mp4",
        type: "video/mp4",
        size: "45.8 MB",
        url: "#",
      },
    ],
  },
  {
    id: 2,
    title: "Advanced Python Programming",
    instructor: "Sarah Wilson",
    instructorId: "inst_002",
    category: "Programming",
    enrollments: 890,
    price: 79.99,
    status: "published",
    approvalStatus: "approved",
    rating: 4.6,
    duration: "35 hours",
    createdDate: "2024-01-20",
    submittedDate: "2024-01-18",
    reviewedDate: "2024-01-19",
    reviewedBy: "Admin User",
    adminNotes: "Excellent content structure and delivery",
    thumbnail: "/placeholder.svg?height=200&width=300",
    description: "Deep dive into advanced Python concepts and frameworks.",
    attachments: [
      {
        id: "att_3",
        name: "Python Advanced Guide.pdf",
        type: "application/pdf",
        size: "2.5 MB",
        url: "#",
      },
      {
        id: "att_4",
        name: "Code Examples.zip",
        type: "application/zip",
        size: "15.3 MB",
        url: "#",
      },
    ],
  },
  {
    id: 3,
    title: "Machine Learning Fundamentals",
    instructor: "Mike Johnson",
    instructorId: "inst_003",
    category: "Data Science",
    enrollments: 0,
    price: 0, // No price set yet - pending admin review
    status: "draft",
    approvalStatus: "pending",
    rating: 0,
    duration: "50 hours",
    createdDate: "2024-02-01",
    submittedDate: "2024-02-01",
    reviewedDate: null,
    reviewedBy: null,
    adminNotes: "Awaiting review",
    thumbnail: "/placeholder.svg?height=200&width=300",
    description:
      "Introduction to machine learning algorithms and applications.",
    attachments: [
      {
        id: "att_5",
        name: "ML Course Materials.pdf",
        type: "application/pdf",
        size: "5.7 MB",
        url: "#",
      },
      {
        id: "att_6",
        name: "Dataset Examples.csv",
        type: "text/csv",
        size: "2.1 MB",
        url: "#",
      },
      {
        id: "att_7",
        name: "Python Notebooks.zip",
        type: "application/zip",
        size: "8.4 MB",
        url: "#",
      },
    ],
  },
  {
    id: 4,
    title: "Web Design Basics",
    instructor: "Emily Chen",
    instructorId: "inst_004",
    category: "Design",
    enrollments: 0,
    price: 0,
    status: "draft",
    approvalStatus: "rejected",
    rating: 0,
    duration: "25 hours",
    createdDate: "2024-01-25",
    submittedDate: "2024-01-25",
    reviewedDate: "2024-01-26",
    reviewedBy: "Admin User",
    adminNotes:
      "Content needs significant improvement. Please revise and resubmit.",
    thumbnail: "/placeholder.svg?height=200&width=300",
    description:
      "Learn the basics of web design and user interface principles.",
    attachments: [],
  },
  {
    id: 5,
    title: "Digital Marketing Strategy",
    instructor: "Alex Brown",
    instructorId: "inst_005",
    category: "Marketing",
    enrollments: 0,
    price: 0, // No price set yet - pending admin review
    status: "draft",
    approvalStatus: "pending",
    rating: 0,
    duration: "30 hours",
    createdDate: "2024-02-05",
    submittedDate: "2024-02-05",
    reviewedDate: null,
    reviewedBy: null,
    adminNotes: "Under review",
    thumbnail: "/placeholder.svg?height=200&width=300",
    description:
      "Comprehensive guide to digital marketing strategies and tools.",
    attachments: [
      {
        id: "att_8",
        name: "Marketing Plan Template.docx",
        type: "application/docx",
        size: "850 KB",
        url: "#",
      },
      {
        id: "att_9",
        name: "Case Studies.pdf",
        type: "application/pdf",
        size: "3.2 MB",
        url: "#",
      },
      {
        id: "att_10",
        name: "Social Media Guide.pdf",
        type: "application/pdf",
        size: "1.8 MB",
        url: "#",
      },
    ],
  },
];

function CourseManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState(coursesData);
  const [viewMode, setViewMode] = useState("list");
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isAddCourseDialogOpen, setIsAddCourseDialogOpen] = useState(false);

  const getFilteredCourses = (approvalStatus) => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = course.approvalStatus === approvalStatus;

      return matchesSearch && matchesStatus;
    });
  };

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter((course) => course.id !== courseId));
  };

  const handleApproveCourseWithPrice = (courseId, price) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              approvalStatus: "approved",
              status: "published",
              price: price,
              reviewedDate: new Date().toISOString().split("T")[0],
              reviewedBy: "Admin User",
              adminNotes: `Course approved with price $${price}`,
            }
          : course
      )
    );
  };

  const handleRejectCourseWithReason = (courseId, reason) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              approvalStatus: "rejected",
              reviewedDate: new Date().toISOString().split("T")[0],
              reviewedBy: "Admin User",
              adminNotes: reason,
            }
          : course
      )
    );
  };

  const handleViewCourseDetails = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    if (course) {
      setSelectedCourse(course);
      setIsDetailsDialogOpen(true);
    }
  };

  const handleAddCourse = (courseData) => {
    setCourses((prevCourses) => [courseData, ...prevCourses]);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800">Published</Badge>;
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
      case "archived":
        return <Badge variant="outline">Archived</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getApprovalStatusBadge = (approvalStatus) => {
    switch (approvalStatus) {
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
        return <Badge variant="secondary">{approvalStatus}</Badge>;
    }
  };

  const renderTabContent = (approvalStatus, title, icon, description) => {
    const filteredCourses = getFilteredCourses(approvalStatus);

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
          {filteredCourses.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No {approvalStatus} courses found
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
