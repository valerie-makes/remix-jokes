import type { LoaderFunction } from "remix";
import { useLoaderData } from "remix";
import { db } from "~/utils/db.server";

type LoaderData = {
  randomJoke: { content: string };
};

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const count = await db.joke.count();
  const randomRow = Math.floor(Math.random() * count);

  const [randomJoke] = await db.joke.findMany({
    take: 1,
    select: { content: true },
    skip: randomRow,
  });
  return { randomJoke };
};

export default function JokesIndexRoute() {
  const { randomJoke } = useLoaderData<LoaderData>();

  return (
    <div>
      <p>Here's a random joke:</p>
      <p>{randomJoke.content}</p>
    </div>
  );
}
