## How to Run

```bash
# Install dependencies
yarn install

# iOS
cd ios && pod install && cd ..
yarn ios

# Android
yarn android

# Tests
yarn test
```

## How I Organized State & Logic

### Project Structure

```
src/
  hooks/
    useCart.tsx       - Cart logic with Context Provider
    useDebounce.ts    - Search debouncing
  screens/
    ProductScreen.tsx - Product list and search
    CartScreen.tsx    - Shopping cart
  types/
    index.ts          - TypeScript definitions
```

### Key Decisions

**Custom Hook Pattern**

- `useCart()` wraps all cart operations
- Components stay clean and testable
- Single source of truth

**AsyncStorage**

- Saves cart data automatically
- Persists between app restarts
- Simple key-value storage

**TypeScript**

- Catches errors early
- Better autocomplete
- Safer refactoring

## Trade-offs

### What Works Well

- Clean code with easy flow
- TypeScript
- Cart data persists
- Basic unit tests
- Chose a lightweight CartProvider instead of Redux/Jotai to reduce complexity for this scope.

### What I'd Improve with More Time

**Performance**

- Optimize FlatList rendering (virtualization, memo)
- Add data pagination/infinite scroll
- Add React.memo where needed

**UX**

- Loading states
- Success animations
- Empty state designs
- Upgrade UI

**Scalability**

- Use Redux, Jotai, ... for real application
- Add real backend API
- User authentication
- Order history
- Use React Navigation features correctly
- Add an Action folder and a Controller file for API handling
- Create a template component that can be reused across the app

### Why These Choices?

**AsyncStorage vs Database?**
Good enough for cart data. Would use SQLite/Realm for more complex data.

**Testing Approach?**
Started simple to learn Jest properly.
