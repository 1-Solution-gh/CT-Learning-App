"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  FileText,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Calendar,
  BookOpen,
  Upload,
  Play,
  FileVideo,
  FileImage,
  File,
  Eye,
} from "lucide-react"
import { useUpdateCourseStatus } from "@/hooks/useCourseAction"

// Video popup component
function VideoPopup({ isOpen, onClose, videoUrl, title }) {
  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="aspect-video">
          <video width="100%" height="100%" controls autoPlay className="rounded-lg">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Preview video popup component for admin
function AdminVideoPreview({ isOpen, onClose, videoUrl, title }) {
  if (!isOpen) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Preview: {title}</DialogTitle>
        </DialogHeader>
        <div className="aspect-video">
          <video width="100%" height="100%" controls className="rounded-lg">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close Preview</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// File type icon component
function FileTypeIcon({ fileType, className = "h-4 w-4" }) {
  if (fileType?.startsWith("video/")) {
    return <FileVideo className={className} />
  }
  if (fileType?.startsWith("image/")) {
    return <FileImage className={className} />
  }
  if (fileType === "application/pdf") {
    return <FileText className={className} />
  }
  return <File className={className} />
}

// Lecture card component
function LectureCard({ lecture, onVideoClick }) {
  const isVideo = lecture.file_type?.startsWith("video/mp4")
  const isPdf = lecture.file_type === "application/pdf"
  const isImage = lecture.file_type?.startsWith("image/")

  return (
    <div className="border rounded-lg p-3 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        {/* Thumbnail/Preview */}
        <div className="flex-shrink-0">
          {isVideo ? (
            <div
              className="relative w-24 h-16 bg-gray-100 rounded cursor-pointer group overflow-hidden"
              onClick={() => onVideoClick(lecture)}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                <Play className="h-6 w-6 text-white" />
              </div>
              <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                {lecture.duration || "0:00"}
              </div>
            </div>
          ) : (
            <div className="w-24 h-16 bg-gray-100 rounded flex items-center justify-center">
              <FileTypeIcon fileType={lecture.file_type} className="h-8 w-8 text-gray-400" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h4 className="font-medium text-sm line-clamp-2">{lecture.title}</h4>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  <FileTypeIcon fileType={lecture.file_type} className="h-3 w-3 mr-1" />
                  {lecture.file_type?.split("/")[1]?.toUpperCase() || "FILE"}
                </Badge>
                {lecture.duration && <span className="text-xs text-muted-foreground">{lecture.duration}</span>}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-1">
              {isVideo && (
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onVideoClick(lecture)}>
                  <Play className="h-3 w-3" />
                </Button>
              )}
              {(isPdf || isImage) && lecture.file_url && (
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                  <a href={lecture.file_url} target="_blank" rel="noreferrer">
                    <Eye className="h-3 w-3" />
                  </a>
                </Button>
              )}
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" asChild>
                <a href={lecture.file_url} download>
                  <Download className="h-3 w-3" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CourseDetailsDialog({ isOpen, onClose, course,  onRejectCourse }) {
  const {mutate } = useUpdateCourseStatus () 
  console.log("video", course)

  const [price, setPrice] = useState(course?.price || 0)
  const [rejectionReason, setRejectionReason] = useState("")
  const [priceError, setPriceError] = useState("")
  const [thumbnail, setThumbnail] = useState(course?.thumbnail || null)
  const [thumbnailPreview, setThumbnailPreview] = useState(
    course?.thumbnail || "https://res.cloudinary.com/disgj6wx5/image/upload/v1750262850/nzfaomx0a1hi8hz3gq6m.jpg",
  )
  const [featuredCategory, setFeaturedCategory] = useState("new")

  const [videoPopup, setVideoPopup] = useState({ isOpen: false, videoUrl: "", title: "" })
  const [adminVideoPreview, setAdminVideoPreview] = useState({ isOpen: false, videoUrl: "", title: "" })

  if (!course) return null

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setThumbnail(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setThumbnailPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePriceChange = (e) => {
    const value = e.target.value
    setPrice(Number.parseFloat(value) || 0)

    if (Number.parseFloat(value) < 0) {
      setPriceError("Price cannot be negative")
    } else if (Number.parseFloat(value) === 0) {
      setPriceError("Please set a price for the course")
    } else {
      setPriceError("")
    }
  }


  const handleApproveWithFile = () => {
    if (price <= 0) {
      setPriceError("Please set a valid price before approving")
      return
    }
  
    const formData = new FormData();
    formData.append("course_id", course.id);
    formData.append("status", "approved");
    formData.append("price", price);
    formData.append("thumbnail", thumbnail);
    formData.append("featured_category", featuredCategory)

    

    mutate(formData);
    onClose()
  }
  

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      return
    }

    const formData = new FormData()
    formData.append('courseId', course.id)
    formData.append('status', 'rejected')
    formData.append('rejectionReason', rejectionReason)

    onRejectCourse(formData)
    onClose()
  }

  const handleVideoClick = (lecture) => {
    setAdminVideoPreview({
      isOpen: true,
      videoUrl: `http://localhost:5000${lecture.file_url}`,
      title: lecture.title,
    })
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending Review
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  // Separate lectures by type
  const lectures = course.sections?.[0]?.lectures || []
  const videoLectures = lectures.filter((lecture) => lecture.file_type?.startsWith("video/"))
  const documentLectures = lectures.filter((lecture) => !lecture.file_type?.startsWith("video/"))

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-5xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Course Review: {course.title}</span>
              {getStatusBadge(course.approvalStatus)}
            </DialogTitle>
            <DialogDescription>Review course details and set pricing before approval</DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[60vh]">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="materials">Materials</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="review">Review</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Course Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Instructor:</span>
                          <span className="text-sm">{course.instructor.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Category:</span>
                          <Badge variant="outline">{course.category.name}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Submitted:</span>
                          <span className="text-sm">{course.submittedDate}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground">{course.description}</p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium mb-2">Course Status</h4>
                      <div className="space-y-2">
  {[ "new", "popular", "trending"].map((key) => (
    <div key={key} className="flex items-center space-x-2">
      <Switch
        id={key}
        checked={featuredCategory === key}
        onCheckedChange={(checked) => {
          if (checked) {
            setFeaturedCategory(key)
          } else {
          
            setFeaturedCategory("new")
          }
        }}
      />
      <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
    </div>
  ))}
</div>

                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Course Thumbnail</h3>
                      <div className="border rounded-lg overflow-hidden">
                        <img
                          src={thumbnailPreview || "/placeholder.svg"}
                          alt={course.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <div className="mt-4">
                        <Label htmlFor="thumbnail" className="cursor-pointer">
                          <div className="flex items-center gap-2 p-2 border-2 border-dashed rounded-lg hover:bg-gray-50 transition-colors">
                            <Upload className="h-4 w-4" />
                            <span>Upload New Thumbnail</span>
                          </div>
                          <Input
                            id="thumbnail"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleThumbnailChange}
                          />
                        </Label>
                        <p className="text-xs text-muted-foreground mt-2">
                          Recommended size: 1280x720px. Max file size: 5MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="materials" className="space-y-6 mt-6">
                {lectures.length > 0 ? (
                  <div className="space-y-6">
                    {/* Video Lectures */}
                    {videoLectures.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <FileVideo className="h-5 w-5" />
                          Video Lectures ({videoLectures.length})
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {videoLectures.map((lecture) => (
                            <LectureCard key={lecture.id} lecture={lecture} onVideoClick={handleVideoClick} />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Document Lectures */}
                    {documentLectures.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Documents & Resources ({documentLectures.length})
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {documentLectures.map((lecture) => (
                            <LectureCard key={lecture.id} lecture={lecture} onVideoClick={handleVideoClick} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No course materials uploaded</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="pricing" className="space-y-6 mt-6">
                {course.status === "pending" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Set Course Price</h3>
                    <div className="max-w-md space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="course-price">Course Price (€)</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                          <Input
                            id="course-price"
                            type="number"
                            step="0.01"
                            min="0"
                            value={price}
                            onChange={handlePriceChange}
                            className="pl-8"
                            placeholder="Enter course price"
                          />
                        </div>
                        {priceError && <p className="text-sm text-red-500">{priceError}</p>}
                      </div>
                      <div className="bg-muted p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Pricing Guidelines</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Consider course length and complexity</li>
                          <li>• Check similar courses in the category</li>
                          <li>• Factor in instructor experience</li>
                          <li>• Minimum recommended price: €10</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="review" className="space-y-6 mt-6">
                {course.approvalStatus === "pending" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Rejection Reason (Optional)</h3>
                    <Textarea
                      placeholder="Provide feedback if rejecting the course..."
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      className="min-h-[120px]"
                    />
                  </div>
                )}

                {course.adminNotes && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Admin Notes</h3>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm">{course.adminNotes}</p>
                      {course.reviewedBy && course.reviewedDate && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Reviewed by {course.reviewedBy} on {course.reviewedDate}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </ScrollArea>

          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            {course.status === "pending" && (
              <div className="flex gap-2">
                <Button variant="destructive" onClick={handleReject} disabled={!rejectionReason.trim()}>
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject Course
                </Button>
                <Button onClick={handleApproveWithFile} disabled={!!priceError || price <= 0}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve & Set Price
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Video Popup */}
      <VideoPopup
        isOpen={videoPopup.isOpen}
        onClose={() => setVideoPopup({ isOpen: false, videoUrl: "", title: "" })}
        videoUrl={videoPopup.videoUrl}
        title={videoPopup.title}
      />
    </>
  )
}
