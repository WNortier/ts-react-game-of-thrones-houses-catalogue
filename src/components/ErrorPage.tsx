import React, { useEffect } from 'react'
import { redirect } from 'react-router-dom'

export default function ErrorPage() {


    useEffect(() => {
        // setTimeout(() => {
        // }, 1000)
        redirect('/login')
    }, [])
    return (
        <div style={{ marginTop: '5rem' }}>Error 404</div>
    )
}
