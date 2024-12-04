import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server.js";

const { expect } = chai;

chai.use(chaiHttp);

describe("Routes", () => {
    describe("GET /api/v1/matches", () => {
        it("should return json", (done) => {
            chai.request(app)
                .get("/api/v1/matches")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.type).to.eql("application/json");
                    done();
                });
        });
    });
    describe("GET /api/v1/matches/:id", () => {
        it("should return json", (done) => {
            chai.request(app)
                .get("/api/v1/matches/5ef355c7a7915e583038e9fc")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.type).to.eql("application/json");
                    done();
                });
        });
    });
});
