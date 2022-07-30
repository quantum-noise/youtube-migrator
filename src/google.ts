declare global {
  interface Window {
    gapiLoadOkay(): void;
    gapiLoadFail(err: unknown): void;
    gisLoadOkay(): void;
    gisLoadFail(err: unknown): void;
    tokenClient: google.accounts.oauth2.TokenClient;
  }
}

const SCOPE = "https://www.googleapis.com/auth/youtube";
const YOUTUBE_API =
  "https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest";

const gapiLoadPromise = new Promise<void>((resolve, reject) => {
  window.gapiLoadOkay = resolve;
  window.gapiLoadFail = reject;
});
const gisLoadPromise = new Promise<void>((resolve, reject) => {
  window.gisLoadOkay = resolve;
  window.gisLoadFail = reject;
});

export const init = async () => {
  // First, load and initialize the gapi.client
  await gapiLoadPromise;
  await new Promise((resolve, reject) => {
    // NOTE: the 'auth2' module is no longer loaded.
    gapi.load("client", { callback: resolve, onerror: reject });
  });
  // NOTE: OAuth2 'scope' and 'client_id' parameters have moved to initTokenClient().
  await gapi.client.init({});
  await gapi.client.load(YOUTUBE_API, "v3");

  await gisLoadPromise;
  await new Promise<void>((resolve, reject) => {
    try {
      window.tokenClient = google.accounts.oauth2.initTokenClient({
        client_id:
          "140382999087-fjeg7c5mbc4hhimg59jsp1mu9ktqk7hb.apps.googleusercontent.com",
        scope: SCOPE,
        prompt: "consent",
        // @ts-ignore
        callback: "",
      });
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};
