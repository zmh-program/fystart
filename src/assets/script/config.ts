export const deploy = true;
export let endpoint = "https://api.fystart.com";
export let openai_endpoint = "wss://api.chatnio.net";
export const qweather = "d25856c083574121a538e53952a2bfff";

if (!deploy) endpoint = "http://localhost:8001";
