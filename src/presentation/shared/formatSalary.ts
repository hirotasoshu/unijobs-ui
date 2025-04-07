const formatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 0,
});

export const formatSalary = (salaryFrom?: number, salaryTo?: number) => {
  if (!salaryFrom && !salaryTo) return "Зарплата не указана";

  if (salaryFrom && salaryTo) {
    return `${formatter.format(salaryFrom)} - ${formatter.format(salaryTo)}`;
  }
  return salaryFrom
    ? `от ${formatter.format(salaryFrom)}`
    : `до ${formatter.format(salaryTo)}`;
};
