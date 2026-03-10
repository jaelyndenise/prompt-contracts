# Prompt Contract: [Component Name]

## Inputs
- Design: [visual description — layout, elements, states]
- Data source: [Convex query hook, API, props]
- Existing dependencies: [Tailwind, UI framework, etc.]

## Expected Output
- File: src/components/[ComponentName].tsx
- Named export: [ComponentName]
- Props: [list all props with types]

## Constraints
- MUST show skeleton/loading state when data is loading
- MUST handle undefined/null values gracefully (show placeholder)
- MUST NOT cause layout shift between loading and loaded states
- MUST NOT use external animation/charting libraries unless specified
- Tailwind only, no inline styles (unless otherwise specified)

## Edge Cases
- Value is 0: display "0", not placeholder (zero is valid)
- Value is undefined but not loading: show "--" or equivalent
- Very large numbers: format with toLocaleString()
- Empty lists: show empty state message, not blank space
- [Additional component-specific edge cases]

## Acceptance Criteria
- [ ] Loading state shows pulsing skeleton
- [ ] Loaded state displays formatted data
- [ ] Zero/null/undefined values handled correctly
- [ ] No layout shift between states
- [ ] Responsive on mobile and desktop
