import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  declarations: [ToastComponent],
  exports: [ToastComponent],
  imports: [CommonModule],
})
export class ToastModule {}
