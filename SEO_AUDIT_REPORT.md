# Audit SEO - La Fiorentina Restaurant
## Restaurante Italiano em Lisboa, Portugal

**Date:** 2024  
**Site:** https://lafiorentina.pt  
**Type:** Restaurant (Italian cuisine, Lisbon, Portugal)

---

## ✅ ÉLÉMENTS DÉJÀ EN PLACE

### 1. Meta Tags de Base
- ✅ Title tag optimisé (60 caractères)
- ✅ Meta description (155 caractères)
- ✅ Meta keywords
- ✅ Viewport meta tag
- ✅ Charset UTF-8

### 2. Open Graph & Social Media
- ✅ Open Graph tags (Facebook)
- ✅ Twitter Card tags
- ✅ Image sociale définie

### 3. Schema.org / Structured Data
- ✅ Schema Restaurant complet
- ✅ Adresse complète
- ✅ Coordonnées géographiques
- ✅ Horaires d'ouverture
- ✅ Type de cuisine
- ✅ Fourchette de prix
- ✅ Accepte les réservations

### 4. Fichiers Techniques
- ✅ robots.txt configuré
- ✅ sitemap.xml présent
- ✅ Langue définie (lang="pt")

### 5. Accessibilité
- ✅ Skip to main content link
- ✅ Alt texts sur les images (partiellement)

---

## ⚠️ ÉLÉMENTS À AMÉLIORER / MANQUANTS

### 🔴 CRITIQUE (Priorité Haute)

#### 1. **Canonical URL manquante**
```html
<!-- À ajouter dans <head> -->
<link rel="canonical" href="https://lafiorentina.pt/" />
```

#### 2. **Hreflang tags manquants** (pour PT/EN)
Le site a deux langues mais pas de balises hreflang :
```html
<link rel="alternate" hreflang="pt" href="https://lafiorentina.pt/" />
<link rel="alternate" hreflang="en" href="https://lafiorentina.pt/?lang=en" />
<link rel="alternate" hreflang="x-default" href="https://lafiorentina.pt/" />
```

#### 3. **Schema Review manquant**
Ajouter les avis Google (4.82/5, 2826 avis) :
```json
{
  "@type": "AggregateRating",
  "ratingValue": "4.82",
  "reviewCount": "2826",
  "bestRating": "5",
  "worstRating": "1"
}
```

#### 4. **Images optimisées**
- ❌ Pas de width/height sur les images
- ❌ Pas de srcset pour responsive
- ❌ Certaines images utilisent Unsplash (non optimisées pour le site)
- ⚠️ Alt texts génériques ("Gallery image")

#### 5. **Performance**
- ⚠️ Images non optimisées (pas de WebP, pas de lazy loading partout)
- ⚠️ Pas de preload pour les ressources critiques

### 🟡 IMPORTANT (Priorité Moyenne)

#### 6. **Sitemap incomplet**
Le sitemap ne contient qu'une seule URL. Ajouter :
- Sections principales (#menu, #galeria, #sala, #contato)
- Ou créer des pages dédiées

#### 7. **Breadcrumbs Schema manquant**
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [...]
}
```

#### 8. **LocalBusiness Schema enrichi**
Ajouter :
- `aggregateRating` (voir point 3)
- `priceRange` (déjà présent mais vérifier)
- `image` (plusieurs images du restaurant)
- `sameAs` (liens réseaux sociaux)
- `hasMenu` (lien vers le menu)

#### 9. **Meta tags supplémentaires**
```html
<meta name="author" content="La Fiorentina" />
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
<meta name="googlebot" content="index, follow" />
<meta name="geo.region" content="PT-11" />
<meta name="geo.placename" content="Lisboa" />
<meta name="geo.position" content="38.7147254;-9.1449947" />
<meta name="ICBM" content="38.7147254, -9.1449947" />
```

#### 10. **Structured Data Menu**
Ajouter un schema MenuItem si le menu est détaillé :
```json
{
  "@type": "Menu",
  "hasMenuSection": [...]
}
```

### 🟢 RECOMMANDATIONS (Priorité Basse)

#### 11. **Rich Snippets supplémentaires**
- FAQ Schema (si FAQ présente)
- Event Schema (pour événements spéciaux)
- Video Schema (si vidéos présentes)

#### 12. **Optimisation contenu**
- Ajouter plus de contenu textuel unique par section
- Utiliser des headings hiérarchiques (H1, H2, H3)
- Ajouter des mots-clés locaux : "restaurante italiano Bairro Alto", "melhor pizza Lisboa"

#### 13. **Liens internes**
- Améliorer la structure de liens internes
- Ajouter des liens contextuels dans le contenu

#### 14. **Performance & Core Web Vitals**
- Optimiser les images (WebP, compression)
- Minifier CSS/JS
- Lazy loading complet
- Preconnect pour les domaines externes

#### 15. **Mobile-first**
- Vérifier que tout est responsive
- Tester sur différents appareils

---

## 📋 PLAN D'ACTION PRIORITAIRE

### Phase 1 (Immédiat)
1. Ajouter canonical URL
2. Ajouter hreflang tags
3. Ajouter AggregateRating dans Schema
4. Optimiser les alt texts des images

### Phase 2 (Court terme)
5. Enrichir le Schema LocalBusiness
6. Ajouter meta tags géolocalisation
7. Optimiser les images (WebP, dimensions)
8. Améliorer le sitemap

### Phase 3 (Moyen terme)
9. Ajouter Breadcrumbs Schema
10. Optimiser les performances
11. Enrichir le contenu textuel
12. Ajouter FAQ/Event Schema si applicable

---

## 🔍 CHECKLIST TECHNIQUE

- [ ] Canonical URL présente
- [ ] Hreflang tags pour multi-langue
- [ ] Schema Review/AggregateRating
- [ ] Images optimisées (WebP, dimensions, alt descriptifs)
- [ ] Meta robots configuré
- [ ] Geo meta tags
- [ ] Sitemap complet
- [ ] Breadcrumbs Schema
- [ ] Performance optimisée
- [ ] Mobile-friendly vérifié
- [ ] HTTPS (à vérifier)
- [ ] PageSpeed optimisé

---

## 📊 SCORE ESTIMÉ

**Actuel:** 65/100  
**Avec améliorations Phase 1:** 80/100  
**Avec toutes améliorations:** 90/100

---

## 🎯 MOTS-CLÉS CIBLES (Lisbonne)

**Principaux:**
- restaurante italiano lisboa
- restaurante italiano bairro alto
- melhor restaurante italiano lisboa
- pizza lisboa
- massa fresca lisboa
- cozinha italiana lisboa

**Longue traîne:**
- restaurante italiano autêntico lisboa
- restaurante italiano centro lisboa
- jantar italiano bairro alto
- melhor pizza lisboa centro

---

## 📝 NOTES

- Le site a une bonne base SEO
- Le Schema Restaurant est bien implémenté
- Manque surtout les éléments de local SEO (hreflang, canonical, reviews)
- Les images doivent être optimisées
- Le contenu pourrait être plus riche en mots-clés locaux

