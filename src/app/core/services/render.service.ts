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
  Type,
  NgModuleRef,
  ViewContainerRef
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
    private componentFactoryResolver: ComponentFactoryResolver,
    private windowService: WindowService
  ) { }

  public appendRemoteComponent(src: string, windowItemKey: string, moduleName: string, viewContainerRef: ViewContainerRef, properties: any = null) {
    this.appendScript(src)
      .subscribe(
      async (none) => {
        const dynamicModule = this.windowService.window[windowItemKey][moduleName];
        const componentRef = await this.getComponentRefFromLazyModule(dynamicModule);
        this.addToView(componentRef, viewContainerRef);
      });
  }

  private async getModuleRef<T>(dynamicModule: Type<T>): Promise<NgModuleRef<T>> {
    // Compilamos el modulo para obtener un NgModuleFactory
    const ngModuleFactory = await this.compiler.compileModuleAsync(dynamicModule);
    // Obtenemos el móduleRef
    return ngModuleFactory.create(this.injector);

  }

  private async getComponentRefFromLazyModule<T>(dynamicModule: Type<T>) {
    // Obtenemos el moduleRef
    const moduleRef: NgModuleRef<T> = await this.getModuleRef(dynamicModule);

    // Tipo del componente mediante provider
    const componentType = moduleRef.injector.get(COMPONENT_ENTRY_POINT_TOKEN);

    // Devolvemos el componenteRef desde el componentFactoryResolver del módulo
    return moduleRef.componentFactoryResolver
      .resolveComponentFactory(componentType)
      .create(this.injector);
  }


  private getComponentRefFromComponentType<T>(component: Type<T>): ComponentRef<T> {
    return this.componentFactoryResolver
      .resolveComponentFactory(component)
      .create(this.injector);
  }

  public appendComponent<T>(component: Type<T>, viewContainerRef: ViewContainerRef, properties: any = null) {
    // Obtiene un componentRef mediante el componentFactoryResolver de angular
    const componentRef: ComponentRef<T> = this.getComponentRefFromComponentType(component);

    this.setProperties(componentRef, properties);
    
    // Agrega el componente a la vista
    this.addToView(componentRef, viewContainerRef);
  }

  private setProperties<T>(componentRef: ComponentRef<T>, properties) {
    // Añade todas propiedades públicas al component ref
    if (properties) {
      Object.assign(componentRef.instance, properties);
    }
  }

  private addToView<T>(componentRef: ComponentRef<T>, viewContainerRef: ViewContainerRef) {
    viewContainerRef.insert(componentRef.hostView);
  }

  private getComponentNode(componentRef: ComponentRef<any>): ViewContainerRef {
    // Dos maneras de obtener el htmlNode del component
    return componentRef.location.nativeElement;
    // return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as ViewContainerRef;
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


}
