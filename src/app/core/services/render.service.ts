import { WindowService } from './window.service';
import {
  ApplicationRef,
  Compiler,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  NgModuleFactory
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

  constructor(
    private compiler: Compiler,
    private injector: Injector,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private windowService: WindowService
  ) {
  }
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

  private getComponentRefFromComponent(component): ComponentRef<any> {
    return this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);
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

  private addToView(componentRef: ComponentRef<any>, htmlNode: HTMLElement) {
    const componentNode = this.getComponentNode(componentRef);
    this.appRef.attachView(componentRef.hostView);
    htmlNode.appendChild(componentNode);
  }

  public appendOwnComp(component: any, htmlNode: HTMLElement, inputs: any = null) {
    const componentRef: ComponentRef<any> = this.getComponentRefFromComponent(component);
    if (inputs) {
      Object.assign(componentRef.instance, inputs);
    }
    this.addToView(componentRef, htmlNode);
  }

  public appendRemoteComp(src: string, windowItemKey: string, moduleName: string, htmlNode: HTMLElement, inputs: any = null) {
    this.appendScript(src)
      .subscribe(
      async (none) => {
        const module = this.windowService.window[windowItemKey][moduleName];
        const componentRef = await this.getComponentFromLazyModule(module);
        this.addToView(componentRef, htmlNode);
      });
  }
}

