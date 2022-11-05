import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { NotFoundComponent } from './components/not-found/not-found.component'
// import { HomeComponent } from './views/home/home.component';
// import { BlogsComponent } from './views/blogs/blogs.component';
// import { AllBlogsComponent } from './components/blogs/all-blogs/all-blogs.component';
// import { SingleBlogComponent } from './components/blogs/single-blog/single-blog.component';
// import { AddBlogComponent } from './views/add-blog/add-blog.component';

// import { AuthComponent } from './components/auth/auth.component';


const routes: Routes = [
  // { path: '', component: HomeComponent },
  // { path: 'home', component: HomeComponent },
  // { path: 'auth', component: AuthComponent },
  // { 
  //   path: 'blogs', 
  //   component: BlogsComponent,
  //   children: [
  //     {
  //         path: '',
  //         component: AllBlogsComponent
  //     },
  //     {
  //       path: 'blog/:id',
  //       component: SingleBlogComponent
  //     }
  //   ]
  // },
  // { path: 'add-blog', component: AddBlogComponent },
  // { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [
    // HomeComponent,
    // NotFoundComponent,
    // BlogsComponent,
    // AllBlogsComponent,
    // SingleBlogComponent,
    // AddBlogComponent,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
