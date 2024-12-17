/* eslint-disable no-undef */
import request from "supertest";
import { app, server } from "../server.js";

describe("Routes", () => {
    afterAll((done) => {
        if (server) {
            server.close(done);
        } else {
            done();
        }
    });

    describe("Happy Paths", () => {
        it("should return json and 200", async () => {
            const response = await request(app).get("/api/v1/matches");

            expect(response.status).toBe(200);
            expect(response.type).toBe("application/json");
        });

        it("should return json and 200", async () => {
            const response = await request(app).get(
                "/api/v1/matches/5ef355c7a7915e583038e9fc"
            );

            expect(response.status).toBe(200);
            expect(response.type).toBe("application/json");
        });
    });
});
