export async function fetchContentfulGraphQL(
  query: string,
  variables: {} = {}
) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${
      process.env.CONTENTFUL_SPACE_ID
    }/environments/${process.env.CONTENTFUL_ENVIRONMENT || "master"}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query, variables }),
    }
  ).then((response) => response.json());
}

export async function AddLog(log: Object) {
  const payload = {
    fields: {
      log: {
        "en-US": log,
      },
    },
  };
  console.log({ payload: JSON.stringify(payload) });
  try {
    const res = await fetch(
      `https://api.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT_ID}/entries`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CONTENTFUL_CMA_TOKEN}`,
          "Content-Type": "application/vnd.contentful.management.v1+json",
          "X-Contentful-Content-Type":
            process.env.CONTENTFUL_CONTENT_TYPE_ID || "",
        },
        body: JSON.stringify(payload),
      }
    );
    const result = await res.json();
    const entryId = result.sys.id;
    const entryVersion = result.sys.version;
    const publishPayload = {
      sys: { id: entryId, version: entryVersion },
    };
    const publishRes = await fetch(
      `https://api.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT_ID}/entries/${entryId}/published`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${process.env.CONTENTFUL_CMA_TOKEN}`,
          "Content-Type": "application/vnd.contentful.management.v1+json",
          "X-Contentful-Version": `${entryVersion}`,
        },
        body: JSON.stringify(publishPayload),
      }
    );
    const publishResult = await publishRes.json();
    return publishResult;
  } catch (e: any) {
    return e.message;
  }
}
