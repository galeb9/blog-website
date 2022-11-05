import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

// import { AppRoutingModule } from './app-routing.module';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// components
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { HeaderComponent } from './components/header/header.component';

import { FormsModule } from '@angular/forms';

import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

// views
import { NotFoundComponent } from './components/not-found/not-found.component'
import { HomeComponent } from './views/home/home.component';
import { BlogsComponent } from './views/blogs/blogs.component';
import { AllBlogsComponent } from './components/blogs/all-blogs/all-blogs.component';
import { SingleBlogComponent } from './components/blogs/single-blog/single-blog.component';
import { AddBlogComponent } from './views/add-blog/add-blog.component';
import { VoteBlogComponent } from './components/blogs/vote-blog/vote-blog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommentsComponent } from './components/comments/comments.component';
import { AvatarComponent } from './components/avatar/avatar.component';

// router
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
    AddBlogComponent,
    VoteBlogComponent,
    CommentsComponent,
    AvatarComponent
  ],
  imports: [
    // AppRoutingModule,
    // FontAwesomeModule,
    BrowserModule,
    AmplifyAuthenticatorModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false}),
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
