import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      login: "Login",
      account: "Account",
      myApplications: "My Applications",
      logout: "Logout",
      salary: {
        notSpecified: "Salary not specified",
        from: "from",
        to: "to",
      },
      vacancy: {
        details: "Details",
        loading: "Loading...",
        salary: "Salary",
        workFormat: "Work format",
        workFormatOptions: {
          onsite: "Onsite",
          remote: "Remote",
          hybrid: "Hybrid",
        },
        employmentType: "Employment type",
        employmentTypeOptions: {
          partTime: "Part-time",
          fullTime: "Full-time",
          internship: "Internship",
          temporary: "Temporary",
        },
        keySkills: "Key skills",
        coverLetter: "Cover letter",
        updateCoverLetter: "Update cover letter",
        apply: "Apply for vacancy",
        applicationStatus: "Application status",
        status: {
          pending: "Pending",
          reviewed: "Reviewed",
          accepted: "Accepted",
          rejected: "Rejected",
          unknown: "Unknown",
        },
        authRequired: "Only authenticated users can apply",
      },
      employer: {
        vacancies: "Company Vacancies",
        notFound: "Employer not found",
        unknownError: "Unknown error",
      },
      home: {
        availableVacancies: "Available Vacancies",
        searchPlaceholder: "Search by title, department, or employer",
        salaryFrom: "Salary From",
        workFormat: "Work Format",
        workFormatOptions: {
          onsite: "Onsite",
          remote: "Remote",
          hybrid: "Hybrid",
        },
        employmentType: "Employment Type",
        employmentTypeOptions: {
          partTime: "Part-time",
          fullTime: "Full-time",
          internship: "Internship",
          temporary: "Temporary",
        },
        clearFilters: "Clear All",
      },
      userApplications: {
        title: "My Applications",
        authRequired: "Only authenticated users can view applications",
      },
    },
  },
  ru: {
    translation: {
      login: "Войти",
      account: "Аккаунт",
      myApplications: "Мои отклики",
      logout: "Выйти",
      salary: {
        notSpecified: "Зарплата не указана",
        from: "от",
        to: "до",
      },
      vacancy: {
        details: "Подробнее",
        loading: "Загрузка...",
        salary: "Зарплата",
        workFormat: "Формат работы",
        workFormatOptions: {
          onsite: "Офис",
          remote: "Удалёнка",
          hybrid: "Гибрид",
        },
        employmentType: "Тип занятости",
        employmentTypeOptions: {
          partTime: "Частичная занятость",
          fullTime: "Полная занятость",
          internship: "Стажировка",
          temporary: "Подработка",
        },
        keySkills: "Ключевые навыки",
        coverLetter: "Сопроводительное письмо",
        updateCoverLetter: "Изменить сопроводительное письмо",
        apply: "Откликнуться на вакансию",
        applicationStatus: "Статус отклика",
        status: {
          pending: "В ожидании",
          reviewed: "Просмотрено",
          accepted: "Принято",
          rejected: "Отклонено",
          unknown: "Неизвестно",
        },
        authRequired: "Откликнуться может только авторизованный пользователь",
      },
      employer: {
        vacancies: "Вакансии компании",
        notFound: "Работодатель не найден",
        unknownError: "Неизвестная ошибка",
      },
      home: {
        availableVacancies: "Доступные вакансии",
        searchPlaceholder: "Поиск по названию, отделу или работодателю",
        salaryFrom: "Минимальная зарплата",
        workFormat: "Формат работы",
        workFormatOptions: {
          onsite: "Офис",
          remote: "Удалёнка",
          hybrid: "Гибрид",
        },
        employmentType: "Тип занятости",
        employmentTypeOptions: {
          partTime: "Частичная занятость",
          fullTime: "Полная занятость",
          internship: "Стажировка",
          temporary: "Подработка",
        },
        clearFilters: "Очистить все",
      },
      userApplications: {
        title: "Мои отклики",
        authRequired:
          "Просмотреть отклики может только авторизованный пользователь",
      },
    },
  },
  fr: {
    translation: {
      login: "Se connecter",
      account: "Compte",
      myApplications: "Mes candidatures",
      logout: "Se déconnecter",
      salary: {
        notSpecified: "Salaire non spécifié",
        from: "de",
        to: "jusqu'à",
      },
      vacancy: {
        details: "Détails",
        loading: "Chargement...",
        salary: "Salaire",
        workFormat: "Mode de travail",
        workFormatOptions: {
          onsite: "Bureau",
          remote: "Télétravail",
          hybrid: "Hybride",
        },
        employmentType: "Type d'emploi",
        employmentTypeOptions: {
          partTime: "Temps partiel",
          fullTime: "Temps plein",
          internship: "Stage",
          temporary: "Travail temporaire",
        },
        keySkills: "Compétences clés",
        coverLetter: "Lettre de motivation",
        updateCoverLetter: "Modifier la lettre de motivation",
        apply: "Postuler pour cette offre",
        applicationStatus: "Statut de la candidature",
        status: {
          pending: "En attente",
          reviewed: "Examiné",
          accepted: "Accepté",
          rejected: "Rejeté",
          unknown: "Inconnu",
        },
        authRequired: "Seuls les utilisateurs authentifiés peuvent postuler",
      },
      employer: {
        vacancies: "Offres de l'entreprise",
        notFound: "Employeur non trouvé",
        unknownError: "Erreur inconnue",
      },
      home: {
        availableVacancies: "Offres disponibles",
        searchPlaceholder: "Rechercher par titre, département ou employeur",
        salaryFrom: "Salaire minimum",
        workFormat: "Format de travail",
        workFormatOptions: {
          onsite: "Bureau",
          remote: "Télétravail",
          hybrid: "Hybride",
        },
        employmentType: "Type d'emploi",
        employmentTypeOptions: {
          partTime: "Temps partiel",
          fullTime: "Temps plein",
          internship: "Stage",
          temporary: "Travail temporaire",
        },
        clearFilters: "Tout effacer",
      },
      userApplications: {
        title: "Mes candidatures",
        authRequired:
          "Seuls les utilisateurs authentifiés peuvent voir les candidatures",
      },
    },
  },
};

const supported = ["ru", "en", "fr"];

const getSavedOrBrowserLang = (): string => {
  try {
    const saved =
      typeof window !== "undefined" ? localStorage.getItem("i18nextLng") : null;
    if (saved) {
      const short = saved.split("-")[0];
      if (supported.includes(short)) return short;
    }

    if (typeof navigator !== "undefined" && navigator.language) {
      const nav = navigator.language.split("-")[0];
      if (supported.includes(nav)) return nav;
    }
  } catch (e) {}

  return "ru";
};

i18n.use(initReactI18next).init({
  resources,
  lng: getSavedOrBrowserLang(),
  fallbackLng: "ru",
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

export default i18n;
