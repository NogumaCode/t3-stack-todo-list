import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "./utils/trpc";
import TodoList from "./components/TodoList";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(()=>trpc.createClient({
    links:[
      httpBatchLink({
        url:"http://localhost:5000/trpc",

      })
    ] }))

  return <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <TodoList />
    </QueryClientProvider>
  </trpc.Provider>;
}

export default App;
