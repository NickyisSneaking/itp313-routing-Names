## structure
test/
- index.js    # Main entry point
routes/
- feet.js     # Student info route 
- route2.js    # Subject info route
- router3.js   # Teacher info route
- router4.js   # Room info route
- router5.js   # Schedule info
route
- package.json
- .gitignore
- 
## Project UI Web
controllers/   request handlers (one per model)
middleware/    view helper
models/        Sequelize models and database connection
routes/        route files
views/         .xian pages
migrate.js     creates the tables
index.js       starts the server

## ITP313 Routing Activity
Express.js application demonstrating modular routing with 5 separate route files, created for Routing activity

## Routes
All routes are mounted under `/KimJustin/`:
- `/KimJustin/feet` - Student info
- `/KimJustin/subjects` - Subject info
- `/KimJustin/teachers` - Teacher info
- `/KimJustin/rooms` - Room info
- `/KimJustin/schedule` - Schedule info

## Models (5 tables)
| Model | Columns |
|---|---|
| Student | name, age, club, school, role |
| Club | name, school, president, memberCount, room |
| School | name, location, type, foundedYear, motto |
| Course | title, teacher, credits, schedule, room |
| Teacher | name, subject, age, email, office |

Each model file has 3 functions: **insert**, **select all** and **select by id**. Sequelize also adds `id`, `createdAt` and `updatedAt`.

## Routes
| Method | Route | Action |
|---|---|---|
| POST | `/clubs` | Insert |
| GET | `/clubs` | Select all |
| GET | `/clubs/:id` | Select by id |
| PUT | `/clubs/:id` | Update |
| DELETE | `/clubs/:id` | Delete |

The same routes exist for `/students`, `/schools`, `/courses` and `/teachers`. 

## How to run
1. Start **MySQL** in Laragon and create a database named `test`.
2. Install the packages: `npm install`
3. Create the tables: `npm run migrate`
4. Start the server: `npm run xian`
5. Open `http://localhost:3000/clubs/list` or test the routes in Postman.

```bash
npm install
node index.js



## Screenshots
<img width="1366" height="720" alt="1001707937" src="https://github.com/user-attachments/assets/eee2c545-2fdc-4972-b466-27bf44eed66b" />
<img width="1366" height="720" alt="1001707939" src="https://github.com/user-attachments/assets/25f07cb4-996f-479c-9d27-35bbe7ac95b3" />
<img width="1366" height="720" alt="1001707933" src="https://github.com/user-attachments/assets/b7c56e0e-c9d0-431d-916c-25b13d511177" />
<img width="1366" height="720" alt="1001707932" src="https://github.com/user-attachments/assets/ec9b0eb0-9d80-42c1-8474-c10284b8ecfd" />
