import React, { useContext, useEffect, useState, useMemo } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  const { adminToken, doctorList, changeAvailable, fetchDoctors } = useContext(AdminContext);
  const [search, setSearch] = useState('');
  const [specialityFilter, setSpecialityFilter] = useState('All');

  useEffect(() => {
    if (adminToken) {
      fetchDoctors();
    }
  }, []);

  const specialities = useMemo(() => {
    const set = new Set(doctorList?.map((d) => d.speciality));
    return ['All', ...set];
  }, [doctorList]);

  const filteredDoctors = useMemo(() => {
    return (doctorList || []).filter((d) => {
      const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase());
      const matchesSpeciality = specialityFilter === 'All' || d.speciality === specialityFilter;
      return matchesSearch && matchesSpeciality;
    });
  }, [doctorList, search, specialityFilter]);

  const total = doctorList?.length || 0;
  const availableCount = doctorList?.filter((d) => d.available).length || 0;

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-black mb-1.5">All Doctors</h1>
        <p className="text-black/45">
          {total} doctor{total !== 1 ? 's' : ''} · {availableCount} available
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8 pb-8 border-b border-black/10">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 border border-black/15 rounded-lg text-sm text-black placeholder-black/35 focus:outline-none focus:ring-2 focus:ring-black/15 focus:border-black/30 transition-colors"
        />
        <select
          value={specialityFilter}
          onChange={(e) => setSpecialityFilter(e.target.value)}
          className="px-4 py-2.5 border border-black/15 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-black/15 focus:border-black/30 transition-colors"
        >
          {specialities.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
        {filteredDoctors.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-14 h-14 rounded-full object-cover border border-black/10 flex-shrink-0"
            />

            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-black truncate">Dr. {item.name}</h3>
              <p className="text-sm text-black/45 truncate">{item.speciality}</p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
              <input
                type="checkbox"
                checked={item.available}
                onChange={() => changeAvailable(item._id)}
                className="sr-only peer"
              />
              <div className="w-10 h-5.5 bg-black/15 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-black/20 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-black" />
            </label>
          </div>
        ))}
      </div>

      {total > 0 && filteredDoctors.length === 0 && (
        <div className="text-center py-20">
          <p className="text-black/45">No doctors match your search</p>
        </div>
      )}

      {total === 0 && (
        <div className="text-center py-20">
          <h3 className="text-lg font-semibold text-black mb-1.5">No doctors yet</h3>
          <p className="text-black/45 mb-6">Add your first doctor to get started</p>
          <button className="bg-black hover:bg-black/85 text-white text-sm font-medium py-2.5 px-6 rounded-lg transition">
            Add Doctor
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorsList;