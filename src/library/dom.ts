export const elementFactory = (
  type: string,
  // eslint-disable-next-line no-unused-vars
  events: Record<string, (event?: Event) => void>,
  attributes: Record<string, string>,
  ...children: Array<HTMLElement | SVGSVGElement | SVGPathElement | string>
) => {
  let el: HTMLElement | SVGSVGElement | SVGPathElement;

  if (type === 'svg' || type === 'path') {
    el = document.createElementNS('http://www.w3.org/2000/svg', type);
  } else {
    el = document.createElement(type);
  }

  for (const key in attributes) {
    el.setAttribute(key, attributes[key]);
  }

  for (const key in events) {
    el.addEventListener(key, events[key]);
  }

  children.forEach((child) => {
    if (typeof child === 'string') {
      el.appendChild(document.createTextNode(child));
    } else {
      el.appendChild(child);
    }
  });

  return el;
};

export const styleFactory = (styles: Record<string, string>) => {
  const generateStyleString = (styles: Record<string, string>): string => {
    return ''.concat(
      ...Object.keys(styles).map((key) => ''.concat(`${key}:${styles[key]};`)),
    );
  };

  return {
    style: generateStyleString(styles),
  };
};
