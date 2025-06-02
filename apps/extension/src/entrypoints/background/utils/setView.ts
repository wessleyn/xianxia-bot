import { localTabView } from "@constants/storage"
import { PopView } from "@ctypes/index"

export default async function setView(newView: PopView) {
    const currentView = await localTabView.getValue()
    if (currentView !== newView) {
        await localTabView.setValue(newView)
        return newView
    } else {
        return currentView
    }
}