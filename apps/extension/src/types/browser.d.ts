// Type definitions for browser Web Extension API
declare namespace browser {
  namespace tabs {
    function query(queryInfo: any): Promise<any[]>;

    // Support both callback-style (Chrome) and Promise-style (Firefox) API
    function get(tabId: number): Promise<any>;
    function get(tabId: number, callback: (tab: any) => void): void;

    namespace onActivated {
      function addListener(callback: (activeInfo: { tabId: number }) => void): void;
      function removeListener(callback: (activeInfo: { tabId: number }) => void): void;
    }

    namespace onUpdated {
      function addListener(callback: (tabId: number, changeInfo: any, tab: any) => void): void;
      function removeListener(callback: (tabId: number, changeInfo: any, tab: any) => void): void;
    }
  }

  namespace storage {
    namespace local {
      function get(keys?: string | string[] | object | null): Promise<any>;
      function set(items: object): Promise<void>;
      function clear(): Promise<void>;
    }

    namespace onChanged {
      function addListener(callback: (changes: object, areaName: string) => void): void;
      function removeListener(callback: (changes: object, areaName: string) => void): void;
    }
  }
}

// Chrome API equivalent (mostly the same as browser but with callbacks instead of promises)
declare namespace chrome {
  namespace tabs {
    function query(queryInfo: any, callback: (tabs: any[]) => void): void;
    function get(tabId: number, callback: (tab: any) => void): void;

    namespace onActivated {
      function addListener(callback: (activeInfo: { tabId: number }) => void): void;
      function removeListener(callback: (activeInfo: { tabId: number }) => void): void;
    }

    namespace onUpdated {
      function addListener(callback: (tabId: number, changeInfo: any, tab: any) => void): void;
      function removeListener(callback: (tabId: number, changeInfo: any, tab: any) => void): void;
    }
  }

  namespace storage {
    namespace local {
      function get(keys: string | string[] | object | null, callback: (result: any) => void): void;
      function set(items: object, callback?: () => void): void;
      function clear(callback?: () => void): void;
    }

    namespace onChanged {
      function addListener(callback: (changes: object, areaName: string) => void): void;
      function removeListener(callback: (changes: object, areaName: string) => void): void;
    }
  }
}

// Make browser global 
declare const browser: typeof browser;
// Make chrome global
declare const chrome: typeof chrome;
