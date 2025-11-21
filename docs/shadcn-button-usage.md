# shadcn/ui Button Component - Usage Guide

## 🎯 Quick Start

shadcn/ui Button has been installed and is ready to use!

### Import

```tsx
import { Button } from '@/components/ui/button'
// or
import { Button } from '@/components/ui'
```

### Basic Usage

```tsx
<Button>Click me</Button>
```

---

## 🎨 Variants

### Default (Primary)

```tsx
<Button variant="default">Default</Button>
```

- Uses your `--primary` color (#00ADB5)
- Main call-to-action buttons

### Destructive

```tsx
<Button variant="destructive">Delete</Button>
```

- Uses `--destructive` color
- Danger/delete actions

### Outline

```tsx
<Button variant="outline">Outline</Button>
```

- Bordered, transparent background
- Secondary actions

### Secondary

```tsx
<Button variant="secondary">Secondary</Button>
```

- Uses `--secondary` color
- Alternative actions

### Ghost

```tsx
<Button variant="ghost">Ghost</Button>
```

- No background, no border
- Subtle actions

### Link

```tsx
<Button variant="link">Link</Button>
```

- Looks like a link
- Underline on hover

---

## 📏 Sizes

### Default

```tsx
<Button size="default">Default</Button>
```

- Height: 36px (h-9)

### Small

```tsx
<Button size="sm">Small</Button>
```

- Height: 32px (h-8)
- Compact UIs

### Large

```tsx
<Button size="lg">Large</Button>
```

- Height: 40px (h-10)
- Prominent CTAs

### Icon Sizes

```tsx
<Button size="icon">
  <Icon />
</Button>

<Button size="icon-sm">
  <Icon />
</Button>

<Button size="icon-lg">
  <Icon />
</Button>
```

- Square buttons for icons
- Sizes: 36px, 32px, 40px

---

## 🎨 With Icons (lucide-react)

### Install lucide-react (if not installed)

```bash
npm install lucide-react
```

### Left Icon

```tsx
import { Plus } from 'lucide-react'

;<Button>
  <Plus />
  Add Item
</Button>
```

### Right Icon

```tsx
import { ArrowRight } from 'lucide-react'

;<Button>
  Next
  <ArrowRight />
</Button>
```

### Icon Only

```tsx
import { Settings } from 'lucide-react'

;<Button size="icon" aria-label="Settings">
  <Settings />
</Button>
```

---

## 🔄 States

### Disabled

```tsx
<Button disabled>Disabled</Button>
```

### Loading (custom implementation)

```tsx
import { Loader2 } from 'lucide-react'

;<Button disabled>
  <Loader2 className="animate-spin" />
  Loading...
</Button>
```

---

## 🎯 Advanced Features

### As Child (Polymorphic)

```tsx
import { Link } from 'react-router-dom'

;<Button asChild>
  <Link to="/dashboard">Go to Dashboard</Link>
</Button>
```

- Renders as Link but looks like Button
- Uses Radix UI Slot

### Custom Styling

```tsx
<Button className="w-full">Full Width</Button>
```

### Form Submit

```tsx
<form onSubmit={handleSubmit}>
  <Button type="submit">Submit</Button>
</form>
```

---

## 📊 Comparison: shadcn vs Custom

| Feature           | shadcn/ui    | Custom Button |
| ----------------- | ------------ | ------------- |
| Variants          | 6            | 5             |
| Sizes             | 6            | 3             |
| Icons             | lucide-react | Any           |
| Accessibility     | Radix UI     | Manual        |
| Loading           | Manual       | Built-in      |
| asChild           | ✅           | ❌            |
| Production-tested | ✅           | ❌            |

---

## 🎨 Your Colors Work!

shadcn/ui uses the same CSS variables from your `index.css`:

- `--primary` → #00ADB5 (your teal)
- `--secondary` → #393E46
- `--destructive` → #EF4444
- `--border` → #D1D5DB

**No configuration needed!** It just works. ✅

---

## 📚 Examples

### Login Form

```tsx
import { Button } from '@/components/ui/button'
import { LogIn } from 'lucide-react'

;<form>
  <Button type="submit" className="w-full">
    <LogIn />
    Sign In
  </Button>
</form>
```

### Delete Confirmation

```tsx
import { Trash2 } from 'lucide-react'

;<Button variant="destructive" size="sm">
  <Trash2 />
  Delete
</Button>
```

### Navigation

```tsx
import { ArrowLeft, ArrowRight } from 'lucide-react'

;<div className="flex gap-2">
  <Button variant="outline">
    <ArrowLeft />
    Back
  </Button>
  <Button>
    Next
    <ArrowRight />
  </Button>
</div>
```

---

## 🔗 Resources

- [shadcn/ui Button Docs](https://ui.shadcn.com/docs/components/button)
- [lucide-react Icons](https://lucide.dev/icons/)
- [Radix UI Slot](https://www.radix-ui.com/primitives/docs/utilities/slot)

---
