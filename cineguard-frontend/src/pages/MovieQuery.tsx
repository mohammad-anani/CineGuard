import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useParams } from "react-router";
import { queryMovie, resetConversation } from "../api";
import type { ChatMessage } from "../types";

function MovieQuery() {
  const { id } = useParams();

  const movieId = Number(id);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  useEffect(() => {
    return () => {
      resetConversation(movieId).catch(() => { });
    };
  }, [movieId]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery || loading) {
      return;
    }

    setError("");

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        content: trimmedQuery,
      },
    ]);

    setQuery("");
    setLoading(true);

    try {
      const result = await queryMovie(
        movieId,
        trimmedQuery
      );

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: result.answer ?? "",
        },
      ]);
    } catch {
      setError("Failed to get an answer.");

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't process that question.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-[calc(100vh-73px)] flex flex-col">
      <div className="max-w-4xl w-full mx-auto px-6 pt-6">
        <Link
          to={`/movies/${movieId}`}
          className="text-primary hover:underline text-sm"
        >
          ← Back to movie
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {messages.length === 0 && (
            <div className="text-center py-20">
              <h1 className="text-3xl font-bold text-gray-900">
                Ask about this movie
              </h1>

              <p className="text-gray-500 mt-3">
                Ask anything about the movie's content,
                violence, profanity, nudity, drugs, or
                frightening scenes.
              </p>
            </div>
          )}

          <div className="space-y-8">
            {messages.map((message, index) => (
              <div key={index}>
                {message.role === "user" ? (
                  <div className="flex justify-end">
                    <div className="max-w-[75%] bg-primary text-white rounded-2xl rounded-br-md px-5 py-3">
                      <p className="whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] bg-white border border-gray-200 shadow-sm rounded-2xl rounded-bl-md px-5 py-4">
                      <p className="whitespace-pre-wrap text-gray-800 leading-7">
                        {message.content}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-background px-6 py-5">
        <div className="max-w-4xl mx-auto">
          {error && (
            <p className="text-primary text-sm mb-2">
              {error}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex gap-3"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask something about this movie..."
              disabled={loading}
              className="flex-1 bg-white border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary-light/30 disabled:bg-gray-100"
            />

            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MovieQuery;