import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";

const Messages = () => {
  const { data: messages, isLoading } = trpc.guestbook.getAll.useQuery();

  if (isLoading) return <div>Fetching messages...</div>;

  return (
    <div className="flex flex-col gap-4">
      {messages?.map((msg, index) => {
        return (
          <div key={index}>
            <p>{msg.message}</p>
            <span>- {msg.name}</span>
          </div>
        );
      })}
    </div>
  );
};

const Home = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <main className="flex flex-col items-center pt-4">Loading...</main>;
  }

  return (
    <main className="flex flex-col items-center">
      <h1 className="pt-4 text-3xl">Guestbook</h1>
      <p>
        This is <code>my-t3-app</code>
      </p>

      <div className="pt-10">
        <div>
          {session ? (
            <>
              <p>hi {session.user?.name}</p>
              <button onClick={() => signOut()}>Logout</button>
            </>
          ) : (
            <button onClick={() => signIn("discord")}>
              Login with Discord
            </button>
          )}

          <div className="pt-10">
            <Messages />
          </div>
        </div>
      </div>
    </main>
  );
};
export default Home;
