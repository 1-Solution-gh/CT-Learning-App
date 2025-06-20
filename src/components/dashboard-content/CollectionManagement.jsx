"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Archive,
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
} from "lucide-react";
import {
  useFetchModules,
  usePostModule,
  useFetchCourses,
  usePostCourse,
} from "@/hooks/useModulesActions";
import CourseDialog from "../course -modules/AddCourseDialog";
import AddModuleDialog from "../course -modules/AddModuleDialog";

const collectionsData = [
  {
    id: 1,
    name: "Web Development",
    description: "Complete web development courses and technologies",
    coursesCount: 45,
    color: "#3b82f6",
    isActive: true,
    createdDate: "2023-01-15",
    subcollections: [
      {
        id: 1,
        name: "React",
        description: "React.js framework courses",
        coursesCount: 15,
        isActive: true,
      },
      {
        id: 2,
        name: "Vue.js",
        description: "Vue.js framework courses",
        coursesCount: 8,
        isActive: true,
      },
      {
        id: 3,
        name: "Node.js",
        description: "Backend development with Node.js",
        coursesCount: 12,
        isActive: true,
      },
      {
        id: 4,
        name: "HTML/CSS",
        description: "Fundamentals of web design",
        coursesCount: 10,
        isActive: true,
      },
    ],
  },
  {
    id: 2,
    name: "Design",
    description: "Creative design and visual arts courses",
    coursesCount: 32,
    color: "#8b5cf6",
    isActive: true,
    createdDate: "2023-02-10",
    subcollections: [
      {
        id: 5,
        name: "Photoshop",
        description: "Adobe Photoshop tutorials",
        coursesCount: 12,
        isActive: true,
      },
      {
        id: 6,
        name: "Figma",
        description: "UI/UX design with Figma",
        coursesCount: 8,
        isActive: true,
      },
      {
        id: 7,
        name: "Illustrator",
        description: "Vector graphics design",
        coursesCount: 7,
        isActive: true,
      },
      {
        id: 8,
        name: "Sketch",
        description: "Interface design with Sketch",
        coursesCount: 5,
        isActive: false,
      },
    ],
  },
  {
    id: 3,
    name: "Data Science",
    description: "Data analysis, ML, and AI courses",
    coursesCount: 28,
    color: "#10b981",
    isActive: true,
    createdDate: "2023-03-05",
    subcollections: [
      {
        id: 9,
        name: "Python",
        description: "Python for data science",
        coursesCount: 15,
        isActive: true,
      },
      {
        id: 10,
        name: "Machine Learning",
        description: "ML algorithms and models",
        coursesCount: 8,
        isActive: true,
      },
      {
        id: 11,
        name: "Data Visualization",
        description: "Charts and graphs",
        coursesCount: 5,
        isActive: true,
      },
    ],
  },
  {
    id: 4,
    name: "Business",
    description: "Business strategy and entrepreneurship",
    coursesCount: 22,
    color: "#f59e0b",
    isActive: false,
    createdDate: "2023-04-20",
    subcollections: [
      {
        id: 12,
        name: "Marketing",
        description: "Digital marketing strategies",
        coursesCount: 10,
        isActive: true,
      },
      {
        id: 13,
        name: "Finance",
        description: "Business finance and accounting",
        coursesCount: 7,
        isActive: true,
      },
      {
        id: 14,
        name: "Leadership",
        description: "Management and leadership",
        coursesCount: 5,
        isActive: true,
      },
    ],
  },
];

export function CollectionManagement() {
  const { data: courses } = useFetchCourses();
  const { data: modules } = useFetchModules();
  const [collections, setCollections] = useState(collectionsData);
  const [isOpen, setIsOpen] = useState(false)
  const [isEditCollectionOpen, setIsEditCollectionOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [expandedCollections, setExpandedCollections] = useState([1, 2]);

  const { mutate: postCourse, } = usePostCourse();
  const {mutate : postModule, }  = usePostModule()

  const toggleCollectionExpanded = (collectionId) => {
    setExpandedCollections((prev) =>
      prev.includes(collectionId)
        ? prev.filter((id) => id !== collectionId)
        : [...prev, collectionId]
    );
  };

  const handleSave = (data) => {
    postCourse(data);
  };
  
  const handleSaveModule = (data) => {
    console.log("add module data", data)
    postModule(data);
  };

  const handleDeleteCollection = (collectionId) => {
    setCollections(collections.filter((col) => col.id !== collectionId));
  };

  const totalCollections = collections.length;
  const totalSubcollections = collections.reduce(
    (sum, col) => sum + col.subcollections.length,
    0
  );
  const totalCourses = collections.reduce(
    (sum, col) => sum + col.coursesCount,
    0
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Collection Management</h1>
        <p className="text-muted-foreground">
          Organize courses into collections and subcollections for better
          navigation
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Modules</CardTitle>
            <Archive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{modules?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              {modules?.filter(m => m.status).length || 0} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sub Modules</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSubcollections}</div>
            <p className="text-xs text-muted-foreground">Across all Modules</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses?.length || 0}</div>
            <p className="text-xs text-muted-foreground">In all Modules</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Largest Module
            </CardTitle>
            <Archive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {courses?.reduce((prev, current) => {
                return (prev?.modules_count > current?.modules_count) ? prev : current
              })?.title || 'None'}
            </div>
            <p className="text-xs text-muted-foreground">
              {courses?.reduce((prev, current) => {
                return (prev?.modules_count > current?.modules_count) ? prev : current
              })?.modules_count || 0} modules
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Collections Management */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Collections & Subcollections</CardTitle>
              <CardDescription>
                Manage course collections and their subcategories
              </CardDescription>
            </div>
            <CourseDialog
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onSave={handleSave}
              triggerText="Add Module"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {courses?.map((course) => {
              const filteredModules = modules?.filter(
                (module) => module.course_id === course.id
              );
              return (
                <div key={course.id} className="border rounded-lg p-4">
                  <Collapsible
                    open={expandedCollections.includes(course.id)}
                    onOpenChange={() => toggleCollectionExpanded(course.id)}
                  >
                    <div className="flex items-center justify-between">
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          className="flex items-center gap-2 p-0 h-auto"
                        >
                          {expandedCollections.includes(course.id) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                          <span className="font-medium text-lg">
                            {course.title}
                          </span>
                          <Badge
                            variant={course.status ? "default" : "secondary"}
                          >
                            {course.status ? "Active" : "Inactive"}
                          </Badge>
                        </Button>
                      </CollapsibleTrigger>

                      <div className="flex items-center gap-2">
                        <AddModuleDialog 
                          onSave={handleSaveModule} 
                          courseId={course.id}
                          isOpen={isOpen}
                          setIsOpen={setIsOpen}
                        />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setEditingCollection(course);
                                setIsEditCollectionOpen(true);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Module
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleToggleCollectionStatus(course.id)
                              }
                            >
                              {course.status ? "Deactivate" : "Activate"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteCollection(course.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Module
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mt-2 ml-6">
                      {course.description}
                    </p>
                    {
                      <CollapsibleContent className="mt-4">
                        {filteredModules?.length > 0 ? (
                          <div className="ml-6 space-y-2">
                            <h4 className="font-medium text-sm text-muted-foreground">
                              SubModules:
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                              {filteredModules?.map((module) => (
                                <div
                                  key={module.id}
                                  className="p-3 border rounded-md bg-muted/50"
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-medium text-sm">
                                      {module.name}
                                    </span>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          variant="ghost"
                                          className="h-6 w-6 p-0"
                                        >
                                          <MoreHorizontal className="h-3 w-3" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                          <Edit className="mr-2 h-3 w-3" />
                                          Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          className="text-red-600"
                                        >
                                          <Trash2 className="mr-2 h-3 w-3" />
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                  <p className="text-xs text-muted-foreground mb-2">
                                    {module.description}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {/* {subcollection.coursesCount} courses */}
                                    </Badge>
                                    <Badge
                                      variant={
                                        module.isActive
                                          ? "default"
                                          : "secondary"
                                      }
                                      className="text-xs"
                                    >
                                      {module.isActive ? "Active" : "Inactive"}
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="ml-6 text-sm text-muted-foreground">
                            No sub-modules yet. Click "Add Sub-Modules to create
                            one.
                          </div>
                        )}
                      </CollapsibleContent>
                    }
                  </Collapsible>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Add Subcollection Dialog */}
     

      {/* Edit Collection Dialog */}
      {/* {editingCollection && (
        <Dialog
          open={isEditCollectionOpen}
          onOpenChange={setIsEditCollectionOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Collection</DialogTitle>
              <DialogDescription>
                Update collection information
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-collection-name">Collection Name</Label>
                <Input
                  id="edit-collection-name"
                  value={editingCollection.name}
                  onChange={(e) =>
                    setEditingCollection({
                      ...editingCollection,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-collection-description">Description</Label>
                <Textarea
                  id="edit-collection-description"
                  value={editingCollection.description}
                  onChange={(e) =>
                    setEditingCollection({
                      ...editingCollection,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-collection-color">Color</Label>
                <Input
                  id="edit-collection-color"
                  type="color"
                  value={editingCollection.color}
                  onChange={(e) =>
                    setEditingCollection({
                      ...editingCollection,
                      color: e.target.value,
                    })
                  }
                  className="w-20 h-10"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditCollectionOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleEditCollection}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )} */}
    </div>
  );
}
