import { Component } from "@angular/core";
import { ItemService } from "./services/item.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public title = "imei";
  public imeis;
  public popUp = false;
  public imei;
  public update = false;
  public registerForm: FormGroup;
  public submitted = false;

  constructor(public itemService: ItemService, private formBuilder: FormBuilder) {}
  get f() {
    return this.registerForm.controls;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      IMEI: ["", [Validators.required, Validators.minLength(10)]],
      dni: ["", [Validators.required, Validators.minLength(8)]],
      mail: ["", [Validators.required, Validators.email]]
    });

    this.itemService.getItems().subscribe(items => {
      this.imeis = items;
      console.log(items);
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      if (this.update == true) {
        if (this.imei == this.registerForm.get("IMEI").value) {
          this.itemService.update_Student(this.imei, this.registerForm.value);
        } else {
          this.itemService.delete_Student(this.imei);
          this.itemService.create_NewStudent(this.registerForm.value, this.registerForm.get("IMEI").value.toString());
        }
        this.popUp = false;
      } else {
        this.itemService.create_NewStudent(this.registerForm.value, this.registerForm.get("IMEI").value.toString());
        console.log(this.registerForm.value, "222");
        this.popUp = false;
      }
    }
  }

  delete(imei) {
    console.log(imei);
    this.itemService.delete_Student(imei);
  }

  add() {
    this.registerForm.setValue({
      IMEI: null,
      dni: null,
      mail: null
    });
    this.popUp = true;
    this.update = false;
  }

  closePopUp() {
    this.popUp = false;
    this.update = false;
  }

  edit(imei) {
    this.imei = imei.IMEI;
    this.registerForm.setValue({
      IMEI: imei.IMEI,
      dni: imei.dni,
      mail: imei.mail
    });
    this.update = true;
    this.popUp = true;
  }
}
