import { describe, it, after } from "mocha";
import chai from "chai";
import server from "./utils/server.mock.js";
const { should, expect } = chai;
should();

describe("Routes", () => {
    after(() => server.close());

    it("GET /api/v1/matches should return json", (done) => {
        server.get("/api/v1/matches").end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.type).to.eql("application/json");
            done();
        });
    });
    it("GET /api/v1/matches/:id should return json", (done) => {
        server
            .get("/api/v1/matches/5ef355c7a7915e583038e9fc")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.type).to.eql("application/json");
                done();
            });
    });
});
