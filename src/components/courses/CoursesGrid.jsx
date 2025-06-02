export const CourseGrid = ({ courses , getApprovalStatusBadge,
    getStatusBadge,  handleViewCourseDetails,
    handleDeleteCourse,}) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <Card key={course.id} className="overflow-hidden">
          <div className="aspect-video bg-muted">
            <img
              src={course.thumbnail || "/placeholder.svg"}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleViewCourseDetails(course.id)}>
                    <Eye className="mr-2 h-4 w-4" />
                    Review Course
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
            </div>
            <CardDescription>by {course.instructor}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Badge variant="outline">{course.category}</Badge>
                {getApprovalStatusBadge(course.approvalStatus)}
              </div>
              <div className="flex justify-between items-center">
                {getStatusBadge(course.status)}
                <span className="font-semibold">{course.price > 0 ? `$${course.price}` : "Price not set"}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{course.enrollments} students</span>
                <span>{course.duration}</span>
              </div>
              {course.approvalStatus === "approved" && course.rating > 0 && (
                <div className="flex items-center">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1 text-sm">{course.rating}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )