/* ==========================================================================
   HMP Demo Design System — React Components
   Usage: window.DS.Button, DS.Input, DS.Select, DS.Card, etc.
   Requires: React 18+, Lucide React (optional, for icons)
   ========================================================================== */

(function (global) {
  'use strict';

  const h = React.createElement;
  const { useState, useEffect, useRef, useCallback, Fragment } = React;

  // ── Helpers ──────────────────────────────────────────────────────────────

  function cx() {
    const classes = [];
    for (let i = 0; i < arguments.length; i++) {
      const arg = arguments[i];
      if (!arg) continue;
      if (typeof arg === 'string') classes.push(arg);
      else if (typeof arg === 'object') {
        for (const key in arg) {
          if (arg[key]) classes.push(key);
        }
      }
    }
    return classes.join(' ');
  }

  function getLucideIcon(name) {
    if (typeof lucideReact !== 'undefined' && lucideReact[name]) {
      return lucideReact[name];
    }
    return null;
  }

  // ── Button ───────────────────────────────────────────────────────────────

  const BUTTON_CLASS_MAP = {
    'primary-filled': 'ds-btn-primary',
    'primary-outline': 'ds-btn-primary-outline',
    'primary-ghost': 'ds-btn-primary-ghost',
    'secondary-filled': 'ds-btn-secondary',
    'secondary-outline': 'ds-btn-secondary-outline',
    'secondary-ghost': 'ds-btn-secondary-ghost',
    'destructive-filled': 'ds-btn-destructive',
    'destructive-outline': 'ds-btn-destructive-outline',
    'destructive-ghost': 'ds-btn-destructive-ghost',
    'success-filled': 'ds-btn-success',
    'success-outline': 'ds-btn-success-outline',
    'success-ghost': 'ds-btn-success-ghost',
    'link': 'ds-btn-link',
  };

  const SIZE_MAP = { sm: 'ds-btn-sm', base: 'ds-btn-base', lg: 'ds-btn-lg' };

  /**
   * Button
   * @param {Object} props
   * @param {'primary'|'secondary'|'destructive'|'success'|'link'} props.color - Button color
   * @param {'filled'|'outline'|'ghost'} props.variant - Button variant (not used for link)
   * @param {'sm'|'base'|'lg'} props.size - Button size (link always base)
   * @param {boolean} props.round - Round shape
   * @param {boolean} props.iconOnly - Icon-only button
   * @param {string} props.iconLeft - Lucide icon name for left
   * @param {string} props.iconRight - Lucide icon name for right
   * @param {boolean} props.disabled
   * @param {string} props.className - Additional classes
   * @param {React.ReactNode} props.children
   */
  function Button(props) {
    const {
      color = 'primary',
      variant = 'filled',
      size = 'base',
      round = false,
      iconOnly = false,
      iconLeft,
      iconRight,
      disabled = false,
      className,
      children,
      ...rest
    } = props;

    const key = color === 'link' ? 'link' : (color + '-' + variant);
    const variantClass = BUTTON_CLASS_MAP[key] || 'ds-btn-primary';
    const sizeClass = color === 'link' ? '' : (SIZE_MAP[size] || 'ds-btn-base');

    const cls = cx(
      'ds-btn',
      variantClass,
      sizeClass,
      { 'ds-btn-round': round },
      { 'ds-btn-icon-only': iconOnly },
      { 'ds-btn-icon-left': iconLeft && !iconOnly },
      { 'ds-btn-icon-right': iconRight && !iconOnly },
      className
    );

    const IconLeft = iconLeft ? getLucideIcon(iconLeft) : null;
    const IconRight = iconRight ? getLucideIcon(iconRight) : null;

    return h('button', { className: cls, disabled: disabled, ...rest },
      IconLeft && h(IconLeft, { size: 24 }),
      !iconOnly && children,
      IconRight && h(IconRight, { size: 24 })
    );
  }

  // ── Input ────────────────────────────────────────────────────────────────

  /**
   * Label
   * @param {Object} props
   * @param {string} props.text
   * @param {boolean} props.required
   * @param {string} props.className
   */
  function Label(props) {
    const { text, required = false, htmlFor, className } = props;
    return h('label', { className: cx('ds-label', className), htmlFor: htmlFor },
      h('span', null, text),
      required && h('span', { className: 'ds-label-required' }, ' *')
    );
  }

  /**
   * Input
   * @param {Object} props
   * @param {string} props.label - Label text
   * @param {boolean} props.required - Show required asterisk
   * @param {'base'|'sm'} props.size
   * @param {boolean} props.error - Error state
   * @param {boolean} props.warning - Warning state
   * @param {string} props.errorMessage - Error hint text
   * @param {string} props.className
   */
  function Input(props) {
    const {
      label,
      required = false,
      size = 'base',
      error = false,
      warning = false,
      errorMessage,
      className,
      id,
      ...rest
    } = props;

    const inputId = id || (label ? 'input-' + label.toLowerCase().replace(/\s+/g, '-') : undefined);

    const inputCls = cx(
      'ds-input',
      { 'ds-input-sm': size === 'sm' },
      { 'ds-input-error': error },
      { 'ds-input-warning': warning },
      className
    );

    return h('div', { className: 'ds-field' },
      label && h(Label, { text: label, required: required, htmlFor: inputId }),
      h('input', { className: inputCls, id: inputId, ...rest }),
      errorMessage && h('span', {
        style: { color: 'var(--tertiary-300)', fontSize: 'var(--text-xs)', marginTop: '2px' }
      }, errorMessage)
    );
  }

  // ── Select ───────────────────────────────────────────────────────────────

  /**
   * Select
   * @param {Object} props
   * @param {string} props.label
   * @param {boolean} props.required
   * @param {'base'|'sm'} props.size
   * @param {boolean} props.error
   * @param {Array<{value: string, label: string}>} props.options
   * @param {string} props.placeholder
   * @param {string} props.className
   */
  function Select(props) {
    const {
      label,
      required = false,
      size = 'base',
      error = false,
      options = [],
      placeholder = 'Auswählen',
      className,
      id,
      ...rest
    } = props;

    const selectId = id || (label ? 'select-' + label.toLowerCase().replace(/\s+/g, '-') : undefined);

    const selectCls = cx(
      'ds-select',
      { 'ds-select-sm': size === 'sm' },
      { 'ds-select-error': error },
      className
    );

    return h('div', { className: 'ds-field' },
      label && h(Label, { text: label, required: required, htmlFor: selectId }),
      h('div', { className: 'ds-select-wrapper' },
        h('select', { className: selectCls, id: selectId, ...rest },
          placeholder && h('option', { value: '', disabled: true, selected: true }, placeholder),
          options.map(function (opt) {
            return h('option', { key: opt.value, value: opt.value }, opt.label || opt.value);
          })
        )
      )
    );
  }

  // ── Card ─────────────────────────────────────────────────────────────────

  /**
   * Card
   * @param {Object} props
   * @param {string} props.title - Header title
   * @param {React.ReactNode} props.footer - Footer content
   * @param {string} props.className
   * @param {React.ReactNode} props.children - Body content
   */
  function Card(props) {
    const { title, footer, className, children, ...rest } = props;
    return h('div', { className: cx('ds-card', className), ...rest },
      title && h('div', { className: 'ds-card-header' }, title),
      h('div', { className: 'ds-card-body' }, children),
      footer && h('div', { className: 'ds-card-footer' }, footer)
    );
  }

  // ── Badge ────────────────────────────────────────────────────────────────

  /**
   * Badge
   * @param {Object} props
   * @param {'alert'|'success'|'warning'|'info'|'neutral'} props.variant
   * @param {string} props.className
   * @param {React.ReactNode} props.children
   */
  function Badge(props) {
    const { variant = 'neutral', className, children, ...rest } = props;
    return h('span', {
      className: cx('ds-badge', 'ds-badge-' + variant, className),
      ...rest
    }, children);
  }

  // ── Snackbar ─────────────────────────────────────────────────────────────

  const SNACKBAR_ICONS = {
    alert: 'AlertCircle',
    success: 'CheckCircle2',
    warning: 'AlertTriangle',
    info: 'Info',
  };

  /**
   * Snackbar
   * @param {Object} props
   * @param {'alert'|'success'|'warning'|'info'} props.variant
   * @param {string} props.message
   * @param {string} props.action - Action button text
   * @param {Function} props.onAction
   * @param {Function} props.onDismiss
   * @param {number} props.duration - Auto-dismiss ms (0 = never)
   */
  function Snackbar(props) {
    const {
      variant = 'info',
      message,
      action,
      onAction,
      onDismiss,
      duration = 5000,
      className,
      ...rest
    } = props;

    useEffect(function () {
      if (duration > 0 && onDismiss) {
        const timer = setTimeout(onDismiss, duration);
        return function () { clearTimeout(timer); };
      }
    }, [duration, onDismiss]);

    const IconComponent = getLucideIcon(SNACKBAR_ICONS[variant]);

    return h('div', {
      className: cx('ds-snackbar', 'ds-snackbar-' + variant, className),
      role: 'alert',
      ...rest
    },
      IconComponent && h(IconComponent, { size: 32 }),
      h('span', { className: 'ds-snackbar-text' }, message),
      action && h('button', {
        className: 'ds-snackbar-action',
        onClick: onAction
      }, action)
    );
  }

  // ── Table ────────────────────────────────────────────────────────────────

  /**
   * Table
   * @param {Object} props
   * @param {Array<{key: string, label: string, sortable?: boolean, render?: Function}>} props.columns
   * @param {Array<Object>} props.data
   * @param {string} props.className
   */
  function Table(props) {
    const { columns = [], data = [], className, ...rest } = props;
    const [sortKey, setSortKey] = useState(null);
    const [sortDir, setSortDir] = useState('asc');

    function handleSort(key) {
      if (sortKey === key) {
        setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
      } else {
        setSortKey(key);
        setSortDir('asc');
      }
    }

    var sortedData = data;
    if (sortKey) {
      sortedData = data.slice().sort(function (a, b) {
        const va = a[sortKey], vb = b[sortKey];
        if (va == null) return 1;
        if (vb == null) return -1;
        if (va < vb) return sortDir === 'asc' ? -1 : 1;
        if (va > vb) return sortDir === 'asc' ? 1 : -1;
        return 0;
      });
    }

    const SortIcon = getLucideIcon('ArrowUpDown');

    return h('table', { className: cx('ds-table', className), ...rest },
      h('thead', null,
        h('tr', null,
          columns.map(function (col) {
            return h('th', {
              key: col.key,
              'data-sortable': col.sortable || undefined,
              onClick: col.sortable ? function () { handleSort(col.key); } : undefined,
              style: col.width ? { width: col.width } : undefined
            },
              col.label,
              col.sortable && SortIcon && h(SortIcon, {
                size: 14,
                style: {
                  marginLeft: '4px',
                  verticalAlign: 'middle',
                  opacity: sortKey === col.key ? 1 : 0.3
                }
              })
            );
          })
        )
      ),
      h('tbody', null,
        sortedData.map(function (row, i) {
          return h('tr', { key: row.id || i },
            columns.map(function (col) {
              return h('td', { key: col.key },
                col.render ? col.render(row[col.key], row) : row[col.key]
              );
            })
          );
        })
      )
    );
  }

  // ── Tabs ─────────────────────────────────────────────────────────────────

  /**
   * Tabs
   * @param {Object} props
   * @param {Array<{key: string, label: string, content: React.ReactNode}>} props.items
   * @param {string} props.defaultTab - Default active tab key
   * @param {string} props.className
   */
  function Tabs(props) {
    const { items = [], defaultTab, className, onChange } = props;
    const [active, setActive] = useState(defaultTab || (items[0] && items[0].key));

    function handleClick(key) {
      setActive(key);
      if (onChange) onChange(key);
    }

    const activeItem = items.find(function (t) { return t.key === active; });

    return h('div', { className: className },
      h('div', { className: 'ds-tabs', role: 'tablist' },
        items.map(function (tab) {
          return h('button', {
            key: tab.key,
            className: cx('ds-tab', { 'ds-tab-active': tab.key === active }),
            role: 'tab',
            'aria-selected': tab.key === active,
            onClick: function () { handleClick(tab.key); }
          }, tab.label);
        })
      ),
      activeItem && h('div', { className: 'ds-tab-panel', role: 'tabpanel' }, activeItem.content)
    );
  }

  // ── Modal ────────────────────────────────────────────────────────────────

  /**
   * Modal
   * @param {Object} props
   * @param {boolean} props.open
   * @param {Function} props.onClose
   * @param {string} props.title
   * @param {React.ReactNode} props.footer
   * @param {React.ReactNode} props.children
   */
  function Modal(props) {
    const { open = false, onClose, title, footer, children, className } = props;

    useEffect(function () {
      if (open) {
        document.body.style.overflow = 'hidden';
        return function () { document.body.style.overflow = ''; };
      }
    }, [open]);

    useEffect(function () {
      if (!open) return;
      function handleKey(e) {
        if (e.key === 'Escape' && onClose) onClose();
      }
      document.addEventListener('keydown', handleKey);
      return function () { document.removeEventListener('keydown', handleKey); };
    }, [open, onClose]);

    if (!open) return null;

    const CloseIcon = getLucideIcon('X');

    return ReactDOM.createPortal(
      h('div', {
        className: 'ds-modal-overlay',
        onClick: function (e) { if (e.target === e.currentTarget && onClose) onClose(); }
      },
        h('div', { className: cx('ds-modal', className), role: 'dialog', 'aria-modal': true },
          h('div', { className: 'ds-modal-header' },
            h('span', null, title),
            onClose && h('button', { className: 'ds-modal-close', onClick: onClose, 'aria-label': 'Schließen' },
              CloseIcon ? h(CloseIcon, { size: 20 }) : '\u00D7'
            )
          ),
          h('div', { className: 'ds-modal-body' }, children),
          footer && h('div', { className: 'ds-modal-footer' }, footer)
        )
      ),
      document.body
    );
  }

  // ── SnackbarProvider (Toast container) ───────────────────────────────────

  var _snackbarAdd = null;

  function SnackbarProvider(props) {
    const [toasts, setToasts] = useState([]);

    _snackbarAdd = useCallback(function (toast) {
      const id = Date.now() + Math.random();
      setToasts(function (prev) { return prev.concat([{ id: id, ...toast }]); });
      return id;
    }, []);

    function remove(id) {
      setToasts(function (prev) { return prev.filter(function (t) { return t.id !== id; }); });
    }

    return h(Fragment, null,
      props.children,
      h('div', {
        style: {
          position: 'fixed', bottom: '24px', right: '24px',
          display: 'flex', flexDirection: 'column', gap: '8px',
          zIndex: 1100, maxWidth: '640px', width: '100%', pointerEvents: 'none'
        }
      },
        toasts.map(function (t) {
          return h('div', { key: t.id, style: { pointerEvents: 'auto' } },
            h(Snackbar, {
              variant: t.variant,
              message: t.message,
              action: t.action,
              onAction: t.onAction,
              duration: t.duration != null ? t.duration : 5000,
              onDismiss: function () { remove(t.id); }
            })
          );
        })
      )
    );
  }

  function toast(options) {
    if (_snackbarAdd) return _snackbarAdd(options);
    console.warn('DS.toast: Wrap your app in DS.SnackbarProvider to use toasts.');
  }

  // ── Checkbox ──────────────────────────────────────────────────────────────

  function Checkbox(props) {
    const { label, disabled = false, checked, defaultChecked, onChange, className, id, ...rest } = props;
    const inputId = id || (label ? 'cb-' + label.toLowerCase().replace(/\s+/g, '-') : undefined);
    return h('label', { className: cx('ds-checkbox', className) },
      h('input', {
        type: 'checkbox', id: inputId, disabled: disabled,
        checked: checked, defaultChecked: defaultChecked,
        onChange: onChange, ...rest
      }),
      label && h('span', null, label)
    );
  }

  // ── RadioGroup ──────────────────────────────────────────────────────────

  function RadioGroup(props) {
    const { name, options = [], value, defaultValue, onChange, disabled = false, className } = props;
    return h('div', { className: cx('ds-radio-group', className), role: 'radiogroup' },
      options.map(function (opt) {
        var val = typeof opt === 'string' ? opt : opt.value;
        var lbl = typeof opt === 'string' ? opt : opt.label;
        return h('label', { key: val, className: 'ds-radio' },
          h('input', {
            type: 'radio', name: name, value: val, disabled: disabled,
            checked: value !== undefined ? value === val : undefined,
            defaultChecked: defaultValue === val,
            onChange: onChange
          }),
          h('span', null, lbl)
        );
      })
    );
  }

  // ── Switch ──────────────────────────────────────────────────────────────

  function Switch(props) {
    const { label, disabled = false, checked, defaultChecked, onChange, className, id } = props;
    const inputId = id || (label ? 'sw-' + label.toLowerCase().replace(/\s+/g, '-') : undefined);
    return h('label', { className: cx('ds-switch', className) },
      h('input', {
        type: 'checkbox', role: 'switch', id: inputId, disabled: disabled,
        checked: checked, defaultChecked: defaultChecked, onChange: onChange
      }),
      h('div', { className: 'ds-switch-track' },
        h('div', { className: 'ds-switch-thumb' })
      ),
      label && h('span', null, label)
    );
  }

  // ── Textarea ────────────────────────────────────────────────────────────

  function Textarea(props) {
    const {
      label, required = false, size = 'base', variant = 'default',
      error = false, errorMessage, className, id, ...rest
    } = props;
    const textareaId = id || (label ? 'ta-' + label.toLowerCase().replace(/\s+/g, '-') : undefined);
    var cls = cx(
      'ds-textarea',
      { 'ds-textarea-sm': size === 'sm' },
      { 'ds-textarea-invisible': variant === 'invisible' },
      { 'ds-input-error': error },
      className
    );
    return h('div', { className: 'ds-field' },
      label && h(Label, { text: label, required: required, htmlFor: textareaId }),
      h('textarea', { className: cls, id: textareaId, ...rest }),
      errorMessage && h('span', {
        style: { color: 'var(--tertiary-300)', fontSize: 'var(--text-xs)', marginTop: '2px' }
      }, errorMessage)
    );
  }

  // ── SearchBar ───────────────────────────────────────────────────────────

  function SearchBar(props) {
    const {
      value, onChange, onClear, placeholder = 'Suchen...', size = 'base', className, ...rest
    } = props;
    const SearchIcon = getLucideIcon('Search');
    const XIcon = getLucideIcon('X');

    return h('div', { className: cx('ds-search', className) },
      SearchIcon && h('div', { className: 'ds-search-icon' }, h(SearchIcon, { size: 20 })),
      h('input', {
        className: cx('ds-input', { 'ds-input-sm': size === 'sm' }),
        type: 'text', value: value, onChange: onChange, placeholder: placeholder, ...rest
      }),
      value && onClear && h('button', {
        className: 'ds-search-clear', onClick: onClear, 'aria-label': 'Löschen'
      }, XIcon ? h(XIcon, { size: 16 }) : '\u00D7')
    );
  }

  // ── Avatar ──────────────────────────────────────────────────────────────

  function Avatar(props) {
    const { image, fallbackText, size = 'base', className, ...rest } = props;
    var sizeClass = 'ds-avatar-' + size;
    var initials = fallbackText ? fallbackText.split(' ').map(function (w) { return w[0]; }).join('').substring(0, 2).toUpperCase() : '?';

    return h('div', { className: cx('ds-avatar', sizeClass, className), ...rest },
      image
        ? h('img', { src: image, alt: fallbackText || '' })
        : h('span', null, initials)
    );
  }

  // ── ProgressBar ─────────────────────────────────────────────────────────

  function ProgressBar(props) {
    const { value = 0, variant, className } = props;
    var clamped = Math.min(100, Math.max(0, value));
    return h('div', {
      className: cx('ds-progress', variant && ('ds-progress-' + variant), className),
      role: 'progressbar', 'aria-valuenow': clamped, 'aria-valuemin': 0, 'aria-valuemax': 100
    },
      h('div', { className: 'ds-progress-bar', style: { width: clamped + '%' } })
    );
  }

  // ── Tooltip ─────────────────────────────────────────────────────────────

  function Tooltip(props) {
    const { text, children, className } = props;
    const [show, setShow] = useState(false);
    return h('div', {
      className: cx('ds-tooltip-wrapper', className),
      onMouseEnter: function () { setShow(true); },
      onMouseLeave: function () { setShow(false); },
      onFocus: function () { setShow(true); },
      onBlur: function () { setShow(false); }
    },
      children,
      show && h('div', { className: 'ds-tooltip-content', role: 'tooltip' }, text)
    );
  }

  // ── Separator ───────────────────────────────────────────────────────────

  function Separator(props) {
    return h('hr', { className: cx('ds-separator', props.className) });
  }

  // ── Collapsible ─────────────────────────────────────────────────────────

  function Collapsible(props) {
    const { title, defaultOpen = false, children, className } = props;
    const [open, setOpen] = useState(defaultOpen);
    const ChevronIcon = getLucideIcon('ChevronDown');

    return h('div', { className: cx('ds-collapsible', className) },
      h('button', {
        className: 'ds-collapsible-trigger',
        'aria-expanded': open,
        onClick: function () { setOpen(!open); }
      },
        h('span', null, title),
        ChevronIcon && h(ChevronIcon, { size: 20 })
      ),
      open && h('div', { className: 'ds-collapsible-content' }, children)
    );
  }

  // ── Export ───────────────────────────────────────────────────────────────

  global.DS = {
    Button: Button,
    Label: Label,
    Input: Input,
    Select: Select,
    Card: Card,
    Badge: Badge,
    Snackbar: Snackbar,
    SnackbarProvider: SnackbarProvider,
    toast: toast,
    Table: Table,
    Tabs: Tabs,
    Modal: Modal,
    Checkbox: Checkbox,
    RadioGroup: RadioGroup,
    Switch: Switch,
    Textarea: Textarea,
    SearchBar: SearchBar,
    Avatar: Avatar,
    ProgressBar: ProgressBar,
    Tooltip: Tooltip,
    Separator: Separator,
    Collapsible: Collapsible,
    cx: cx,
  };

})(window);
