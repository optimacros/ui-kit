import { startsWith, kebabCase } from '@optimacros-ui/utils';
export const ICONS_MAP = {
    action: 'action',
    add: 'add',
    'add-abc': 'add-abc',
    'add-bold': 'add-bold',
    'add-comment': 'add-comment',
    'add-multiple': 'add-multiple',
    'add-name': 'add-name',
    address: 'address',
    all: 'all',
    // app: 'app',
    'area-chart': 'area-chart',
    article: 'article',
    // 'attach-file': 'attach-file',
    audit: 'audit',
    bell: 'bell',
    // blueprint: 'blueprint',
    'bar-chart': 'bar-chart',
    'bar-stacked-chart': 'bar-stacked-chart',
    'biaxial-bar-chart': 'biaxial-bar-chart',
    'biaxial-line-chart': 'biaxial-line-chart',
    checklist: 'checklist',
    'choose-font': 'choose-font',
    clean: 'clean',
    clock: 'clock',
    close: 'close',
    'column-chart': 'column-chart',
    'column-stacked-chart': 'column-stacked-chart',
    columns: 'columns',
    'combination-chart': 'combination-chart',
    comment: 'comment',
    context: 'context',
    copy: 'copy',
    // 'copy-down': 'copy-down',
    // 'copy-right': 'copy-right',
    cube: 'cube',
    cycle: 'cycle',
    dashboard: 'dashboard',
    drilldown: 'drilldown',
    'drill-down': 'drilldown',
    // database: 'database',
    // download: 'download',
    'edit-mode': 'edit-mode',
    'edit-pen': 'edit-pen',
    edit: 'edit',
    error: 'error',
    // 'eye-drop': 'eye-drop',
    filter: 'filter',
    flexible: 'flexible',
    // folder: 'folder',
    // 'folder-close': 'folder-close',
    // 'folder-open': 'folder-open',
    formatting: 'formatting',
    formula: 'formula',
    'full-stacked-bar-chart': 'full-stacked-bar-chart',
    'full-stacked-column-chart': 'full-stacked-column-chart',
    'funnel-chart': 'funnel-chart',
    'gantt-chart': 'gantt-chart',
    // global: 'global',
    hide: 'hide',
    // home: 'home',
    'horizontal-lines': 'horizontal-lines',
    'images-with-objects-chart': 'images-with-objects-chart',
    inventory: 'inventory',
    kanban: 'kanban',
    'keyboard-double-arrow-left': 'keyboard-double-arrow-left',
    'keyboard-double-arrow-right': 'keyboard-double-arrow-right',
    'keyboard-double-arrow-up': 'keyboard-double-arrow-up',
    'keyboard-double-arrow': 'keyboard-double-arrow',
    'line-chart': 'line-chart',
    lines: 'lines',
    list: 'list',
    lock: 'lock',
    // login: 'login',
    // 'manage-search': 'manage-search',
    'map-chart': 'map-chart',
    'map-with-objects-chart': 'map-with-objects-chart',
    module: 'module',
    'notification-bell': 'notification-bell',
    'notification-list': 'notification-list',
    'notification-script': 'notification-script',
    notification: 'notification',
    'one-number-indicator': 'one-number-indicator',
    open: 'open',
    // parsing: 'parsing',
    'personal-list-view': 'personal-list-view',
    'personal-view': 'personal-view',
    'pie-chart': 'pie-chart',
    pin: 'pin',
    // progress: 'progress',
    'progress-bar-indicator': 'progress-bar-indicator',
    'radial-sensor-indicator': 'radial-sensor-indicator',
    'rebase-edit': 'rebase-edit',
    refresh: 'refresh',
    rename: 'rename',
    reply: 'reply',
    reset: 'reset',
    'risk-manager-chart': 'risk-manager-chart',
    'route-map-chart': 'route-map-chart',
    rows: 'rows',
    'sankey-chart': 'sankey-chart',
    satellite: 'satellite',
    save: 'save',
    'saved-view': 'saved-view',
    'scatter-plot': 'scatter-plot-chart',
    'scatter-plot-chart': 'scatter-plot-chart',
    // settings: 'settings',
    show: 'show',
    'slider-control-element': 'slider-control-element',
    'stock-chart': 'stock-chart',
    trash: 'trash',
    // time: 'time',
    'treemap-chart': 'treemap-chart',
    undo: 'undo',
    unlock: 'unlock',
    unpin: 'unpin',
    'view-list': 'view-list',
    'visual-cells': 'visual-cells',
    'waterfall-chart': 'waterfall-chart',
    widgets: 'widgets',
    workspaces: 'workspaces',
} as const;

export type IconName = keyof typeof ICONS_MAP;

const ignoreIcons = ['refresh'];

export function isValidIconName(name: string) {
    let possibleName = name;

    if (startsWith(name, 'icon')) {
        possibleName = kebabCase(name.replace('icon', ''));
    }

    if (ignoreIcons.some((i) => i === possibleName)) {
        return false;
    }

    return typeof ICONS_MAP[possibleName] === 'string';
}

export function getIconName(name: IconName) {
    let possibleName = name;

    if (startsWith(name, 'icon')) {
        //@ts-ignore
        possibleName = kebabCase(name.replace('icon', ''));
    }

    return ICONS_MAP[possibleName];
}

export enum ICONS_SETS {
    optimacros = 'optimacros',
}

const spriteMap = Object.values(ICONS_SETS).reduce((acc, v) => {
    acc[v] = () => import(`./assets/icons/${v}/sprite/index.svg`);

    return acc;
}, {});

export const getSpriteImport = (iconsSet: ICONS_SETS) => {
    return spriteMap[iconsSet];
};
