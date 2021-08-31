import { loadRemoteModule } from '@angular-architects/module-federation';
import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnInit,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-board-host',
  templateUrl: './board-host.component.html',
  styleUrls: ['./board-host.component.scss'],
})
export class BoardHostComponent implements OnInit {
  constructor(
    private cfr: ComponentFactoryResolver,
    private vcref: ViewContainerRef
  ) {}

  async ngOnInit(): Promise<void> {
    // await loadRemoteEntry()

    const { BoardComponent } = await loadRemoteModule({
      remoteEntry: 'http://kanban.lvh.me/remoteEntry.js',
      remoteName: 'kanban',
      exposedModule: './BoardComponent',
    });
    const componentRef: ComponentRef<{
      search: string;
    }> = this.vcref.createComponent(
      this.cfr.resolveComponentFactory(BoardComponent)
    );
    componentRef.instance.search = '1';
  }
}
