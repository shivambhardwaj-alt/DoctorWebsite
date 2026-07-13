import React from 'react'

const userCard = () => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    
 
    <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative">
      
  
      <button
        onClick={() => setSelectedUser(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
      >
        ✕
      </button>

      
      <h2 className="text-xl font-bold mb-4">User Details</h2>

      <div className="space-y-2 text-sm">
        <p><span className="font-semibold">Name:</span> {selectedUser.name}</p>
        <p><span className="font-semibold">Email:</span> {selectedUser.email}</p>
        <p><span className="font-semibold">Age:</span> {calculateAge(selectedUser.dob)}</p>
        <p><span className="font-semibold">Phone:</span> {selectedUser.phone}</p>
      </div>
    </div>
  </div>
  )
}

export default userCard