# Portfolio – Princess Claire Dominguez & Mariz Iglesias

A shared personal portfolio built with **Laravel 12, Inertia.js and React** (Tailwind CSS 4, Vite).
One public page shows both owners with a Claire / Mariz toggle, and a protected manager
lets the owners add, edit and delete their **Projects** (full CRUD) without touching the code.

## Features

- Public portfolio page: draggable ID card hero, About section with hover portraits, Skills with a Both / Claire / Mariz toggle, Projects, and Contact.
- Projects stored in the database (one `projects` table with an `owner` column), shown per owner with a details dialog.
- Admin login (Laravel Breeze) that protects the project manager.
- Project manager at `/projects`: list, search by title, filter by owner, pagination (6 per page).
- Create / Edit / Delete with a confirm dialog and flash success messages.
- Server-side validation with custom messages: required fields, title max 100 characters, description min 20 characters, valid URL, no future date, unique title per owner, at least one tech stack item, image only (JPG, PNG, WEBP, max 2 MB).
- Reusable React components (`ProjectForm`, `FormField`, `MultiSelect`, `ConfirmDialog`).

## Tech stack

Laravel 12 · PHP 8.2+ · Inertia.js 2 · React 18 · Tailwind CSS 4 · Vite 7 · MySQL

## Requirements

- PHP 8.2 or higher (with the `pdo_mysql`, `mbstring`, `fileinfo` extensions)
- Composer
- Node.js 18+ and npm
- MySQL (for example through XAMPP or Laragon)

## Setup

1. **Clone the repository**

   ```bash
   git clone <your-repository-url>
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   composer install
   npm install
   ```

3. **Create the environment file**

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

   On Windows Command Prompt, use `copy .env.example .env` instead of `cp`.

4. **Create the database.** In MySQL (phpMyAdmin or the terminal), create an empty database named `portfolio`.

5. **Edit `.env`.** Check the database settings and set the admin login you want to use:

   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=portfolio
   DB_USERNAME=root
   DB_PASSWORD=

   ADMIN_EMAIL=your-email@example.com
   ADMIN_PASSWORD=your-own-password
   ```

6. **Run the migrations and seeders.** This creates the tables, the admin account, and the sample projects.

   ```bash
   php artisan migrate --seed
   ```

7. **Link the storage folder** so uploaded project images can be shown.

   ```bash
   php artisan storage:link
   ```

8. **Start the app.** Open two terminals:

   ```bash
   php artisan serve
   ```

   ```bash
   npm run dev
   ```

   Then open <http://127.0.0.1:8000>.

For a production build, run `npm run build` instead of `npm run dev`.

## Admin login

The account is created from `ADMIN_EMAIL` and `ADMIN_PASSWORD` in your `.env` when you run `php artisan migrate --seed`. The password is never stored in the code.

1. Scroll to the footer of the public page and click **Admin login**.
2. After logging in, the footer link becomes **Manage projects** (`/projects`).

If you change `ADMIN_PASSWORD` after seeding, the existing account keeps its old password. Run `php artisan migrate:fresh --seed` to reset the database, or change the password from the Profile page.

## Project structure

| Path | Purpose |
| --- | --- |
| `database/migrations/*_create_projects_table.php` | Creates the `projects` table |
| `database/seeders/` | Admin account and sample projects |
| `app/Models/Project.php` | Project model (`$fillable`) |
| `app/Http/Controllers/ProjectController.php` | CRUD actions, validation rules and messages |
| `app/Http/Controllers/PortfolioController.php` | Data for the public page |
| `routes/web.php` | Routes (`Route::resource('projects', ...)` inside the `auth` middleware) |
| `resources/js/Pages/Portfolio.jsx` | Public page |
| `resources/js/Pages/Projects/` | `Index`, `Create`, `Edit` pages |
| `resources/js/Components/` | Reusable components (`ProjectForm`, `FormField`, `MultiSelect`, `ConfirmDialog`, and more) |

## Routes

Run `php artisan route:list --name=projects` to see them. The project routes (`index`, `create`, `store`, `edit`, `update`, `destroy`) require login. There is no `show` page.

## Authors

- Princess Claire L. Dominguez – BSIT, Urdaneta City University
- Mariz Iglesias
