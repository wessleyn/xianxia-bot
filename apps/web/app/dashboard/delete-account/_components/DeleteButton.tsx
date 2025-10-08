'use client'

import { redirect } from 'next/navigation'
import { useEffect, useState } from "react"
import { toast as Toast } from 'react-hot-toast'
import deleteAccount from '../_action/deleteAccount'

const DeleteButton = () => {
    const [isDeleting, setIsDeleting] = useState(false)
    const [hasDeleted, setHasDeleted] = useState(false)
    const [hasError, setHasError] = useState(false)

    const handleDeleteAccount = async () => {
        setIsDeleting(true)
        try {
            const isDeleted = await deleteAccount()
            if (!isDeleted) {
                setHasError(true)
                setIsDeleting(false)
                return
            } else {
                setHasDeleted(true)
                setIsDeleting(false)
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error deleting account:", error)
            Toast.error(error.message || "An unexpected error occurred.")
        }
    }

    useEffect(() => {
        if (hasDeleted) {
            const timer = setTimeout(() => {
                redirect("/")
            }, 2000)

            return () => clearTimeout(timer)
        }
    }, [hasDeleted])

    return (
        <button
            className={`px-4 py-2
                 ${hasDeleted ?
                    'bg-green-600 hover:bg-green-400' : 'bg-red-600 hover:bg-red-400'
                } text-white rounded`}

            onClick={handleDeleteAccount}>
            {
                hasError ? "Failed to Delete Account" :
                    isDeleting ? 'Deleting...' :
                        hasDeleted ? 'Account Deleted' : 'Confirm Delete Account'
            }
        </button>
    )
}

export default DeleteButton