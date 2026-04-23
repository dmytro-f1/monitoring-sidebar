export async function getObjects() {
  const response = await fetch("/mocks/objects.json")
  if (!response.ok) throw new Error("Failed to fetch monitoring data")
  return response.json()
}
