import {ref} from "vue";
import axios from "axios";

type GithubRepo = {
  user: string;
  avatar: string;
  repo: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  color: string;
}

export const data = ref<GithubRepo[]>([]);

export function update() {
  axios.get("/github")
    .then((res) => {
      data.value = res.data.data;
    })
}
