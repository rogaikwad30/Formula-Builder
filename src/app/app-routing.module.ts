import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { BasicComponent } from "./basic/basic.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FinalComponent } from "./final/final.component";

const routes: Routes = [
    { path: "" , component: DashboardComponent},
    { path: "basic", component: BasicComponent},
    { path: "final", component: FinalComponent}
];

@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DashboardComponent , BasicComponent, FinalComponent]