import { Router } from "express";
import {
  changeAdoptionStatus,
  findAdoption,
  listAdoptions,
  registerAdoption,
  removeAdoption,
} from "../services/adoption.service.js";

const adoptionRouter = Router();

adoptionRouter.get("/", (req, res) => {
  const adoptions = listAdoptions();
  res.status(200).send({ status: "success", payload: adoptions });
});

adoptionRouter.get("/:id", (req, res) => {
  const adoption = findAdoption(req.params.id);

  if (!adoption) {
    return res.status(404).send({ status: "error", message: "Adopción no encontrada" });
  }

  res.status(200).send({ status: "success", payload: adoption });
});

adoptionRouter.post("/", (req, res) => {
  try {
    const adoption = registerAdoption(req.body);
    res.status(201).send({ status: "success", payload: adoption });
  } catch (error) {
    res.status(error.statusCode || 500).send({ status: "error", message: error.message });
  }
});

adoptionRouter.patch("/:id/status", (req, res) => {
  try {
    const adoption = changeAdoptionStatus(req.params.id, req.body.status);

    if (!adoption) {
      return res.status(404).send({ status: "error", message: "Adopción no encontrada" });
    }

    res.status(200).send({ status: "success", payload: adoption });
  } catch (error) {
    res.status(error.statusCode || 500).send({ status: "error", message: error.message });
  }
});

adoptionRouter.delete("/:id", (req, res) => {
  const adoption = removeAdoption(req.params.id);

  if (!adoption) {
    return res.status(404).send({ status: "error", message: "Adopción no encontrada" });
  }

  res.status(200).send({ status: "success", payload: adoption });
});

export default adoptionRouter;
