'use client'
import { signInWithGoogle, signInWithSlack } from "@repo/auth";
import { useEffect } from "react";
import { useAuthModalStore } from "../../../_store/useAuthModalStore";

const HandleExtensionAuth = ({ provider }: { provider: string }) => {
  const { setIsFromExtension } = useAuthModalStore();

  // Set isFromExtension immediately to avoid race conditions
  useEffect(() => {
    // Set the flag immediately, outside of any async function
    setIsFromExtension(true);

    async function main() {
      switch (provider) {
        case 'google': {
          const data = await signInWithGoogle(true);
          if (data) console.error(data.error);
          break;
        }
        case 'slack': {
          try {
            const data = await signInWithSlack(true);
            if (data) console.error(data.error);
          } catch (err) {
            console.error('Slack auth not implemented', err);
          }
          break;
        }
        default:
          console.error('No provider specified');
          break;
      }
    }

    main();

    // Clean up when component unmounts
    return () => {
      // Keep the extension flag set, it will be reset elsewhere if needed
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}

export default HandleExtensionAuth