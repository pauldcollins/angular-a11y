import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleAriaLiveService } from './single-aria-live';

@NgModule({
  imports: [ CommonModule ],
  providers: [ SingleAriaLiveService ]
})
export class AngularA11yModule {}


//import { NgModule } from '@angular/core';
//import { SingleAriaLive } from './single-aria-live';
//
//@NgModule({})
//export class ServicesModule {
//  static forRoot() {
//    return {
//      ngModule: ServicesModule,
//      providers: [ SingleAriaLive ]
//    }
//  }
//}
//
//export {
//  SingleAriaLive
//}