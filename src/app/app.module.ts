import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FormsModule } from '@angular/forms';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// components
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component'
import { AllBlogsComponent } from './components/blogs/all-blogs/all-blogs.component';
import { SingleBlogComponent } from './components/blogs/single-blog/single-blog.component';
import { VoteBlogComponent } from './components/vote-blog/vote-blog.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { AllCommentsComponent } from './components/comments/all-comments/all-comments.component';

// views
import { HomeComponent } from './views/home/home.component';
import { BlogsComponent } from './views/blogs/blogs.component';
import { AddBlogComponent } from './views/add-blog/add-blog.component';
import { EditBlogComponent } from './views/edit-blog/edit-blog.component';
import { CreateCommentComponent } from './components/comments/create-comment/create-comment.component';

// router
const appRoutes: Routes = [
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
        path: 'edit-blog/:id',
        component: EditBlogComponent
      },
      {
        path: ':id',
        component: SingleBlogComponent
      },
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
    AvatarComponent,
    EditBlogComponent,
    AllCommentsComponent,
    CreateCommentComponent
  ],
  imports: [
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
