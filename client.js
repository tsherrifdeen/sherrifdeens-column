import sanityClient from "@sanity/client";
// import mailchimpClient from "@mailchimp/mailchimp_marketing";
export const client = sanityClient({
  projectId: "r3alne46",
  dataset: "production",
  useCdn: false,
  apiVersion: "2023-02-02",
});
