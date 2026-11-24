# ProductHub — Smart Product Catalog

**A modern product catalog application built with React.**

ProductHub is a responsive web application for discovering and exploring products through a clean, modern interface. Users can browse a product catalog, search and filter products, sort results, view product details, manage a wishlist, and create personal product notes.

**Live Demo:** https://product-hub-kappa-murex.vercel.app  
**Source Code:** https://github.com/syamildh03-cmd/ProductHub

---

## Project Overview

ProductHub was developed as an individual project for the Web Programming course, focusing on:

- React Routing
- State Management
- Data Fetching
- Reusable Components
- Custom Hooks
- Application Architecture

The project demonstrates how these concepts can be organized into a functional React application with a clear separation between the user interface, application logic, and API services.

## Features

### 1. Home Page
- Overview of the product catalog.
- Product highlights and recommendations.
- Product category navigation.
- Catalog statistics and wishlist summary.

### 2. Product Catalog
- Search products by name.
- Filter products by category.
- Sort products by name and price.
- Pagination with 12 products per page.
- Loading, error, and empty states.
- Search, filter, sorting, and pagination state reflected in the URL.

### 3. Product Details
- Product image gallery.
- Product name, description, and category.
- Price, discount, rating, brand, and stock information.
- Add or remove products from the wishlist.
- Related products from the same category.
- Navigation back to the previous catalog state.

### 4. Wishlist
- Add and remove favorite products.
- Wishlist count displayed in the navigation.
- Data persistence using browser `localStorage`.
- Empty state when no products have been saved.

### 5. Product Notes
- Create personal notes about products.
- Form validation for required fields.
- View and delete saved notes.
- Notes persist using browser `localStorage`.

### 6. Additional Features
- Responsive layouts for desktop, tablet, and mobile.
- Custom 404 page.
- Accessible form labels and image alternative text.
- Keyboard-visible focus indicators.
- Reduced-motion support.

---

## Technology Stack

| Technology | Purpose |
|---|---|
| React 19 | User interface development |
| Vite | Development server and build tool |
| JavaScript (JSX) | Application programming language |
| React Router DOM 7 | Client-side routing |
| Context API | Global wishlist state |
| Fetch API | Data retrieval |
| Custom Hooks | Reusable application logic |
| CSS3 | Styling and responsive layouts |
| Lucide React | Interface icons |
| DummyJSON | Public product API |
| Git & GitHub | Version control and source code hosting |
| Vercel | Application deployment |

**Storage:** This project does not use a custom backend or database. Wishlist items and product notes are stored locally in the browser using `localStorage`.

## Application Architecture

The project follows a separation-of-concerns approach:

- **Components:** reusable interface elements.
- **Pages:** page-level application views.
- **Layouts:** shared page structure.
- **Hooks:** reusable state and data-fetching logic.
- **Context:** shared global state.
- **Services:** API communication.
- **Utils:** independent helper functions and data-processing logic.

### Project Structure

```text
producthub/
├── public/
├── src/
│   ├── components/
│   ├── layouts/
│   │   └── MainLayout.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Wishlist.jsx
│   │   ├── ProductNotes.jsx
│   │   └── NotFound.jsx
│   ├── context/
│   │   ├── WishlistContext.jsx
│   │   └── wishlistContextValue.js
│   ├── hooks/
│   │   ├── useFetch.js
│   │   ├── useProducts.js
│   │   ├── useProduct.js
│   │   ├── useCategories.js
│   │   ├── useLocalStorage.js
│   │   ├── useNotes.js
│   │   ├── useWishlist.js
│   │   ├── useCatalogSummary.js
│   │   └── useRelatedProducts.js
│   ├── services/
│   │   └── productService.js
│   ├── utils/
│   │   ├── formatCategory.js
│   │   ├── formatCurrency.js
│   │   ├── notes.js
│   │   ├── productQuery.js
│   │   └── wishlist.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── package-lock.json
├── vercel.json
└── README.md
```

*Note: The structure above highlights the main application directories and files.*

---

## Routing

ProductHub uses **React Router DOM** with client-side navigation. This allows users to move between pages without a full browser reload.

| Route | Page | Description |
|---|---|---|
| `/` | Home | Main dashboard and product highlights |
| `/products` | Products | Product catalog, search, filters, and sorting |
| `/products/:id` | Product Detail | Dynamic product detail page |
| `/wishlist` | Wishlist | Saved favorite products |
| `/notes` | Product Notes | Personal product notes |
| `*` | Not Found | Custom 404 page |

The product detail page uses a dynamic route (`/products/:id`) to retrieve and display a product based on its ID.

A shared `MainLayout` contains the navigation bar and footer, while nested routes render their page content through React Router's `Outlet`.

## State Management

The application demonstrates five types of state management:

| State Type | Implementation | Example |
|---|---|---|
| Local State | `useState` | Mobile menu and active product image |
| Global State | Context API | Wishlist shared across components |
| Server State | `useFetch` | Product and category data from the API |
| URL State | `useSearchParams` | Search, category, sorting, and pagination |
| Form State | Controlled components | Product notes form |

This approach keeps state organized according to its responsibility and scope.

## Data Fetching

Product data is retrieved from the public **DummyJSON Products API**.

API endpoint:

```text
https://dummyjson.com/products?limit=0
```

API documentation: https://dummyjson.com/docs/products

All API communication is organized in:

```text
src/services/productService.js
```

The service layer handles product and category requests. The application uses reusable hooks to manage fetched data and its loading and error states.

Additional implementation details:

- Fetch API for HTTP requests.
- `response.ok` checks for unsuccessful responses.
- `try/catch` for network and request errors.
- `AbortController` to cancel requests when they are no longer needed.
- Client-side search, filtering, sorting, and pagination.

**Currency note:** Product prices from DummyJSON are converted from USD to Indonesian Rupiah using a fixed reference rate of **1 USD = Rp16,000**. This is an application assumption, not a live exchange rate.

## Custom Hooks

Custom hooks are used to make application logic reusable and easier to maintain.

| Hook | Responsibility |
|---|---|
| `useFetch` | Generic data fetching, loading, error, retry, and request cancellation |
| `useProducts` | Retrieve product catalog data |
| `useProduct` | Retrieve an individual product |
| `useCategories` | Retrieve product categories |
| `useLocalStorage` | Synchronize state with browser storage |
| `useNotes` | Manage product notes |
| `useWishlist` | Access wishlist functionality |
| `useCatalogSummary` | Prepare product highlights and catalog summaries |
| `useRelatedProducts` | Retrieve related products |

## Context API

The application uses `WishlistContext` to manage wishlist data globally.

The provider is implemented in:

```text
src/context/WishlistContext.jsx
```

It provides shared wishlist values and actions, including:

- `items`
- `count`
- `addToWishlist`
- `removeFromWishlist`
- `isInWishlist`

This allows components such as the navigation bar, product cards, product details, and wishlist page to access consistent wishlist data.

## User Interface & Design

ProductHub uses a **modern luxury** visual direction, with an emphasis on readability, whitespace, and a consistent interface.

Design characteristics:

- Warm ivory background.
- Neutral surfaces and dark typography.
- Subtle gold accents.
- Inter and Instrument Serif typography.
- Responsive product grids and navigation.
- Lightweight transitions and interactive feedback.

The interface also includes reduced-motion support through the `prefers-reduced-motion` media query.

---

## Installation & Local Development

### Prerequisites

- Node.js 20 or later.
- npm.
- Git.
- Internet connection for retrieving product data from DummyJSON.

### 1. Clone the Repository

```bash
git clone https://github.com/syamildh03-cmd/ProductHub.git
```

### 2. Open the Project Directory

```bash
cd ProductHub
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Development Server

```bash
npm run dev
```

Open the local address shown in the terminal, usually:

```text
http://localhost:5173
```

### 5. Create a Production Build

```bash
npm run build
```

The production output is generated in the `dist/` directory.

### 6. Preview the Production Build

```bash
npm run preview
```

---

## Deployment

ProductHub is deployed using **Vercel** and connected to the GitHub repository.

| Item | Deployment Information |
|---|---|
| Platform | Vercel |
| Framework | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |
| Environment Variables | Not required |

**Production URL:** https://product-hub-kappa-murex.vercel.app

The project includes `vercel.json` to support client-side routing. This allows routes such as `/products/5` to be opened or refreshed directly without returning a server-side 404.

---

## Testing & Verification

The following checks were performed during local development and deployment.

| Test Scenario | Result |
|---|---|
| Application starts in development mode | Passed |
| Production build using `npm run build` | Passed |
| Product data retrieval from DummyJSON | Verified |
| Product search | Passed |
| Category filtering | Passed |
| Price sorting | Passed |
| Catalog pagination | Passed |
| Dynamic product detail route | Passed |
| Refresh on a product detail URL | Passed locally |
| Wishlist persistence after refresh | Passed |
| Product notes validation and persistence | Passed |
| Custom 404 page | Passed |
| Responsive layout check | Checked using browser viewport emulation |
| Vercel deployment | Successful |

**Development notes:**

- The production build completed successfully in the development environment.
- `npm run lint` could not be completed on the development machine because Windows Application Control blocked the Oxlint native binary. This is recorded as an environment limitation; it should not be interpreted as a successful lint run.
- The project was manually checked in a browser. Automated test scripts are not included in this repository.
- Responsive behavior was checked using browser viewport emulation; this does not replace testing on every physical device.

---

## Learning Outcomes

Through this project, the following concepts were applied:

1. Building reusable user interface components with React.
2. Implementing client-side routing and dynamic routes.
3. Managing local, global, server, URL, and form state.
4. Retrieving data from a public REST API.
5. Creating reusable custom hooks.
6. Separating API services, application logic, and presentation.
7. Persisting browser-side data using `localStorage`.
8. Building and deploying a React application using Vite and Vercel.

## Project Information

| Attribute | Details |
|---|---|
| Project Name | ProductHub — Smart Product Catalog |
| Project Type | Individual Academic Project |
| Course | Web Programming |
| Main Framework | React |
| Build Tool | Vite |
| Language | JavaScript (JSX) |
| API | DummyJSON |
| Deployment | Vercel |
| Repository | `syamildh03-cmd/ProductHub` |

---

**ProductHub**  
*A React-based product catalog application built to demonstrate modern frontend development concepts.*