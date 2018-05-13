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
  ) {
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
    const componentRef = moduleInstace.componentFactoryResolver
      .resolveComponentFactory(componentType)
      .create(this.injector);
    return componentRef;
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
}

