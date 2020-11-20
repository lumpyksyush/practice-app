import { Component, EventEmitter } from '@angular/core';

/**
 * Examples:
 * MockComponent({ selector: 'some-component' });
 * MockComponent({ selector: 'some-component', inputs: ['some-input', 'some-other-input'] });
 */
export function mockComponent(options: Component): Component {
  const metadata: Component = {
    selector: options.selector,
    template: options.template || '',
    inputs: options.inputs || [],
    outputs: options.outputs || [],
    exportAs: options.exportAs || '',
  };
  class Mock {}
  metadata.outputs.forEach((method) => {
    // tslint:disable-next-line:no-any
    Mock.prototype[method] = new EventEmitter<any>();
  });
  // tslint:disable-next-line:no-any
  return Component(metadata)(Mock as any);
}
