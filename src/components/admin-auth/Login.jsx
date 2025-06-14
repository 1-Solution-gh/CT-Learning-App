"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Shield, AlertCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { useAdminAuth } from "@/hooks/useAdminAuth"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

  const {mutate, isPending, error, isError} = useAdminAuth()

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onSubmit = async (data) => {
    mutate({email: data.email, password:data.password})
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4 ">
      <div className="w-full max-w-md">
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-full mb-2">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-sm text-slate-600 mt-1">Sign in to manage your platform</p>
        </div>

        <Card className="shadow-sm border-0">
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="text-lg font-semibold text-center">Welcome Back</CardTitle>
            <CardDescription className="text-sm text-center">Enter your credentials to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              {isError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-3 w-3" />
                  <AlertDescription className="text-xs">{error?.response?.data?.message || "Something went wrong"}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-1">
                <Label htmlFor="email" className="text-sm">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@ctedu.com"
                  className="h-9 text-sm"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="password" className="text-sm">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-9 pr-8 text-sm"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                      }
                    })}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-2 py-1 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-3 w-3 text-slate-500" />
                    ) : (
                      <Eye className="h-3 w-3 text-slate-500" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    className="h-3 w-3"
                    {...register("rememberMe")}
                  />
                  <Label htmlFor="rememberMe" className="text-xs font-normal">
                    Remember me
                  </Label>
                </div>
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full h-9 text-sm font-medium" disabled={isPending}>
                {isPending ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
          <div className="text-center pt-2 border-t">
              <p className="text-xs text-slate-500 mb-2">
                Need help? <button className="text-primary hover:underline">Contact Support</button>
              </p>
              <div className="flex justify-center items-center space-x-4 text-xs text-slate-400">
                <span>&copy; {new Date().getFullYear()} CT-Edu Hub</span>
                <button className="hover:text-slate-600">Privacy</button>
                <button className="hover:text-slate-600">Terms</button>
              </div>
            </div>
        </Card>

      
      </div>
    </div>
  )
}
