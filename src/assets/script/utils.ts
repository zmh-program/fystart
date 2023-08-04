import {computed} from "vue";

export function exportScript(name: string, conf: any) {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.innerHTML = `window.${name} = ${JSON.stringify(conf)};`;
  document.body.appendChild(script);
}

export function insertScript(src: string) {
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
}

export const withCdn = (src: string) => (
  src.startsWith("/") ? `https://cdn.zmh-program.site/fystart${src}` : src
);
