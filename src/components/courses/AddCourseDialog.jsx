"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { DollarSign, Upload, ImageIcon, X, FileText, Plus } from "lucide-react";
// import { useUpdateCourseStatus } from "@/hooks/useCourseAction";

export function AddCourseDialog({ isOpen, onClose, onAddCourse }) {


 
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructor: "",
    category: "",
    duration: "",
    price: 0,
    thumbnail: null,
  });

  const [attachments, setAttachments] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [errors, setErrors] = useState({});

  const categories = [
    "Programming",
    "Data Science",
    "Design",
    "Marketing",
    "Business",
    "Photography",
    "Music",
    "Language",
    "Health & Fitness",
    "Personal Development",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleThumbnailChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, thumbnail: file }));

      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAttachmentChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachments((prev) => [...prev, ...newFiles]);
    }
  };

  const removeAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Course title is required";
    if (!formData.description.trim())
      newErrors.description = "Course description is required";
    if (!formData.instructor.trim())
      newErrors.instructor = "Instructor name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.duration.trim()) newErrors.duration = "Duration is required";
    if (formData.price <= 0) newErrors.price = "Price must be greater than 0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const courseData = {
      id: Date.now(), // Simple ID generation
      title: formData.title,
      description: formData.description,
      instructor: formData.instructor,
      instructorId: "admin_created",
      category: formData.category,
      duration: formData.duration,
      price: formData.price,
      status: "published",
      approvalStatus: "approved",
      rating: 0,
      enrollments: 0,
      createdDate: new Date().toISOString().split("T")[0],
      submittedDate: new Date().toISOString().split("T")[0],
      reviewedDate: new Date().toISOString().split("T")[0],
      reviewedBy: "Admin User",
      adminNotes: "Course created by admin",
      thumbnail: thumbnailPreview || "/placeholder.svg?height=200&width=300",
      attachments: attachments.map((file, index) => ({
        id: `att_${Date.now()}_${index}`,
        name: file.name,
        type: file.type,
        size: formatFileSize(file.size),
        url: URL.createObjectURL(file),
      })),
    };

    onAddCourse(courseData);
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      instructor: "",
      category: "",
      duration: "",
      price: 0,
      thumbnail: null,
    });
    setAttachments([]);
    setThumbnailPreview("");
    setErrors({});
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Add New Course</DialogTitle>
          <DialogDescription>
            Create a new course and add it directly to the platform
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6 p-1">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Course Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter course title"
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500">{errors.title}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructor">Instructor Name *</Label>
                  <Input
                    id="instructor"
                    value={formData.instructor}
                    onChange={(e) =>
                      handleInputChange("instructor", e.target.value)
                    }
                    placeholder="Enter instructor name"
                  />
                  {errors.instructor && (
                    <p className="text-sm text-red-500">{errors.instructor}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleInputChange("category", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-red-500">{errors.category}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration *</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) =>
                      handleInputChange("duration", e.target.value)
                    }
                    placeholder="e.g., 40 hours, 6 weeks"
                  />
                  {errors.duration && (
                    <p className="text-sm text-red-500">{errors.duration}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Course Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Describe what students will learn in this course"
                  className="min-h-[100px]"
                />
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Course Price ($) *</Label>
                <div className="relative">
                  <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) =>
                      handleInputChange(
                        "price",
                        Number.parseFloat(e.target.value) || 0
                      )
                    }
                    className="pl-8"
                    placeholder="0.00"
                  />
                </div>
                {errors.price && (
                  <p className="text-sm text-red-500">{errors.price}</p>
                )}
              </div>
            </div>

            <Separator />

            {/* Thumbnail Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Course Thumbnail</h3>

              <div className="flex items-center gap-4">
                <div className="border rounded-md overflow-hidden w-32 h-20 flex items-center justify-center bg-muted">
                  {thumbnailPreview ? (
                    <img
                      src={thumbnailPreview || "/placeholder.svg"}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <Label
                    htmlFor="thumbnail-upload"
                    className="cursor-pointer flex items-center justify-center w-full border-2 border-dashed rounded-md py-3 border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <Upload className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        Upload thumbnail
                      </span>
                      <span className="text-xs text-muted-foreground">
                        PNG, JPG or GIF up to 2MB
                      </span>
                    </div>
                    <Input
                      id="thumbnail-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleThumbnailChange}
                    />
                  </Label>
                </div>
              </div>
            </div>

            <Separator />

            {/* Attachments */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Course Materials</h3>
                <Label htmlFor="attachments-upload" className="cursor-pointer">
                  <Button type="button" variant="outline" size="sm" asChild>
                    <span>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Files
                    </span>
                  </Button>
                  <Input
                    id="attachments-upload"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleAttachmentChange}
                  />
                </Label>
              </div>

              {attachments.length > 0 ? (
                <div className="space-y-2">
                  {attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAttachment(index)}
                        className="h-8 w-8"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                  <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No course materials added yet</p>
                  <p className="text-xs">
                    Add PDFs, videos, or other learning materials
                  </p>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Course</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
