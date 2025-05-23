/***
 * This is the state manager for view that is rendered in the popup
 */
import { localTabView } from '@constants/storage'
import { PopView } from '@ctypes/index'
import { useEffect } from 'react'
import { create } from 'zustand'


interface ViewState {
    currentView: PopView
    setCurrentView: (view: PopView) => void
}

const useStore = create<ViewState>()(set => ({
    currentView: 'dashboard',
    setCurrentView: async (currentView) => {
        set({ currentView: currentView })
        await localTabView.setValue(currentView)
    }
}))


const useViewStore = () => {
    const { currentView, setCurrentView } = useStore()

    useEffect(() => {
        const init = async () => {
            const view = await localTabView.getValue()
            setCurrentView(view)
        }

        const unWatch = localTabView.watch((newView) => {
            setCurrentView(newView)
        })

        init()
        
        return () => {
            unWatch()
        }
    }, [])

    return {
        currentView,
        setCurrentView
    }
}

export default useViewStore