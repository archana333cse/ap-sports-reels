export async function fetchImage(name: string): Promise<string> {
  const res = await fetch(`https://api.unsplash.com/search/photos?query=${name}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
  const data = await res.json();
  return data.results[0]?.urls?.regular;
}
