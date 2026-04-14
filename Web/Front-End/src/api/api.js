const API_URL = import.meta.env.VITE_API_URL;
export async function request(endpoints, option = {}) {
    const token = localStorage.getItem("token");

    const headers = {
        "content-type": "aplication/json",
        ...(token && {Authorization: `Bearer ${token}`}),
        ...option.headers,
    };
    return fetch(`${API_URL}${endpoints}`,{
        ...option,
        headers,
    })
}