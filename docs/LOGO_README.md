# Skytech Aviation Logo

## Animated Logo Component

The logo features:
- **Gradient Hover Effects**: Dynamic color splashing that follows mouse movement
- **Smooth Animations**: Plane moves and scales on hover with contrail effects
- **Color Cycling**: Gradients cycle through sky-blue → purple → pink → orange
- **Mouse Tracking**: Radial gradient follows cursor position within the logo
- **Professional Design**: Stylized aviation plane icon with modern typography

### Features:
1. **SVG-based**: Scalable to any size without quality loss
2. **Animated Gradients**: Colors transition smoothly (sky-blue, purple, pink, orange)
3. **Interactive Hover**: 
   - Plane translates and scales
   - Contrail effect appears
   - Text color animates
   - Glow shadow effect
   - Gradient follows mouse cursor
4. **Performance Optimized**: GPU-accelerated CSS transforms

### Usage:
```tsx
import Logo from './components/Logo';

// In your component
<Logo className="h-12 w-auto" />
```

### Color Palette:
- Primary: `#0ea5e9` (Sky Blue)
- Secondary: `#8b5cf6` (Purple)
- Accent: `#ec4899` (Pink)
- Warning: `#f59e0b` (Orange)
- Text: `#ffffff` (White)
- Subtitle: `#e0e7ff` (Light Indigo)

### Animation Details:
- Gradient cycle duration: 3-4 seconds
- Hover transition: 300ms ease-in-out
- Plane movement: 500ms cubic-bezier
- Mouse tracking: Real-time with RAF

## Static Logo Files

### SVG Version
Location: `/public/skytech-logo.svg`
- Use for: Favicons, social media, print
- Size: Vector (scales infinitely)
- Background: Blue gradient

### Creating PNG from SVG
To create PNG versions for different sizes:

1. **Using Chrome DevTools**:
   - Open `logo-generator.html` in Chrome
   - Right-click the SVG
   - "Inspect" → Right-click SVG element → "Capture node screenshot"

2. **Using Online Tools**:
   - Visit: https://cloudconvert.com/svg-to-png
   - Upload `public/skytech-logo.svg`
   - Set dimensions: 192x192, 512x512 for PWA icons

3. **Using ImageMagick** (command line):
   ```bash
   convert -density 300 -background none public/skytech-logo.svg public/icon-192.png
   convert -density 600 -background none public/skytech-logo.svg public/icon-512.png
   ```

## Logo Guidelines

### Do's ✅
- Use on dark backgrounds (#0369a1 or darker)
- Maintain aspect ratio (10:3)
- Keep minimum height of 40px for readability
- Use the animated version in the navbar
- Use static SVG for meta tags and favicons

### Don'ts ❌
- Don't stretch or distort the logo
- Don't use on light backgrounds without adjustment
- Don't modify the plane icon shape
- Don't use low-resolution raster versions when SVG is available
- Don't change the color scheme without approval

## Implementation in Navbar

The logo automatically includes:
- Hover scale effect (105%)
- Link to homepage
- Responsive sizing
- Dark mode compatibility
- Accessibility (proper link semantics)

## Browser Support
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile: Full support with touch fallback
