import { request } from "../api/api";

export function useAuth() {
    const login = async (email, password) => {
        try {
            const response = await request("/auth/login", {
                method: "POST",
                body: JSON.stringify({email, password})
            });

            if(!response.ok) {
                return false;
            }
            const token = await response.text();
            if (!token) {
                return false;
            }
            localStorage.setItem("token", token);

            return true;
            
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        }
    };
    return { login };
}
