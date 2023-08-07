import {ref} from "vue";
import axios from "axios";
import {DecimalConvert} from "@/assets/script/utils/base";

type GithubRepo = {
  user: string;
  avatar: string;
  repo: string;
  description: string;
  url: string;
  language: string;
  stars: string;
  color: string;
}

export const data = ref<GithubRepo[]>([]);

export const loading = ref<boolean>(false);
export function update() {
  if (loading.value) return;
  loading.value = true;
  axios.get("/github")
    .then((res) => {
      data.value = res.data.data;
      data.value.forEach((repo: GithubRepo) => {
        repo.stars = DecimalConvert(Number(repo.stars));
      });

      loading.value = false;
    })
    .catch((e) => {
      console.debug(e);
      loading.value = false;
    })
}

update();
