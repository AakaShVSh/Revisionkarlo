// devToolsBlocker.js
// Comprehensive DevTools Detection and Prevention Utility

class DevToolsBlocker {
  constructor() {
    this.isOpen = false;
    this.orientation = null;
    this.callbacks = [];
  }

  // Method 1: Window size detection
  detectByWindowSize() {
    const widthThreshold = window.outerWidth - window.innerWidth > 160;
    const heightThreshold = window.outerHeight - window.innerHeight > 160;
    const orientationMatch = widthThreshold ? "vertical" : "horizontal";

    if (
      !(heightThreshold && widthThreshold) &&
      ((window.Firebug &&
        window.Firebug.chrome &&
        window.Firebug.chrome.isInitialized) ||
        widthThreshold ||
        heightThreshold)
    ) {
      if (!this.isOpen || this.orientation !== orientationMatch) {
        this.isOpen = true;
        this.orientation = orientationMatch;
        this.trigger();
      }
    } else {
      if (this.isOpen) {
        this.isOpen = false;
        this.orientation = null;
        this.trigger();
      }
    }
  }

  // Method 2: Element ID getter detection
  detectByElementId() {
    const element = new Image();
    let detected = false;

    Object.defineProperty(element, "id", {
      get: function () {
        detected = true;
        throw new Error("DevTools detected!");
      },
    });

    try {
      console.log(element);
      console.clear();
    } catch (err) {
      return detected;
    }

    return detected;
  }

  // Method 3: Date now detection (debugger timing)
  detectByDateNow() {
    const start = Date.now();
    debugger;
    const end = Date.now();
    return end - start > 100;
  }

  // Method 4: toString detection
  detectByToString() {
    let detected = false;
    const check = /./;
    check.toString = function () {
      detected = true;
    };
    console.log("%c", check);
    return detected;
  }

  // Method 5: Performance timing
  detectByPerformance() {
    const start = performance.now();
    // eslint-disable-next-line no-console
    console.profile("performance-check");
    // eslint-disable-next-line no-console
    console.profileEnd("performance-check");
    const end = performance.now();
    return end - start > 100;
  }

  // Method 6: Function decompilation
  detectByFunctionDecompilation() {
    const fn = function () {};
    const fnString = fn.toString();
    return /\{(\s+)?\[native code\](\s+)?\}/.test(fnString);
  }

  // Method 7: Check for known DevTools extensions
  detectDevToolsExtensions() {
    return !!(
      window.devtools ||
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__ ||
      window.__REDUX_DEVTOOLS_EXTENSION__ ||
      window.__VUE_DEVTOOLS_GLOBAL_HOOK__
    );
  }

  // Combined detection
  detect() {
    // Use multiple detection methods
    this.detectByWindowSize();

    // Additional checks
    const methods = [
      this.detectByElementId(),
      this.detectByToString(),
      this.detectDevToolsExtensions(),
    ];

    const detected = methods.some((result) => result === true);

    if (detected && !this.isOpen) {
      this.isOpen = true;
      this.trigger();
    } else if (!detected && this.isOpen) {
      this.isOpen = false;
      this.trigger();
    }

    return this.isOpen;
  }

  // Register callback
  onChange(callback) {
    this.callbacks.push(callback);
  }

  // Trigger callbacks
  trigger() {
    this.callbacks.forEach((callback) => {
      callback(this.isOpen, this.orientation);
    });
  }

  // Start monitoring
  start(interval = 1000) {
    this.interval = setInterval(() => {
      this.detect();
    }, interval);
  }

  // Stop monitoring
  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

// Disable console in production
export const disableConsole = () => {
  if (process.env.NODE_ENV === "production") {
    const noop = () => {};
    const methods = ["log", "debug", "info", "warn", "error", "table", "trace"];

    methods.forEach((method) => {
      console[method] = noop;
    });
  }
};

// Disable right-click
export const disableRightClick = (callback) => {
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    if (callback) callback();
    return false;
  });
};

// Disable keyboard shortcuts
export const disableDevToolsShortcuts = (callback) => {
  document.addEventListener("keydown", (e) => {
    // F12
    if (e.keyCode === 123) {
      e.preventDefault();
      if (callback) callback("F12");
      return false;
    }

    // Ctrl+Shift+I or Cmd+Option+I
    if (
      (e.ctrlKey && e.shiftKey && e.keyCode === 73) ||
      (e.metaKey && e.altKey && e.keyCode === 73)
    ) {
      e.preventDefault();
      if (callback) callback("Inspect");
      return false;
    }

    // Ctrl+Shift+J or Cmd+Option+J
    if (
      (e.ctrlKey && e.shiftKey && e.keyCode === 74) ||
      (e.metaKey && e.altKey && e.keyCode === 74)
    ) {
      e.preventDefault();
      if (callback) callback("Console");
      return false;
    }

    // Ctrl+Shift+C or Cmd+Option+C
    if (
      (e.ctrlKey && e.shiftKey && e.keyCode === 67) ||
      (e.metaKey && e.altKey && e.keyCode === 67)
    ) {
      e.preventDefault();
      if (callback) callback("Inspect Element");
      return false;
    }

    // Ctrl+U or Cmd+U
    if ((e.ctrlKey && e.keyCode === 85) || (e.metaKey && e.keyCode === 85)) {
      e.preventDefault();
      if (callback) callback("View Source");
      return false;
    }

    // Ctrl+S or Cmd+S
    if ((e.ctrlKey && e.keyCode === 83) || (e.metaKey && e.keyCode === 83)) {
      e.preventDefault();
      if (callback) callback("Save Page");
      return false;
    }
  });
};

// Clear console periodically
export const clearConsoleInterval = (interval = 5000) => {
  return setInterval(() => {
    if (process.env.NODE_ENV === "production") {
      console.clear();
    }
  }, interval);
};

// Disable selection
export const disableSelection = () => {
  document.addEventListener("selectstart", (e) => {
    e.preventDefault();
    return false;
  });

  document.addEventListener("copy", (e) => {
    e.preventDefault();
    return false;
  });
};

// Disable drag and drop
export const disableDragDrop = () => {
  document.addEventListener("dragstart", (e) => {
    e.preventDefault();
    return false;
  });

  document.addEventListener("drop", (e) => {
    e.preventDefault();
    return false;
  });
};

// Add invisible watermark to discourage screenshots
export const addWatermark = (text) => {
  const watermark = document.createElement("div");
  watermark.style.position = "fixed";
  watermark.style.top = "50%";
  watermark.style.left = "50%";
  watermark.style.transform = "translate(-50%, -50%) rotate(-45deg)";
  watermark.style.fontSize = "120px";
  watermark.style.color = "rgba(0, 0, 0, 0.03)";
  watermark.style.pointerEvents = "none";
  watermark.style.userSelect = "none";
  watermark.style.zIndex = "9999";
  watermark.textContent = text;
  document.body.appendChild(watermark);
};

// Detect if running in iframe
export const detectIframe = () => {
  if (window.self !== window.top) {
    window.top.location = window.self.location;
  }
};

// Anti-debugging techniques
export const antiDebugging = () => {
  // Infinite debugger loop
  setInterval(() => {
    debugger;
  }, 100);

  // Function length check
  (function () {
    const checkLength = () => {
      if (checkLength.toString().length > 100) {
        while (true) {
          debugger;
        }
      }
    };
    checkLength();
  })();
};

// Main initialization function
export const initDevToolsBlocker = (options = {}) => {
  const {
    onDetect,
    onClose,
    disableRightClickEnabled = true,
    disableShortcutsEnabled = true,
    disableConsoleEnabled = true,
    clearConsoleEnabled = true,
    disableSelectionEnabled = true,
    watermarkText = "PROTECTED",
    detectIframeEnabled = true,
  } = options;

  const blocker = new DevToolsBlocker();

  // Register callbacks
  blocker.onChange((isOpen, orientation) => {
    if (isOpen) {
      if (onDetect) onDetect(orientation);
    } else {
      if (onClose) onClose();
    }
  });

  // Start monitoring
  blocker.start();

  // Enable features based on options
  if (disableConsoleEnabled) {
    disableConsole();
  }

  if (disableRightClickEnabled) {
    disableRightClick(options.onRightClick);
  }

  if (disableShortcutsEnabled) {
    disableDevToolsShortcuts(options.onShortcut);
  }

  if (clearConsoleEnabled) {
    clearConsoleInterval();
  }

  if (disableSelectionEnabled) {
    disableSelection();
  }

  if (watermarkText) {
    addWatermark(watermarkText);
  }

  if (detectIframeEnabled) {
    detectIframe();
  }

  // Return blocker instance for manual control
  return blocker;
};

export default DevToolsBlocker;
