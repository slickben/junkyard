	// useRquest.js		
	
    export const option = async () => {
        const headers = useRequestHeaders(['cookie'])
        const { data: token } = await useFetch('/api/token', { headers })	
        let header =  {
            // 'X-Requested-With': 'XMLHttpRequest',
            // 'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Headers': 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization',
            'Access-Control-Request-Headers': 'Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization',
            'Access-Control-Allow-Methods': 'POST, PUT, PATCH, GET, DELETE, OPTIONS'
        }
        if(token.value?.accessToken) {
            header['Authorization'] = `Bearer ${token.value?.accessToken}` 
        }
        // console.log(token.value?.accessToken, headers)
        return  {
            baseURL: useBaseUrl(),
            mode: 'cors',
            headers: header,
            credentials: 'include',
        }
    }

    // export const post = async (url: string, body: object) => {
    //     return await useFetch(url, {
    //         method: 'post',
    //         baseURL: useBaseUrl(),
    //         mode: 'cors',
    //         body: JSON.stringify(body),
    //         headers: {
    //             'X-Requested-With': 'XMLHttpRequest',
    //             'Content-Type': 'application/json',
    //         },
    //         credentials: 'include',
    //     })
    // }