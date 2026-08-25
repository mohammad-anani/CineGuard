import type { RefObject } from "react";
import type { ChatMessage } from "../../types";

export function DisplayMessages({ messages, loading, messagesEndRef }: { messages: ChatMessage[]; loading: boolean; messagesEndRef: RefObject<HTMLDivElement | null>; }) {
  return <div className="space-y-8">
    {messages.map((message, index) => (
      <div key={index}>
        {message.role === "user" ? (
          <UserMessage message={message} />
        ) : (
          <AIMessage message={message} />
        )}
      </div>
    ))}
    {loading && (
      <LoadingAnimation />
    )}
    <div ref={messagesEndRef} />
  </div>;
}



function AIMessage({ message }: { message: ChatMessage }): import("react").ReactNode {
  return <div className="flex justify-start">
    <div className="max-w-[80%] bg-white border border-gray-200 shadow-sm rounded-2xl rounded-bl-md px-5 py-4">
      <p className="whitespace-pre-wrap text-gray-800 leading-7">
        {message.content}
      </p>
    </div>
  </div>;
}

function UserMessage({ message }: { message: ChatMessage }): import("react").ReactNode {
  return <div className="flex justify-end">
    <div className="max-w-[75%] bg-primary text-white rounded-2xl rounded-br-md px-5 py-3">
      <p className="whitespace-pre-wrap">
        {message.content}
      </p>
    </div>
  </div>;
}

function LoadingAnimation() {
  return <div className="flex justify-start">
    <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4">
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  </div>;
}

