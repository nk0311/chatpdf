// "use client";
// import React from "react";
// import { Input } from "@/components/input"
// import { useChat } from "ai/react";
// import { Button } from "@/components/button";
// import { Send } from "lucide-react";
// import MessageList from "@/components/MessageList";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { Message } from "ai";

// type Props = {};

// const ChatComponent = (props: Props) => {

//     console.log(useChat({
//         api: "/api/chat",
//       }))

//   const { input, handleInputChange, handleSubmit, messages } = useChat({
//     api: "/api/chat",
//   });

//   return (
//     <div
//       className="relative max-h-screen overflow-scroll"
//       // id="message-container"
//     >
//       {/* header */}
//       <div className="sticky top-0 inset-x-0 p-2 bg-white h-fit">
//         <h3 className="text-xl font-bold">Chat</h3>
//       </div>

//       {/* message list */}
//       <MessageList messages={messages} />

//       <form
//         onSubmit={handleSubmit}
//         className="sticky bottom-0 inset-x-0 px-2 py-4 bg-white"
//       >
//         <div className="flex">
//           <Input
//             value={input}
//             onChange={handleInputChange}
//             placeholder="Ask any question..."
//             className="w-full"
//           />
//           <Button type="submit" className="bg-blue-600 ml-2">
//             <Send className="h-4 w-4" />
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ChatComponent;

'use client'
import { Message, useAssistant } from 'ai/react';

export default function Page() {
  const { status, messages, input, submitMessage, handleInputChange } =
    useAssistant({ api: '/api/assistant' });

  return (
    <div className="flex flex-col gap-2">
      <div className="p-2">status: {status}</div>

      <div className="flex flex-col p-2 gap-2">
        {messages.map((message: Message) => (
          <div key={message.id} className="flex flex-row gap-2">
            <div className="w-24 text-zinc-500">{`${message.role}: `}</div>
            <div className="w-full">{message.content}</div>
          </div>
        ))}
      </div>

      <form onSubmit={submitMessage} className="fixed bottom-0 p-2 w-full">
        <input
          disabled={status !== 'awaiting_message'}
          value={input}
          onChange={handleInputChange}
          className="bg-zinc-100 w-full p-2"
        />
      </form>
    </div>
  );
}