import {MatButtonModule, MatTooltipModule, MatToolbarModule, MatCardModule, MatRadioModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
	imports: [MatButtonModule, MatTooltipModule, MatToolbarModule, MatCardModule, MatRadioModule, MatFormFieldModule, MatInputModule],
	exports: [MatButtonModule, MatTooltipModule, MatToolbarModule, MatCardModule, MatRadioModule, MatFormFieldModule, MatInputModule]
})
export class TerraGunModules {}