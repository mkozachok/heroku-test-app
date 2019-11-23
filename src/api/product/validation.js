export const productValidation = product => {
  if (!product.title) {
    return "title is required";
  } else if (!product.description) {
    return "description is required";
  } else if (!product.price) {
    return "price is required";
  }
};
