export const createGetRequest = (link: string) => fetch(process.env.REACT_APP_API + link).then(res => res.json());

export const createPostRequest = (path: string, body: Object) =>
  fetch(
    process.env.REACT_APP_API + path,
    {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }
  )
    .then(res => res.json());

export const createPatchRequest = (path: string, body: Object) =>
  fetch(
    process.env.REACT_APP_API + path,
    {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }
  )
    .then(res => res.json());

export const createDeleteRequest = (path: string, id: number) => {
  return fetch(
    process.env.REACT_APP_API + path + `/${id}`,
    {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    }
  )
    .then(res => res.json())
};