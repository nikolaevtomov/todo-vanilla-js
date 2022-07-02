export const elementFactory = (
  type: string,
  // eslint-disable-next-line no-unused-vars
  events: Record<string, (event?: Event) => void>,
  attributes: Record<string, string>,
  ...children: Array<HTMLElement | string>
) => {
  const el = document.createElement(type);

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
