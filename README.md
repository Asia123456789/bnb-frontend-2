# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
gör bara client side anrop inga serverside anrop

### TODO
- Lista properties hämta från api
- Detalj property visa
- Login (sparar cookie)
- Boka property (använder cookie)


bnb-frontend-2/
│
├── src/
│   ├── api/
│   │   └── api.ts
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── PropertiesList.tsx
│   │   ├── PropertyDetail.tsx
│   │   └── MyBookings.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── package.json
├── tsconfig.json
└── vite.config.ts

Hur man ser profil namn och user_id:
Kör i sql:

SELECT full_name, user_id FROM profiles;

Du kommer se t.ex.:
Supabase
full_name	user_id
Linda	cc34f16c-81f9-4c13-8959-1dd7aea2b09e
Sandra	ca708a1b-3f01-45db-bc2d-31fe5fc5005a
Lisa	a0fef371-2d23-4034-a03d-66d04d0867a6
Admin	c1612f63-665e-4e36-ac29-27723fdcf0f0

Hur man skapar en property:
Exempel för Linda:

INSERT INTO properties (title, description, location, price_per_night, owner_id)
VALUES (
  'Lindas mysiga lägenhet',
  'En liten och charmig lägenhet mitt i stan',
  'Stockholm',
  800,
  'cc34f16c-81f9-4c13-8959-1dd7aea2b09e'
);

Om allt går rätt får du:
Success. No rows returned

Skapa fler properties

För Sandra:

INSERT INTO properties (title, description, location, price_per_night, owner_id)
VALUES (
  'Sandras villa vid sjön',
  'Stor villa med sjöutsikt och trädgård',
  'Uppsala',
  1200,
  'ca708a1b-3f01-45db-bc2d-31fe5fc5005a'
);

Om allt går rätt får du:
Success. No rows returned

För Lisa:

INSERT INTO properties (title, description, location, price_per_night, owner_id)
VALUES (
  'Lisas stuga i skogen',
  'Mysig stuga för weekend-utflykter',
  'Dalarna',
  600,
  'a0fef371-2d23-4034-a03d-66d04d0867a6'
);

Om allt går rätt får du:
Success. No rows returned