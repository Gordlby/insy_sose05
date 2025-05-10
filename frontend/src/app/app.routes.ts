import { Routes } from '@angular/router';
import { InitComponent } from './init/init.component';
import { ScanComponent } from './scan/scan.component';
import { CreatorComponent } from './creator/creator.component';

export const routes: Routes = [
    {
        path: "",
        component: InitComponent,
        children: [
            {
                path: "",
                component: ScanComponent
            },
            {
                path: "add",
                component: CreatorComponent
            }
        ]
    }
];
