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
import { of } from 'rxjs';
import { from } from 'rxjs';

const PLUGIN_ENTRY_POINT_TOKEN = 'PLUGIN_ENTRY_POINT';

@Injectable({
  providedIn: 'root'
})
export class RenderService {

  private window: any;
  
  constructor(
    private compiler: Compiler,
    private injector: Injector,
    private windowService: WindowService,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {
    this.window = this.windowService.window;
  }

  private isScript(head: HTMLElement, scriptSrc: string): boolean {
    const scripts = Array.from(head.getElementsByTagName('script'));
    return scripts.find(s => s.src === scriptSrc) !== undefined;
  }

  private registerDinamicallyModule(dinamicModule, parentElement): void {
    const moduleRef = from(this.compiler.compileModuleAsync(dinamicModule));
    moduleRef.subscribe((factory: NgModuleFactory<any>) => {
      const moduleInstace = factory.create(this.injector);
      const componentType = moduleInstace.injector.get(PLUGIN_ENTRY_POINT_TOKEN);
      const componentRef = moduleInstace.componentFactoryResolver
        .resolveComponentFactory(componentType)
        .create(this.injector);
      this.appendComponent(componentRef, parentElement);
    });
  }
  private getComponentHtmlElement(componentRef) {
    return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }

  public moduleResolverHttp(moduleSrc, parentElement): void {
    const head = this.window.document.getElementsByTagName('head')[0];
    const script = this.window.document.createElement('script');
    script.type = 'text/javascript';
    script.src = moduleSrc;
    head.appendChild(script);
    script.onload = () => {
      const dinamicModule: NgModuleFactory<any> = window['todo-list'].TodoListModule;
      this.registerDinamicallyModule(dinamicModule, parentElement);
    };
  }

  public componentResolver(component): ComponentRef<any> {
    return this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);
  }

  public appendComponent(component: ComponentRef<any>, parentElement: HTMLElement) {
    const componentRef = component;
    const componentElement = this.getComponentHtmlElement(componentRef);
    this.appRef.attachView(componentRef.hostView);
    parentElement.appendChild(componentElement);
    return (() => {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    });
  }

  public appendOwnComp(component: any, parentElement: HTMLElement, data: any) {
    const componentFactory = this.componentResolver(component);
    componentFactory.instance['component'] = data;
    this.appendComponent(componentFactory, parentElement);
  }
}

