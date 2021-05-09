export const asyncTryCatch = async (tryer) => {
  try {
    const data = await tryer();
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};
