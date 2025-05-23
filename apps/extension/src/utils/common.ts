// create a util delay that takes sec
export async function delay(sec:number) {
    return new Promise((resolve) => setTimeout(resolve, sec * 1000));
}