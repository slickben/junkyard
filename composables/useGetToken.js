	// useRquest.js		
	
    export const useGetToken = async () => {
        const headers = useRequestHeaders(['cookie'])
        const { data: token } = await useFetch('/api/token', { headers })	

        if(token.value?.accessToken) {
            return token.value?.accessToken
        }
        else {
            return null
        }
    }