import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: "3e44df2b1bcc7dd61f8fa362660e5b3b-us10",
  server: "us10",
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const response = await mailchimp.lists.addListMember("d23ed1b742", {
      email_address: body.email_address,
      status: "pending",
    });
    return {
      success: true,
      body: response.body,
    };
  } catch (error) {
    return {
      success: false,
      body: error.response.body,
    };
  }
});
