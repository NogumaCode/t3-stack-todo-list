TRPC todo list

【環境構築】
①環境作成
npm init -y
npm i express cors @trpc/server zod

②Typescript関連のインストール
npm i -D @types/cors @types/express @types/node nodemon ts-node typescript
③nodemonのスクリプト設定

④server.tsの作成
⑤server.tsにinitTRPCを呼び出してプロシージャーとルーターを作成
■プロシージャーの種類
//publicProcedure.query 値の取得
//publicProcedure.mutation 値の更新や操作

⑥TodoListを作成
interfaceでTodoListの型も設定

⑦プロシージャーでTodoListを呼び出す。
⑧appRouterの型をAppRouterという名前でエクスポートする

⑨corsエラーを解消するためにapp.use(cors())を使う

【フロント側の設定】
①npm create  vite@latest
②trpc関連ファイルをインストール
npm install @trpc/client @trpc/server @trpc/react-query @tanstack/react-query@^4.0.0

③utils/trpc.tsを作成し、hooksを作成
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../server/server";
export const trpc = createTRPCReact<AppRouter>();

④下記のような形でuseStateとqueryClientとtrpcClientを使ってプロシージャーを読み込む
function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(()=>trpc.createClient({
    links:[
      httpBatchLink({
        url:"https://localhost:5000/trpc",

      })
    ] }))

  return <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <TodoList />
    </QueryClientProvider>
  </trpc.Provider>;
}

④cmponents/TodoList.tsxを作成

⑤useQueryを使ってデータを呼び出す
 const test = trpc.test.useQuery();
  console.log(test.data);

⑥map関数でTodoListの値を全て表示

⑦プロシージャーのinputを使ってtodoの追加を作成
addTodo:publicProcedure.input(z.string()).mutation((req)=>{
    const id = `${Math.random()}`;
    const todo:Todo = {
      id,
      title:req.input,
      description:req.input
    }
    todoList.push(todo);
    return todoList;
  })

⑧フロント側にuseMutetionを使って追加機能を設定
inputとbuttonの部分に設定
トリガーにuseStateを使う

⑨削除機能設定
  deleteTodo:publicProcedure.input(z.string()).mutation((req)=>{
    const idTodoDelete = req.input;
    削除したい項目をfindIndexで検索
    const indexToDelete = todoList.findIndex((todo)=>todo.id === idTodoDelete);
    todoList.splice(indexToDelete,1);
    return todoList;
  })

⑩フロント側の削除機能設定

