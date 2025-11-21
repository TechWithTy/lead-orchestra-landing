# AppProviders Test Suite

## Purpose

This test suite is designed to catch the "Objects are not valid as a React child" error that occurs during Next.js static export builds when component objects are rendered directly instead of being properly initialized.

## The Problem

During static export, Next.js prerenders all pages including `/_not-found`. When it encounters the `AppProviders` component:

1. The component uses `dynamic()` to lazy-load `ClientExperience`
2. If `dynamic()` is called at module level (during build), it creates a component object
3. During prerendering, this component object can be serialized incorrectly
4. This causes: `Error: Objects are not valid as a React child (found: object with keys {$$typeof, render, displayName})`

## The Solution

The fix moves the `dynamic()` call from module level into a `useEffect` hook:

- **Before**: `const ClientExperience = dynamic(...)` at module level
- **After**: `useEffect(() => { const ClientExperience = dynamic(...) })` inside component

This ensures:
- No evaluation during build/static export
- Component only loads in browser after mount
- No component object serialization issues

## Test Coverage

The test suite verifies:

1. ✅ Component doesn't throw the specific error
2. ✅ ClientExperience is not rendered immediately (before useEffect)
3. ✅ ClientExperience renders after mount on client
4. ✅ Dynamic import is not created at module level
5. ✅ All provider components render correctly
6. ✅ Children are rendered correctly

## Running Tests

```bash
pnpm run test:vitest src/components/providers/__tests__/AppProviders.test.tsx
```

## CI Integration

Add this test to your CI pipeline to catch this issue before deployment:

```yaml
- name: Run AppProviders tests
  run: pnpm run test:vitest src/components/providers/__tests__/AppProviders.test.tsx
```







