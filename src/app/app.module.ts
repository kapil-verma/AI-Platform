import { BrowserModule } from '@angular/platform-browser';//Everything we declare must be imported
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeaturesComponent } from './features/features.component';
import { PlayboxComponent, PlayboxModalContent } from './playbox/playbox.component';
import { HomeComponent } from './home/home.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientModule } from '@angular/common/http';

@NgModule({//decorator which passes in the matadata defininf the details of this angular module
  declarations: [//defines which of our components belongs to this module 
    AppComponent,
    DashboardComponent,
    FeaturesComponent,
    PlayboxComponent,
    PlayboxModalContent,
    HomeComponent
  ],
  imports: [//defines the external modules that will be available to all of the components, properties are arrays
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    AppRoutingModule,
    NgxDatatableModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],//defines the startup component of the application
  entryComponents:[PlayboxModalContent]
})
export class AppModule { }
