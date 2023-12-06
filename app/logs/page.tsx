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
            sys {
              id
              publishedAt
            }
            contentfulMetadata {
              tags {
                name
              }
            }
            name
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
    <main className="flex min-h-screen flex-col items-center justify-between px-24">
      <header className="w-full flex justify-between items-center py-24">
        <h1 className="text-7xl">Logs</h1>
        <Button onClick={addLog} />
      </header>
      {logs.map(
        (item: {
          log: Record<string, unknown>;
          sys: {
            id: string;
            publishedAt: string;
          };
          name: string;
        }) => (
          <div className="w-full py-4" key={item.sys.id}>
            <h2>{item.name}</h2>
            <time dateTime={item.sys.publishedAt} className="text-xs">
              {item.sys.publishedAt}
            </time>
            <pre className="w-full h-24 overflow-y-auto overflow-x-hidden bg-slate-800 text-slate-200">
              {JSON.stringify(item.log, null, 2)}
            </pre>
          </div>
        )
      )}
    </main>
  );
}
