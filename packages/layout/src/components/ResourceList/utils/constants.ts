import { ResourceListType } from '../types.ts';
import iconApp from 'icons/icon-app.svg';
import iconFolderClose from 'icons/icon-folder-close.svg';
import iconWorkspace from 'icons/icon-workspace.svg';

export const defaultIconList = {
    [ResourceListType.Workspace]: iconWorkspace,
    [ResourceListType.Folder]: iconFolderClose,
    [ResourceListType.AM]: iconApp,
};
