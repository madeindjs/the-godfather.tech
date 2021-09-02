import { loadRemoteModule } from '@angular-architects/module-federation';
import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-board-host',
  templateUrl: './board-host.component.html',
  styleUrls: ['./board-host.component.scss'],
})
export class BoardHostComponent implements OnInit, OnChanges {
  @Input() uuid!: string | null;

  componentRef!: ComponentRef<{
    uuid: string | null;
    apiUrl: string;
  }>;

  constructor(
    private cfr: ComponentFactoryResolver,
    private vcref: ViewContainerRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.uuid.currentValue && this.componentRef) {
      this.componentRef.instance.uuid = this.uuid;
    }
  }

  async ngOnInit(): Promise<void> {
    // await loadRemoteEntry()

    const { BoardComponent } = await loadRemoteModule({
      remoteEntry: environment.kanban.remoteEntry,
      remoteName: 'kanban',
      exposedModule: './BoardComponent',
    });
    this.componentRef = this.vcref.createComponent(
      this.cfr.resolveComponentFactory(BoardComponent)
    );
    this.componentRef.instance.uuid = this.uuid;
    this.componentRef.instance.apiUrl = environment.backend.url;
  }
}
