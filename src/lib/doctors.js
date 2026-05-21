export async function getDoctors() {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  if (!baseUrl) {
    console.error('Environment variable NEXT_PUBLIC_SERVER_URL is not defined');
    return [];
  }

  try {
    const res = await fetch(`${baseUrl}/appointment`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`Failed to fetch doctors: ${res.status}`);
      return [];
    }

    return res.json();
  } catch (error) {
    console.error('Failed to fetch doctors:', error);
    return [];
  }
}
