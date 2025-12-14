export const formatMoney = (value: number | string) => {
  const number = Number(value) || 0;

  return number.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  });
};
