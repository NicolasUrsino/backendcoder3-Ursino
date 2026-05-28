import {
  createAdoption,
  deleteAdoption,
  getAdoptionById,
  getAllAdoptions,
  updateAdoptionStatus,
} from "../repositories/adoption.repository.js";

const allowedStatuses = ["pending", "approved", "rejected"];

function isValidEmail(email) {
  return typeof email === "string" && email.includes("@");
}

export function listAdoptions() {
  return getAllAdoptions();
}

export function findAdoption(id) {
  return getAdoptionById(id);
}

export function registerAdoption(data) {
  const { petName, adopterName, adopterEmail } = data;

  if (!petName || !adopterName || !adopterEmail) {
    const error = new Error("petName, adopterName y adopterEmail son obligatorios");
    error.statusCode = 400;
    throw error;
  }

  if (!isValidEmail(adopterEmail)) {
    const error = new Error("adopterEmail debe ser un email válido");
    error.statusCode = 400;
    throw error;
  }

  return createAdoption({ petName, adopterName, adopterEmail });
}

export function changeAdoptionStatus(id, status) {
  if (!allowedStatuses.includes(status)) {
    const error = new Error("status debe ser pending, approved o rejected");
    error.statusCode = 400;
    throw error;
  }

  return updateAdoptionStatus(id, status);
}

export function removeAdoption(id) {
  return deleteAdoption(id);
}
