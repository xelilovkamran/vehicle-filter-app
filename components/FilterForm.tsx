'use client'

import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'

const MakeSelect = ({
  makes,
  selectedMake,
  setSelectedMake,
}: {
  makes: MakeType[]
  selectedMake: string
  setSelectedMake: React.Dispatch<React.SetStateAction<string>>
}) => {
  if (!makes.length) {
    return <p>Loading vehicle makes...</p>
  }

  return (
    <select
      value={selectedMake}
      onChange={(e) => setSelectedMake(e.target.value)}
      className="p-2 border rounded w-full mb-4 outline-none text-black focus:ring-2 focus:ring-blue-500 font-semibold"
    >
      <option value="">Select Vehicle Make</option>
      {makes.map((make, index) => (
        <option key={index} value={make.MakeId}>
          {make.MakeName}
        </option>
      ))}
    </select>
  )
}

const YearSelect = ({
  selectedYear,
  setSelectedYear,
  currentYear,
}: {
  selectedYear: string
  setSelectedYear: React.Dispatch<React.SetStateAction<string>>
  currentYear: number
}) => {
  return (
    <select
      value={selectedYear}
      onChange={(e) => setSelectedYear(e.target.value)}
      className="p-2 border rounded w-full mb-4 outline-none text-black focus:ring-2 focus:ring-blue-500 font-semibold"
    >
      <option value="">Select Model Year</option>
      {Array.from(
        { length: currentYear - 2014 },
        (_, i) => currentYear - i
      ).map((year, index) => (
        <option key={index} value={year}>
          {year}
        </option>
      ))}
    </select>
  )
}

const FilterForm = () => {
  const [makes, setMakes] = useState<MakeType[]>([])
  const [selectedMake, setSelectedMake] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/vehicles/GetMakesForVehicleType/car?format=json`
        )
        if (!response.ok) throw new Error('Failed to fetch vehicle makes')
        const data = await response.json()
        setMakes(data.Results)
      } catch (error) {
        console.log('Error fetching makes:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-center">Filter Vehicles</h1>

      <Suspense fallback={<p>Loading makes...</p>}>
        <MakeSelect
          makes={makes}
          selectedMake={selectedMake}
          setSelectedMake={setSelectedMake}
        />
      </Suspense>

      <Suspense fallback={<p>Loading years...</p>}>
        <YearSelect
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          currentYear={currentYear}
        />
      </Suspense>

      <Link
        href={
          selectedMake && selectedYear
            ? `/result/${selectedMake}/${selectedYear}`
            : '#'
        }
        className={`w-full p-2 bg-blue-500 text-white rounded block text-center font-bold ${
          !selectedMake || !selectedYear ? 'opacity-50 pointer-events-none' : ''
        }`}
      >
        Next
      </Link>
    </div>
  )
}

export default FilterForm
