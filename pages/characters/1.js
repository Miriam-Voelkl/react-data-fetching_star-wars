import Card from "../../components/Card";
import Layout from "../../components/Layout";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

export default function Character() {
  const id = 1;
  const {
    data: character,
    error,
    isLoading,
  } = useSWR(`https://swapi.dev/api/people/${id}`, fetcher);

  if (error) {
    return <h1>The requested character cannot load: {error.message}</h1>;
  }

  if (isLoading) {
    return <h1>...loading...</h1>;
  }

  return (
    <Layout>
      <Card
        id={id}
        name={character.name}
        height={character.height}
        eyeColor={character.eye_color}
        birthYear={character.birth_year}
      />
    </Layout>
  );
}
