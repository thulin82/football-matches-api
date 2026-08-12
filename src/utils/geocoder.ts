import NodeGeocoder from "node-geocoder";

export function createGeocoder(options: { provider?: string; apiKey?: string }) {
  return NodeGeocoder({
    provider: options.provider as never,
    apiKey: options.apiKey,
    formatter: null,
  });
}

let geocoder: ReturnType<typeof createGeocoder> | undefined;

// Lazily created so tests/imports don't depend on env vars being loaded yet.
export function getGeocoder() {
  if (!geocoder) {
    geocoder = createGeocoder({
      provider: process.env.GEOCODER_PROVIDER,
      apiKey: process.env.GEOCODER_API_KEY,
    });
  }

  return geocoder;
}
