import { useState } from "react"
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [errorLog, setErrorLog] = useState(null)
    const [isLoadingLog, setIsLoadingLog] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoadingLog(true)
        setErrorLog(null)

        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoadingLog(false)
            setErrorLog(json.error)
        }
        if (response.ok) {
            //save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update the auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoadingLog(false)
        }
    }

    return { login, isLoadingLog, errorLog}
}