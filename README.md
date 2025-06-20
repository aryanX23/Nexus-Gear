# Nexus Gear - Gaming Peripherals E-Commerce Shop
 
Welcome to Nexus Gear, your one-stop shop for high-quality gaming peripherals! This project is a full-stack e-commerce application built with a modern technology stack, designed to provide a seamless and engaging shopping experience for gaming enthusiasts.

## Features

*   **Product Catalog:** Browse a wide range of gaming peripherals, including keyboards, mice, headsets, and more.
*   **Product Details:** View detailed information, images, and specifications for each product.
*   **User Authentication:** Secure user registration and login functionality.
*   **Shopping Cart:** Add products to your cart and manage your selections.
*   **Secure Checkout:** Integrated with Stripe for secure payment processing.
*   **Responsive Design:** Enjoy a consistent experience across desktop and mobile devices.

## Technologies Used

This project leverages a variety of modern technologies to deliver a robust and scalable e-commerce platform:

### Monorepo Management
*   **Turbo:** High-performance build system for JavaScript and TypeScript monorepos.
*   **Yarn:** Fast, reliable, and secure dependency management.

### Frontend (React Application - `apps/frontend`)
*   **React:** A JavaScript library for building user interfaces.
*   **React Router:** Declarative routing for React applications.
*   **Axios:** Promise-based HTTP client for the browser and Node.js.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **Font Awesome & Heroicons:** Icon libraries for a rich visual experience.
*   **React Toastify:** For displaying notifications.
*   **React Tabs:** For creating tabbed content sections.
*   **React Stripe Checkout:** Client-side integration for Stripe payments.
*   **Testing Library:** For testing React components and user interactions.

### Backend (Node.js/Express Application - `apps/backend`)
*   **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
*   **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
*   **Mongoose:** Elegant MongoDB object modeling for Node.js.
*   **Stripe API:** Server-side integration for secure payment processing.
*   **JSON Web Token (JWT):** For implementing secure authentication.
*   **Helmet:** Helps secure Express apps by setting various HTTP headers.
*   **CORS:** Middleware for enabling Cross-Origin Resource Sharing.
*   **Body-parser:** Node.js body parsing middleware.
*   **Cookie-parser:** Parse Cookie header and populate `req.cookies`.
*   **Dotenv:** Loads environment variables from a `.env` file.
*   **Cryptr:** Simple encryption and decryption for Node.js.
*   **UUID:** For generating unique identifiers.
*   **Lodash:** A modern JavaScript utility library delivering modularity, performance & extras.
*   **Nodemon:** Utility that monitors for any changes in your source and automatically restarts your server (development).

### Linting & Formatting
*   **ESLint:** Pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript.
*   **Prettier:** An opinionated code formatter.

### Deployment
*   **Docker:** Containerization platform for building, shipping, and running applications.
*   **Nginx:** High-performance web server, reverse proxy, and load balancer.

## Project Structure

The project is organized as a monorepo with the following structure:

```
nexus-gear/
├── apps/
│   ├── backend/      # Backend Express.js application
│   └── frontend/     # Frontend React application
├── packages/         # Shared packages (if any)
├── Dockerfile.backend
├── Dockerfile.frontend
├── nginx.conf
├── package.json      # Root package.json for monorepo
└── README.md
```

## Getting Started

### Prerequisites

*   Node.js (>=18.x.x)
*   Yarn (1.22.22 or later)
*   Docker (optional, for containerized deployment)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd nexus-gear
    ```

2.  **Install dependencies:**
    This project uses Yarn workspaces. Install dependencies from the root directory:
    ```bash
    yarn install
    ```

3.  **Environment Variables:**
    *   Navigate to `apps/backend` and create a `.env` file from `.env.example`. Populate it with your database connection strings, Stripe API keys, JWT secrets, etc.
    *   Navigate to `apps/frontend` and create a `.env` file from `.env.example` if needed for frontend-specific configurations (e.g., API base URL).

### Running the Application

*   **Development Mode (with auto-reloading):**
    From the root directory:
    ```bash
    yarn dev
    ```
    This will typically start:
    *   The backend server (e.g., on `http://localhost:8000`)
    *   The frontend development server (e.g., on `http://localhost:3000`)

*   **Production Build:**
    From the root directory:
    ```bash
    yarn build
    ```
    This will create optimized builds for both frontend and backend applications.

### Running with Docker (Example)

1.  **Build Docker images:**
    ```bash
    docker build -t nexusgear-frontend -f Dockerfile.frontend .
    docker build -t nexusgear-backend -f Dockerfile.backend .
    ```

2.  **Run Docker containers:**
    (This may require a `docker-compose.yml` file for easier orchestration, which is not included in this basic setup). You would typically run the backend container and then the frontend container (or an Nginx container serving the frontend build and proxying to the backend).

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the ISC License.
