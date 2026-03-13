"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogFooter
} from "@/components/ui/dialog"
import axios from "axios"
import { API_BASE_URL } from "@/lib/endpoints"

export function DialogDemo() {
    const [codeData, setCodeData] = useState<{ code?: string } | null>(null)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const fetchAndShow = async () => {
            try {
                const { data } = await axios.get(`${API_BASE_URL}/code`)
                setCodeData(data)
                setIsOpen(true)
            } catch (err) {
                console.error("Failed to fetch codes:", err)
            }
        }

        fetchAndShow()
    }, [])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Daily Attendance Code</DialogTitle>
                    <DialogDescription>
                        This code has been generated for today.
                    </DialogDescription>
                </DialogHeader>

               <div className="flex flex-col items-center gap-2 py-6">
                    {codeData?.code ? (
                        <div className="bg-primary/10 border-2 border-primary/20 p-6 rounded-xl w-full text-center">
                            <span className="text-4xl font-mono font-black tracking-[0.2em] text-primary">
                                {codeData.code}
                            </span>
                        </div>
                    ) : (
                        <p>No code found for today.</p>
                    )}
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
