"use client"
import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Video, Mic, MessageSquare, PhoneOff } from "lucide-react"

export default function Page({ params }: any) {
  const [callDuration, setCallDuration] = useState(0)

  useEffect(() => {
    // Start the timer when the component mounts
    const timer = setInterval(() => {
      setCallDuration((prevDuration) => prevDuration + 1)
    }, 1000)

    // Cleanup the timer when the component unmounts
    return () => clearInterval(timer)
  }, [])

  const handleEndCall = () => {
    window.location.assign(`/review/${params.id}`)
  }

  // Format the call duration as mm:ss
  const formatCallDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60).toString().padStart(2, '0')
    const seconds = (duration % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-primaryGreen">
      <Card className="w-full max-w-sm bg-secondaryGreen text-white">
        <CardHeader className="flex justify-between items-center p-4">
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <span>{params.id}</span>
          </div>
          <Button variant="ghost" size="icon" className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            <span className="sr-only">Menu</span>
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6 p-6">
          <Avatar className="w-40 h-40">
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-2xl font-bold">Username</h2>
            <p className="text-sm text-gray-400">{formatCallDuration(callDuration)}</p>
          </div>
          <div className="flex justify-center space-x-4">
            <Button size="icon" variant="secondary" className="rounded-full w-12 h-12">
              <Video className="h-6 w-6" />
              <span className="sr-only">Toggle video</span>
            </Button>
            <Button size="icon" variant="secondary" className="rounded-full w-12 h-12">
              <Mic className="h-6 w-6" />
              <span className="sr-only">Toggle microphone</span>
            </Button>
            <Button size="icon" variant="secondary" className="rounded-full w-12 h-12">
              <MessageSquare className="h-6 w-6" />
              <span className="sr-only">Open chat</span>
            </Button>
            <Button size="icon" variant="destructive" className="rounded-full w-12 h-12 bg-red-500 hover:bg-red-600" onClick={handleEndCall}>
              <PhoneOff className="h-6 w-6" />
              <span className="sr-only">End call</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
