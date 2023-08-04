import { exportScript, insertScript } from "@/assets/script/utils/base";
import { qweather } from "@/assets/script/config";

export function setupWeatherCard(): void {
  exportScript("WIDGET", {
    "CONFIG": {
      "layout": "1",
      "width": "220",
      "height": "181",
      "background": "3",
      "dataColor": "FFFFFF",
      "borderRadius": "5",
      "modules": "10",
      "key": qweather,
    }
  });
  insertScript("https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0");
}
