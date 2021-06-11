import http from "../utils/http.util";

export function fetchItems() {
  return http
    .get()
    .then((response) => response.data)
    .catch((error) => {
      Promise.reject(error);
    });
}
