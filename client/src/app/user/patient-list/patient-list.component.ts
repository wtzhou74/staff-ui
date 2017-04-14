import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Patient} from "../shared/patient.model";
import {PatientService} from "../shared/patient.service";
import {PageableData} from "../../shared/pageable-data.model";
import {UtilityService} from "app/shared/utility.service";
import {NotificationService} from "app/shared/notification.service";

@Component({
  selector: 'c2s-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  private totalItems: number = 0;
  private totalPages: number = 0;
  private itemsPerPage: number = 0;
  private currentPage: number = 1;
  private noResult: boolean = false;
  private loading: boolean = false;
  private asyncPatients: Observable<Patient[]>;
  public searchPatients: Patient[];

  public terms: string = "";

  constructor(private notificationService: NotificationService,
              private patientService: PatientService,
              private utilityService: UtilityService) {
  }

  ngOnInit() {
    this.getPage(this.currentPage);
  }

  public search(terms: string) {
    this.patientService.searchPatients(terms)
      .subscribe(
        (patients) => {
          this.searchPatients = patients;
        },
        err => {
          this.notificationService.show("Failed to search user, please try again later...");
          console.log(err);
        });
  }

  getPage(page: number) {
    this.loading = true;
    this.asyncPatients = this.patientService.getPatients(page - 1)
      .do((patients: PageableData<Patient>) => {
        this.noResult = patients.totalElements === 0;
        this.totalItems = patients.totalElements;
        this.totalPages = patients.totalPages;
        this.itemsPerPage = patients.size;
        this.currentPage = patients.number + 1;
        this.loading = false;
      })
      .map(patients => patients.content);
  }

  redirectToUserEdit(patient: Patient) {
    const editUserUrl: string = `${"/users/edit"}/${patient.id}`;
    this.utilityService.navigateTo(editUserUrl)
  }
}
