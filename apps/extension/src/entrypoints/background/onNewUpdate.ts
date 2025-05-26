export default async function onNewUpdate(details: Browser.runtime.UpdateAvailableDetails) {
    console.info('A new version is available', details);

}