import axios from "axios";

export const api = axios.create({
    baseURL: "http://127.0.0.1:8000/"
})

export class API {
    static getResults = async () => {
        try {
          const response = await api.get("/results");
          return response.data;
        } catch(error) {
          console.error("Error fetching results:", error);
        }
    }

    static getEmotional = async (text: string) => {
        try {
            const response = await api.post("/predict", {text});
            return response.data;
        } catch(error) {
            console.log("Error fetching:", error);
        }
    }

    static deleteResults = async () => {
        try {
            const response = await api.delete("/results");
            return response.data;
        } catch (error) {
            console.error("Error deleting results:", error);
        }
    }
    
}