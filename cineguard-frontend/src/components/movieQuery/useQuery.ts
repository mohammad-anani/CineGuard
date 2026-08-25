import { useEffect, useRef, useState, type FormEvent } from 'react';
import { queryMovie, resetConversation } from '../../api';
import type { ChatMessage } from '../../types';

export default function useQuery(movieId: number) {


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


  return { messages, handleSubmit, error, loading, query, setQuery, messagesEndRef }
}
