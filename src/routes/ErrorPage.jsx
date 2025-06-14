"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HomeIcon } from "lucide-react"
import { Link } from "react-router-dom"

export default function Animated404() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-lg text-center space-y-6 px-4">
        <h1 className="text-6xl font-bold text-black">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="inline-flex items-center gap-2 text-base px-6 py-3 bg-black text-white rounded-lg transition-colors">
            <HomeIcon className="w-5 h-5" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
