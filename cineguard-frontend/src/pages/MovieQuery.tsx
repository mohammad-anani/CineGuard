import { useOutletContext } from "react-router";
import { ChattingForm } from "../components/movieQuery/ChattingForm";
import { DisplayMessages } from "../components/movieQuery/DisplayMessages";
import { EmptyChat } from "../components/movieQuery/EmptyChat";
import { Error } from "../components/movieQuery/Error";
import { Header } from "../components/movieQuery/Header";
import useQuery from "../components/movieQuery/useQuery";
import type { Movie } from "../types";

function MovieQuery() {
  const { movie } = useOutletContext<{ movie: Movie }>()

  const { messages, handleSubmit, error, loading, query, setQuery, messagesEndRef } = useQuery(movie.id)

  return (
    <div className="h-[calc(100vh-73px)] flex flex-col">
      <Header movieName={movie?.name ?? ""} />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {messages.length === 0 && (
            <  EmptyChat />
          )}
          <DisplayMessages messages={messages} loading={loading} messagesEndRef={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-gray-200 bg-background px-6 py-5">
        <div className="max-w-4xl mx-auto">
          {error && (
            <Error error={error} />
          )}

          <ChattingForm handleSubmit={handleSubmit} query={query} setQuery={setQuery} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default MovieQuery;


