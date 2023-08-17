import React from 'react'
import Header from './Header'
import Footer from './Footer'

export default function Layout(props) {
    const { children } = props

    return (
        <div className='relative min-h-screen flex flex-col'>
            <Header />

            <div className='flex flex-col flex-1'>
                <main className=''>
                    {children}
                </main>
            </div>

            <Footer />
        </div>
    )
}
