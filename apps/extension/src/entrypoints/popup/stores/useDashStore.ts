import sync from "@utils/sync";

const useDashSync = () => {
    const [isSyncing, setIsSyncing] = useState(false);

    const handleSync = useCallback(async () => {
        setIsSyncing(true)
        await sync('all')
        setIsSyncing(false)
    }, [])

    return { isSyncing, handleSync };
}

export default useDashSync