import request from "request-promise";
import { getPlaces } from "./OpenCageDataProvider";

jest.mock("request-promise");

describe("OpenCageDataProvider", () => {
  test("an empty query string", async () => {
    (request as any).mockImplementation(() => '{"features": []}');
    const result = await getPlaces("Paris");
    expect(result).toEqual({ features: [] });
  });

  test("an invalid non-json response", async () => {
    (request as any).mockImplementation(() => "Service Unavailable.");
    await expect(getPlaces("Chamonix")).rejects.toThrow("Service Unavailable.");
  });
});
