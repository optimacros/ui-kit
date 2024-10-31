import { action, computed, makeObservable, observable } from 'mobx';
import { breadCrumbsFolders } from './mockData/breadCrumbsFolders';
import { menuTags } from './mockData/menuTags';
import { foldersList } from './mockData/foldersList';
import { modelsList } from './mockData/modelsList';
import { workspaceListSortByName } from './mockData/workspaceListSortByName';
import { headerMenuElements } from './mockData/headerMenuElements';

export enum TabTypes {
    OLAP = 'olap',
    OLTP = 'oltp',
}

class DriveLandingState {
    constructor() {
        makeObservable(this);
    }

    // mock actions

    @observable isCardView = true;

    @action toggleCardView() {
        this.isCardView = !this.isCardView;
    }

    @observable activeTab: TabTypes = TabTypes.OLAP;

    @action changeActiveTab(value: TabTypes) {
        this.activeTab = value;
    }

    @computed get isActiveOltpTab() {
        return this.activeTab == TabTypes.OLTP;
    }

    @observable currentPage = 'main';

    @action changePage(page: 'driveLanding' | 'main') {
        this.currentPage = page;
    }

    userName = 'Alexander VvVVvV.';

    userMenuElements = [
        {
            visible: true,
            label: 'element menu 1',
            onClick: () => {},
        },
        {
            visible: true,
            label: 'element menu 2',
            onClick: () => {},
        },
        {
            visible: true,
            label: 'element (link)',
            href: 'link',
            onClick: () => {},
        },
    ];

    // Header Menu

    currentModelName = 'Unnamed Model - 20231219184106208';

    headerMenuElements = headerMenuElements;

    // copyright (footer)

    appVersion = '7.29.8';

    startDate = '2018';

    copyrightTitle = 'Optimacros';

    // memory indicator

    percentSize = 34;

    filledSize = '15.67 GB';

    freeSize = '21.34 GB';

    doubleFreeSize = '42.68 GB';

    // mock data

    breadCrumbsFolders = breadCrumbsFolders;

    menuTags = menuTags;

    foldersList = foldersList;

    modelsList = modelsList;

    workspaceListSortByName = workspaceListSortByName;
}

const driveLandingState = new DriveLandingState();

export { driveLandingState };
