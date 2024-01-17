
import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
const { DB_HOST, PORT = 3000 } = process.env;

describe("auth test", () => {
    let server = null

    beforeEach(() => {
        mongoose.connect(DB_HOST).then(
            // Запуск сервера
            server = app.listen(PORT, "run test server")
        ).catch(error => {
            console.log(error.message)
        })
    })
    test("auth test", async () => {
        const currentUser = {
            email: "wojifiv688@watrf.com",
            password: "wojifiv688@watrf.com"
        };
        const response = await request(app).post("/api/auth/signin").send(currentUser);
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
        expect(typeof response.body.user.email && typeof response.body.user.subscription).toBe("string");

    });
    afterEach(() => {
        mongoose.connection.close().then(server.close()).catch(error => {
            console.log(error.message)
        })
    });

});