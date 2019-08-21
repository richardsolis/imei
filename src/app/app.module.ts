import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";

import { environment } from "../environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { AppComponent } from "./app.component";

import { ItemService } from "./services/item.service";
import { Ng2SearchPipeModule } from "ng2-search-filter";

@NgModule({
  declarations: [AppComponent],
  imports: [Ng2SearchPipeModule, ReactiveFormsModule, FormsModule, BrowserModule, AngularFireModule.initializeApp(environment.firebase, "angularfs"), AngularFirestoreModule],
  providers: [ItemService],
  bootstrap: [AppComponent]
})
export class AppModule {}
