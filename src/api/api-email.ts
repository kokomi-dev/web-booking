const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

const sendEmailConfirm = async (email: string) => {
  try {
    const response = await fetch(apiUrl + "/email/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({ email: email }),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
export { sendEmailConfirm };
