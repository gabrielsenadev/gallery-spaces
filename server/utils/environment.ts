export const getSeparator = () => {
  const { storeKeySeparator } = useRuntimeConfig();
  return storeKeySeparator ?? ':';
};
