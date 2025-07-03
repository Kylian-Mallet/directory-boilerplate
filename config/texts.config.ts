/**
 * Centralized site text configuration.
 * Modify these values to change static text across the site.
 */

// Type definitions for text configuration
export interface SiteTexts {
  // Common UI elements
  common: {
    skipToContent: string;
    loading: string;
    error: string;
    noResults: string;
    showMore: string;
    showLess: string;
    close: string;
    cancel: string;
    confirm: string;
    save: string;
    edit: string;
    delete: string;
    back: string;
    next: string;
    previous: string;
    home: string;
    menu: string;
  };

  // Navigation
  navigation: {
    home: string;
    search: string;
    regions: string;
    categories: string;
    contact: string;
    about: string;
    backToHome: string;
    backToRegion: string;
    backToCity: string;
    backToCategory: string;
    explore: string;
    discover: string;
    viewDetails: string;
    visitSite: string;
    learnMore: string;
  };

  // Search functionality
  search: {
    title: string;
    placeholder: string;
    filterByCategory: string;
    clearFilters: string;
    resultsFound: string;
    resultFound: string;
    noResultsTitle: string;
    noResultsMessage: string;
    searchFeatures: {
      quickSearch: {
        title: string;
        description: string;
      };
      advancedFilters: {
        title: string;
        description: string;
      };
      instantResults: {
        title: string;
        description: string;
      };
    };
    intelligentSearch: string;
    quickSearchDescription: string;
  };

  // Pagination
  pagination: {
    previous: string;
    next: string;
    page: string;
    of: string;
    goToPage: string;
  };

  // Forms and inputs
  forms: {
    required: string;
    optional: string;
    email: string;
    phone: string;
    name: string;
    message: string;
    subject: string;
    submit: string;
    reset: string;
    search: string;
    filter: string;
  };

  // Error messages
  errors: {
    pageNotFound: {
      title: string;
      message: string;
      backButton: string;
    };
    generalError: {
      title: string;
      message: string;
      tryAgain: string;
    };
    networkError: {
      title: string;
      message: string;
    };
    loadingError: {
      title: string;
      message: string;
    };
  };

  // Hero section
  hero: {
    title: string;
    description: string;
    primaryButton: string;
    secondaryButton: string;
    stats: {
      establishments: string;
      regions: string;
      averageRating: string;
      available: string;
      free: string;
    };
  };

  // Categories and regions
  categories: {
    title: string;
    category: string;
    region: string;
    city: string;
    establishment: string;
    popular: string;
    trending: string;
    cities: string;
    establishments: string;
  };

  // Listing/Business related
  listing: {
    contactTitle: string;
    affiliateCta: string;
    infoTitle: string;
    bottomCta: string;
    openingHours: string;
    services: string;
    equipment: string;
    rating: string;
    reviews: string;
    address: string;
    phone: string;
    website: string;
    readyToDiscover: string;
    visitOfficialSite: string;
    practicalInfo: string;
    whyChooseUs: string;
    about: string;
    type: string;
    city: string;
    region: string;
    note: string;
    qualityPartner: string;
    verifiedEstablishments: string;
    authenticReviews: string;
    updatedDaily: string;
    visitSite: string;
    discoverNow: string;
    bookOnline: string;
    getDirections: string;
    callNow: string;
  };

  // Features and benefits
  features: {
    whyChooseUs: string;
    qualityGuaranteed: {
      title: string;
      description: string;
    };
    completeInformation: {
      title: string;
      description: string;
    };
    nationalCoverage: {
      title: string;
      description: string;
    };
    advancedSearch: {
      title: string;
      description: string;
    };
    trustedGuide: string;
  };

  // Footer
  footer: {
    copyright: string;
    navigation: string;
    contact: string;
    legal: {
      terms: string;
      privacy: string;
      legalNotice: string;
    };
    contactInfo: {
      country: string;
      email: string;
      phone: string;
    };
    trustIndicators: {
      verified: string;
      authentic: string;
      updated: string;
    };
  };

  // Audio player
  audio: {
    play: string;
    pause: string;
    listenToStory: string;
    currentTime: string;
    duration: string;
  };

  // Tag filtering
  tags: {
    clearAll: string;
    filterByTag: string;
    selectedFilters: string;
    allCategories: string;
  };

  // Content grid and cards
  content: {
    viewDetails: string;
    readMore: string;
    learnMore: string;
    contact: string;
    visit: string;
    book: string;
    call: string;
    email: string;
    directions: string;
    share: string;
    favorite: string;
    review: string;
  };

  // Stats and metrics
  stats: {
    establishments: string;
    regions: string;
    cities: string;
    reviews: string;
    rating: string;
    coverage: string;
    satisfaction: string;
    partners: string;
  };

  // Time and dates
  time: {
    openNow: string;
    closedNow: string;
    opensAt: string;
    closesAt: string;
    hours: string;
    minutes: string;
    today: string;
    tomorrow: string;
    weekdays: string;
    weekend: string;
  };

  // SEO content (keeping existing structure)
  seo: {
    paragraph1: string;
    paragraph2: string;
  };

  // Legacy support (keeping existing structure)
  tagPage: {
    back: string;
    heading: string;
  };

  notFound: {
    title: string;
    message: string;
    back: string;
  };

  regions: {
    title: string;
  };

  cities: {
    title: string;
  };
}

export const siteTexts: SiteTexts = {
  // Common UI elements
  common: {
    skipToContent: 'Passer au contenu principal',
    loading: 'Chargement...',
    error: 'Erreur',
    noResults: 'Aucun résultat',
    showMore: 'Voir plus',
    showLess: 'Voir moins',
    close: 'Fermer',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    save: 'Enregistrer',
    edit: 'Modifier',
    delete: 'Supprimer',
    back: 'Retour',
    next: 'Suivant',
    previous: 'Précédent',
    home: 'Accueil',
    menu: 'Menu',
  },

  // Navigation
  navigation: {
    home: 'Accueil',
    search: 'Rechercher',
    regions: 'Régions',
    categories: 'Catégories',
    contact: 'Contact',
    about: 'À propos',
    backToHome: 'Retour à l\'accueil',
    backToRegion: 'Retour à',
    backToCity: 'Retour à',
    backToCategory: 'Retour à',
    explore: 'Explorer',
    discover: 'Découvrir',
    viewDetails: 'Voir détails',
    visitSite: 'Visiter le site',
    learnMore: 'En savoir plus',
  },

  // Search functionality
  search: {
    title: 'Rechercher dans l\'annuaire',
    placeholder: 'Rechercher...',
    filterByCategory: 'Filtrer par catégorie',
    clearFilters: 'Effacer les filtres',
    resultsFound: 'résultats trouvés',
    resultFound: 'résultat trouvé',
    noResultsTitle: 'Aucun résultat trouvé',
    noResultsMessage: 'Essayez de modifier vos critères de recherche ou explorez nos catégories populaires.',
    searchFeatures: {
      quickSearch: {
        title: 'Recherche Rapide',
        description: 'Trouvez instantanément ce que vous cherchez par nom, adresse ou service',
      },
      advancedFilters: {
        title: 'Filtres Avancés',
        description: 'Affinez vos résultats par catégorie, services et équipements',
      },
      instantResults: {
        title: 'Résultats Instantanés',
        description: 'Obtenez des résultats pertinents en temps réel pendant que vous tapez',
      },
    },
    intelligentSearch: 'Recherche Intelligente',
    quickSearchDescription: 'Trouvez rapidement les meilleurs établissements grâce à notre système de recherche avancé et nos filtres intelligents',
  },

  // Pagination
  pagination: {
    previous: 'Précédent',
    next: 'Suivant',
    page: 'Page',
    of: 'sur',
    goToPage: 'Aller à la page',
  },

  // Forms and inputs
  forms: {
    required: 'Obligatoire',
    optional: 'Optionnel',
    email: 'Email',
    phone: 'Téléphone',
    name: 'Nom',
    message: 'Message',
    subject: 'Sujet',
    submit: 'Envoyer',
    reset: 'Réinitialiser',
    search: 'Rechercher',
    filter: 'Filtrer',
  },

  // Error messages
  errors: {
    pageNotFound: {
      title: 'Page non trouvée',
      message: 'La page que vous recherchez n\'existe pas ou a été déplacée.',
      backButton: 'Retour à l\'accueil',
    },
    generalError: {
      title: 'Une erreur s\'est produite',
      message: 'Quelque chose s\'est mal passé. Veuillez réessayer.',
      tryAgain: 'Réessayer',
    },
    networkError: {
      title: 'Erreur de connexion',
      message: 'Vérifiez votre connexion internet et réessayez.',
    },
    loadingError: {
      title: 'Erreur de chargement',
      message: 'Impossible de charger le contenu.',
    },
  },

  // Hero section
  hero: {
    title: 'Bienvenue dans notre annuaire',
    description: 'Découvrez notre annuaire complet, conçu pour vous aider à trouver rapidement les ressources dont vous avez besoin. Toutes les catégories sont soigneusement sélectionnées.',
    primaryButton: 'Découvrir',
    secondaryButton: 'Explorer les régions',
    stats: {
      establishments: 'Établissements',
      regions: 'Régions',
      averageRating: 'Note moyenne',
      available: 'Disponible',
      free: 'Gratuit',
    },
  },

  // Categories and regions
  categories: {
    title: 'Catégories',
    category: 'Catégorie',
    region: 'Région',
    city: 'Ville',
    establishment: 'Établissement',
    popular: 'Populaire',
    trending: 'Tendance',
    cities: 'villes',
    establishments: 'établissements',
  },

  // Listing/Business related
  listing: {
    contactTitle: 'Contact',
    affiliateCta: 'En savoir plus',
    infoTitle: 'Informations',
    bottomCta: 'Visiter le site',
    openingHours: 'Horaires d\'ouverture',
    services: 'Services',
    equipment: 'Équipements',
    rating: 'Note',
    reviews: 'avis',
    address: 'Adresse',
    phone: 'Téléphone',
    website: 'Site web',
    readyToDiscover: 'Prêt à découvrir',
    visitOfficialSite: 'Visitez leur site officiel pour plus d\'informations et réservations',
    practicalInfo: 'Informations pratiques',
    whyChooseUs: 'Pourquoi nous choisir ?',
    about: 'À propos de',
    type: 'Type',
    city: 'Ville',
    region: 'Région',
    note: 'Note',
    qualityPartner: 'fait partie de notre sélection d\'établissements de qualité. Nous vérifions régulièrement nos partenaires pour vous garantir une expérience exceptionnelle.',
    verifiedEstablishments: 'Établissements vérifiés',
    authenticReviews: 'Avis authentiques',
    updatedDaily: 'Mis à jour quotidiennement',
    visitSite: 'Découvrir maintenant',
    discoverNow: 'Découvrir maintenant',
    bookOnline: 'Réserver en ligne',
    getDirections: 'Voir l\'itinéraire',
    callNow: 'Appeler maintenant',
  },

  // Features and benefits
  features: {
    whyChooseUs: 'Pourquoi nous choisir ?',
    qualityGuaranteed: {
      title: 'Qualité Garantie',
      description: 'Tous nos établissements sont soigneusement sélectionnés et vérifiés',
    },
    completeInformation: {
      title: 'Informations Complètes',
      description: 'Retrouvez pour chaque établissement les coordonnées, horaires, services, équipements et avis clients pour faire le meilleur choix.',
    },
    nationalCoverage: {
      title: 'Couverture Nationale',
      description: 'Découvrez des établissements dans toute la France',
    },
    advancedSearch: {
      title: 'Recherche Avancée',
      description: 'Trouvez exactement ce que vous cherchez avec nos filtres intelligents',
    },
    trustedGuide: 'Votre guide de confiance',
  },

  // Footer
  footer: {
    copyright: 'Tous droits réservés.',
    navigation: 'Navigation',
    contact: 'Contact',
    legal: {
      terms: 'Conditions d\'utilisation',
      privacy: 'Politique de confidentialité',
      legalNotice: 'Mentions légales',
    },
    contactInfo: {
      country: 'France',
      email: 'contact@example.com',
      phone: '+33 1 23 45 67 89',
    },
    trustIndicators: {
      verified: 'Établissements vérifiés',
      authentic: 'Avis authentiques',
      updated: 'Mis à jour quotidiennement',
    },
  },

  // Audio player
  audio: {
    play: 'Lecture',
    pause: 'Pause',
    listenToStory: 'Écouter l\'histoire',
    currentTime: 'Temps actuel',
    duration: 'Durée',
  },

  // Tag filtering
  tags: {
    clearAll: 'Effacer tous les filtres',
    filterByTag: 'Filtrer par tag',
    selectedFilters: 'Filtres sélectionnés',
    allCategories: 'Toutes les catégories',
  },

  // Content grid and cards
  content: {
    viewDetails: 'Voir détails',
    readMore: 'Lire la suite',
    learnMore: 'En savoir plus',
    contact: 'Contacter',
    visit: 'Visiter',
    book: 'Réserver',
    call: 'Appeler',
    email: 'Email',
    directions: 'Itinéraire',
    share: 'Partager',
    favorite: 'Favoris',
    review: 'Avis',
  },

  // Stats and metrics
  stats: {
    establishments: 'établissements référencés',
    regions: 'régions couvertes',
    cities: 'villes',
    reviews: 'avis',
    rating: 'note',
    coverage: 'couverture',
    satisfaction: 'satisfaction',
    partners: 'partenaires',
  },

  // Time and dates
  time: {
    openNow: 'Ouvert maintenant',
    closedNow: 'Fermé maintenant',
    opensAt: 'Ouvre à',
    closesAt: 'Ferme à',
    hours: 'heures',
    minutes: 'minutes',
    today: 'Aujourd\'hui',
    tomorrow: 'Demain',
    weekdays: 'En semaine',
    weekend: 'Week-end',
  },

  // SEO content (keeping existing structure)
  seo: {
    paragraph1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada.',
    paragraph2: 'Aliquam tincidunt metus nec arcu cursus, vel tempor risus ullamcorper. Integer sit amet eros a justo fermentum vehicula.',
  },

  // Legacy support (keeping existing structure)
  tagPage: {
    back: '← Retour à l\'accueil',
    heading: 'Contenu tagué avec',
  },

  notFound: {
    title: '404',
    message: 'Page non trouvée',
    back: 'Retour à l\'accueil',
  },

  regions: {
    title: 'Régions',
  },

  cities: {
    title: 'Villes',
  },
};