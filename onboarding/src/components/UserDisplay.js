import React from 'react'

const UserDisplay = ({ user }) => {
    return (
        <div className='user-card'>
            <h3 className='user-name'>{user.name}</h3>
            <div className='user-content'>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
                <p>Birthday: {user.birth==='' ? 'N/A' : user.birth}</p>
                <p>Phone Number: {user.phone==='' ? 'N/A' : user.phone}</p>
                <p>SSN: {user.ssn==='' ? 'N/A' : user.ssn}</p>
            </div>
        </div>
    )
}

export default UserDisplay