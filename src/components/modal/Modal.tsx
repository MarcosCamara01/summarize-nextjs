'use client'

import { useCallback, useRef, useEffect, MouseEventHandler } from 'react'
import { useRouter } from 'next/navigation'

export default function Modal({ children }: { children: React.ReactNode }) {
    const overlay = useRef(null)
    const wrapper = useRef(null)
    const router = useRouter()

    const onDismiss = useCallback(() => {
        router.back()
    }, [router])

    const onClick: MouseEventHandler = useCallback(
        (e) => {
            if (e.target === overlay.current || e.target === wrapper.current) {
                if (onDismiss) onDismiss()
            }
        },
        [onDismiss, overlay, wrapper]
    )

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') onDismiss()
        },
        [onDismiss]
    )

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown)

        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKeyDown)

            document.body.style.overflow = 'auto';
        }
    }, [onKeyDown]);

    return (
        <div
            ref={overlay}
            className="fixed z-50 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60 flex items-center justify-center"
            onClick={onClick}
        >
            <div
                ref={wrapper}
                className="w-full sm:w-10/12 md:w-8/12 lg:w-1/2 p-6 mt-16 sm:mt-0"
            >
                {children}
            </div>
        </div>
    )
}