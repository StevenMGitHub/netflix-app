import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import Login from "@/components/Login";
import Navbar from "@/components/Navbar";
import requests from "@/utils/requests"; // importamos el modulo de las solicitudes
import Hero from "@/components/Hero";
import Row from "@/components/Row";

const Home = ({
  moviePosters,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
}) => {
  
  const { data: session } = useSession(); /* usar los props recibidos del lado del server */

  if (!session) return <Login />;

  return (
    <>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative bg-gradient-to-b from-gray-900/10 to-[#010511]">
        <Hero moviePosters={moviePosters} /> {/* pasamos el cartel de pelicula a 'hero' */}

        {/* importamos 'Row' component y pasamos las diferentes categorias de peliculas */}
        <section className="container pb-32">
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps(context) { /* obtener los props del lado del servidor */
  const session = await getSession(context);

  const [
    moviePosters,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchMoviePosters).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);


  return {
    props: { /* pasamos los datos como props */
      session,
      moviePosters: moviePosters.results,
      trendingNow: trendingNow.results,
      topRated: topRated?.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  };
}
export default Home