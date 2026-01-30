import React from 'react'

const   Body = ({children}) => {
    return (
        <div className='min-h-screen bg-gray-100 p-6'>       
            {children}
        </div>
    )
}

export default Body