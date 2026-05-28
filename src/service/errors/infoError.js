export const infoError= (user) =>{
    return `Una o mas propiedades estan incompletas o invalidas:
    primer nombre, ultimo nombre y email deben ser string, se recibe: ${user.first_name}, ${user.last_name} y ${user.email}`
}