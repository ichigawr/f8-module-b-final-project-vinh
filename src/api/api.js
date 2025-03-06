const url = "http://localhost:3000";

const get = async (path) => {
  try {
    const res = await fetch(`${url}/${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

const post = async (body, path) => {
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

const patch = async (body, path) => {
  try {
    const res = await fetch(`${url}/${path}`, {
      method: "PATCH",
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

export { get, post, patch };
