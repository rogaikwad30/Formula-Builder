import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { BasicComponent } from "./basic/basic.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FinalComponent } from "./final/final.component";
import { BasicNewUiComponent } from "./basic-new-ui/basic-new-ui.component";
import { DashboardNewUiComponent } from "./dashboard-new-ui/dashboard-new-ui.component";
import { FinalNewUiComponent } from "./final-new-ui/final-new-ui.component";
// import { NewDashboardComponent } from "./new-dashboard/new-dashboard.component";

const routes: Routes = [
    { path: "" , component: DashboardComponent},
    { path: "basic", component: BasicComponent},
    { path: "final", component: FinalComponent},
    { path: "basic-new-ui", component: BasicNewUiComponent},
    { path: "dashboard-new-ui", component: DashboardNewUiComponent},
    { path: "final-new-ui", component: FinalNewUiComponent},
    // { path: "new", component: NewDashboardComponent}
];

@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DashboardComponent , BasicComponent, FinalComponent]