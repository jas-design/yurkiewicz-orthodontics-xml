/**
 * Utility to load and parse website-config.xml
 */

export interface WebsiteConfig {
  branding: {
    logo: {
      textMain: string;
      textSub: string;
      icon: string;
      imageUrl: string;
      useImageLogo: string;
      imageHeight: string;
    };
    colors: {
      primary: string;
      secondary: string;
      accentBlue: string;
      darkNavy: string;
      lightBg: string;
    };
    calendlyUrl: string;
  };
  contactInfo: {
    phoneMain: string;
    email: string;
    address: string;
    workingHours: string;
    socialLinks: {
      facebook: string;
      instagram: string;
      youtube: string;
      twitter: string;
    };
  };
  navigation: any[];
  sections: any;
  pages: any;
}

let configCache: WebsiteConfig | null = null;

function getTagText(parent: Element | Document, tagName: string, defaultValue = ''): string {
  return parent.getElementsByTagName(tagName)[0]?.textContent || defaultValue;
}

function parseSection(sectionElement: Element) {
  const section = sectionElement;
  if (!section) return {};
  
  const result: any = {};
  for (let i = 0; i < section.children.length; i++) {
    const child = section.children[i];
    if (child.children.length > 0 && child.tagName !== 'items' && child.tagName !== 'features' && child.tagName !== 'members' && child.tagName !== 'images' && child.tagName !== 'transformations') {
        // Nested section (like branding/logo)
        result[toCamelCase(child.tagName)] = parseNode(child);
    } else if (child.tagName === 'items' || child.tagName === 'features' || child.tagName === 'members' || child.tagName === 'images' || child.tagName === 'transformations') {
        result[toCamelCase(child.tagName)] = Array.from(child.children).map(node => {
            const item: any = {};
            // Handle attributes
            for(let j=0; j<node.attributes.length; j++) {
                item[toCamelCase(node.attributes[j].name)] = node.attributes[j].value;
            }
            // Handle text content if any
            if (node.children.length === 0) {
                item.value = node.textContent;
            } else {
                // Handle nested children in items
                for(let k=0; k<node.children.length; k++) {
                    item[toCamelCase(node.children[k].tagName)] = node.children[k].textContent;
                }
            }
            return item;
        });
    } else {
      result[toCamelCase(child.tagName)] = child.textContent;
    }
  }
  return result;
}

function parseNode(node: Element) {
    const result: any = {};
    for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        result[toCamelCase(child.tagName)] = child.textContent;
    }
    return result;
}

function toCamelCase(str: string) {
  return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}

export async function fetchWebsiteConfig(): Promise<WebsiteConfig> {
  try {
    const baseUrl = import.meta.env.BASE_URL || '/';
    const configUrl = `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}website-config.xml?t=${Date.now()}`;
    const response = await fetch(configUrl);
    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'text/xml');

    const brandingNode = xmlDoc.getElementsByTagName('branding')[0];
    const contactInfoNode = xmlDoc.getElementsByTagName('contact_info')[0];
    const sectionsNode = xmlDoc.getElementsByTagName('sections')[0];
    const pagesNode = xmlDoc.getElementsByTagName('pages')[0];
    const navigationNode = xmlDoc.getElementsByTagName('navigation')[0];

    const config: WebsiteConfig = {
      branding: {
        logo: parseNode(brandingNode.getElementsByTagName('logo')[0]),
        colors: parseNode(brandingNode.getElementsByTagName('colors')[0]),
        calendlyUrl: getTagText(brandingNode, 'calendly_url'),
      },
      contactInfo: {
        phoneMain: getTagText(contactInfoNode, 'phone_main'),
        email: getTagText(contactInfoNode, 'email'),
        address: getTagText(contactInfoNode, 'address'),
        workingHours: getTagText(contactInfoNode, 'working_hours'),
        socialLinks: parseNode(contactInfoNode.getElementsByTagName('social_links')[0]),
      },
      navigation: navigationNode ? Array.from(navigationNode.children).map(node => {
        const item: any = {};
        for(let i=0; i<node.attributes.length; i++) {
          item[toCamelCase(node.attributes[i].name)] = node.attributes[i].value;
        }
        return item;
      }) : [],
      sections: {},
      pages: {}
    };

    // Parse all sections dynamically
    if (sectionsNode) {
        for (let i = 0; i < sectionsNode.children.length; i++) {
            const section = sectionsNode.children[i];
            config.sections[toCamelCase(section.tagName)] = parseSection(section);
        }
    }

    // Parse all pages dynamically
    if (pagesNode) {
        for (let i = 0; i < pagesNode.children.length; i++) {
            const page = pagesNode.children[i];
            config.pages[toCamelCase(page.tagName)] = parseSection(page);
        }
    }

    configCache = config;
    return config;
  } catch (error) {
    console.error('Error loading website-config.xml:', error);
    throw error;
  }
}

export async function getWebsiteConfig(): Promise<WebsiteConfig> {
    if (configCache) return configCache;
    return fetchWebsiteConfig();
}

export async function openCalendly() {
  const config = await getWebsiteConfig();
  if (window.Calendly) {
    window.Calendly.initPopupWidget({ url: config.branding.calendlyUrl });
  } else {
    console.error('Calendly script not loaded');
  }
}

export function resolveImageUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('data:') || url.startsWith('/')) return url;
  
  const baseUrl = import.meta.env.BASE_URL || '/';
  return `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}${url}`;
}

declare global {
  interface Window {
    Calendly: any;
  }
}
