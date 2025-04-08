import { VacancyGateway } from "../../../domain/gateways/vacancyGateway";
import {
  VacancyDetailViewModel,
  VacancyFilters,
  VacancyViewModel,
} from "../../../domain/models/vacancy";
import { PaginatedResult } from "../../../domain/shared/paginatedResult";

const mockVacancies: VacancyDetailViewModel[] = [
  {
    id: "01960c29-20de-71a1-a4e7-509120b6527f",
    title: "Ассистент преподавателя",
    location: "Екатеринбург",
    salaryFrom: 20000,
    salaryTo: 30000,
    workFormat: "onsite",
    employmentType: "part-time",
    description: "Помощь в проведении занятий и проверке работ.",
    key_skills: ["Python", "Преподавание", "Работа с документацией"],
    employer: {
      id: "01960c2a-5ad1-7651-80bf-54760bd9d55a",
      name: "УрФУ",
      avatarUrl:
        "https://img.phb123.com/uploads/allimg/220614/810-220614113K60-L-lp.png",
    },
  },
  {
    id: "01960c29-8f45-771d-a8d6-2a9b1ca9a86d",
    title: "Административный помощник",
    location: "Санкт-Петербург",
    salaryFrom: 25000,
    salaryTo: 35000,
    workFormat: "remote",
    employmentType: "full-time",
    description: "Работа в деканате: документы, поддержка студентов.",
    key_skills: ["Коммуникации", "Организация мероприятий"],
    employer: {
      id: "01960c2a-9938-74ff-8fe1-027402ef0b9b",
      name: "ВШЭ СПБ",
      avatarUrl:
        "https://papik.pro/grafic/uploads/posts/2023-04/1681593331_papik-pro-p-niu-vshe-logotip-vektor-6.jpg",
    },
  },
];

export class DummyVacancyGateway implements VacancyGateway {
  async getByFilters(
    filters: VacancyFilters = {},
  ): Promise<PaginatedResult<VacancyViewModel>> {
    const {
      search = "",
      page = 1,
      pageSize = 10,
      salaryFrom,
      workFormat,
      employmentType,
    } = filters;

    const term = search.toLowerCase();

    const filtered = mockVacancies.filter((vacancy) => {
      const matchesSearch =
        vacancy.title.toLowerCase().includes(term) ||
        vacancy.employer.name.toLowerCase().includes(term) ||
        vacancy.key_skills.some((skill) => skill.toLowerCase().includes(term));

      const matchesSalary =
        salaryFrom == null ||
        (vacancy.salaryFrom && vacancy.salaryFrom >= salaryFrom);

      const matchesWorkFormat =
        workFormat == null || vacancy.workFormat === workFormat;

      const matchesEmploymentType =
        employmentType == null || vacancy.employmentType === employmentType;

      return (
        matchesSearch &&
        matchesSalary &&
        matchesWorkFormat &&
        matchesEmploymentType
      );
    });

    const start = (page - 1) * pageSize;
    const paginated = filtered.slice(start, start + pageSize);

    const result = paginated.map((vacancy) => ({
      id: vacancy.id,
      title: vacancy.title,
      location: vacancy.location,
      salaryFrom: vacancy.salaryFrom,
      salaryTo: vacancy.salaryTo,
      employer: vacancy.employer,
    }));
    const total = filtered.length;
    const totalPages = Math.ceil(filtered.length / pageSize);

    return { result: result, total: total, totalPages: totalPages };
  }

  async getById(id: string): Promise<VacancyDetailViewModel> {
    return mockVacancies.find((v) => v.id === id)!;
  }
}
