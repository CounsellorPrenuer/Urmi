# Claryntia Website Design Guidelines

## Design Philosophy
**Aesthetic Direction**: Premium wellness platform combining Apple's minimalism, Calm's serenity, and LeadCrest's modern elegance. Soft gradients, floating glass cards, generous whitespace, and centered layouts create a healing, transformative atmosphere.

## Color Palette

### Primary Colors
- **Primary Purple**: 270 73% 35% (Brand identity - #6A1B9A)
- **Accent Orange**: 32 100% 50% (Call-to-action - #FF9800)
- **Secondary Blue**: 195 97% 35% (Supporting elements - #03A9F4)

### Backgrounds & Gradients
- **Light Background**: 270 100% 98% (Soft lavender - #F9F6FF)
- **White**: 0 0% 100% (Cards and sections)
- **Primary Gradient**: linear-gradient(135deg, #6A1B9A, #03A9F4)
- **Subtle Background Gradients**: Use soft purple-to-pink or blue-to-lavender transitions

### Dark Mode (if applicable)
- Deep purple-navy backgrounds with elevated glass cards

## Typography

### Font Families
- **Headings**: Playfair Display (elegant, serif)
- **Body Text**: Inter (clean, modern sans-serif)
- Load via Google Fonts CDN

### Type Scale
- **Hero Headline**: 4xl-6xl (Playfair Display, font-weight 700)
- **Section Headings**: 3xl-4xl (Playfair Display, font-weight 600)
- **Subheadings**: xl-2xl (Inter, font-weight 600)
- **Body Text**: base-lg (Inter, font-weight 400)
- **Stats/Numbers**: 3xl-5xl (Playfair Display, bold)

## Layout System

### Spacing
- **Container Max Width**: max-w-7xl with px-6 lg:px-8
- **Section Vertical Spacing**: py-16 md:py-24 lg:py-32
- **Card Padding**: p-6 md:p-8 lg:p-10
- **Common Spacing Units**: Use Tailwind units of 4, 6, 8, 12, 16, 24, 32 for consistency

### Grid Patterns
- **Hero**: Full-width centered single column
- **Services/Features**: 1-column mobile → 2-column tablet → 3-column desktop
- **Testimonials**: 1-column mobile → 2-column tablet → 3-column desktop
- **Blog**: Masonry grid layout (2-3 columns desktop, Pinterest-style)
- **Stats**: 2x2 grid mobile → 4-column horizontal desktop

## Component Library

### Glass Cards (Core Design Element)
- Background: white with 40-60% opacity or backdrop-blur
- Border: 1px solid white with 20% opacity
- Shadow: Large, soft shadows (shadow-xl to shadow-2xl)
- Border Radius: rounded-2xl to rounded-3xl
- Hover State: Subtle lift with increased shadow and slight scale (transform scale-105)

### Buttons
- **Primary CTA**: Gradient background (purple to blue), white text, rounded-full, px-8 py-4
- **Secondary**: Outline style with primary purple border, rounded-full
- **Ghost/Tertiary**: Transparent with purple text
- All buttons: Smooth hover transitions with slight scale and color shifts

### Navigation
- **Transparent/Glass Header**: Fixed position, backdrop-blur effect
- **Logo**: Use provided Claryntia logo (left-aligned)
- **Menu Items**: Inter font, subtle hover underline animations
- **Mobile**: Hamburger menu with smooth slide-in drawer

### Stats Display
- Large numbers in Playfair Display
- Purple accent color
- Small descriptive text below
- Contained in glass cards or gradient backgrounds

### Testimonials
- Glass card containers
- Client initials/avatars (circular)
- Quote text in Inter
- Name and role in smaller text
- Optional: Star ratings in accent orange

### Service/Package Cards
- Vertical cards with glass effect
- Icon/emoji at top
- Title in Playfair Display
- Feature list with checkmarks
- Price prominently displayed
- CTA button at bottom

## Animations & Interactions

### Framer Motion Implementation
- **Page Load**: Stagger fade-in-up animations for sections (delay 0.1s between elements)
- **Cards**: Entrance from bottom with fade (translateY: 20 → 0, opacity: 0 → 1)
- **Scroll-Based**: Reveal sections as they enter viewport
- **Hover**: Subtle float effect on cards (translateY: 0 → -8px)

### Cursor Trail Effect
- Small glowing circle (20-30px diameter) following mouse
- Gradient fill (purple to blue)
- Blur effect, low opacity
- Smooth lag/delay for organic feel

### Floating 3D Animations
- Cards: Subtle continuous floating motion (translateY: -10px to 10px, 3-4s duration)
- Icons: Gentle rotation and scale pulse
- Apply to service cards, feature highlights, and decorative elements

### Parallax Scroll
- Hero background elements move slower than foreground
- Apply to gradient overlays and decorative shapes
- Subtle effect (0.3-0.5 parallax ratio)

### Gradient Backgrounds
- Animated gradient shifts using CSS or Framer Motion
- Slow color transitions between purple-blue-pink hues
- Apply to hero section and key CTA areas

## Page Sections & Structure

### Hero Section
- **Height**: 90vh minimum
- **Background**: Animated gradient or soft image with overlay
- **Content**: Centered layout with headline, tagline, CTA button, optional secondary CTA
- **Stats Bar**: 3-4 key metrics below hero (lives empowered, satisfaction rate, etc.)
- Include provided logo prominently

### Why Choose/Benefits Section
- Glass cards in 2-3 column grid
- Icons for each benefit (use Heroicons or similar)
- Short, impactful descriptions

### Who We Help Section
- 4 target audience cards (Students, Professionals, Corporates, Individuals)
- Icons/emojis for each segment
- Brief description per card

### Transformation/Methodology Section
- 4-step process visualization
- Numbered steps with gradient backgrounds
- Connecting lines or arrows between steps (optional)
- Icons for each step

### Services/Packages Section
- 3 pricing tiers in prominent cards
- Highlight middle tier (most popular)
- Feature lists with checkmark icons
- Price and CTA button per card

### Testimonials Section
- 3-column grid of quote cards
- Rotation/carousel on mobile
- Client initials or placeholder avatars

### Meet the Founder Section
- **Layout**: 2-column (image left, bio right) or vice versa
- **Image**: Use provided founder photo (IMG20240827160716)
- **Content**: Credentials, mission statement, years of experience
- **Style**: Glass card or clean white background with ample padding

### Blog Section
- **Masonry Grid**: Pinterest-style layout with varied card heights
- **Featured Post**: Larger card for main article
- **Card Content**: Image thumbnail, category tag, title, excerpt, read time
- **Hover**: Smooth lift and image zoom effects

### Trust/Partnership Section
- Mentoria partnership highlight
- Certification badges
- Stats about Mentoria platform
- Logos and trust indicators

### Footer
- **Multi-column**: Contact info, quick links, social media
- **Newsletter Signup**: Email input with gradient CTA button
- **Background**: Deep purple or gradient
- **Text**: Light text on dark background

## Interactive Elements

### Smooth Scroll
- Implement smooth scrolling behavior for anchor links
- Scroll-to-top button appearing after scrolling down

### Responsive Breakpoints
- Mobile: < 768px (single column layouts)
- Tablet: 768px - 1024px (2-column transitions)
- Desktop: > 1024px (full multi-column grids)

### Micro-Interactions
- Button hover: Slight scale and color shift
- Input focus: Gradient border glow
- Card hover: Lift with shadow increase
- Icon hover: Gentle bounce or rotation

## Images

### Required Images
1. **Hero Background**: Abstract wellness/mindfulness imagery (meditation, nature, or soft gradient overlay) - Full-width background
2. **Founder Photo**: Use IMG20240827160716 in "Meet the Founder" section (professional portrait, circular or rounded rectangle)
3. **Blog Thumbnails**: 6-8 placeholder images for blog cards (abstract, wellness-themed)
4. **Section Decorative Elements**: Subtle floating shapes or gradient blobs (optional background accents)

### Image Treatment
- Rounded corners (rounded-2xl)
- Soft shadows
- Optional gradient overlays for contrast
- Lazy loading for performance

## Accessibility

- **Color Contrast**: Ensure WCAG AA compliance (especially light text on gradients)
- **Focus States**: Visible keyboard focus indicators with purple accent
- **Alt Text**: Descriptive alt text for all images
- **ARIA Labels**: Proper labeling for interactive elements

## Performance Considerations
- Optimize gradient animations (use transform/opacity only)
- Lazy load images and blog content
- Debounce cursor trail and parallax calculations
- Use will-change sparingly for animated elements

---

**Overall Tone**: Peaceful, professional, transformative, premium yet approachable. Every design choice should evoke clarity, healing, and confidence.