# Layout Switching for ServiceContent Component

## Overview

The `ServiceContent` component now supports dynamic layout switching between 2-column and 3-column layouts for the approach steps section. This provides flexibility in how service information is displayed based on content requirements and user preferences.

## Features

### 1. **Prop-Based Layout Control**
```jsx
// 3-column layout (default)
<ServiceContent serviceType="web-design" />

// 2-column layout
<ServiceContent serviceType="network-design" layout="2-column" />

// 3-column layout (explicit)
<ServiceContent serviceType="ai-solutions" layout="3-column" />
```

### 2. **Global Layout Context**
The layout preference can be managed globally using the `LayoutContext`:

```jsx
import { useLayout } from '../contexts/LayoutContext';

const MyComponent = () => {
  const { serviceLayout, setServiceLayout, toggleServiceLayout } = useLayout();
  
  return (
    <div>
      <p>Current layout: {serviceLayout}</p>
      <button onClick={toggleServiceLayout}>
        Switch to {serviceLayout === '3-column' ? '2-column' : '3-column'}
      </button>
    </div>
  );
};
```

### 3. **Layout Toggle Component**
A built-in toggle component is automatically included in the ServiceContent component:

```jsx
import LayoutToggle from '../components/Molecules/LayoutToggle';

// Standalone usage
<LayoutToggle />

// With custom styling
<LayoutToggle className="my-custom-class" />
```

## Layout Behavior

### **3-Column Layout (Default)**
- Uses `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`
- Automatically adjusts to available space
- Best for services with 3+ steps
- Responsive: collapses to single column on mobile

### **2-Column Layout**
- Uses `grid-template-columns: repeat(2, 1fr)`
- Fixed 2-column structure
- For odd number of items: centers the last item
- Best for services with 2-4 steps
- Responsive: collapses to single column on mobile

## Implementation Details

### **Context Provider Setup**
The `LayoutProvider` is automatically included in the main `Layout` component:

```jsx
// Layout.js
<SiteDataProvider>
  <LayoutProvider>
    {/* Your app content */}
  </LayoutProvider>
</SiteDataProvider>
```

### **CSS Classes**
The component uses CSS modules with modifier classes:

```scss
// 3-column layout
.serviceContent--3column .serviceContent__approachSteps {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

// 2-column layout
.serviceContent--2column .serviceContent__approachSteps {
  grid-template-columns: repeat(2, 1fr);
  
  // Center last item for odd numbers
  &:has(.serviceContent__step:nth-child(odd):last-child) {
    .serviceContent__step:last-child {
      grid-column: 1 / -1;
      max-width: 50%;
      margin: 0 auto;
    }
  }
}
```

## Usage Examples

### **Example 1: Network Design Services (2-Column)**
```jsx
// network-group.js
<ServiceContent serviceType="network-design" layout="2-column" />
```

This displays the 4 network service areas in a 2x2 grid:
- Top row: Router & Switch Configuration, WiFi Design & Optimization
- Bottom row: Network Load Balancing, Redundancy & Uptime Assurance

### **Example 2: Web Design Services (3-Column)**
```jsx
// web-group.js
<ServiceContent serviceType="web-design" />
```

This displays the web design steps in a responsive 3-column layout.

### **Example 3: Global Layout Control**
```jsx
// Custom component
const ServicePage = () => {
  const { serviceLayout, toggleServiceLayout } = useLayout();
  
  return (
    <div>
      <button onClick={toggleServiceLayout}>
        Current: {serviceLayout}
      </button>
      <ServiceContent serviceType="web-design" />
    </div>
  );
};
```

## Responsive Behavior

Both layouts automatically collapse to a single column on mobile devices:

```scss
@media (max-width: $breakpoint-md) {
  .serviceContent__approachSteps {
    grid-template-columns: 1fr !important;
  }
}
```

## Best Practices

1. **Use 2-column layout** for services with 2-4 steps
2. **Use 3-column layout** for services with 3+ steps
3. **Consider content length** - 2-column works better for longer descriptions
4. **Test on mobile** - both layouts collapse to single column
5. **Use global context** for consistent layout across the application

## API Reference

### **ServiceContent Props**
- `serviceType` (string): The service type to display
- `layout` (string, optional): '2-column' | '3-column' | null (uses context)

### **LayoutContext Methods**
- `serviceLayout` (string): Current layout preference
- `setServiceLayout(layout)` (function): Set specific layout
- `toggleServiceLayout()` (function): Toggle between layouts

### **LayoutToggle Props**
- `className` (string, optional): Additional CSS classes