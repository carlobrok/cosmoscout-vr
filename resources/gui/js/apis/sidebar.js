/* global IApi, CosmoScout */

/**
 * Sidebar Api
 */
class SidebarApi extends IApi {
  /**
   * @inheritDoc
   */
  name = 'sidebar';

  /**
   * @type {HTMLElement}
   * @private
   */
  _settings;

  /**
   * @type {HTMLElement}
   * @private
   */
  _sidebar;

  /**
   * @type {Element}
   * @private
   */
  _sidebarTab;

  /**
   * Loads all templates and needed container refs
   */
  init() {
    this._settings = document.getElementById('settings-accordion');
    this._sidebar = document.getElementById('sidebar-accordion');
    this._sidebarTab = document.getElementById('sidebar-accordion').lastElementChild;
  }

  /**
   * Add a plugin tab to the sidebar
   *
   * @param pluginName {string}
   * @param icon {string}
   * @param content {string}
   */
  addPluginTab(pluginName, icon, content) {
    const tab = CosmoScout.loadTemplateContent('sidebar-plugin-tab');
    if (tab === false) {
      console.error('"#sidebar-plugin-tab-template" could not be loaded.');
      return;
    }

    const id = SidebarApi.makeId(pluginName);

    tab.innerHTML = this.replaceMarkers(tab.innerHTML, id, icon, content);

    this._sidebar.insertBefore(tab, this._sidebarTab);
  }

  /**
   * Add a new section to the settings tab
   *
   * @param sectionName {string}
   * @param icon {string}
   * @param content {string}
   */
  addSettingsSection(sectionName, icon, content) {
    const tab = CosmoScout.loadTemplateContent('sidebar-settings-section');
    if (tab === false) {
      console.error('"#sidebar-settings-section-template" could not be loaded.');
      return;
    }

    const html = this.replaceMarkers(tab.innerHTML, SidebarApi.makeId(sectionName), icon, content);

    tab.innerHTML = html
      .replace(this.regex('SECTION'), sectionName)
      .trim();

    this._settings.appendChild(tab);
  }

  /**
   * Enables or disables a plugin tab.
   * Disabled tabs will be collapsed if open.
   *
   * @param collapseId {string}
   * @param enabled {boolean}
   */
  setTabEnabled(collapseId, enabled) {
    const tab = document.getElementById(collapseId);

    if (tab === null) {
      console.error(`Tab with id #${collapseId} not found.`);
      return;
    }

    // Add unresponsive class to parent element
    // Or tab if no parent is present
    // We assume tabs are contained in .sidebar-tab elements
    let parent = tab.parentElement;
    if (parent === null) {
      parent = tab;
    }

    if (CosmoScout.castCppBool(enabled) === true) {
      parent.classList.remove('unresponsive');
    } else {
      $(`#${collapseId}`).collapse('hide');
      parent.classList.add('unresponsive');
    }
  }

  /**
   * @see {addPluginTab}
   * @see {addSettingsSection}
   * @param name {string}
   * @return {string}
   * @private
   */
  static makeId(name) {
    return name.split(' ').join('-');
  }
}