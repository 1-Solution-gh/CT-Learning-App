import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Download, ExternalLink, User, Briefcase, GraduationCap, PlayCircle } from "lucide-react"

export default function ApplicationDialog({
  selectedApplication,
  setSelectedApplication,
  handleAcceptApplication,
  isActionLoading
}) {
  if (!selectedApplication) return null

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleDecline = () => {
    alert("Decline functionality in progress...")
  }

  const handleDownloadResume = () => {
    if (selectedApplication.resume_link) {
      window.open(selectedApplication.resume_link, "_blank")
    }
  }

  const handleWatchVideo = () => {
    if (selectedApplication.video_link) {
      window.open(selectedApplication.video_link, "_blank")
    }
  }

  return (
    <Dialog  open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
      <DialogContent className="  lg:min-w-5xl max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Instructor Application Details
          </DialogTitle>
          <DialogDescription>Review application from {selectedApplication.full_name}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Application Date */}
          <div className="flex items-center justify-between">
            <Badge variant={selectedApplication.status === "pending" ? "secondary" : "default"}>
              {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Applied: {formatDate(selectedApplication.applied_at)}
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <User className="h-4 w-4" />
              Personal Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Full Name:</strong> {selectedApplication.full_name}
              </div>
              <div>
                <strong>Email:</strong> {selectedApplication.email}
              </div>
              <div>
                <strong>Years of Experience:</strong> {selectedApplication.years_experience} years
              </div>
              <div>
                <strong>Current Occupation:</strong> {selectedApplication.current_occupation || "Not specified"}
              </div>
            </div>
          </div>

          <Separator />

          {/* Professional Background */}
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Professional Background
            </h4>

            {selectedApplication.professional_title && (
              <div>
                <strong>Professional Title:</strong>
                <p className="text-sm text-muted-foreground mt-1">{selectedApplication.professional_title}</p>
              </div>
            )}

            {selectedApplication.professional_bio && (
              <div>
                <strong>Professional Bio:</strong>
                <p className="text-sm text-muted-foreground mt-1">{selectedApplication.professional_bio}</p>
              </div>
            )}

            {selectedApplication.previous_experience && (
              <div>
                <strong>Previous Experience:</strong>
                <p className="text-sm text-muted-foreground mt-1">{selectedApplication.previous_experience}</p>
              </div>
            )}

            {selectedApplication.certifications && (
              <div>
                <strong>Certifications:</strong>
                <p className="text-sm text-muted-foreground mt-1">{selectedApplication.certifications}</p>
              </div>
            )}
          </div>

          <Separator />

          {/* Course Information */}
          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Course Information
            </h4>
            <div className="space-y-3 text-sm">
              <div>
                <strong>Course Category:</strong>
                <Badge variant="outline" className="ml-2">
                  {selectedApplication.course_category}
                </Badge>
              </div>

              {selectedApplication.course_title && (
                <div>
                  <strong>Course Title:</strong>
                  <p className="text-muted-foreground mt-1">{selectedApplication.course_title}</p>
                </div>
              )}

              {selectedApplication.course_description && (
                <div>
                  <strong>Course Description:</strong>
                  <p className="text-muted-foreground mt-1">{selectedApplication.course_description}</p>
                </div>
              )}

              {selectedApplication.course_outline && (
                <div>
                  <strong>Course Outline:</strong>
                  <p className="text-muted-foreground mt-1">{selectedApplication.course_outline}</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Attachments */}
          <div className="space-y-3">
            <h4 className="font-semibold">Attachments & Media</h4>
            <div className="flex flex-wrap gap-2">
              {selectedApplication.resume_link && (
                <Button variant="outline" size="sm" onClick={handleDownloadResume} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download Resume
                </Button>
              )}

              {selectedApplication.video_link && (
                <Button variant="outline" size="sm" onClick={handleWatchVideo} className="flex items-center gap-2">
                  <PlayCircle className="h-4 w-4" />
                  Watch Video
                </Button>
              )}

              {selectedApplication.profile_photo_link && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(selectedApplication.profile_photo_link, "_blank")}
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Profile Photo
                </Button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
              variant="outline"
              onClick={handleDecline}
              className="text-red-600 hover:text-red-700 hover:border-red-200"
              disabled={isActionLoading}
            >
              {isActionLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-t-red-600 border-r-transparent border-b-transparent border-l-transparent animate-spin"></span>
                  Processing...
                </span>
              ) : (
                "Decline Application"
              )}
            </Button>
            <Button
              onClick={() => handleAcceptApplication(selectedApplication.id)}
              className="bg-green-600 hover:bg-green-700 text-white"
              disabled={isActionLoading}
            >
              {isActionLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-t-white border-r-transparent border-b-transparent border-l-transparent animate-spin"></span>
                  Processing...
                </span>
              ) : (
                "Accept Application"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}