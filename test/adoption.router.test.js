import test from "node:test";
import assert from "node:assert/strict";
import app from "../src/app.js";
import { resetAdoptions, seedAdoptions } from "../src/repositories/adoption.repository.js";

async function withServer(callback) {
  const server = app.listen(0);
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;

  try {
    await callback(baseUrl);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

async function request(baseUrl, path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const body = await response.json();
  return { statusCode: response.status, body };
}

test("GET /api/adoptions devuelve todas las adopciones", async () => {
  resetAdoptions();
  seedAdoptions([
    { petName: "Luna", adopterName: "Nicolás", adopterEmail: "nico@test.com" },
    { petName: "Toby", adopterName: "Cintia", adopterEmail: "cintia@test.com" },
  ]);

  await withServer(async (baseUrl) => {
    const response = await request(baseUrl, "/api/adoptions");

    assert.equal(response.statusCode, 200);
    assert.equal(response.body.status, "success");
    assert.equal(response.body.payload.length, 2);
  });
});

test("GET /api/adoptions/:id devuelve una adopción existente", async () => {
  resetAdoptions();
  seedAdoptions([{ petName: "Luna", adopterName: "Nicolás", adopterEmail: "nico@test.com" }]);

  await withServer(async (baseUrl) => {
    const response = await request(baseUrl, "/api/adoptions/1");

    assert.equal(response.statusCode, 200);
    assert.equal(response.body.payload.id, 1);
    assert.equal(response.body.payload.petName, "Luna");
  });
});

test("GET /api/adoptions/:id devuelve 404 si no existe", async () => {
  resetAdoptions();

  await withServer(async (baseUrl) => {
    const response = await request(baseUrl, "/api/adoptions/999");

    assert.equal(response.statusCode, 404);
    assert.equal(response.body.status, "error");
  });
});

test("POST /api/adoptions crea una adopción válida", async () => {
  resetAdoptions();

  await withServer(async (baseUrl) => {
    const response = await request(baseUrl, "/api/adoptions", {
      method: "POST",
      body: JSON.stringify({
        petName: "Milo",
        adopterName: "Juan Pérez",
        adopterEmail: "juan@test.com",
      }),
    });

    assert.equal(response.statusCode, 201);
    assert.equal(response.body.status, "success");
    assert.equal(response.body.payload.id, 1);
    assert.equal(response.body.payload.status, "pending");
  });
});

test("POST /api/adoptions devuelve 400 si faltan datos obligatorios", async () => {
  resetAdoptions();

  await withServer(async (baseUrl) => {
    const response = await request(baseUrl, "/api/adoptions", {
      method: "POST",
      body: JSON.stringify({ petName: "Milo" }),
    });

    assert.equal(response.statusCode, 400);
    assert.equal(response.body.status, "error");
  });
});

test("POST /api/adoptions devuelve 400 si el email es inválido", async () => {
  resetAdoptions();

  await withServer(async (baseUrl) => {
    const response = await request(baseUrl, "/api/adoptions", {
      method: "POST",
      body: JSON.stringify({
        petName: "Milo",
        adopterName: "Juan Pérez",
        adopterEmail: "email-invalido",
      }),
    });

    assert.equal(response.statusCode, 400);
    assert.equal(response.body.message, "adopterEmail debe ser un email válido");
  });
});

test("PATCH /api/adoptions/:id/status actualiza el estado", async () => {
  resetAdoptions();
  seedAdoptions([{ petName: "Luna", adopterName: "Nicolás", adopterEmail: "nico@test.com" }]);

  await withServer(async (baseUrl) => {
    const response = await request(baseUrl, "/api/adoptions/1/status", {
      method: "PATCH",
      body: JSON.stringify({ status: "approved" }),
    });

    assert.equal(response.statusCode, 200);
    assert.equal(response.body.payload.status, "approved");
  });
});

test("PATCH /api/adoptions/:id/status devuelve 400 si el estado no es válido", async () => {
  resetAdoptions();
  seedAdoptions([{ petName: "Luna", adopterName: "Nicolás", adopterEmail: "nico@test.com" }]);

  await withServer(async (baseUrl) => {
    const response = await request(baseUrl, "/api/adoptions/1/status", {
      method: "PATCH",
      body: JSON.stringify({ status: "finished" }),
    });

    assert.equal(response.statusCode, 400);
    assert.equal(response.body.status, "error");
  });
});

test("PATCH /api/adoptions/:id/status devuelve 404 si la adopción no existe", async () => {
  resetAdoptions();

  await withServer(async (baseUrl) => {
    const response = await request(baseUrl, "/api/adoptions/999/status", {
      method: "PATCH",
      body: JSON.stringify({ status: "approved" }),
    });

    assert.equal(response.statusCode, 404);
  });
});

test("DELETE /api/adoptions/:id elimina una adopción existente", async () => {
  resetAdoptions();
  seedAdoptions([{ petName: "Luna", adopterName: "Nicolás", adopterEmail: "nico@test.com" }]);

  await withServer(async (baseUrl) => {
    const response = await request(baseUrl, "/api/adoptions/1", { method: "DELETE" });

    assert.equal(response.statusCode, 200);
    assert.equal(response.body.payload.id, 1);
  });
});

test("DELETE /api/adoptions/:id devuelve 404 si no existe", async () => {
  resetAdoptions();

  await withServer(async (baseUrl) => {
    const response = await request(baseUrl, "/api/adoptions/999", { method: "DELETE" });

    assert.equal(response.statusCode, 404);
    assert.equal(response.body.status, "error");
  });
});
