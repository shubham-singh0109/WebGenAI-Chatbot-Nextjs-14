'use client'

import { useChat } from "@ai-sdk/react";
import { Bot, Loader2, Send, User2 } from "lucide-react";
import Markdown from "./component/markdown";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    api: 'api/genai'
  });
  return (
    <main className="flex min-h-screen flex-col text-black item-center p-12">
      {RenderForm()}
      {RenderMessages()}
      {/* {JSON.stringify(messages)} */}
    </main>
  );

  function RenderForm(){
    return <form onSubmit={(event)=> {
      event.preventDefault();
      handleSubmit(event, {
        data: {
          prompt: input
        }
      })
    }}
    className="w-full flex flex-row gap-2 items-center h-full"
    >
      <input 
      className="border-b border-dashed outline-none w-full px-4 py-2 text-[#0842A0] placeholder:text-[#0842A099] text-right focus:placeholder-transparent disabled:bg-transparent"
      type="text" 
      placeholder={isLoading ? "Generating . . ." : "ask me anything . . ."}
      value={input}
      disabled={isLoading}
      onChange={handleInputChange}
      />
      <button 
      type="submit" 
      className="rounded-full shadow-md border flex flex-row">
      {isLoading ? (
        <Loader2 onClick={stop} className="p-3 h-10 w-10 animate-spin"/>
      ) : (
      <Send className="p-3 h-10 w-10"/>
      )}
      </button>
    </form>
  }

  function RenderMessages(){
    return <div id="chatbox" className="flex flex-col-reverse w-full text-left mt-4 gap-4 whitespace-pre-wrap">
      {messages.map((m, index)=>{
        return <div className={`p-4 shadow-md rounded-md ml-10 relative ${
          m.role === 'user' ? "bg-stone-300" : ""
        }`}>
          <Markdown text={m.content}/>
          {m.role === 'user' ? (
          <User2 className="absolute top-2 -left-10 border rounded-full p-1 shadow-lg stroke-[#dc143c]"/> 
          ) : ( 
          <Bot className={`absolute top-2 -left-10 border rounded-full p-1 shadow-lg stroke-[#9acd32] ${
            isLoading && index === messages.length - 1 ? "animate-bounce" 
            : ""
          } `}/>
          )}
        </div>
      })}
    </div>
  }
}


