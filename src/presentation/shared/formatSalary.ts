import i18n from "../../i18n";

export const formatSalary = (salaryFrom?: number, salaryTo?: number) => {
  const lng = i18n.language ? i18n.language.split("-")[0] : "ru";

  const formatter = new Intl.NumberFormat(lng, {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  });

  if (!salaryFrom && !salaryTo) {
    return i18n.t("salary.notSpecified");
  }

  if (salaryFrom && salaryTo) {
    return `${formatter.format(salaryFrom)} - ${formatter.format(salaryTo)}`;
  }

  return salaryFrom
    ? `${i18n.t("salary.from")} ${formatter.format(salaryFrom)}`
    : `${i18n.t("salary.to")} ${formatter.format(salaryTo)}`;
};
