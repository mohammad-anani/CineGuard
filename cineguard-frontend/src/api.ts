export const API_URL = "https://localhost:7047";

export async function getMovies() {
  const response = await fetch(`${API_URL}/api/movies`);

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  return response.json();
}

export async function getMovie(id: number) {
  const response = await fetch(`${API_URL}/api/movies/${id}`);

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }

    throw new Error("Failed to fetch movie");
  }

  return response.json();
}

export async function addMovie(movieName: string, script: string) {
  const response = await fetch(`${API_URL}/api/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      movieName,
      script,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to add movie");
  }

  return response.json() as Promise<number>;
}

export async function queryMovie(movieId: number, query: string) {
  const response = await fetch(
    `${API_URL}/api/movies/${movieId}/query?query=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Failed to query movie");
  }

  return response.json();
}

export async function resetConversation(movieId: number) {
  await fetch(`${API_URL}/api/movies/${movieId}/reset-conversation`, {
    method: "PUT",
  });
}