import createClient from "@sanity/client";

export const sanity_client = createClient({
  projectId: "r3alne46",
  dataset: "production",
  useCdn: false,
  apiVersion: "2023-02-02",
});
