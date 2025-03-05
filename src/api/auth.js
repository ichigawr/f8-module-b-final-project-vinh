import { url } from ".";

export const post = async (body, path) => {
  try {
    const res = await fetch(`${url}/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return res.ok;
  } catch (error) {
    console.error(error);
  }
};
