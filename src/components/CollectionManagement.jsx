"use client"

import { useState } from "react"
// import PropTypes from 'prop-types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
} from "lucide-react"

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
      { id: 1, name: "React", description: "React.js framework courses", coursesCount: 15, isActive: true },
      { id: 2, name: "Vue.js", description: "Vue.js framework courses", coursesCount: 8, isActive: true },
      { id: 3, name: "Node.js", description: "Backend development with Node.js", coursesCount: 12, isActive: true },
      { id: 4, name: "HTML/CSS", description: "Fundamentals of web design", coursesCount: 10, isActive: true },
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
      { id: 5, name: "Photoshop", description: "Adobe Photoshop tutorials", coursesCount: 12, isActive: true },
      { id: 6, name: "Figma", description: "UI/UX design with Figma", coursesCount: 8, isActive: true },
      { id: 7, name: "Illustrator", description: "Vector graphics design", coursesCount: 7, isActive: true },
      { id: 8, name: "Sketch", description: "Interface design with Sketch", coursesCount: 5, isActive: false },
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
      { id: 9, name: "Python", description: "Python for data science", coursesCount: 15, isActive: true },
      { id: 10, name: "Machine Learning", description: "ML algorithms and models", coursesCount: 8, isActive: true },
      { id: 11, name: "Data Visualization", description: "Charts and graphs", coursesCount: 5, isActive: true },
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
      { id: 12, name: "Marketing", description: "Digital marketing strategies", coursesCount: 10, isActive: true },
      { id: 13, name: "Finance", description: "Business finance and accounting", coursesCount: 7, isActive: true },
      { id: 14, name: "Leadership", description: "Management and leadership", coursesCount: 5, isActive: true },
    ],
  },
]

export function CollectionManagement() {
  const [collections, setCollections] = useState(collectionsData)
  const [isAddCollectionOpen, setIsAddCollectionOpen] = useState(false)
  const [isEditCollectionOpen, setIsEditCollectionOpen] = useState(false)
  const [isAddSubcollectionOpen, setIsAddSubcollectionOpen] = useState(false)
  const [editingCollection, setEditingCollection] = useState(null)
  const [selectedCollectionId, setSelectedCollectionId] = useState(null)
  const [expandedCollections, setExpandedCollections] = useState([1, 2])

  const [newCollection, setNewCollection] = useState({
    name: "",
    description: "",
    color: "#3b82f6",
  })

  const [newSubcollection, setNewSubcollection] = useState({
    name: "",
    description: "",
  })

  const toggleCollectionExpanded = (collectionId) => {
    setExpandedCollections((prev) =>
      prev.includes(collectionId) ? prev.filter((id) => id !== collectionId) : [...prev, collectionId],
    )
  }

  const handleAddCollection = () => {
    if (newCollection.name.trim()) {
      const collection = {
        id: Math.max(...collections.map((c) => c.id)) + 1,
        name: newCollection.name,
        description: newCollection.description,
        coursesCount: 0,
        color: newCollection.color,
        subcollections: [],
        isActive: true,
        createdDate: new Date().toISOString().split("T")[0],
      }
      setCollections([...collections, collection])
      setNewCollection({ name: "", description: "", color: "#3b82f6" })
      setIsAddCollectionOpen(false)
    }
  }

  const handleEditCollection = () => {
    if (editingCollection) {
      setCollections(collections.map((col) => (col.id === editingCollection.id ? editingCollection : col)))
      setIsEditCollectionOpen(false)
      setEditingCollection(null)
    }
  }

  const handleDeleteCollection = (collectionId) => {
    setCollections(collections.filter((col) => col.id !== collectionId))
  }

  const handleToggleCollectionStatus = (collectionId) => {
    setCollections(collections.map((col) => (col.id === collectionId ? { ...col, isActive: !col.isActive } : col)))
  }

  const handleAddSubcollection = () => {
    if (newSubcollection.name.trim() && selectedCollectionId) {
      const subcollection = {
        id: Math.max(...collections.flatMap((c) => c.subcollections.map((s) => s.id))) + 1,
        name: newSubcollection.name,
        description: newSubcollection.description,
        coursesCount: 0,
        isActive: true,
      }

      setCollections(
        collections.map((col) =>
          col.id === selectedCollectionId ? { ...col, subcollections: [...col.subcollections, subcollection] } : col,
        ),
      )

      setNewSubcollection({ name: "", description: "" })
      setIsAddSubcollectionOpen(false)
      setSelectedCollectionId(null)
    }
  }

  const handleDeleteSubcollection = (collectionId, subcollectionId) => {
    setCollections(
      collections.map((col) =>
        col.id === collectionId
          ? { ...col, subcollections: col.subcollections.filter((sub) => sub.id !== subcollectionId) }
          : col,
      ),
    )
  }

  const totalCollections = collections.length
  const totalSubcollections = collections.reduce((sum, col) => sum + col.subcollections.length, 0)
  const totalCourses = collections.reduce((sum, col) => sum + col.coursesCount, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Collection Management</h1>
        <p className="text-muted-foreground">
          Organize courses into collections and subcollections for better navigation
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
            <div className="text-2xl font-bold">{totalCollections}</div>
            <p className="text-xs text-muted-foreground">{collections.filter((c) => c.isActive).length} active</p>
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
            <div className="text-2xl font-bold">{totalCourses}</div>
            <p className="text-xs text-muted-foreground">In all Modules</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Largest Modules</CardTitle>
            <Archive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                collections.reduce((max, col) => (col.coursesCount > max.coursesCount ? col : max), collections[0])
                  ?.name
              }
            </div>
            <p className="text-xs text-muted-foreground">
              {
                collections.reduce((max, col) => (col.coursesCount > max.coursesCount ? col : max), collections[0])
                  ?.coursesCount
              }{" "}
              courses
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
              <CardDescription>Manage course collections and their subcategories</CardDescription>
            </div>
            <Dialog open={isAddCollectionOpen} onOpenChange={setIsAddCollectionOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Module
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Module</DialogTitle>
                  <DialogDescription>Create a new course Module</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="collection-name">Module Name</Label>
                    <Input
                      id="collection-name"
                      value={newCollection.name}
                      onChange={(e) => setNewCollection({ ...newCollection, name: e.target.value })}
                      placeholder="Enter module name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="collection-description">Description</Label>
                    <Textarea
                      id="collection-description"
                      value={newCollection.description}
                      onChange={(e) => setNewCollection({ ...newCollection, description: e.target.value })}
                      placeholder="Enter collection description"
                    />
                  </div>
                  <div>
                    <Label htmlFor="collection-color">Color</Label>
                    <Input
                      id="collection-color"
                      type="color"
                      value={newCollection.color}
                      onChange={(e) => setNewCollection({ ...newCollection, color: e.target.value })}
                      className="w-20 h-10"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddCollectionOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddCollection}>Add Module</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {collections.map((collection) => (
              <div key={collection.id} className="border rounded-lg p-4">
                <Collapsible
                  open={expandedCollections.includes(collection.id)}
                  onOpenChange={() => toggleCollectionExpanded(collection.id)}
                >
                  <div className="flex items-center justify-between">
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="flex items-center gap-2 p-0 h-auto">
                        {expandedCollections.includes(collection.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: collection.color }} />
                        <span className="font-medium text-lg">{collection.name}</span>
                        <Badge variant="secondary">{collection.coursesCount} courses</Badge>
                        <Badge variant={collection.isActive ? "default" : "secondary"}>
                          {collection.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </Button>
                    </CollapsibleTrigger>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedCollectionId(collection.id)
                          setIsAddSubcollectionOpen(true)
                        }}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Sub-Module
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setEditingCollection(collection)
                              setIsEditCollectionOpen(true)
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Module
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleCollectionStatus(collection.id)}>
                            {collection.isActive ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteCollection(collection.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Module
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-2 ml-6">{collection.description}</p>

                  <CollapsibleContent className="mt-4">
                    {collection.subcollections.length > 0 ? (
                      <div className="ml-6 space-y-2">
                        <h4 className="font-medium text-sm text-muted-foreground">SubModules:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {collection.subcollections.map((subcollection) => (
                            <div key={subcollection.id} className="p-3 border rounded-md bg-muted/50">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-sm">{subcollection.name}</span>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-6 w-6 p-0">
                                      <MoreHorizontal className="h-3 w-3" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                      <Edit className="mr-2 h-3 w-3" />
                                      Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => handleDeleteSubcollection(collection.id, subcollection.id)}
                                      className="text-red-600"
                                    >
                                      <Trash2 className="mr-2 h-3 w-3" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">{subcollection.description}</p>
                              <div className="flex items-center justify-between">
                                <Badge variant="outline" className="text-xs">
                                  {subcollection.coursesCount} courses
                                </Badge>
                                <Badge variant={subcollection.isActive ? "default" : "secondary"} className="text-xs">
                                  {subcollection.isActive ? "Active" : "Inactive"}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="ml-6 text-sm text-muted-foreground">
                        No sub-modules yet. Click "Add Sub-Modules to create one.
                      </div>
                    )}
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Subcollection Dialog */}
      <Dialog open={isAddSubcollectionOpen} onOpenChange={setIsAddSubcollectionOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Subcollection</DialogTitle>
            <DialogDescription>
              Add a subcollection to {collections.find((c) => c.id === selectedCollectionId)?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="subcollection-name">Subcollection Name</Label>
              <Input
                id="subcollection-name"
                value={newSubcollection.name}
                onChange={(e) => setNewSubcollection({ ...newSubcollection, name: e.target.value })}
                placeholder="Enter subcollection name"
              />
            </div>
            <div>
              <Label htmlFor="subcollection-description">Description</Label>
              <Textarea
                id="subcollection-description"
                value={newSubcollection.description}
                onChange={(e) => setNewSubcollection({ ...newSubcollection, description: e.target.value })}
                placeholder="Enter subcollection description"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddSubcollectionOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSubcollection}>Add Subcollection</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Collection Dialog */}
      {editingCollection && (
        <Dialog open={isEditCollectionOpen} onOpenChange={setIsEditCollectionOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Collection</DialogTitle>
              <DialogDescription>Update collection information</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-collection-name">Collection Name</Label>
                <Input
                  id="edit-collection-name"
                  value={editingCollection.name}
                  onChange={(e) => setEditingCollection({ ...editingCollection, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-collection-description">Description</Label>
                <Textarea
                  id="edit-collection-description"
                  value={editingCollection.description}
                  onChange={(e) => setEditingCollection({ ...editingCollection, description: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-collection-color">Color</Label>
                <Input
                  id="edit-collection-color"
                  type="color"
                  value={editingCollection.color}
                  onChange={(e) => setEditingCollection({ ...editingCollection, color: e.target.value })}
                  className="w-20 h-10"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditCollectionOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditCollection}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}