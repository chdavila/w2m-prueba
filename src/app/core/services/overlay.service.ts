import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  private readonly overlay = inject(Overlay);

  overlayRef!: OverlayRef;

  openFromComponent(component: ComponentType<unknown>) {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      panelClass: 'overlay-panel',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });
    const portalRef = new ComponentPortal(component);
    this.overlayRef.attach(portalRef);
  };

  closeOverlay() {
    if(this.overlayRef.hasAttached()) {
      this.overlayRef.dispose();
    }
  }
}
