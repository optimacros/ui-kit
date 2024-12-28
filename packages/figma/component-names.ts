export const componentNames = [
    'button',
    'button-group',
    'button-menu',
    'calendar',
    'checkbox',
    'chip',
    'color-picker',
    'contents',
    'counter',
    'divider',
    'download-iframe',
    'draggable',
    'dropdown',
    'favourite',
    'field',
    'file-input',
    'file-upload',
    'font-icon',
    'footer',
    'header',
    'icon',
    'icon-button',
    'input',
    'kanban',
    'layout',
    'layout-fixed-container',
    'loader',
    'markdown-editor',
    'memory-counter',
    'menu',
    'modal',
    'navigation',
    'progress-bar',
    'progress-bars',
    'radio-button',
    'radio-group',
    'range-slider',
    'resource-list',
    'search-field',
    'search-input',
    'select-box',
    'sidebar',
    'slider',
    'slider-scale',
    'snackbar',
    'tabs',
    'text-area',
    'toast',
    'toggle-icon',
    'toolbar',
    'tooltip',
    'view-menu',
    'virtual',
] as const;

export const textSize = ['font-size', 'font-weight', 'letter-spacing', 'line-height'] as const;

export const text = [
    // Font properties
    'font-family',
    'font-size',
    'font-weight',
    'font-style',
    'font-variant',
    'font-stretch',
    'font-size-adjust',
    'font-synthesis',
    'font-kerning',
    'font-optical-sizing',
    'font-variation-settings',
    'font-feature-settings',
    'font-language-override',

    // Text properties
    'text-align',
    'text-align-last',
    'text-decoration',
    'text-decoration-color',
    'text-decoration-line',
    'text-decoration-style',
    'text-decoration-thickness',
    'text-indent',
    'text-justify',
    'text-overflow',
    'text-shadow',
    'text-transform',
    'text-underline-position',
    'text-rendering',
    'text-orientation',
    'text-combine-upright',

    // Spacing properties
    'letter-spacing',
    'line-height',
    'word-spacing',
    'white-space',
    'word-break',
    'word-wrap',
    'overflow-wrap',

    // Other text-related properties
    'writing-mode',
    'vertical-align',
    'unicode-bidi',
    'direction',
    'hyphens',
    'line-break',
    'tab-size',
    'quotes',
] as const;

export const size = [
    // Basic dimensions
    'width',
    'height',
    'min-width',
    'min-height',
    'max-width',
    'max-height',
    'font-size',
    'font-weight',

    'letter-spacing',
    'line-height',
    'word-spacing',
    // Box model
    'margin',
    'margin-top',
    'margin-right',
    'margin-bottom',
    'margin-left',
    'padding',
    'padding-top',
    'padding-right',
    'padding-bottom',
    'padding-left',

    'border-radius',
    'border-width',
    'border-top-width',
    'border-right-width',
    'border-bottom-width',
    'border-left-width',

    // Transform-related
    'scale',
    'scale-x',
    'scale-y',
    'scale-z',
    'scale3d',

    // Container queries
    'container-type',
    'contain',
    'contain-intrinsic-width',
    'contain-intrinsic-height',

    // Aspect ratio
    'aspect-ratio',
] as const;

export const layout = [
    // Display and visibility
    'display',
    'visibility',
    'opacity',
    'z-index',
    'overflow',
    'overflow-x',
    'overflow-y',
    'clip',
    'clip-path',

    // Positioning
    'position',
    'top',
    'right',
    'bottom',
    'left',
    'inset',
    'float',
    'clear',

    // Flexbox
    'flex-direction',
    'flex-wrap',
    'flex-flow',
    'justify-content',
    'align-items',
    'align-content',
    'align-self',
    'order',
    'flex',
    'flex-grow',
    'flex-shrink',
    'flex-basis',
    'gap',
    'row-gap',
    'column-gap',

    // Grid
    'grid',
    'grid-template-columns',
    'grid-template-rows',
    'grid-template-areas',
    'grid-template',
    'grid-auto-columns',
    'grid-auto-rows',
    'grid-auto-flow',
    'grid-column-start',
    'grid-column-end',
    'grid-column',
    'grid-row-start',
    'grid-row-end',
    'grid-row',
    'grid-area',

    // Multi-column
    'columns',
    'column-count',
    'column-fill',
    'column-gap',
    'column-rule',
    'column-span',
    'column-width',

    // Table
    'table-layout',
    'border-collapse',
    'border-spacing',
    'caption-side',
    'empty-cells',

    // Transforms and perspective
    'transform',
    'transform-origin',
    'transform-style',
    'perspective',
    'perspective-origin',
    'backface-visibility',

    // Container queries
    'container',
    'container-type',
    'container-name',

    // Other layout properties
    'isolation',
    'object-fit',
    'object-position',
    'vertical-align',
    'writing-mode',
    'direction',
    'pointer-events',
] as const;

export const color = [
    // Basic color properties
    'color',
    'background-color',
    'border-color',
    'border-top-color',
    'border-right-color',
    'border-bottom-color',
    'border-left-color',
    'outline-color',
    // Text decoration colors
    'text-decoration-color',
    'text-emphasis-color',
    'caret-color',
    'border',
    'outline',

    // SVG-specific colors
    'fill',
    'stroke',
    'stop-color',
    'flood-color',
    'lighting-color',

    // Gradient properties
    'background-image',
    'background',

    // Box shadow and text shadow
    'box-shadow',
    'text-shadow',

    // Column rules
    'column-rule-color',

    // Scrollbar colors
    'scrollbar-color',

    // Accent colors
    'accent-color',

    // Filter effects that modify colors
    'filter',
    'backdrop-filter',

    // Mix blend modes
    'mix-blend-mode',
    'background-blend-mode',

    // Current color keyword
    'currentColor',

    // Theme colors
    'color-scheme',
] as const;

export const basic = [...color, 'outline', 'border', 'border-radius', 'padding'] as const;
