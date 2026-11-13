# Understanding CSS Grids in 2025

CSS Grid has matured gracefully. While Flexbox is amazing for 1-dimensional layouts (like a navigation bar), Grid unlocks incredibly powerful 2-dimensional capabilities.

## The Mental Model

Think of Grid as a spreadsheet interface for your UI components. You define rows and columns, and then place content inside these cells.

### An example layout

Imagine you want a standard holy-grail layout with a header, sidebar, main content, and footer.

```css
.layout {
  display: grid;
  grid-template-areas: 
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-columns: 200px 1fr;
}
```

By heavily combining `Grid` with `CSS Variables` and `calc()`, you can structure any application without needing to load hefty grid systems like Bootstrap. The web is native now!
