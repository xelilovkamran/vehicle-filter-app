import { Suspense } from 'react'
import type { Metadata } from 'next'
import VehicleModels from '@/components/VehicleModels'

export const metadata: Metadata = {
  title: 'Result Page',
  description: 'A page to display vehicle models',
}

export default function ResultPage({
  params,
}: {
  params: { makeId: string; year: string }
}) {
  return (
    <main className="p-4">
      <h1 className="mb-4 text-center font-extrabold text-4xl">
        Vehicle Models
      </h1>
      <Suspense
        fallback={
          <p className="text-center pt-52 font-extrabold text-4xl text-blue-100">
            Loading vehicle models...
          </p>
        }
      >
        <VehicleModels params={params} />
      </Suspense>
    </main>
  )
}

export async function generateStaticParams() {
  const makeRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/vehicles/GetMakesForVehicleType/car?format=json`
  )
  const makeData = await makeRes.json()
  const makeDataResults: MakeType[] = makeData.Results
  const makes = makeDataResults.map((item) => item.MakeName.toLowerCase())

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 2015 + 1 }, (_, i) =>
    (2015 + i).toString()
  )

  const paths = makes.flatMap((make) =>
    years.map((year) => ({
      makeId: make,
      year: year,
    }))
  )

  return paths
}
