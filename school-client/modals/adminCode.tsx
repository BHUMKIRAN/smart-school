"use client"
import { useState, useEffect } from "react"
import { X, Fingerprint, Copy, CheckCircle2, Clock } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog"
import { api } from "@/Backend/axiosClientInstance"

export function DialogDemo() {
    const [codeData, setCodeData] = useState<{ code?: string } | null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        const fetchAndShow = async () => {
            try {
                const { data } = await api.get(`/attendanceCode/code`)
                setCodeData(data?.data ?? null)
                setIsOpen(true)
            } catch (err) {
                console.error("Failed to fetch codes:", err)
            }
        }
        fetchAndShow()
    }, [])

    const handleCopy = () => {
        if (codeData?.code) {
            navigator.clipboard.writeText(codeData.code)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="dash-card p-0 overflow-hidden border-[var(--dash-border)] sm:max-w-sm shadow-2xl animate-modalSlideIn">
                
                {/* HEADER WITH GRADIENT */}
                <div className="hero-gradient p-6 text-white relative">
                 
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-md">
                            <Fingerprint className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl font-bold text-white nepali-text leading-tight">
                                दैनिक हाजिरी कोड
                            </DialogTitle>
                            <div className="flex items-center gap-2 text-xs text-white/80 mt-1">
                                <Clock className="w-3 h-3" />
                                <span>आजको लागि मात्र मान्य</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CONTENT AREA */}
                <div className="p-8 flex flex-col items-center">
                    {codeData?.code ? (
                        <>
                            <p className="text-sm font-medium text-[var(--dash-text-muted)] mb-6 text-center leading-relaxed">
                                Share this code with students to <br /> verify their presence for today.
                            </p>
                            
                            <div 
                                onClick={handleCopy}
                                className="group relative bg-[var(--dash-surface-2)] border-2 border-dashed border-[var(--dash-border)] p-8 rounded-2xl w-full text-center cursor-pointer hover:border-[var(--primary)] transition-all"
                            >
                                <span className="text-5xl font-mono font-black tracking-[0.25em] text-[var(--primary)] group-hover:scale-110 transition-transform inline-block">
                                    {codeData.code}
                                </span>
                                
                                <div className="absolute top-2 right-2 p-1.5 text-[var(--dash-text-muted)] group-hover:text-[var(--primary)] transition-colors">
                                    {copied ? <CheckCircle2 className="w-4 h-4 text-[var(--success)]" /> : <Copy className="w-4 h-4" />}
                                </div>
                            </div>

                            <p className={`mt-4 text-xs font-bold uppercase tracking-widest ${copied ? "text-[var(--success)]" : "text-[var(--dash-text-muted)]"} transition-colors`}>
                                {copied ? "Copied to clipboard!" : "Click code to copy"}
                            </p>
                        </>
                    ) : (
                        <div className="py-10 text-center">
                            <div className="w-12 h-12 bg-[var(--muted-bg)] rounded-full flex items-center justify-center mx-auto mb-4">
                                <X className="w-6 h-6 text-[var(--error)]" />
                            </div>
                            <p className="text-[var(--dash-text-muted)] font-medium nepali-text">
                                आजको कोड भेटिएन ।
                            </p>
                        </div>
                    )}
                </div>

                {/* FOOTER */}
                <div className="p-6 bg-[var(--dash-surface-2)] border-t border-[var(--dash-border)]">
                    <DialogClose asChild>
                        <button className="btn-primary w-full py-3.5 rounded-xl font-bold shadow-lg shadow-blue-500/20 nepali-text">
                            बन्द गर्नुहोस्
                        </button>
                    </DialogClose>
                </div>

            </DialogContent>
        </Dialog>
    )
}