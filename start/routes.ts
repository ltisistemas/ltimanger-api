/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  Route.post('login', 'Auth/LoginController.store')

  Route.group(() => {
    Route.resource('users', 'Auth/UsersController')

    Route.group(() => {
      Route.resource('companies', 'Admin/CompaniesController')
      Route.resource('companie-users', 'Admin/CompanieUsersController')
    }).prefix('admin')

    /**
     * @todo Default Kanban Routes
     */
    Route.resource('boards', 'Kanban/CompanieBoardController')
    Route.resource('board-lists', 'Kanban/CompanieBoardListController')
    Route.resource('board-lists-tasks', 'Kanban/CompanyBoardListTaskController')
  })
    .middleware('auth')
    .prefix('auth')
}).prefix('api')
