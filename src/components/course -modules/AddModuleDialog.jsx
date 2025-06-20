import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

export default function AddModuleDialog({
  isOpen,
  setIsOpen,
  defaultValues = {},
  onSave, // will receive form data
  title = "Add Module",
  description = "add a module to the course",
  triggerText = "Add Module",
  showTrigger = true,
  courseId
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const onSubmit = (data) => {
    const formData = {
        ...data,
        course_id: courseId, 
      };
    onSave(formData); // send to parent handler
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {showTrigger && (
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {triggerText}
          </Button>
        </DialogTrigger>
      )}

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Module Name</Label>
              <Input
                id="name"
                {...register("name", { required: "Module name is required" })}
                placeholder="Enter module name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="module_code">Module Code</Label>
              <Input
                id="module_code"
                {...register("module_code", { required: "Module code is required" })}
                placeholder="Enter module code"
              />
              {errors.module_code && (
                <p className="text-red-500 text-sm">{errors.module_code.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                {...register("slug", { required: "Slug is required" })}
                placeholder="Enter slug"
              />
              {errors.slug && (
                <p className="text-red-500 text-sm">{errors.slug.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="topics">Topics</Label>
              <Input
                id="topics"
                {...register("topics", { required: "Topics are required" })}
                placeholder="Enter topics covered"
              />
              {errors.topics && (
                <p className="text-red-500 text-sm">{errors.topics.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                {...register("duration", { required: "Duration is required" })}
                placeholder="Enter duration"
              />
              {errors.duration && (
                <p className="text-red-500 text-sm">{errors.duration.message}</p>
              )}
            </div>

           
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">{triggerText}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
