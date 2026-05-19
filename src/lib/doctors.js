export async function getDoctors() {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  if (!baseUrl) {
    throw new Error('Environment variable NEXT_PUBLIC_SERVER_URL is not defined');
  }

  const res = await fetch(`${baseUrl}/doctors`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch doctors: ${res.status}`);
  }

  return res.json();
}
