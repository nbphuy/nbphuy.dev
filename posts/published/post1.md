# Building an Aesthetic Web Portfolio

Creating a custom portfolio from scratch without relying on large CSS frameworks is incredibly rewarding. It provides complete control over the markup and styling, ensuring high performance and a unique visual identity.

## Why Skip the Framework?

When you build with pure HTML, CSS, and Vanilla JavaScript:

- **Performance:** Minimal payloads. No unused utilities.
- **Control:** You decide exactly how a grid flows or how an animation behaves.
- **Learning:** Deepens your understanding of native APIs.

### The Power of CSS Grid

Using Grid for my Projects page was a game changer:

```css
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
}
```

This single block creates a fully responsive, wrapping grid of cards that adjusts natively based on the viewport width.

## Conclusion

Building native means building light and fast. Check out the source code of this site on my [GitHub](https://github.com/nbphuy) to see how simple a beautifully crafted website can truly be!
