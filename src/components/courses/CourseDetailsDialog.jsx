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
import { Separator } from "@/components/ui/separator"
import {
  DollarSign,
  FileText,
  Download,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Calendar,
  BookOpen,
} from "lucide-react"

export function CourseDetailsDialog({ isOpen, onClose, course, onApproveCourse, onRejectCourse }) {
  const [price, setPrice] = useState(course?.price || 0)
  const [rejectionReason, setRejectionReason] = useState("")
  const [priceError, setPriceError] = useState("")

  if (!course) return null

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

  const handleApprove = () => {
    if (price <= 0) {
      setPriceError("Please set a valid price before approving")
      return
    }
    onApproveCourse(course.id, price)
    onClose()
  }

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      return
    }
    onRejectCourse(course.id, rejectionReason)
    onClose()
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Course Review: {course.title}</span>
            {getStatusBadge(course.approvalStatus)}
          </DialogTitle>
          <DialogDescription>Review course details and set pricing before approval</DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6 p-1">
            {/* Course Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Course Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Instructor:</span>
                      <span className="text-sm">{course.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Category:</span>
                      <Badge variant="outline">{course.category}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Duration:</span>
                      <span className="text-sm">{course.duration}</span>
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
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Course Thumbnail</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Course Attachments */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Course Materials & Attachments</h3>
              {course.attachments && course.attachments.length > 0 ? (
                <div className="space-y-3">
                  {course.attachments.map((attachment) => (
                    <div key={attachment.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{attachment.name}</p>
                          <p className="text-xs text-muted-foreground">{attachment.size}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="icon" asChild className="h-8 w-8">
                          <a href={attachment.url} target="_blank" rel="noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </a>
                        </Button>
                        <Button variant="outline" size="icon" asChild className="h-8 w-8">
                          <a href={attachment.url} download>
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No attachments uploaded</p>
              )}
            </div>

            <Separator />

            {/* Price Assignment */}
            {course.approvalStatus === "pending" && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Set Course Price</h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="course-price">Course Price ($)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
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
                </div>
              </div>
            )}

            {/* Rejection Reason */}
            {course.approvalStatus === "pending" && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Rejection Reason (Optional)</h3>
                <Textarea
                  placeholder="Provide feedback if rejecting the course..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            )}

            {/* Admin Notes */}
            {course.adminNotes && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Admin Notes</h3>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm">{course.adminNotes}</p>
                  {course.reviewedBy && course.reviewedDate && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Reviewed by {course.reviewedBy} on {course.reviewedDate}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {course.approvalStatus === "pending" && (
            <div className="flex gap-2">
              <Button variant="destructive" onClick={handleReject} disabled={!rejectionReason.trim()}>
                <XCircle className="w-4 h-4 mr-2" />
                Reject Course
              </Button>
              <Button onClick={handleApprove} disabled={!!priceError || price <= 0}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve & Set Price
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
