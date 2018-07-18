import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { PreloadImageService } from './preloadimage.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  	constructor(private PreloadImageService: PreloadImageService, private _sanitizer: DomSanitizer, private changeDetector: ChangeDetectorRef) {
  		this.baseAssetUrl = "/TerraGunProj/assets/";
  		this.imgMap = new Map<string, any>();
  		this.isPreloadCompleted = false;
  		this.preloadCount = 0;
  		this.loadedCount = 0;
  		this.terraGunTitle = 'Welcome Please Select A Weapon!';
  		this.gunSelected = 0;
  		this.scopeSelected = 0;
  		this.clipSelected = 0;
  		this.gunSelectedString = '';
 		this.scopeSelectedString = '';
 		this.clipSelectedString = '';
  		this.loadoutName = '';
  	}
	baseAssetUrl: string;
 	imgMap: Map<string, any>;
 	gunSelected: number;
 	scopeSelected: number;
 	clipSelected: number;
 	gunSelectedString: string;
 	scopeSelectedString: string;
 	clipSelectedString: string;
	terraGunTitle: string;
	gunPath: any;
	scopePath: any;
	clipPath:any;
    isPreloadCompleted: boolean;
    preloadCount: number;
    loadedCount: number;
    loadoutName: string;

    gunSelect() {
    	this.gunSelected = Number(this.gunSelectedString);
    	if(this.gunSelected == 1) { 
			this.terraGunTitle = 'M16 Selected!';
			this.gunPath = (this.imgMap.has("M16") ? this.imgMap.get("M16") : '');
		} else if(this.gunSelected == 2) {
			this.terraGunTitle = 'AK47 Selected!';
			this.gunPath = (this.imgMap.has("AK47") ? this.imgMap.get("AK47") : '');
		} else {
			this.gunSelected = 0;
			this.gunSelectedString = "0";
			this.terraGunTitle = 'Welcome Please Select A Weapon!';
			this.gunPath = '';
		}
		//console.log(this.gunSelected);
	}
	scopeSelect() {
		this.scopeSelected = Number(this.scopeSelectedString);
		if(this.scopeSelected == 1) { 
			this.scopePath = (this.imgMap.has("ACOG") ? this.imgMap.get("ACOG") : '');
		} else if(this.scopeSelected == 2) {
			this.scopePath = (this.imgMap.has("RedDot") ? this.imgMap.get("RedDot") : '');
		} else {
			this.scopeSelected = 0;
			this.scopeSelectedString = "0";
			this.scopePath = '';
		}
  		//console.log(this.scopeSelected);
	}
	clipSelect() {
		this.clipSelected = Number(this.clipSelectedString);
		if(this.clipSelected == 1) { 
			this.clipPath = (this.imgMap.has("30CLIP") ? this.imgMap.get("30CLIP") : '');
		} else if(this.clipSelected == 2) {
			this.clipPath = (this.imgMap.has("50CLIP") ? this.imgMap.get("50CLIP") : '');
		} else {
			this.clipSelected = 0;
			this.clipSelectedString = "0";
			this.clipPath = '';
		}
  		//console.log(this.clipSelected);
    }

	confirmLoadout() {
		localStorage.setItem("gunSelected", this.gunSelectedString);
		localStorage.setItem("scopeSelected", this.scopeSelectedString);
		localStorage.setItem("clipSelected", this.clipSelectedString);
		localStorage.setItem("loadoutName", this.loadoutName);

		if(this.loadoutName.length > 0) {
			console.log("Loadout Name: " + this.loadoutName);
		}
		if(this.gunSelected == 1) { 
			console.log("M16 Selected");
		} else if(this.gunSelected == 2) {
			console.log("AK47 Selected");
		} else {
			console.log("No Gun Selected");
		}

		if(this.scopeSelected == 1) { 
			console.log("ACOG Scope Selected");
		} else if(this.scopeSelected == 2) {
			console.log("RedDot Scope Selected");
		} else {
			console.log("No Scope Selected");
		}

		if(this.clipSelected == 1) { 
			console.log("30 Round Mag Selected");
		} else if(this.clipSelected == 2) {
			console.log("50 Round Mag Selected");
		} else {
			console.log("No Mag Selected");
		}
	}

	resetLoadout() {
		this.gunSelected = 0;
		this.terraGunTitle = 'Welcome Please Select A Weapon!';
		this.gunPath = '';
		this.scopeSelected = 0;
		this.scopePath = '';
		this.clipSelected = 0;
		this.gunSelectedString = '';
 		this.scopeSelectedString = '';
 		this.clipSelectedString = '';
		this.clipPath = '';
		this.loadoutName = '';
	}

	preloadComplete(){
		this.isPreloadCompleted = true;
		this.gunSelect();
		this.scopeSelect();
		this.clipSelect();
	}

	imageLoaded(imageName: string, imageData: any, iMap: Map<string,any>){
		iMap.set(imageName, imageData);
	}

	preloadImages() {
		this.preLoadImageServiceHelper("AK47", this.baseAssetUrl + "AK47_Asset.png", this.imageLoaded);
		this.preLoadImageServiceHelper("M16", this.baseAssetUrl + "M16_Asset.png", this.imageLoaded);
		this.preLoadImageServiceHelper("50CLIP", this.baseAssetUrl + "50RoundClip_Asset.png", this.imageLoaded);
		this.preLoadImageServiceHelper("30CLIP", this.baseAssetUrl + "30RoundClip_Asset.png", this.imageLoaded);
		this.preLoadImageServiceHelper("ACOG", this.baseAssetUrl + "ACOG_Asset.png", this.imageLoaded);
		this.preLoadImageServiceHelper("RedDot", this.baseAssetUrl + "RedDot_Asset.png", this.imageLoaded);
	}

  	preLoadImageServiceHelper(imgName: string, imgUrl: string, callback) {
  		this.preloadCount += 1;
  		console.log(imgUrl);
      	this.PreloadImageService.getImage(imgUrl).subscribe(data => {
        	let reader = new FileReader();
   			reader.addEventListener("load", () => {
   				console.log("Image Loaded");
   				//!this._sanitizer.bypassSecurityTrustResourceUrl() - Hack? to get around IE and EDGE
   				let readerResults = String(reader.result);
   				callback(imgName, this._sanitizer.bypassSecurityTrustResourceUrl(readerResults), this.imgMap);
   				this.loadedCount += 1;
				if(this.loadedCount === this.preloadCount){
					this.preloadComplete();

				}
   			}, false);
   			if (data) {
      			reader.readAsDataURL(data);
   			}
      	}, error => {
      		this.loadedCount += 1;
      		if(this.loadedCount === this.preloadCount){
				this.preloadComplete();
			}
        	console.log(error);
      	});
  	}

	ngOnInit(){
		this.preloadImages();
	}
	ngAfterViewInit() {
    	if (localStorage.length > 0) {
  			this.gunSelectedString = localStorage.getItem("gunSelected");
  			this.scopeSelectedString = localStorage.getItem("scopeSelected");
  			this.clipSelectedString = localStorage.getItem("clipSelected");
  			this.gunSelected = Number(this.gunSelectedString);
  			this.scopeSelected = Number(this.scopeSelectedString);
  			this.clipSelected = Number(this.clipSelectedString);
  			this.loadoutName = localStorage.getItem("loadoutName");
  			this.changeDetector.detectChanges();
  		} else {
  			this.gunSelected = 0;
  			this.scopeSelected = 0;
  			this.clipSelected = 0;
  			this.loadoutName = '';
  		}
  		//console.log(this.gunSelected);
  		//console.log(this.scopeSelected);
  		//console.log(this.clipSelected);
  	}

}