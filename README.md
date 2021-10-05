
=>	Structure and coding standard.

•	Folder name: Folder name always should be relevant. If you share your project zip file to client then always make sure zip name & add date (ex: angular_01_09_2021).

•	File Name: Always file create with proper name feature. Not directly start coding with the app.component file.
Firstly, add angular router then create new pages and start coding with that page.
Ex:
src/
	app/
		app.component
		pages/
			login.page.html. 


=>	Naming conversion

Classes	Do use upper camel case	
Constants	camel case	Ex: UPPER_SNAKE_CASE
Interfaces	Do name an interface using upper camel case.	
File name	Small case and include “_” between name	Ex: my_profile.
Method name	camel case	
Variable declaration	camel case/small case	If use small case then include ‘_’ inside the name 
Ex: my_profile.
Local variable	camel case	


=> Important Notes

•	Remove unwanted code & extra log from the .ts file
•	If you create new service then new folder the name ‘service’ and put all the service inside it.
•	 Script URL add inside the index.html. DO NOT add inside the any other html.
•	For best practice always use ‘try’ & ‘catch’.
•	 Datatype always should be relevant.

=>	Lazy loading a feature module
The feature module should be placed synchronously when the app startup to show initial content. Each other feature module should be loaded lazily after user-triggered navigation.That way we will be able to make our Angular app faster. In other words, a feature module won’t be loaded initially, but when you decide to initiate it. Therefore, making an initial load of the Angular app faster too Here is an example on how to initiate a lazy loaded feature module via app-routing.module.ts file.
const routes: Routes = [
{path: 'dashboard',
  loadChildren: 'app/dashboard/dashboard.module#DashboardModule',
  component: CoreComponent }]



=>	Deployment
•	Remove All console.log and debuggers from Projects files.
•	Enable Angular Production Mode before taking build.
•	sourcemaps false — disable generation of source maps 
•	--named-chunks false — disable using human readable names for chunk and use numbers instead.


=>	Official Reference
•	 https://angular.io/guide/lifecycle-hooks
•	For standard UI mostly use angular material UI   https://material.angular.io/components/categories
•	Create one example of angular directive (try to create custom directive)  https://angular.io/api/core/Directive  &&
	https://angular.io/api/core/EventEmitter
	- After compete directive, create component & understand the difference between directive and component.
•	 https://angular.io/guide/pipes




