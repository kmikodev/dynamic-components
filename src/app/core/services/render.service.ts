import { WindowService } from './window.service';
import {
  ApplicationRef,
  Compiler,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  NgModuleFactory,
  Type
} from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { from, fromEvent, of } from 'rxjs';

const COMPONENT_ENTRY_POINT_TOKEN = 'COMPONENT_ENTRY_POINT';

@Injectable({
  providedIn: 'root'
})
export class RenderService {

  private window: any;





  // ...

  constructor(
    private compiler: Compiler,
    private injector: Injector,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private windowService: WindowService
  ) { }

  private getComponentRefFromComponent<T>(component: Type<T>): ComponentRef<T> {
    return this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);
  }

  private addToView<T>(componentRef: ComponentRef<T>, htmlNode: HTMLElement) {
    // Marca el dom del componente como sucio para relanzar el ciclo de detectChanges
    this.appRef.attachView(componentRef.hostView);
    // Añade el DOM del componente 
    const div = document.createElement('div');
    div.className = 'component-dynamic';
    div.appendChild(this.getComponentNode(componentRef));
    htmlNode.appendChild(div);
  }

  public appendOwnComp<T>(component: Type<T>, htmlNode: HTMLElement, properties: any = null) {
    // Obtiene un componentRef mediante el componentFactoryResolver de angular
    const componentRef: ComponentRef<T> = this.getComponentRefFromComponent(component);

    // Añade todas propiedades públicas al component ref
    if (properties) {
      Object.assign(componentRef.instance, properties);
    }
    // Agrega el componente a la vista
    this.addToView(componentRef, htmlNode);
  }

  // ....



  private isInHead(src): boolean {
    return Array.from(this.windowService.window.document.getElementsByTagName('head')[0]
      .getElementsByTagName('script')).find((s: any) => s.src === src) !== undefined;
  }

  private appendScript(src: String): Observable<any> {
    const head = this.windowService.window.document.getElementsByTagName('head')[0];
    const script = this.windowService.window.document.createElement('script');
    if (this.isInHead(src)) {
      return of({});
    }
    script.type = 'text/javascript';
    script.src = src;
    head.appendChild(script);
    return fromEvent(script, 'load')
  }

  private async getComponentFromLazyModule(dynamicModule) {
    const factory = await this.compiler.compileModuleAsync(dynamicModule);
    const moduleInstace = factory.create(this.injector);
    const componentType = moduleInstace.injector.get(COMPONENT_ENTRY_POINT_TOKEN);
    return moduleInstace.componentFactoryResolver
      .resolveComponentFactory(componentType)
      .create(this.injector);
  }

  private getComponentNode(componentRef: ComponentRef<any>) {

    return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }

  public appendRemoteComp(src: string, windowItemKey: string, moduleName: string, htmlNode: HTMLElement, properties: any = null) {
    this.appendScript(src)
      .subscribe(
      async (none) => {
        const module = this.windowService.window[windowItemKey][moduleName];
        const componentRef = await this.getComponentFromLazyModule(module);
        this.addToView(componentRef, htmlNode);
      });
  }
}

