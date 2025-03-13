import { testClient } from "hono/testing";
import { courses } from ".";

const client = testClient(courses);

// TODO: Implement test
describe("courses", () => {
  it("should return course list", async () => {
    const response = await client.index.$get({ query: {} });
    expect(response.status).toBe(200);
  });
});
