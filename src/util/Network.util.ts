import Axios from "axios";

export class NetworkUtil {
  static async getGlobalIpAddress(): Promise<string> {
    const response = await Axios.get("http://ip-api.com/json/")
    return response.data.query || "";
  }
}