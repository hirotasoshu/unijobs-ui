import { VacancyDetailViewModel } from "../../../../../application/common/models/vacancy";

export const mockVacancies: VacancyDetailViewModel[] = [
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
  {
    id: "01960c29-df21-41c7-a0b9-1234567890a1",
    title: "Куратор учебных программ",
    location: "Екатеринбург",
    salaryFrom: 30000,
    salaryTo: 40000,
    workFormat: "hybrid",
    employmentType: "full-time",
    description:
      "Сопровождение студентов, контроль учебного процесса, взаимодействие с преподавателями.",
    key_skills: [
      "Кураторство",
      "Организаторские способности",
      "Документооборот",
    ],
    employer: {
      id: "01960c2a-5ad1-7651-80bf-54760bd9d55a",
      name: "УрФУ",
      avatarUrl:
        "https://img.phb123.com/uploads/allimg/220614/810-220614113K60-L-lp.png",
    },
  },
  {
    id: "01960c29-f9c8-44a7-b1a2-2345678901b2",
    title: "Менеджер по студенческим проектам",
    location: "Санкт-Петербург",
    salaryFrom: 32000,
    salaryTo: 42000,
    workFormat: "onsite",
    employmentType: "full-time",
    description:
      "Организация студенческих мероприятий, координация внутренних проектов.",
    key_skills: [
      "Ивент-менеджмент",
      "Проектная деятельность",
      "Командная работа",
    ],
    employer: {
      id: "01960c2a-9938-74ff-8fe1-027402ef0b9b",
      name: "ВШЭ СПБ",
      avatarUrl:
        "https://papik.pro/grafic/uploads/posts/2023-04/1681593331_papik-pro-p-niu-vshe-logotip-vektor-6.jpg",
    },
  },
  {
    id: "01960c29-0abc-11e5-bb77-9876543210c3",
    title: "Ассистент по исследовательским проектам",
    location: "Екатеринбург",
    salaryFrom: 25000,
    salaryTo: 35000,
    workFormat: "remote",
    employmentType: "part-time",
    description:
      "Помощь в подготовке аналитических материалов и обработке данных.",
    key_skills: ["Аналитика", "Python", "Исследовательская деятельность"],
    employer: {
      id: "01960c2a-5ad1-7651-80bf-54760bd9d55a",
      name: "УрФУ",
      avatarUrl:
        "https://img.phb123.com/uploads/allimg/220614/810-220614113K60-L-lp.png",
    },
  },
  {
    id: "01960c29-77ab-4cde-9331-abcdef987654",
    title: "Секретарь учебного отдела",
    location: "Санкт-Петербург",
    salaryFrom: 27000,
    salaryTo: 37000,
    workFormat: "onsite",
    employmentType: "full-time",
    description:
      "Ведение расписания, обработка запросов студентов, делопроизводство.",
    key_skills: ["Работа с документами", "Внимательность", "1С Университет"],
    employer: {
      id: "01960c2a-9938-74ff-8fe1-027402ef0b9b",
      name: "ВШЭ СПБ",
      avatarUrl:
        "https://papik.pro/grafic/uploads/posts/2023-04/1681593331_papik-pro-p-niu-vshe-logotip-vektor-6.jpg",
    },
  },
  {
    id: "01960c29-45f3-4a8f-a7a1-998877665544",
    title: "Технический ассистент кафедры",
    location: "Екатеринбург",
    salaryFrom: 24000,
    salaryTo: 32000,
    workFormat: "onsite",
    employmentType: "part-time",
    description:
      "Настройка оборудования, сопровождение лекций, техническая поддержка.",
    key_skills: [
      "Техническая поддержка",
      "Работа с оборудованием",
      "Ответственность",
    ],
    employer: {
      id: "01960c2a-5ad1-7651-80bf-54760bd9d55a",
      name: "УрФУ",
      avatarUrl:
        "https://img.phb123.com/uploads/allimg/220614/810-220614113K60-L-lp.png",
    },
  },
  {
    id: "01960c29-87cc-4d8e-a6f1-112233445566",
    title: "Специалист по академической мобильности",
    location: "Санкт-Петербург",
    salaryFrom: 35000,
    salaryTo: 45000,
    workFormat: "hybrid",
    employmentType: "full-time",
    description:
      "Организация обменных программ, сопровождение иностранных студентов.",
    key_skills: ["Английский язык", "Международные программы", "Коммуникации"],
    employer: {
      id: "01960c2a-9938-74ff-8fe1-027402ef0b9b",
      name: "ВШЭ СПБ",
      avatarUrl:
        "https://papik.pro/grafic/uploads/posts/2023-04/1681593331_papik-pro-p-niu-vshe-logotip-vektor-6.jpg",
    },
  },
  {
    id: "01960c29-c3d2-4777-bbd1-665544332211",
    title: "Редактор образовательных материалов",
    location: "Екатеринбург",
    salaryFrom: 26000,
    salaryTo: 36000,
    workFormat: "remote",
    employmentType: "part-time",
    description: "Редактирование и вёрстка учебных пособий и методичек.",
    key_skills: ["Редактура", "MS Word", "Грамотность", "LaTeX"],
    employer: {
      id: "01960c2a-5ad1-7651-80bf-54760bd9d55a",
      name: "УрФУ",
      avatarUrl:
        "https://img.phb123.com/uploads/allimg/220614/810-220614113K60-L-lp.png",
    },
  },
  {
    id: "01960c29-0011-4a4a-8899-aabbccddeeff",
    title: "Специалист по работе с выпускниками",
    location: "Санкт-Петербург",
    salaryFrom: 31000,
    salaryTo: 41000,
    workFormat: "hybrid",
    employmentType: "full-time",
    description:
      "Развитие сети выпускников, организация мероприятий и опросов.",
    key_skills: ["Маркетинг", "Коммуникации", "СММ", "Организация событий"],
    employer: {
      id: "01960c2a-9938-74ff-8fe1-027402ef0b9b",
      name: "ВШЭ СПБ",
      avatarUrl:
        "https://papik.pro/grafic/uploads/posts/2023-04/1681593331_papik-pro-p-niu-vshe-logotip-vektor-6.jpg",
    },
  },
  {
    id: "01960c29-dead-beef-cafe-123456789abc",
    title: "Стажёр в научную лабораторию",
    location: "Екатеринбург",
    salaryFrom: 18000,
    salaryTo: 25000,
    workFormat: "onsite",
    employmentType: "internship",
    description:
      "Участие в исследованиях, сбор и анализ данных, помощь научным сотрудникам.",
    key_skills: ["Исследования", "Анализ данных", "Python", "Статистика"],
    employer: {
      id: "01960c2a-5ad1-7651-80bf-54760bd9d55a",
      name: "УрФУ",
      avatarUrl:
        "https://img.phb123.com/uploads/allimg/220614/810-220614113K60-L-lp.png",
    },
  },
  {
    id: "01960c29-0001-0000-0000-000000000001",
    title: "UI/UX дизайнер для образовательных платформ",
    location: "Екатеринбург",
    salaryFrom: 40000,
    salaryTo: 55000,
    workFormat: "remote",
    employmentType: "part-time",
    description:
      "Проектирование пользовательского интерфейса для онлайн-курсов.",
    key_skills: ["Figma", "UX", "UI", "Дизайн-мышление"],
    employer: {
      id: "01960c2a-5ad1-7651-80bf-54760bd9d55a",
      name: "УрФУ",
      avatarUrl:
        "https://img.phb123.com/uploads/allimg/220614/810-220614113K60-L-lp.png",
    },
  },
  {
    id: "01960c29-0002-0000-0000-000000000002",
    title: "Копирайтер для новостной ленты университета",
    location: "Санкт-Петербург",
    salaryFrom: 30000,
    salaryTo: 35000,
    workFormat: "hybrid",
    employmentType: "full-time",
    description:
      "Написание новостей, интервью с преподавателями, ведение телеграм-канала.",
    key_skills: ["Письменная речь", "Интервью", "Контент"],
    employer: {
      id: "01960c2a-9938-74ff-8fe1-027402ef0b9b",
      name: "ВШЭ СПБ",
      avatarUrl:
        "https://papik.pro/grafic/uploads/posts/2023-04/1681593331_papik-pro-p-niu-vshe-logotip-vektor-6.jpg",
    },
  },
  {
    id: "01960c29-0003-0000-0000-000000000003",
    title: "Frontend-разработчик (React)",
    location: "Екатеринбург",
    salaryFrom: 50000,
    salaryTo: 70000,
    workFormat: "remote",
    employmentType: "full-time",
    description: "Разработка веб-интерфейсов для системы управления курсами.",
    key_skills: ["React", "TypeScript", "Git", "HTML/CSS"],
    employer: {
      id: "01960c2a-5ad1-7651-80bf-54760bd9d55a",
      name: "УрФУ",
      avatarUrl:
        "https://img.phb123.com/uploads/allimg/220614/810-220614113K60-L-lp.png",
    },
  },
  {
    id: "01960c29-0004-0000-0000-000000000004",
    title: "Помощник HR-отдела",
    location: "Санкт-Петербург",
    salaryFrom: 28000,
    salaryTo: 35000,
    workFormat: "onsite",
    employmentType: "part-time",
    description:
      "Работа с анкетами, организация собеседований, сопровождение стажировок.",
    key_skills: ["Коммуникации", "HR", "Работа с документами"],
    employer: {
      id: "01960c2a-9938-74ff-8fe1-027402ef0b9b",
      name: "ВШЭ СПБ",
      avatarUrl:
        "https://papik.pro/grafic/uploads/posts/2023-04/1681593331_papik-pro-p-niu-vshe-logotip-vektor-6.jpg",
    },
  },
  {
    id: "01960c29-0005-0000-0000-000000000005",
    title: "Data Analyst (образовательная статистика)",
    location: "Екатеринбург",
    salaryFrom: 60000,
    salaryTo: 80000,
    workFormat: "remote",
    employmentType: "full-time",
    description:
      "Сбор и анализ данных по успеваемости, визуализация результатов.",
    key_skills: ["Python", "SQL", "Power BI", "Анализ данных"],
    employer: {
      id: "01960c2a-5ad1-7651-80bf-54760bd9d55a",
      name: "УрФУ",
      avatarUrl:
        "https://img.phb123.com/uploads/allimg/220614/810-220614113K60-L-lp.png",
    },
  },
  {
    id: "01960c29-0006-0000-0000-000000000006",
    title: "Продюсер онлайн-курсов",
    location: "Санкт-Петербург",
    salaryFrom: 40000,
    salaryTo: 60000,
    workFormat: "hybrid",
    employmentType: "full-time",
    description:
      "Координация преподавателей, съёмка, монтаж и публикация видеолекций.",
    key_skills: ["Производство видео", "Трекинг задач", "Коммуникации"],
    employer: {
      id: "01960c2a-9938-74ff-8fe1-027402ef0b9b",
      name: "ВШЭ СПБ",
      avatarUrl:
        "https://papik.pro/grafic/uploads/posts/2023-04/1681593331_papik-pro-p-niu-vshe-logotip-vektor-6.jpg",
    },
  },
  {
    id: "01960c29-0007-0000-0000-000000000007",
    title: "Библиотечный ассистент",
    location: "Екатеринбург",
    salaryFrom: 22000,
    salaryTo: 30000,
    workFormat: "onsite",
    employmentType: "part-time",
    description: "Помощь в поиске литературы, работа с электронным каталогом.",
    key_skills: ["Работа с архивами", "Внимательность", "Обслуживание"],
    employer: {
      id: "01960c2a-5ad1-7651-80bf-54760bd9d55a",
      name: "УрФУ",
      avatarUrl:
        "https://img.phb123.com/uploads/allimg/220614/810-220614113K60-L-lp.png",
    },
  },
  {
    id: "01960c29-0008-0000-0000-000000000008",
    title: "Видеооператор для научных мероприятий",
    location: "Санкт-Петербург",
    salaryFrom: 35000,
    salaryTo: 45000,
    workFormat: "onsite",
    employmentType: "part-time",
    description: "Съёмка и монтаж видеоматериалов с конференций и лекций.",
    key_skills: ["Видео", "Постобработка", "Камеры", "Adobe Premiere"],
    employer: {
      id: "01960c2a-9938-74ff-8fe1-027402ef0b9b",
      name: "ВШЭ СПБ",
      avatarUrl:
        "https://papik.pro/grafic/uploads/posts/2023-04/1681593331_papik-pro-p-niu-vshe-logotip-vektor-6.jpg",
    },
  },
  {
    id: "01960c29-0009-0000-0000-000000000009",
    title: "Ассистент на кафедру философии",
    location: "Екатеринбург",
    salaryFrom: 21000,
    salaryTo: 27000,
    workFormat: "onsite",
    employmentType: "part-time",
    description: "Помощь в подготовке семинаров, составление материалов.",
    key_skills: ["Философия", "Преподавание", "Word", "Коммуникация"],
    employer: {
      id: "01960c2a-5ad1-7651-80bf-54760bd9d55a",
      name: "УрФУ",
      avatarUrl:
        "https://img.phb123.com/uploads/allimg/220614/810-220614113K60-L-lp.png",
    },
  },
  {
    id: "01960c29-0010-0000-0000-000000000010",
    title: "Системный администратор (кампусная сеть)",
    location: "Санкт-Петербург",
    salaryFrom: 50000,
    salaryTo: 70000,
    workFormat: "onsite",
    employmentType: "full-time",
    description:
      "Настройка оборудования, поддержка серверов, работа с пользователями.",
    key_skills: ["Linux", "Сети", "Техподдержка", "Железо"],
    employer: {
      id: "01960c2a-9938-74ff-8fe1-027402ef0b9b",
      name: "ВШЭ СПБ",
      avatarUrl:
        "https://papik.pro/grafic/uploads/posts/2023-04/1681593331_papik-pro-p-niu-vshe-logotip-vektor-6.jpg",
    },
  },
  {
    id: "01960c29-0011-0000-0000-000000000011",
    title: "Контент-менеджер сайта факультета",
    location: "Екатеринбург",
    salaryFrom: 30000,
    salaryTo: 40000,
    workFormat: "remote",
    employmentType: "part-time",
    description:
      "Обновление информации на сайте, редактирование новостей и расписаний.",
    key_skills: ["CMS", "HTML", "Копирайтинг", "Организованность"],
    employer: {
      id: "01960c2a-5ad1-7651-80bf-54760bd9d55a",
      name: "УрФУ",
      avatarUrl:
        "https://img.phb123.com/uploads/allimg/220614/810-220614113K60-L-lp.png",
    },
  },
  {
    id: "01960c29-0012-0000-0000-000000000012",
    title: "Специалист техподдержки LMS",
    location: "Санкт-Петербург",
    salaryFrom: 42000,
    salaryTo: 55000,
    workFormat: "remote",
    employmentType: "full-time",
    description:
      "Поддержка пользователей платформы дистанционного обучения, устранение проблем.",
    key_skills: [
      "Moodle",
      "Коммуникации",
      "Техническая поддержка",
      "Инструкции",
    ],
    employer: {
      id: "01960c2a-9938-74ff-8fe1-027402ef0b9b",
      name: "ВШЭ СПБ",
      avatarUrl:
        "https://papik.pro/grafic/uploads/posts/2023-04/1681593331_papik-pro-p-niu-vshe-logotip-vektor-6.jpg",
    },
  },
  {
    id: "01960c29-0013-0000-0000-000000000013",
    title: "Младший исследователь (социология)",
    location: "Екатеринбург",
    salaryFrom: 27000,
    salaryTo: 33000,
    workFormat: "hybrid",
    employmentType: "part-time",
    description:
      "Проведение опросов, обработка данных, участие в написании статей.",
    key_skills: ["SPSS", "Анализ", "Социология", "Научный стиль"],
    employer: {
      id: "01960c2a-5ad1-7651-80bf-54760bd9d55a",
      name: "УрФУ",
      avatarUrl:
        "https://img.phb123.com/uploads/allimg/220614/810-220614113K60-L-lp.png",
    },
  },
  {
    id: "01960c29-0014-0000-0000-000000000014",
    title: "Проектный координатор",
    location: "Санкт-Петербург",
    salaryFrom: 45000,
    salaryTo: 60000,
    workFormat: "hybrid",
    employmentType: "full-time",
    description:
      "Организация образовательных и исследовательских проектов университета.",
    key_skills: ["Менеджмент", "Тайминг", "Excel", "Документооборот"],
    employer: {
      id: "01960c2a-9938-74ff-8fe1-027402ef0b9b",
      name: "ВШЭ СПБ",
      avatarUrl:
        "https://papik.pro/grafic/uploads/posts/2023-04/1681593331_papik-pro-p-niu-vshe-logotip-vektor-6.jpg",
    },
  },
  {
    id: "01960c29-0015-0000-0000-000000000015",
    title: "Переводчик англоязычных курсов",
    location: "Екатеринбург",
    salaryFrom: 38000,
    salaryTo: 50000,
    workFormat: "remote",
    employmentType: "part-time",
    description:
      "Перевод методических материалов и видеолекций для MOOC-платформ.",
    key_skills: ["Английский", "Переводы", "Образование", "Терминология"],
    employer: {
      id: "01960c2a-5ad1-7651-80bf-54760bd9d55a",
      name: "УрФУ",
      avatarUrl:
        "https://img.phb123.com/uploads/allimg/220614/810-220614113K60-L-lp.png",
    },
  },
  {
    id: "01960c29-0016-0000-0000-000000000016",
    title: "SMM-специалист факультета",
    location: "Санкт-Петербург",
    salaryFrom: 35000,
    salaryTo: 45000,
    workFormat: "hybrid",
    employmentType: "full-time",
    description:
      "Ведение социальных сетей факультета, подготовка контента, публикации.",
    key_skills: ["Instagram", "Контент-план", "Копирайтинг", "SMM"],
    employer: {
      id: "01960c2a-9938-74ff-8fe1-027402ef0b9b",
      name: "ВШЭ СПБ",
      avatarUrl:
        "https://papik.pro/grafic/uploads/posts/2023-04/1681593331_papik-pro-p-niu-vshe-logotip-vektor-6.jpg",
    },
  },
  {
    id: "01960c29-0017-0000-0000-000000000017",
    title: "Ассистент преподавателя математики",
    location: "Екатеринбург",
    salaryFrom: 25000,
    salaryTo: 32000,
    workFormat: "onsite",
    employmentType: "part-time",
    description:
      "Проверка заданий, помощь в проведении семинаров по линейной алгебре.",
    key_skills: ["Математика", "LaTeX", "Преподавание", "Ответственность"],
    employer: {
      id: "01960c2a-5ad1-7651-80bf-54760bd9d55a",
      name: "УрФУ",
      avatarUrl:
        "https://img.phb123.com/uploads/allimg/220614/810-220614113K60-L-lp.png",
    },
  },
  {
    id: "01960c29-0018-0000-0000-000000000018",
    title: "Контент-аналитик научных публикаций",
    location: "Санкт-Петербург",
    salaryFrom: 40000,
    salaryTo: 50000,
    workFormat: "remote",
    employmentType: "part-time",
    description:
      "Поиск и структурирование публикаций преподавателей для рейтингов.",
    key_skills: ["Scopus", "Excel", "Google Scholar", "Базы данных"],
    employer: {
      id: "01960c2a-9938-74ff-8fe1-027402ef0b9b",
      name: "ВШЭ СПБ",
      avatarUrl:
        "https://papik.pro/grafic/uploads/posts/2023-04/1681593331_papik-pro-p-niu-vshe-logotip-vektor-6.jpg",
    },
  },
  {
    id: "01960c29-0019-0000-0000-000000000019",
    title: "Менеджер по партнёрствам с индустрией",
    location: "Екатеринбург",
    salaryFrom: 60000,
    salaryTo: 75000,
    workFormat: "hybrid",
    employmentType: "full-time",
    description:
      "Поиск индустриальных партнёров для практик и стажировок студентов.",
    key_skills: ["B2B", "Презентации", "Деловая переписка", "CRM"],
    employer: {
      id: "01960c2a-5ad1-7651-80bf-54760bd9d55a",
      name: "УрФУ",
      avatarUrl:
        "https://img.phb123.com/uploads/allimg/220614/810-220614113K60-L-lp.png",
    },
  },
  {
    id: "01960c29-0020-0000-0000-000000000020",
    title: "UX-исследователь образовательных сервисов",
    location: "Санкт-Петербург",
    salaryFrom: 50000,
    salaryTo: 65000,
    workFormat: "remote",
    employmentType: "full-time",
    description: "Проведение UX-интервью, анализ поведения студентов в LMS.",
    key_skills: ["UX research", "Интервью", "Фокус-группы", "Прототипирование"],
    employer: {
      id: "01960c2a-9938-74ff-8fe1-027402ef0b9b",
      name: "ВШЭ СПБ",
      avatarUrl:
        "https://papik.pro/grafic/uploads/posts/2023-04/1681593331_papik-pro-p-niu-vshe-logotip-vektor-6.jpg",
    },
  },
];
