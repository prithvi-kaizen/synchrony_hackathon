"use client"

import { useState } from 'react'
import { Camera, Send, Loader2, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { GoogleGenAI } from '@google/genai'
import { createClient } from '@/lib/supabase/client'
import { MoodAnalysisResult } from '@/lib/types/database'
import { moodService } from '@/lib/services/mood'

type CaptureState = 'idle' | 'capturing' | 'captured' | 'analyzing' | 'complete'

export default function CaptureMood() {
    const [isOpen, setIsOpen] = useState(false)
    const [captureState, setCaptureState] = useState<CaptureState>('idle')
    const [capturedImage, setCapturedImage] = useState<string | null>(null)
    const [moodAnalysis, setMoodAnalysis] = useState<MoodAnalysisResult | null>(null)
    const [isSaving, setIsSaving] = useState(false)
    const [savedSuccessfully, setSavedSuccessfully] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const supabase = createClient()

    const capturePhoto = async () => {
        setCaptureState('capturing')
        setError(null)

        try {
            // Get camera stream for single photo capture
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user' },
                audio: false
            })

            // Create video element just for capture
            const video = document.createElement('video')
            video.srcObject = stream
            video.autoplay = true
            video.playsInline = true

            // Wait for video to be ready
            await new Promise((resolve, reject) => {
                video.onloadedmetadata = resolve
                video.onerror = reject
                setTimeout(reject, 5000) // 5 second timeout
            })

            // Create canvas for capture
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')

            if (!ctx) {
                throw new Error('Canvas not supported')
            }

            // Set canvas size and capture frame
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            ctx.drawImage(video, 0, 0)

            // Stop the stream immediately
            stream.getTracks().forEach(track => track.stop())

            // Convert to base64
            const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9)

            if (imageDataUrl.length < 1000) {
                throw new Error('Failed to capture image')
            }

            setCapturedImage(imageDataUrl)
            setCaptureState('captured')

        } catch (err) {
            console.error('Capture error:', err)
            setError('Failed to capture photo. Please allow camera access and try again.')
            setCaptureState('idle')
        }
    }

    const analyzeMood = async () => {
        if (!capturedImage) return

        setCaptureState('analyzing')
        setError(null)

        try {
            const ai = new GoogleGenAI({
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''
            })

            const base64Data = capturedImage.split(',')[1]

            const result = await ai.models.generateContent({
                model: "gemini-1.5-flash",
                contents: [
                    `Analyze this person's mood and emotional state from their facial expression. 
          Return ONLY a valid JSON object in this exact format:
          {
            "mood_score": <number 1-10>,
            "predicted_mood": "<primary emotion>",
            "confidence_level": <number 0-1>,
            "secondary_emotions": ["<emotion1>", "<emotion2>"],
            "mood_description": "<detailed description>",
            "improvement_suggestions": ["<suggestion1>", "<suggestion2>"]
          }`,
                    {
                        inlineData: {
                            mimeType: "image/jpeg",
                            data: base64Data
                        }
                    }
                ],
                config: {
                    temperature: 0.2,
                }
            })

            const responseText = result.text?.trim() || ''

            // Extract JSON from response
            const jsonMatch = responseText.match(/\{[\s\S]*\}/)
            if (!jsonMatch) {
                throw new Error('No valid JSON found in AI response')
            }

            const analysisResult = JSON.parse(jsonMatch[0]) as MoodAnalysisResult

            // Validate required fields
            if (!analysisResult.mood_score || !analysisResult.predicted_mood) {
                throw new Error('Invalid analysis result')
            }

            setMoodAnalysis(analysisResult)
            setCaptureState('complete')

        } catch (err) {
            console.error('Analysis error:', err)
            setError(err instanceof Error ? err.message : 'Failed to analyze mood')

            // Fallback analysis
            setMoodAnalysis({
                mood_score: 5,
                predicted_mood: "neutral",
                confidence_level: 0.5,
                mood_description: "Unable to analyze mood from this image. Please try taking another photo with better lighting.",
                secondary_emotions: [],
                improvement_suggestions: ["Try taking a photo in better lighting", "Make sure your face is clearly visible"]
            })
            setCaptureState('complete')
        }
    }

    const saveMoodCheckin = async () => {
        if (!moodAnalysis || !capturedImage) return

        setIsSaving(true)
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                setError('Please log in to save your mood check-in')
                return
            }
            const savedCheckin = await moodService.saveMoodCheckin(user.id, moodAnalysis)

            if (savedCheckin) {
                setSavedSuccessfully(true)
            } else {
                setError('Failed to save mood check-in')
            }
        } catch (err) {
            console.error('Save error:', err)
            setError(err instanceof Error ? err.message : 'Failed to save mood check-in')
        } finally {
            setIsSaving(false)
        }
    }

    const resetCapture = () => {
        setCapturedImage(null)
        setMoodAnalysis(null)
        setCaptureState('idle')
        setSavedSuccessfully(false)
        setError(null)
    }

    const handleClose = () => {
        setIsOpen(false)
        resetCapture()
    }

    const renderContent = () => {
        if (error) {
            return (
                <Card className="border-red-200">
                    <CardContent className="text-center py-6">
                        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                        <h3 className="font-semibold text-red-700 mb-2">Error</h3>
                        <p className="text-sm text-red-600 mb-4">{error}</p>
                        <Button onClick={resetCapture} variant="outline" size="sm">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Try Again
                        </Button>
                    </CardContent>
                </Card>
            )
        }

        switch (captureState) {
            case 'idle':
                return (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center">Capture Your Mood</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-muted-foreground mb-4">
                                Take a quick photo for AI mood analysis
                            </p>
                            <Button onClick={capturePhoto} variant="default" size="lg">
                                <Camera className="mr-2 h-4 w-4" />
                                Take Photo
                            </Button>
                        </CardContent>
                    </Card>
                )

            case 'capturing':
                return (
                    <Card>
                        <CardContent className="text-center py-8">
                            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
                            <h3 className="font-semibold mb-2">Taking Photo...</h3>
                            <p className="text-sm text-muted-foreground">
                                Please allow camera access
                            </p>
                        </CardContent>
                    </Card>
                )

            case 'captured':
                return (
                    <div className="space-y-4">
                        <div className="relative">
                            <img
                                src={capturedImage!}
                                alt="Captured mood"
                                className="w-full h-64 object-cover rounded-lg"
                            />
                        </div>
                        <div className="flex gap-2 justify-center">
                            <Button onClick={analyzeMood} size="lg">
                                <Send className="mr-2 h-4 w-4" />
                                Analyze Mood
                            </Button>
                            <Button onClick={resetCapture} variant="outline">
                                <Camera className="mr-2 h-4 w-4" />
                                Retake Photo
                            </Button>
                        </div>
                    </div>
                )

            case 'analyzing':
                return (
                    <div className="space-y-4">
                        <div className="relative">
                            <img
                                src={capturedImage!}
                                alt="Captured mood"
                                className="w-full h-64 object-cover rounded-lg"
                            />
                        </div>
                        <Card>
                            <CardContent className="text-center py-6">
                                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                                <h3 className="font-semibold mb-2">Analyzing Your Mood...</h3>
                                <p className="text-sm text-muted-foreground">
                                    AI is processing your facial expression
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                )

            case 'complete':
                return (
                    <div className="space-y-4">
                        <div className="relative">
                            <img
                                src={capturedImage!}
                                alt="Captured mood"
                                className="w-full h-64 object-cover rounded-lg"
                            />
                        </div>

                        {moodAnalysis && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-center flex items-center justify-center gap-2">
                                        {savedSuccessfully ? (
                                            <>
                                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                                Mood Analysis Saved
                                            </>
                                        ) : (
                                            'Mood Analysis Results'
                                        )}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {/* Mood Score */}
                                        <div className="text-center">
                                            <div className="text-3xl font-bold text-primary mb-2">
                                                {moodAnalysis.mood_score}/10
                                            </div>
                                            <div className="text-sm text-muted-foreground">Mood Score</div>
                                        </div>

                                        {/* Primary Mood */}
                                        <div className="text-center">
                                            <div className="text-xl font-semibold capitalize text-primary mb-1">
                                                {moodAnalysis.predicted_mood}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Confidence: {Math.round(moodAnalysis.confidence_level * 100)}%
                                            </div>
                                        </div>

                                        {/* Secondary Emotions */}
                                        {moodAnalysis.secondary_emotions && moodAnalysis.secondary_emotions.length > 0 && (
                                            <div>
                                                <h4 className="font-semibold mb-2">Secondary Emotions:</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {moodAnalysis.secondary_emotions.map((emotion, index) => (
                                                        <span key={index} className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs">
                                                            {emotion}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Description */}
                                        <div>
                                            <h4 className="font-semibold mb-2">Analysis:</h4>
                                            <p className="text-sm leading-relaxed text-muted-foreground">
                                                {moodAnalysis.mood_description}
                                            </p>
                                        </div>

                                        {/* Suggestions */}
                                        {moodAnalysis.improvement_suggestions && moodAnalysis.improvement_suggestions.length > 0 && (
                                            <div>
                                                <h4 className="font-semibold mb-2">Suggestions:</h4>
                                                <ul className="list-disc list-inside space-y-1">
                                                    {moodAnalysis.improvement_suggestions.map((suggestion, index) => (
                                                        <li key={index} className="text-sm text-muted-foreground">
                                                            {suggestion}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-2 justify-center mt-6">
                                        {!savedSuccessfully && (
                                            <Button
                                                onClick={saveMoodCheckin}
                                                disabled={isSaving}
                                                variant="default"
                                            >
                                                {isSaving ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Saving...
                                                    </>
                                                ) : (
                                                    'Save Check-in'
                                                )}
                                            </Button>
                                        )}
                                        <Button onClick={resetCapture} variant="outline">
                                            <Camera className="mr-2 h-4 w-4" />
                                            Take Another Photo
                                        </Button>
                                        <Button onClick={handleClose}>
                                            Done
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )

            default:
                return null
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="default"
                    size="lg"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                    <Camera className="mr-2 h-5 w-5" />
                    Capture Your Mood
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Camera className="h-5 w-5" />
                        Mood Capture & Analysis
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {renderContent()}
                </div>
            </DialogContent>
        </Dialog>
    )
}