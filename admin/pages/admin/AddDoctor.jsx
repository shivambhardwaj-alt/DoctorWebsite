import React, { useState, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../../src/assets/assets'
import { AdminContext } from '../../context/AdminContext'

const SPECIALITIES = [
  'General Physician',
  'Dermatologist',
  'Gynecologist',
  'Neurologist',
  'Pediatricians',
  'Gastroenterologist',
]

const EXPERIENCE_OPTIONS = ['1 Year', '2 Years', '3 Years', '4 Years', '5+ Years']

const initialForm = {
  name: '',
  email: '',
  password: '',
  fees: '',
  experience: '1 Year',
  speciality: 'General Physician',
  degree: '',
  address1: '',
  address2: '',
  about: '',
}

// Small reusable field wrapper so every input gets a consistent label + spacing
const Field = ({ label, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
    {children}
  </div>
)

const AddDoctor = () => {
  const { backend_url, adminToken } = useContext(AdminContext)

  const [image, setImage] = useState(null)
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)

  const inputClass =
    'w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'

  const updateField = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleImageChange = (e) => {
    if (e.target.files[0]) setImage(e.target.files[0])
  }

  const resetForm = () => {
    setImage(null)
    setForm(initialForm)
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!image) {
      toast.error('Please upload a doctor photo')
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('image', image)
      formData.append('name', form.name)
      formData.append('email', form.email)
      formData.append('password', form.password)
      formData.append('experience', form.experience)
      formData.append('fees', form.fees)
      formData.append('speciality', form.speciality)
      formData.append('degree', form.degree)
      formData.append('address', JSON.stringify({ line1: form.address1, line2: form.address2 }))
      formData.append('about', form.about)

      const { data } = await axios.post(`${backend_url}/api/admin/add-doctor`, formData, {
        headers: { Authorization: `Bearer ${adminToken}` },
      })

      if (data.success) {
        toast.success('Doctor added successfully')
        resetForm()
      } else {
        toast.error(data.message || 'Failed to add doctor')
      }
    } catch (error) {
      console.error(error)
      toast.error('Server error while adding doctor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Add New Doctor</h2>
        <p className="text-sm text-gray-500 mt-1">Fill in the details below to add a doctor to the platform.</p>
      </div>

      <form onSubmit={onSubmitHandler} className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8 space-y-8">

        {/* Photo */}
        <Field label="Photo">
          <label
            htmlFor="image"
            className="flex items-center gap-4 p-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/40 cursor-pointer transition-colors"
          >
            <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center flex-shrink-0">
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{image ? image.name : 'Click to upload a photo'}</p>
              <p className="text-xs text-gray-400">PNG or JPG, square works best</p>
            </div>
          </label>
          <input type="file" id="image" hidden accept="image/*" onChange={handleImageChange} />
        </Field>

        {/* Basic info */}
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Full name">
            <input type="text" placeholder="e.g. Dr. Aditi Sharma" value={form.name} onChange={updateField('name')} required className={inputClass} />
          </Field>
          <Field label="Email">
            <input type="email" placeholder="doctor@clinic.com" value={form.email} onChange={updateField('email')} required className={inputClass} />
          </Field>
          <Field label="Password">
            <input type="password" placeholder="Set a login password" value={form.password} onChange={updateField('password')} required className={inputClass} />
          </Field>
          <Field label="Consultation fee">
            <input type="number" placeholder="e.g. 500" value={form.fees} onChange={updateField('fees')} required min="0" className={inputClass} />
          </Field>
        </div>

        {/* Professional details */}
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Experience">
            <select value={form.experience} onChange={updateField('experience')} className={inputClass}>
              {EXPERIENCE_OPTIONS.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </Field>
          <Field label="Speciality">
            <select value={form.speciality} onChange={updateField('speciality')} className={inputClass}>
              {SPECIALITIES.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </Field>
          <div className="sm:col-span-2">
            <Field label="Education">
              <input type="text" placeholder="e.g. MBBS, MD (Dermatology)" value={form.degree} onChange={updateField('degree')} required className={inputClass} />
            </Field>
          </div>
        </div>

        {/* Address */}
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Address line 1">
            <input type="text" placeholder="Street, building" value={form.address1} onChange={updateField('address1')} required className={inputClass} />
          </Field>
          <Field label="Address line 2">
            <input type="text" placeholder="City, state, PIN" value={form.address2} onChange={updateField('address2')} required className={inputClass} />
          </Field>
        </div>

        {/* About */}
        <Field label="About">
          <textarea
            rows={4}
            placeholder="Short professional bio"
            value={form.about}
            onChange={updateField('about')}
            required
            className={inputClass}
          />
        </Field>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-sm hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding Doctor…' : 'Add Doctor'}
        </button>
      </form>
    </div>
  )
}

export default AddDoctor