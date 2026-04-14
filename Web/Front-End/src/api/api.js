const API_URL = "http://localhost:8080";
export async function request(endpoint, option = {}) {
    const token = localStorage.getItem("token");

    const headers = {
        "content-Type": "application/json",
        ...(token && {Authorization: `Bearer ${token}`}),
        ...option.headers,
    };
    const response =  fetch(`${API_URL}${endpoint}`,{
        ...option,
        headers,
    });
    return response;
}