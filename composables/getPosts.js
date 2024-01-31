import { sanity_client } from "~/utils/client";
export async function fetchBlogData(query) {
  try {
    const result = await sanity_client.fetch(query);
    // console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function fetchBlogContent(query1, query2) {
  try {
    const result = await sanity_client.fetch(query1, query2);
    // console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}
