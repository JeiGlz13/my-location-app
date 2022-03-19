export const getUserLocation = async (): Promise<[number, number]> =>{
    return new Promise((resolve)=>{
        navigator.geolocation.getCurrentPosition(
            ({coords})=>{
                resolve([coords.longitude, coords.latitude])
            },
            () =>{
                resolve([-86.266333, 12.129080])
            }
        )
    });
}