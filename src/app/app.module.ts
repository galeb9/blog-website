import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

// components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { HeaderComponent } from './components/header/header.component';

import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { NotFoundComponent } from './components/not-found/not-found.component'

// views
import { HomeComponent } from './views/home/home.component';
import { BlogsComponent } from './views/blogs/blogs.component';
import { AllBlogsComponent } from './components/blogs/all-blogs/all-blogs.component';
import { SingleBlogComponent } from './components/blogs/single-blog/single-blog.component';
import { AddBlogComponent } from './views/add-blog/add-blog.component';

const appRoutes: Routes = [
  // {path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'auth', component: AuthComponent },
  { 
    path: 'blogs', 
    component: BlogsComponent,
    children: [
      {
          path: '',
          component: AllBlogsComponent
      },
      {
        path: 'blog/:id',
        component: SingleBlogComponent
      }
    ]
  },
  { path: 'add-blog', component: AddBlogComponent },
  { path: '**', component: NotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    HeaderComponent,
    NotFoundComponent,
    BlogsComponent,
    AllBlogsComponent,
    SingleBlogComponent,
    AddBlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyAuthenticatorModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
