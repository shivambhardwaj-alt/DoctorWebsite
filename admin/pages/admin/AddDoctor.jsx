import React, { useState } from 'react'
import axios from 'axios'
import { assets } from '../../src/assets/assets'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'

const AddDoctor = () => {


  const {backend_url,adminToken} = useContext(AdminContext);

  // ================= STATES =================
  const [image, setImage] = useState(null)  //done
  const [name, setName] = useState('') // done
  const [email, setEmail] = useState('') // done
  const [password, setPassword] = useState('') // done
  const [experience, setExperience] = useState('1 Year') // done degree is left
  const [fees, setFees] = useState('') // done
  const [speciality, setSpeciality] = useState('General Physician')  // donne
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [about, setAbout] = useState('')
  const [loading, setLoading] = useState(false)

  // ================= IMAGE HANDLER =================
  const imageHandler = (e) => {
    setImage(e.target.files[0])
  }

  // ================= SUBMIT HANDLER =================
  const onSubmitHandler = async (e) => {
  e.preventDefault()

  if (!image) {
    toast.error('Please upload doctor image')
    return
  }

  try {
    setLoading(true)

    const formData = new FormData()
    formData.append('image', image)
    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('experience', experience)
    formData.append('fees', fees)
    formData.append('speciality', speciality)
    formData.append('degree', degree)
    formData.append(
      'address',
      JSON.stringify({ line1: address1, line2: address2 })
    )
    formData.append('about', about)

    const { data } = await axios.post(
      backend_url + '/api/admin/add-doctor',
      formData,
      {
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      }
    )

    if (data.success) {
      toast.success('Doctor added successfully')

      setImage(null)
      setName('')
      setEmail('')
      setPassword('')
      setExperience('1 Year')
      setFees('')
      setSpeciality('General Physician')
      setDegree('')
      setAddress1('')
      setAddress2('')
      setAbout('')
    } else {
      toast.error(data.message || 'Failed to add doctor')
    }

  } catch (error) {
    console.log(error)
    toast.error('Server error while adding doctor')
  } finally {
    setLoading(false)
  }
}
 

  // ================= JSX =================
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl border border-emerald-100">
      <form onSubmit={onSubmitHandler} className="space-y-8">

        <div className="text-center">
          <h2 className="text-3xl font-bold text-emerald-700 mb-2">Add New Doctor</h2>
          <p className="text-emerald-600">Fill all fields to add a new doctor</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Image Upload */}
          <div className="text-center">
            <label htmlFor="image" className="block cursor-pointer">
              <div className="w-48 h-48 mx-auto rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 p-8 flex flex-col items-center justify-center border-2 border-dashed border-emerald-200 hover:border-emerald-400 transition-all">
                <img
                  src={image ? URL.createObjectURL(image) : assets.upload_area}
                  alt="Upload"
                  className="w-20 h-20 mb-3"
                />
                <p className="text-sm font-medium text-emerald-700">
                  Click to upload
                </p>
              </div>
            </label>
            <input type="file" id="image" hidden accept="image/*" onChange={imageHandler} />
          </div>

          {/* Inputs */}
          <div className="space-y-6">

            <input
              type="text"
              placeholder="Doctor Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-4 border rounded-xl"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 border rounded-xl"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-4 border rounded-xl"
            />

            <select value={experience} onChange={(e) => setExperience(e.target.value)} className="w-full p-4 border rounded-xl">
              <option>1 Year</option>
              <option>2 Years</option>
              <option>3 Years</option>
              <option>4 Years</option>
              <option>5+ Years</option>
            </select>

            <input
              type="number"
              placeholder="Fees"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              required
              className="w-full p-4 border rounded-xl"
            />

            <select value={speciality} onChange={(e) => setSpeciality(e.target.value)} className="w-full p-4 border rounded-xl">
              <option>General Physician</option>
              <option>Dermatologist</option>
              <option>Gynecologist</option>
              <option>Neurologist</option>
              <option>Pediatricians</option>
              <option>Gastroenterologist</option>
            </select>

            <input
              type="text"
              placeholder="Education"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              required
              className="w-full p-4 border rounded-xl"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Address Line 1"
            value={address1}
            onChange={(e) => setAddress1(e.target.value)}
            required
            className="w-full p-4 border rounded-xl"
          />

          <input
            type="text"
            placeholder="Address Line 2"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            required
            className="w-full p-4 border rounded-xl"
          />
        </div>

        <textarea
          rows={4}
          placeholder="About Doctor"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          required
          className="w-full p-4 border rounded-xl"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition"
        >
          {loading ? 'Adding Doctor...' : 'Add Doctor'}
        </button>

      </form>
    </div>
  )
}

export default AddDoctor
