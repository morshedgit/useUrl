import { AddLog, fetchContentfulGraphQL } from "@/lib/api";
import Button from "@/components/Button";

const gql = String.raw;

const getLogs = async () => {
  try {
    const query = gql`
      query {
        logCollection {
          items {
            log
          }
        }
      }
    `;

    const logs = await fetchContentfulGraphQL(query);

    return logs.data.logCollection.items;
  } catch (e: any) {
    console.log(e.message);
    return [];
  }
};

export default async function Home({ searchParams: { shop } }: any) {
  const logs = await getLogs();

  const addLog = async () => {
    "use server";
    const result = await AddLog({ test: "Test" });
    console.log({ result });
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-7xl">Logs</h1>
      <Button onClick={addLog} />
      {logs.map((item: { log: Record<string, unknown> }) => (
        <pre key={JSON.stringify(item.log)}>
          {JSON.stringify(item.log, null, 2)}
        </pre>
      ))}
    </main>
  );
}
