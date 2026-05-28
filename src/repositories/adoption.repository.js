let adoptions = [];
let nextId = 1;

export function resetAdoptions() {
  adoptions = [];
  nextId = 1;
}

export function seedAdoptions(items = []) {
  adoptions = items.map((item, index) => ({
    id: index + 1,
    status: "pending",
    ...item,
    id: item.id ?? index + 1,
  }));

  nextId = adoptions.length + 1;
}

export function getAllAdoptions() {
  return adoptions;
}

export function getAdoptionById(id) {
  return adoptions.find((adoption) => adoption.id === Number(id));
}

export function createAdoption(data) {
  const adoption = {
    id: nextId,
    petName: data.petName,
    adopterName: data.adopterName,
    adopterEmail: data.adopterEmail,
    status: "pending",
  };

  adoptions.push(adoption);
  nextId += 1;

  return adoption;
}

export function updateAdoptionStatus(id, status) {
  const adoption = getAdoptionById(id);

  if (!adoption) {
    return null;
  }

  adoption.status = status;
  return adoption;
}

export function deleteAdoption(id) {
  const adoption = getAdoptionById(id);

  if (!adoption) {
    return null;
  }

  adoptions = adoptions.filter((item) => item.id !== Number(id));
  return adoption;
}
