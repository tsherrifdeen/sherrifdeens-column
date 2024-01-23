import { client } from "../client";
export async function fetchBlogData(query) {
  try {
    const result = await client.fetch(query);
    // console.log(result);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function fetchBlogContent(query1, query2) {
  try {
    const result = client.fetch(query1, query2);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
}
