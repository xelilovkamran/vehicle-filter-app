const fetchVehicleModels = async (
  makeId: string,
  year: string
): Promise<ModelType[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`,
    { cache: 'no-store' }
  )
  if (!response.ok) throw new Error('Failed to fetch vehicle models')
  const data = await response.json()
  return data.Results
}

export default async function VehicleModels({
  params,
}: {
  params: Promise<{ makeId: string; year: string }>
}) {
  const { makeId, year } = await params

  try {
    const models = await fetchVehicleModels(makeId, year)

    if (!models.length) {
      return (
        <p>
          No results found for <strong>{makeId}</strong> in{' '}
          <strong>{year}</strong>
        </p>
      )
    }

    return (
      <ul className="p-4">
        {models.map((model, index) => (
          <li key={index} className="p-2 border-b">
            {model.Model_Name}
          </li>
        ))}
      </ul>
    )
    // eslint-disable-next-line
  } catch (error) {
    return <p className="text-red-500">❌ Error fetching models</p>
  }
}
