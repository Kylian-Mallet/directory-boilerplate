/**
 * SEO Configuration File
 * 
 * This file centralizes all SEO-related content for the website with AI-friendly documentation.
 * Each content block includes detailed context, target audience, required variables, and keywords.
 * 
 * Template Variables:
 * - ${category}: Business category (e.g., "restaurants", "hotels")
 * - ${region}: French region name (e.g., "Île-de-France", "Provence-Alpes-Côte d'Azur")
 * - ${city}: City name (e.g., "Paris", "Lyon", "Marseille")
 * - ${listing}: Individual business name
 * - ${count}: Number of items/establishments
 * - ${rating}: Average rating (e.g., "4.8")
 * - ${siteName}: Website/directory name
 */

import { Metadata } from 'next';

// Type definitions for SEO content structure
export interface SEOContent {
  metadata: {
    titles: SEOTitles;
    descriptions: SEODescriptions;
    keywords: SEOKeywords;
  };
  content: {
    homepage: HomepageSEO;
    categoryPages: CategoryPageSEO;
    regionPages: RegionPageSEO;
    cityPages: CityPageSEO;
    listingPages: ListingPageSEO;
  };
  structuredData: StructuredDataTemplates;
}

export interface SEOTitles {
  homepage: string;
  categoryPage: string;
  regionPage: string;
  cityPage: string;
  listingPage: string;
  notFound: string;
}

export interface SEODescriptions {
  homepage: string;
  categoryPage: string;
  regionPage: string;
  cityPage: string;
  listingPage: string;
}

export interface SEOKeywords {
  homepage: string[];
  categoryPage: string[];
  regionPage: string[];
  cityPage: string[];
  listingPage: string[];
}

export interface HomepageSEO {
  heroSection: {
    title: string;
    subtitle: string;
    description: string;
  };
  featuresSection: {
    title: string;
    subtitle: string;
    features: Array<{
      title: string;
      description: string;
    }>;
  };
  aboutSection: {
    title: string;
    paragraphs: string[];
  };
}

export interface CategoryPageSEO {
  heroSection: {
    title: string;
    subtitle: string;
    description: string;
  };
  contentBlocks: {
    introduction: {
      title: string;
      paragraphs: string[];
    };
    benefits: {
      title: string;
      paragraphs: string[];
    };
  };
}

export interface RegionPageSEO {
  heroSection: {
    title: string;
    subtitle: string;
    description: string;
  };
  contentBlocks: {
    guide: {
      title: string;
      paragraphs: string[];
    };
    discovery: {
      title: string;
      sections: Array<{
        title: string;
        content: string;
      }>;
    };
  };
}

export interface CityPageSEO {
  heroSection: {
    title: string;
    subtitle: string;
    description: string;
  };
  contentBlocks: {
    selection: {
      title: string;
      paragraphs: string[];
    };
    whyChoose: {
      title: string;
      sections: Array<{
        title: string;
        content: string;
      }>;
    };
  };
}

export interface ListingPageSEO {
  contentBlocks: {
    about: {
      title: string;
      sections: Array<{
        title: string;
        content: string;
      }>;
    };
    callToAction: {
      title: string;
      subtitle: string;
    };
  };
}

export interface StructuredDataTemplates {
  organization: any;
  website: any;
  breadcrumbList: any;
  localBusiness: any;
  collectionPage: any;
}

/**
 * Main SEO Configuration Object
 * 
 * This configuration provides comprehensive SEO content for all page types
 * with proper templating for dynamic content insertion.
 */
export const seoConfig: SEOContent = {
  metadata: {
    titles: {
      /**
       * Homepage Title Template
       * Purpose: Main landing page SEO title
       * Target: Users searching for directory services in France
       * Keywords: Directory name, France, quality, establishments
       * Variables: ${siteName}
       */
      homepage: "${siteName} - Annuaire des Meilleurs Établissements en France",

      /**
       * Category Page Title Template
       * Purpose: Category overview page SEO title
       * Target: Users searching for specific business types
       * Keywords: Category name, regions, establishments, France
       * Variables: ${category}, ${count}
       */
      categoryPage: "${category} - Annuaire par Régions | ${count}+ Établissements en France",

      /**
       * Region Page Title Template
       * Purpose: Regional directory page SEO title
       * Target: Users searching for businesses in specific regions
       * Keywords: Category, region name, cities, establishments
       * Variables: ${category}, ${region}, ${count}
       */
      regionPage: "${category} en ${region} - ${count} Villes | Annuaire Complet",

      /**
       * City Page Title Template
       * Purpose: City-specific directory page SEO title
       * Target: Users searching for local businesses in specific cities
       * Keywords: Category, city name, region, establishments, local
       * Variables: ${category}, ${city}, ${region}, ${count}
       */
      cityPage: "${category} à ${city} (${region}) - ${count} Établissements Sélectionnés",

      /**
       * Individual Listing Page Title Template
       * Purpose: Business-specific page SEO title
       * Target: Users searching for specific businesses or services
       * Keywords: Business name, type, city, region, contact
       * Variables: ${listing}, ${type}, ${city}, ${region}
       */
      listingPage: "${listing} - ${type} à ${city} (${region}) | Contact & Avis",

      /**
       * 404 Error Page Title
       * Purpose: Error page SEO title
       * Target: Users who encounter broken links
       * Keywords: Error, not found, directory
       */
      notFound: "Page Non Trouvée - ${siteName}"
    },

    descriptions: {
      /**
       * Homepage Meta Description
       * Purpose: Main landing page search snippet
       * Target: General audience seeking quality establishments
       * Tone: Welcoming, professional, trustworthy
       * Keywords: Directory, France, quality, verified, comprehensive
       * Length: 150-160 characters optimal
       */
      homepage: "Découvrez notre annuaire complet des meilleurs établissements en France. Sélection rigoureuse, avis vérifiés, informations complètes. Trouvez rapidement ce que vous cherchez.",

      /**
       * Category Page Meta Description Template
       * Purpose: Category overview search snippet
       * Target: Users interested in specific business categories
       * Tone: Informative, comprehensive, quality-focused
       * Keywords: Category, regions, quality, selection, France
       * Variables: ${category}, ${count}, ${region}
       */
      categoryPage: "Trouvez les meilleurs ${category} dans toute la France. ${count}+ établissements sélectionnés, répartis dans ${region} régions. Avis clients, coordonnées et informations détaillées.",

      /**
       * Region Page Meta Description Template
       * Purpose: Regional directory search snippet
       * Target: Users seeking businesses in specific regions
       * Tone: Local expertise, comprehensive coverage
       * Keywords: Region name, category, cities, local, quality
       * Variables: ${category}, ${region}, ${count}
       */
      regionPage: "Découvrez les meilleurs ${category} en ${region}. ${count} villes couvertes avec une sélection d'établissements de qualité. Coordonnées, horaires, services et avis clients.",

      /**
       * City Page Meta Description Template
       * Purpose: City-specific directory search snippet
       * Target: Local users and visitors to specific cities
       * Tone: Local authority, detailed information
       * Keywords: City name, region, category, local, verified
       * Variables: ${category}, ${city}, ${region}, ${count}
       */
      cityPage: "Les meilleurs ${category} à ${city} en ${region}. ${count} établissements vérifiés avec avis, coordonnées, horaires et services. Guide local complet et à jour.",

      /**
       * Listing Page Meta Description Template
       * Purpose: Individual business search snippet
       * Target: Users seeking specific business information
       * Tone: Detailed, informative, action-oriented
       * Keywords: Business name, services, contact, location, reviews
       * Variables: ${listing}, ${city}, ${type}, ${address}, ${rating}
       */
      listingPage: "${listing} à ${city} : ${type} de qualité. Adresse : ${address}. Note : ${rating}/5. Coordonnées, horaires, services et avis clients détaillés."
    },

    keywords: {
      /**
       * Homepage SEO Keywords
       * Purpose: Main page search optimization
       * Focus: Brand, directory, France, quality, comprehensive
       */
      homepage: [
        "annuaire France",
        "établissements qualité",
        "directory France",
        "avis vérifiés",
        "coordonnées établissements",
        "guide France",
        "sélection qualité",
        "annuaire complet"
      ],

      /**
       * Category Page SEO Keywords Template
       * Purpose: Category-specific search optimization
       * Focus: Business category, regions, quality, selection
       * Variables: Include ${category} in keyword variations
       */
      categoryPage: [
        "${category} France",
        "${category} régions",
        "meilleurs ${category}",
        "annuaire ${category}",
        "${category} qualité",
        "sélection ${category}",
        "guide ${category}",
        "${category} avis"
      ],

      /**
       * Region Page SEO Keywords Template
       * Purpose: Regional search optimization
       * Focus: Region name, category, local, cities
       * Variables: Include ${region} and ${category} in variations
       */
      regionPage: [
        "${category} ${region}",
        "${region} ${category}",
        "villes ${region}",
        "${category} local ${region}",
        "guide ${region}",
        "annuaire ${region}",
        "${region} établissements",
        "${category} région ${region}"
      ],

      /**
       * City Page SEO Keywords Template
       * Purpose: City-specific search optimization
       * Focus: City name, region, category, local services
       * Variables: Include ${city}, ${region}, and ${category}
       */
      cityPage: [
        "${category} ${city}",
        "${city} ${category}",
        "${city} ${region}",
        "${category} local ${city}",
        "guide ${city}",
        "annuaire ${city}",
        "${city} établissements",
        "${category} près ${city}"
      ],

      /**
       * Listing Page SEO Keywords Template
       * Purpose: Business-specific search optimization
       * Focus: Business name, services, location, contact
       * Variables: Include ${listing}, ${city}, ${type}
       */
      listingPage: [
        "${listing}",
        "${listing} ${city}",
        "${type} ${city}",
        "${listing} contact",
        "${listing} avis",
        "${listing} horaires",
        "${type} ${region}",
        "${listing} adresse"
      ]
    }
  },

  content: {
    homepage: {
      heroSection: {
        /**
         * Homepage Hero Title
         * Purpose: Main headline for homepage hero section
         * Target: All visitors to establish value proposition
         * Tone: Welcoming, authoritative, comprehensive
         * Keywords: Directory, France, quality, comprehensive
         */
        title: "Votre Guide de Confiance pour les Meilleurs Établissements de France",

        /**
         * Homepage Hero Subtitle
         * Purpose: Supporting headline for hero section
         * Target: Visitors seeking quality and reliability
         * Tone: Professional, trustworthy, comprehensive
         * Keywords: Selection, quality, verified, comprehensive
         */
        subtitle: "Sélection Rigoureuse • Avis Vérifiés • Informations Complètes",

        /**
         * Homepage Hero Description
         * Purpose: Detailed value proposition for hero section
         * Target: First-time visitors needing context
         * Tone: Informative, welcoming, benefit-focused
         * Keywords: Directory, quality, France, selection, information
         */
        description: "Découvrez notre annuaire soigneusement curé des meilleurs établissements français. Chaque adresse est vérifiée, chaque information mise à jour, pour vous garantir une expérience exceptionnelle où que vous soyez en France."
      },

      featuresSection: {
        /**
         * Homepage Features Section Title
         * Purpose: Introduce key platform benefits
         * Target: Users evaluating the platform
         * Tone: Confident, benefit-focused
         */
        title: "Pourquoi Choisir Notre Annuaire ?",

        /**
         * Homepage Features Section Subtitle
         * Purpose: Support features title with value proposition
         * Target: Users comparing directory options
         * Tone: Professional, modern, user-focused
         */
        subtitle: "Une plateforme moderne conçue pour vous faire gagner du temps et vous garantir la qualité",

        features: [
          {
            /**
             * Feature 1: Quality Assurance
             * Purpose: Emphasize quality control and verification
             * Target: Users concerned about reliability
             * Keywords: Quality, verified, selection, standards
             */
            title: "Sélection Rigoureuse",
            description: "Chaque établissement est soigneusement évalué selon nos critères de qualité stricts. Nous ne référençons que les meilleures adresses pour vous garantir satisfaction et confiance."
          },
          {
            /**
             * Feature 2: Comprehensive Information
             * Purpose: Highlight completeness of information
             * Target: Users needing detailed business information
             * Keywords: Complete, information, details, practical
             */
            title: "Informations Complètes",
            description: "Coordonnées, horaires, services, équipements, avis clients... Toutes les informations dont vous avez besoin pour faire le bon choix, centralisées en un seul endroit."
          },
          {
            /**
             * Feature 3: National Coverage
             * Purpose: Emphasize geographic scope
             * Target: Users traveling or seeking nationwide coverage
             * Keywords: France, national, coverage, regions
             */
            title: "Couverture Nationale",
            description: "De la Bretagne à la Côte d'Azur, de l'Alsace aux Pyrénées, découvrez les meilleures adresses dans toutes les régions de France métropolitaine."
          }
        ]
      },

      aboutSection: {
        /**
         * Homepage About Section Title
         * Purpose: Establish trust and authority
         * Target: Users seeking credibility information
         * Tone: Trustworthy, professional, experienced
         */
        title: "Votre Partenaire de Confiance Depuis Des Années",

        paragraphs: [
          /**
           * About Paragraph 1: Mission and Values
           * Purpose: Explain platform mission and commitment
           * Target: Users wanting to understand company values
           * Tone: Professional, committed, quality-focused
           * Keywords: Mission, quality, France, commitment, excellence
           */
          "Notre mission est simple : vous connecter avec les meilleurs établissements de France. Depuis notre création, nous nous engageons à maintenir les plus hauts standards de qualité dans notre sélection, en privilégiant l'excellence du service et la satisfaction client.",

          /**
           * About Paragraph 2: Process and Verification
           * Purpose: Explain quality assurance process
           * Target: Users concerned about reliability and accuracy
           * Tone: Detailed, professional, trustworthy
           * Keywords: Verification, process, quality, standards, updates
           */
          "Chaque établissement de notre annuaire fait l'objet d'une vérification approfondie. Nos équipes contrôlent régulièrement les informations, collectent les avis clients authentiques et s'assurent que nos standards de qualité sont respectés. Cette démarche rigoureuse nous permet de vous offrir un service fiable et à jour."
        ]
      }
    },

    categoryPages: {
      heroSection: {
        /**
         * Category Page Hero Title Template
         * Purpose: Category-specific landing page headline
         * Target: Users searching for specific business types
         * Tone: Authoritative, comprehensive, quality-focused
         * Variables: ${category}
         * Keywords: Category name, France, best, directory
         */
        title: "Les Meilleurs ${category} de France",

        /**
         * Category Page Hero Subtitle Template
         * Purpose: Supporting headline emphasizing coverage
         * Target: Users wanting comprehensive regional coverage
         * Tone: Comprehensive, professional, nationwide
         * Variables: ${count}
         * Keywords: Regions, establishments, selection, quality
         */
        subtitle: "Découvrez ${count}+ Établissements Sélectionnés dans Toutes les Régions",

        /**
         * Category Page Hero Description Template
         * Purpose: Detailed value proposition for category
         * Target: Users evaluating category-specific offerings
         * Tone: Informative, quality-focused, comprehensive
         * Variables: ${category}, ${count}
         * Keywords: Selection, quality, France, comprehensive, verified
         */
        description: "Notre sélection des meilleurs ${category} vous guide vers l'excellence dans toute la France. ${count}+ établissements rigoureusement choisis, avec informations complètes, avis vérifiés et coordonnées à jour."
      },

      contentBlocks: {
        introduction: {
          /**
           * Category Introduction Title Template
           * Purpose: Introduce category-specific benefits
           * Target: Users wanting category expertise
           * Tone: Expert, authoritative, helpful
           * Variables: ${category}
           */
          title: "Pourquoi Choisir Notre Annuaire de ${category} ?",

          paragraphs: [
            /**
             * Category Introduction Paragraph 1
             * Purpose: Establish category expertise and selection process
             * Target: Users wanting quality assurance
             * Tone: Professional, expert, quality-focused
             * Variables: ${category}, ${count}
             * Keywords: Selection, expertise, quality, standards, France
             */
            "Notre expertise dans le domaine des ${category} nous permet de vous proposer une sélection exceptionnelle de ${count}+ établissements à travers la France. Chaque adresse est choisie selon des critères stricts de qualité, de service et de satisfaction client.",

            /**
             * Category Introduction Paragraph 2
             * Purpose: Explain comprehensive information and benefits
             * Target: Users needing detailed business information
             * Tone: Helpful, detailed, service-oriented
             * Variables: ${category}
             * Keywords: Information, complete, services, contact, reviews
             */
            "Que vous recherchiez des ${category} pour un besoin ponctuel ou régulier, notre annuaire vous fournit toutes les informations essentielles : coordonnées complètes, horaires d'ouverture, services proposés, équipements disponibles et avis clients authentiques."
          ]
        },

        benefits: {
          /**
           * Category Benefits Title Template
           * Purpose: Highlight category-specific advantages
           * Target: Users comparing directory options
           * Tone: Confident, benefit-focused, comprehensive
           * Variables: ${category}
           */
          title: "Les Avantages de Notre Sélection ${category}",

          paragraphs: [
            /**
             * Category Benefits Paragraph 1
             * Purpose: Emphasize national coverage and local expertise
             * Target: Users needing nationwide or local services
             * Tone: Comprehensive, expert, nationwide
             * Variables: ${category}
             * Keywords: National, local, expertise, coverage, regions
             */
            "Notre couverture nationale vous garantit de trouver d'excellents ${category} où que vous soyez en France. De Paris à Marseille, de Lyon à Toulouse, notre réseau s'étend dans toutes les grandes villes et régions françaises.",

            /**
             * Category Benefits Paragraph 2
             * Purpose: Highlight quality assurance and verification
             * Target: Users concerned about service quality
             * Tone: Trustworthy, professional, quality-focused
             * Variables: ${category}
             * Keywords: Quality, verification, standards, satisfaction, excellence
             */
            "Tous nos ${category} partenaires sont régulièrement évalués pour maintenir nos standards d'excellence. Cette démarche qualité nous permet de vous garantir des prestations de haut niveau et une satisfaction optimale."
          ]
        }
      }
    },

    regionPages: {
      heroSection: {
        /**
         * Region Page Hero Title Template
         * Purpose: Region-specific category landing headline
         * Target: Users seeking businesses in specific regions
         * Tone: Local authority, comprehensive, welcoming
         * Variables: ${category}, ${region}
         * Keywords: Category, region name, guide, complete
         */
        title: "Guide Complet des ${category} en ${region}",

        /**
         * Region Page Hero Subtitle Template
         * Purpose: Emphasize local coverage and city count
         * Target: Users wanting comprehensive regional coverage
         * Tone: Comprehensive, local expertise, detailed
         * Variables: ${count}
         * Keywords: Cities, coverage, establishments, selection
         */
        subtitle: "${count} Villes Couvertes • Sélection d'Établissements de Qualité",

        /**
         * Region Page Hero Description Template
         * Purpose: Regional value proposition and local expertise
         * Target: Residents and visitors to the region
         * Tone: Local expert, welcoming, comprehensive
         * Variables: ${region}, ${category}, ${count}
         * Keywords: Region, local, expertise, selection, quality
         */
        description: "Découvrez notre sélection experte des meilleurs ${category} en ${region}. ${count} villes couvertes avec des établissements choisis pour leur excellence et leur service de qualité."
      },

      contentBlocks: {
        guide: {
          /**
           * Region Guide Title Template
           * Purpose: Establish regional expertise and comprehensive guide
           * Target: Users seeking regional business information
           * Tone: Expert, comprehensive, local authority
           * Variables: ${category}, ${region}
           */
          title: "${category} en ${region} : Guide Complet",

          paragraphs: [
            /**
             * Region Guide Paragraph 1
             * Purpose: Describe regional diversity and local characteristics
             * Target: Users wanting regional context and variety
             * Tone: Informative, local expertise, descriptive
             * Variables: ${region}, ${category}, ${count}
             * Keywords: Region, diversity, local, characteristics, variety
             */
            "La région ${region} offre une diversité exceptionnelle de ${category} répartis dans ${count} villes. Chaque destination propose ses spécialités locales et son caractère unique, reflétant la richesse culturelle et économique de cette région française.",

            /**
             * Region Guide Paragraph 2
             * Purpose: Explain comprehensive information and local guidance
             * Target: Residents and visitors needing local guidance
             * Tone: Helpful, detailed, service-oriented
             * Variables: ${region}
             * Keywords: Information, guidance, local, services, details
             */
            "Que vous soyez résident de ${region} ou visiteur, notre sélection vous guide vers les meilleures adresses de la région. Nous fournissons des informations détaillées sur chaque établissement : services, équipements, horaires et avis clients pour vous aider à faire le meilleur choix."
          ]
        },

        discovery: {
          /**
           * Region Discovery Title Template
           * Purpose: Encourage regional exploration
           * Target: Users interested in discovering the region
           * Tone: Inviting, exploratory, comprehensive
           * Variables: ${region}
           */
          title: "Découvrir ${region}",

          sections: [
            {
              /**
               * Region Discovery Section 1: Main Cities
               * Purpose: Highlight principal cities and their offerings
               * Target: Users planning visits or seeking major urban centers
               * Tone: Informative, inviting, comprehensive
               * Variables: ${region}, ${count}
               * Keywords: Cities, principal, variety, character, unique
               */
              title: "Villes Principales",
              content: "${region} compte ${count} villes dans notre annuaire, chacune avec ses spécialités et son charme particulier. Des métropoles dynamiques aux villes de caractère, découvrez la diversité urbaine de cette région exceptionnelle."
            },
            {
              /**
               * Region Discovery Section 2: Available Services
               * Purpose: Describe service quality and information completeness
               * Target: Users evaluating service quality and information depth
               * Tone: Professional, quality-focused, comprehensive
               * Variables: ${region}
               * Keywords: Services, quality, information, complete, available
               */
              title: "Services Disponibles",
              content: "Tous nos établissements en ${region} proposent des services de qualité avec des informations complètes : coordonnées, horaires, services et équipements disponibles. Notre engagement qualité vous garantit des prestations à la hauteur de vos attentes."
            }
          ]
        }
      }
    },

    cityPages: {
      heroSection: {
        /**
         * City Page Hero Title Template
         * Purpose: City-specific category landing headline
         * Target: Local users and city visitors
         * Tone: Local authority, welcoming, specific
         * Variables: ${category}, ${city}
         * Keywords: Category, city name, selection, best
         */
        title: "Les Meilleurs ${category} à ${city}",

        /**
         * City Page Hero Subtitle Template
         * Purpose: Emphasize local selection and establishment count
         * Target: Users seeking local business options
         * Tone: Local expertise, quality-focused, specific
         * Variables: ${count}
         * Keywords: Establishments, selected, quality, local
         */
        subtitle: "${count} Établissements Sélectionnés pour Leur Qualité",

        /**
         * City Page Hero Description Template
         * Purpose: Local value proposition and city-specific benefits
         * Target: Local residents and city visitors
         * Tone: Local expert, welcoming, quality-focused
         * Variables: ${category}, ${city}, ${count}
         * Keywords: City, local, selection, quality, service
         */
        description: "Découvrez notre sélection des meilleurs ${category} de ${city}. ${count} établissements choisis pour leur excellence et leur service de qualité, avec toutes les informations pratiques dont vous avez besoin."
      },

      contentBlocks: {
        selection: {
          /**
           * City Selection Title Template
           * Purpose: Introduce city-specific selection process
           * Target: Users wanting local expertise and quality assurance
           * Tone: Expert, local authority, quality-focused
           * Variables: ${category}, ${city}
           */
          title: "${category} à ${city} : Notre Sélection",

          paragraphs: [
            /**
             * City Selection Paragraph 1
             * Purpose: Describe city context and selection quality
             * Target: Users seeking local context and quality assurance
             * Tone: Local expertise, quality-focused, informative
             * Variables: ${city}, ${region}, ${count}, ${category}
             * Keywords: City, region, selection, quality, excellence
             */
            "${city}, située en ${region}, propose une sélection de ${count} ${category} de qualité. Chaque établissement a été choisi pour son excellence et la satisfaction de ses clients, garantissant une expérience exceptionnelle.",

            /**
             * City Selection Paragraph 2
             * Purpose: Explain comprehensive information and practical benefits
             * Target: Users needing practical business information
             * Tone: Helpful, detailed, service-oriented
             * Keywords: Information, practical, complete, choice, help
             */
            "Notre annuaire vous fournit toutes les informations nécessaires : coordonnées, horaires d'ouverture, services proposés, équipements disponibles et avis clients pour vous aider à faire le meilleur choix."
          ]
        },

        whyChoose: {
          /**
           * City Why Choose Title Template
           * Purpose: Highlight city-specific advantages
           * Target: Users comparing city options or evaluating local services
           * Tone: Persuasive, local pride, quality-focused
           * Variables: ${city}
           */
          title: "Pourquoi Choisir ${city} ?",

          sections: [
            {
              /**
               * City Advantage 1: Quality Guarantee
               * Purpose: Emphasize quality control and verification
               * Target: Users concerned about service quality
               * Tone: Professional, trustworthy, quality-focused
               * Variables: ${category}, ${city}
               * Keywords: Quality, verified, criteria, guarantee, experience
               */
              title: "Qualité Garantie",
              content: "Tous les ${category} référencés à ${city} sont vérifiés et évalués selon nos critères de qualité stricts pour vous garantir une expérience exceptionnelle."
            },
            {
              /**
               * City Advantage 2: Complete Information
               * Purpose: Highlight information completeness and practical value
               * Target: Users needing comprehensive business information
               * Tone: Helpful, detailed, practical
               * Keywords: Information, complete, practical, choice, details
               */
              title: "Informations Complètes",
              content: "Retrouvez pour chaque établissement les coordonnées, horaires, services, équipements et avis clients pour faire le meilleur choix."
            }
          ]
        }
      }
    },

    listingPages: {
      contentBlocks: {
        about: {
          /**
           * Listing About Title Template
           * Purpose: Introduce individual business information section
           * Target: Users seeking detailed business information
           * Tone: Informative, welcoming, detailed
           * Variables: ${listing}
           */
          title: "À Propos de ${listing}",

          sections: [
            {
              /**
               * Listing Practical Info Section
               * Purpose: Provide essential business details
               * Target: Users needing practical business information
               * Tone: Factual, helpful, organized
               * Keywords: Practical, information, details, essential
               */
              title: "Informations Pratiques",
              content: "Retrouvez toutes les informations essentielles : type d'établissement, localisation, note client et coordonnées complètes pour faciliter votre prise de contact."
            },
            {
              /**
               * Listing Quality Partnership Section
               * Purpose: Establish trust and quality assurance
               * Target: Users evaluating business credibility
               * Tone: Trustworthy, professional, quality-focused
               * Variables: ${listing}
               * Keywords: Quality, partner, selection, verification, experience
               */
              title: "Partenaire Qualité",
              content: "${listing} fait partie de notre sélection d'établissements de qualité. Nous vérifions régulièrement nos partenaires pour vous garantir une expérience exceptionnelle."
            }
          ]
        },

        callToAction: {
          /**
           * Listing CTA Title Template
           * Purpose: Encourage user action and engagement
           * Target: Users ready to contact or visit the business
           * Tone: Encouraging, action-oriented, welcoming
           * Variables: ${listing}
           */
          title: "Prêt à Découvrir ${listing} ?",

          /**
           * Listing CTA Subtitle Template
           * Purpose: Provide clear next steps for user engagement
           * Target: Users seeking contact information or booking
           * Tone: Helpful, action-oriented, service-focused
           */
          subtitle: "Visitez leur site officiel pour plus d'informations et réservations"
        }
      }
    }
  },

  structuredData: {
    /**
     * Organization Structured Data Template
     * Purpose: Define organization schema for search engines
     * Target: Search engines for rich snippets and knowledge panels
     * Variables: ${siteName}, ${description}
     */
    organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "${siteName}",
      "description": "${description}",
      "url": "${siteUrl}",
      "logo": "${logoUrl}",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "${phone}",
        "contactType": "Customer Service",
        "availableLanguage": "French"
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "FR"
      }
    },

    /**
     * Website Structured Data Template
     * Purpose: Define website schema for search engines
     * Target: Search engines for site understanding
     * Variables: ${siteName}, ${siteUrl}
     */
    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "${siteName}",
      "url": "${siteUrl}",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "${siteUrl}/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },

    /**
     * Breadcrumb List Structured Data Template
     * Purpose: Define navigation breadcrumbs for search engines
     * Target: Search engines for navigation understanding
     * Variables: Dynamic based on page hierarchy
     */
    breadcrumbList: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": "${breadcrumbItems}"
    },

    /**
     * Local Business Structured Data Template
     * Purpose: Define individual business schema
     * Target: Search engines for local business rich snippets
     * Variables: Business-specific information
     */
    localBusiness: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "${businessName}",
      "description": "${businessDescription}",
      "image": "${businessImage}",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "${streetAddress}",
        "addressLocality": "${city}",
        "addressRegion": "${region}",
        "addressCountry": "FR"
      },
      "telephone": "${phone}",
      "url": "${businessUrl}",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "${rating}",
        "reviewCount": "${reviewCount}",
        "bestRating": 5,
        "worstRating": 1
      },
      "openingHours": "${openingHours}",
      "amenityFeature": "${amenities}",
      "additionalProperty": "${equipment}"
    },

    /**
     * Collection Page Structured Data Template
     * Purpose: Define collection/listing page schema
     * Target: Search engines for collection page understanding
     * Variables: Collection-specific information
     */
    collectionPage: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "${collectionName}",
      "description": "${collectionDescription}",
      "url": "${collectionUrl}",
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": "${itemCount}",
        "itemListElement": "${itemList}"
      }
    }
  }
};

/**
 * SEO Template Processing Functions
 * 
 * These functions process the SEO templates with dynamic variables
 * to generate final content for each page type.
 */

export interface SEOVariables {
  siteName?: string;
  category?: string;
  region?: string;
  city?: string;
  listing?: string;
  count?: number;
  rating?: number;
  type?: string;
  address?: string;
  phone?: string;
  siteUrl?: string;
  logoUrl?: string;
  [key: string]: any;
}

/**
 * Process SEO template with variables
 * Purpose: Replace template variables with actual values
 * @param template - Template string with ${variable} placeholders
 * @param variables - Object containing variable values
 * @returns Processed string with variables replaced
 */
export function processSEOTemplate(template: string, variables: SEOVariables): string {
  return template.replace(/\$\{(\w+)\}/g, (match, key) => {
    return variables[key]?.toString() || match;
  });
}

/**
 * Generate page metadata from SEO config
 * Purpose: Create Next.js Metadata object from SEO templates
 * @param pageType - Type of page (homepage, categoryPage, etc.)
 * @param variables - Variables for template processing
 * @returns Next.js Metadata object
 */
export function generateSEOMetadata(
  pageType: keyof SEOTitles,
  variables: SEOVariables
): Metadata {
  const title = processSEOTemplate(seoConfig.metadata.titles[pageType], variables);
  const description = processSEOTemplate(seoConfig.metadata.descriptions[pageType], variables);
  const keywords = seoConfig.metadata.keywords[pageType]
    .map(keyword => processSEOTemplate(keyword, variables))
    .join(', ');

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'fr_FR',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

/**
 * Generate structured data from templates
 * Purpose: Create structured data objects for search engines
 * @param schemaType - Type of schema (organization, localBusiness, etc.)
 * @param variables - Variables for template processing
 * @returns Processed structured data object
 */
export function generateStructuredData(
  schemaType: keyof StructuredDataTemplates,
  variables: SEOVariables
): any {
  const template = seoConfig.structuredData[schemaType];
  const jsonString = JSON.stringify(template);
  const processedString = processSEOTemplate(jsonString, variables);
  return JSON.parse(processedString);
}

export default seoConfig;