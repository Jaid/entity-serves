import removeAccents from "remove-accents"

export default input => {
  return removeAccents(input.toLowerCase()).replace(/\W/g, "")
}