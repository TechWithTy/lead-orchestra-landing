# Debug Log: Next.js Prerender Error - Objects are not valid as a React child

## Error
```
Error: Objects are not valid as a React child (found: object with keys {$$typeof, render, displayName})
Error occurred prerendering page "/_not-found"
```

## Root Cause Analysis

### Attempted Fixes

1. **Removed module-level import** - Changed from `import { ClientExperienceWrapper }` to dynamic import in useEffect
2. **Used refs instead of state** - Stored component in `useRef` instead of `useState` to avoid React serialization
3. **Added SSR guards** - Checked `typeof window !== 'undefined'` before rendering
4. **Removed IIFE pattern** - Created separate `ClientExperienceRenderer` component
5. **Added logging** - Added console.error statements (but they're not showing in build output)

### Current Issue

The error persists even after all these fixes. This suggests:
- The component object is being serialized somewhere else in the component tree
- OR the dynamic import is still being evaluated during build despite being in useEffect
- OR there's another component rendering an object instead of JSX

### Next Steps to Debug

1. **Check if ClientExperienceWrapper module is being evaluated during build**
   - Even though it's in useEffect, Next.js might be analyzing the import path
   - Solution: Move the import to a completely separate file that's never imported at module level

2. **Check other components in the render tree**
   - PageLayout, Navbar, Footer, AuthModal might be rendering component objects
   - Check for patterns like `{Component}` instead of `<Component />`

3. **Use Next.js dynamic() with ssr: false at the point of use**
   - Instead of manual dynamic import, use Next.js's built-in dynamic() function
   - This is specifically designed to prevent SSR evaluation

### Files Modified
1. `landing/src/components/providers/AppProviders.tsx` - Multiple iterations
2. `landing/src/components/providers/ClientExperienceWrapper.tsx` - Added SSR guards
3. `landing/src/components/providers/ClientExperienceRenderer.tsx` - New component to avoid IIFE

### Recommended Solution

Use Next.js `dynamic()` function at the point where ClientExperienceWrapper is needed:

```tsx
const ClientExperienceWrapper = dynamic(
  () => import('./ClientExperienceWrapper').then(mod => ({ default: mod.ClientExperienceWrapper })),
  { ssr: false }
);
```

This ensures Next.js never evaluates the component during build/prerendering.
